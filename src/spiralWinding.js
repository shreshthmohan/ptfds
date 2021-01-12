const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

const spiralWinding = function ({
  power_rating,
  lt_turns,
  lt_layers,
  lt_conductor_area,
  lt_conductor_material,
  lt_covering_thickness,
  lt_winding_height,
  lt_gap,
  lt_duct_size,
  lt_kraft_paper_thickness, // inter-layer kraft paper thickness, mm
  lt_gap_present, // boolean; LT thinning
  lt_transposed, // boolean
  frequency, // Hz

  // TODO: currently everything is lt_* check if the same function is useful for HT spiral winding too.

  // tolerances
  end_levelling_sm, // extra length due to one end-levelling strip
  end_levelling_md, // extra length due to one end-levelling strip
  end_levelling_lg, // extra length due to one end-levelling strip
  al_spiral_winding_length_increase, // ALSPC3
  cu_spiral_winding_length_increase, // CUSPC3
  max_depth_al_strip,
  max_width_al_strip,
  max_depth_cu_strip,
  max_width_cu_strip,
}) {
  const turns_per_layer = lt_turns / lt_layers

  const max_depth =
    lt_conductor_material === ALUMINIUM
      ? max_depth_al_strip
      : max_depth_cu_strip
  const max_width =
    lt_conductor_material === ALUMINIUM
      ? max_width_al_strip
      : max_width_cu_strip
  const winding_length_increase =
    lt_conductor_material === ALUMINIUM
      ? al_spiral_winding_length_increase
      : cu_spiral_winding_length_increase

  let end_levelling
  if (lt_conductor_area < 100) {
    end_levelling = end_levelling_sm
  } else if (lt_conductor_area < 400) {
    end_levelling = end_levelling_md
  } else {
    // lt_conductor_area >= 400
    end_levelling = end_levelling_lg
  }

  const actual_winding_height =
    (lt_winding_height - 2 * end_levelling) * winding_length_increase // after removing tolerances and end-levelling

  let depth_wise_conductors = 1
  let width_wise_conductors = 1
  let find_dimensions_in_progress = true
  let depth = max_depth - 1
  let width
  let width_after_lt_gap_error_adjust
  let lt_gap_adjust_in_width
  let final_lt_gap
  let width_iteration
  while (find_dimensions_in_progress) {
    if (depth > max_depth) {
      if (lt_transposed) {
        if (power_rating < 200) {
          width =
            (actual_winding_height - 0.5) /
            (turns_per_layer + 1 + 1 / width_wise_conductors)
        } else {
          width =
            (actual_winding_height - 1) /
            (turns_per_layer + 1 + 1 / width_wise_conductors)
          if (power_rating < 315) {
            width =
              (actual_winding_height - 2) /
              (turns_per_layer + 1 + 1 / width_wise_conductors)
          }
        }
        if (lt_gap_present) {
          lt_gap_error =
            lt_gap - (actual_winding_height - (turns_per_layer + 1) * width)
          if (lt_gap_error > 0) {
            width_after_lt_gap_error_adjust =
              width -
              lt_gap_error / (turns_per_layer + 1 + 1 / width_wise_conductors)

            // TODO: ask about this finer adjustment.
            // Does this have something to do with transposition?
            width =
              width_after_lt_gap_error_adjust -
              (width - width_after_lt_gap_error_adjust) /
                width_wise_conductors /
                (turns_per_layer + 1 + 1 / width_wise_conductors)
            lt_gap_adjust_in_width =
              (width - width_after_lt_gap_error_adjust) / width_wise_conductors
            final_lt_gap += lt_gap_adjust_in_width
          }
        }
      } else {
        // no transposition
        width = actual_winding_height / (turns_per_layer + 1)
        if (lt_gap_present) {
          width = (actual_winding_height - lt_gap) / (turns_per_layer + 1)
          final_lt_gap = lt_gap
        }
      }
      find_dimensions_in_progress = false
    } else {
      // depth <= max_depth
      width = actual_winding_height / (turns_per_layer + 1)
      if (lt_gap_present) {
        width = (actual_winding_height - lt_gap) / (turns_per_layer + 1)
        final_lt_gap = lt_gap
      }
    }
    if (final_lt_gap > 0) {
      final_lt_gap = Math.floor(final_lt_gap)
    }
    width_iteration = width
    let i = 1
    width_wise_conductors = 1
    while (width_iteration > max_width) {
      width_iteration = width / i
      width_wise_conductors = i
      i++
    }
    width = width_iteration - lt_covering_thickness // bare conductor
    width = Math.round(width * 100) / 100
    depth =
      lt_conductor_area /
      (width * width_wise_conductors * depth_wise_conductors)
    if (depth < max_depth) {
      find_dimensions_in_progress = false
    }
  }
  let j = 1
  while (depth > max_depth) {
    depth = lt_conductor_area / width / width_wise_conductors / j
    depth_wise_conductors = j
    j++
  }

  // Adjustment for rod size
  // TODO
  // SM: I don't think the code for adjusting width and depth based on
  // conductor rod size is ever triggered, as NWD isn't initialized anywhere

  depth = (depth * width + roundingFactor(depth * 0.99)) / width
  depth = MATH.floor(depth * 100 + 1) / 100
  const depth_covered = depth + lt_covering_thickness
  // no need to convert lt_kraft_paper_thickness to mm, as it's already in mm
  // see relevant function: ltKraftPaperThickness
  let winding_depth
  let reduce_kraft_paper_layers
  if (lt_layers > 1) {
    if (lt_layers === 2 && lt_duct_size !== 0) {
      winding_depth =
        (depth_covered + 0.05) * depth_wise_conductors * lt_layers +
        lt_duct_size
    } else {
      if (lt_duct_size > 0) {
        reduce_kraft_paper_layers = Math.floor(lt_duct_size / 3)
        if (reduce_kraft_paper_layers > lt_layers) {
          reduce_kraft_paper_layers = lt_layers
        }
        winding_depth =
          (depth_covered + 0.05) * depth_wise_conductors * lt_layers +
          lt_duct_size +
          lt_kraft_paper_thickness * (lt_layers - reduce_kraft_paper_layers)
      } else {
        // lt_duct_size <= 0
        winding_depth =
          (depth_covered + 0.05) * depth_wise_conductors * lt_layers +
          lt_kraft_paper_thickness * (lt_layers - 1)
      }
    }
  } else {
    // lt_layers === 1
    winding_depth = (depth_covered + 0.05) * depth_wise_conductors
  }

  winding_depth = Math.floor(winding_depth * 4 + 1) / 4

  let effective_winding_height_for_reactance =
    actual_winding_height -
    2 * end_levelling -
    width_iteration * width_wise_conductors

  effective_winding_height_for_reactance =
    Math.round(effective_winding_height_for_reactance * 100) / 100

  let eddy_factor = 3.92
  if (lt_conductor_material === ALUMINIUM) {
    eddy_factor = eddy_factor * ((2100 / 3423) ^ 2)
  }
  const beta =
    (width * width_wise_conductors * turns_per_layer * 0.95) /
    effective_winding_height_for_reactance

  // Percentage of LT loss
  const percentage_lt_eddy_loss =
    (eddy_factor *
      (depth ^ 4) *
      (lt_layers ^ 2) *
      (depth_wise_conductors ^ 2) *
      (beta ^ 2) *
      (frequency ^ 2)) /
    10000000

  return {
    winding_depth,
    effective_winding_height_for_reactance,
    width_wise_conductors,
    depth_wise_conductors,
    width,
    depth,
    percentage_lt_eddy_loss,
  }
}
