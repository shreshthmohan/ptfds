const crossoverWinding = function ({
  layers,
  turns_per_coil,
  conductor_diameter_covered,
  inter_layer_insulation, // kraft paper? rename this or other variable?
  duct_size,
  increase_length_for_manufacture,
}) {
  const turns_per_layer = turns_per_coil / layers
  let axial_coil_length =
    turns_per_layer *
      conductor_diameter_covered *
      increase_length_for_manufacture +
    0.7

  if (axial_coil_length > 100) {
    axial_coil_length =
      turns_per_layer *
        conductor_diameter_covered *
        increase_length_for_manufacture +
      0.25
    if (conductor_diameter_covered < 1.3) {
      axial_coil_length += 0.75
    }
  }
  axial_coil_length = Math.floor(axial_coil_length * 2 + 0.75) / 2

  let inter_layer_insulation_depth_contribution
  // Do note that the calculation below looks a little different from
  // dBase code because inter_layer_insulation is already in mm instead of mil
  if (conductor_diameter_covered > 1 && conductor_diameter_covered < 1.53) {
    inter_layer_insulation_depth_contribution = 0.75 * inter_layer_insulation
  } else if (conductor_diameter_covered < 2.2) {
    inter_layer_insulation_depth_contribution = inter_layer_insulation - 2 / 40
  } else if (conductor_diameter_covered >= 2.2) {
    inter_layer_insulation_depth_contribution = inter_layer_insulation - 4 / 40
  } else {
    // conductor_diameter_covered <=1
    inter_layer_insulation_depth_contribution = inter_layer_insulation
  }
  let coil_depth =
    layers *
      (conductor_diameter_covered + inter_layer_insulation_depth_contribution) +
    duct_size
  coil_depth = Math.floor(coil_depth * 4 + 0.8) / 4

  return {
    coil_depth,
    axial_coil_length,
  }
}
