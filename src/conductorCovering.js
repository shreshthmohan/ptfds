const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

const SPIRAL = 'spiral'
const DISC = 'disc'
const CROSSOVER = 'crossover'

const conductorCovering = function (
  // Cu or Al
  ht_conductor_material,
  lt_conductor_material,

  // mm
  ht_conductor_diameter,

  // mm²
  lt_conductor_area,

  // V
  ht_nominal_voltage,
  lt_nominal_voltage,

  // A
  lt_current, // per phase

  ht_winding_type,
  lt_winding_type,

  // kW
  power_rating
) {
  // Error generation

  /* HT Covering { */
  let ht_covering_thickness
  if (ht_conductor_material === ALUMINIUM) {
    if (ht_conductor_diameter < 1.4) {
      ht_covering_thickness = 0.2
    } else if (ht_conductor_diameter < 2) {
      ht_covering_thickness = 0.23
    } else if (ht_conductor_diameter < 2.35) {
      ht_covering_thickness = 0.25
    } else if (ht_conductor_diameter < 2.7) {
      ht_covering_thickness = 0.28
    } else if (ht_conductor_diameter < 3.4) {
      ht_covering_thickness = 0.3
    } else {
      ht_covering_thickness = 0.35
    }
  }

  if (ht_conductor_material === COPPER) {
    if (ht_conductor_diameter < 1) {
      ht_covering_thickness = 0.2
    } else if (ht_conductor_diameter < 1.4) {
      ht_covering_thickness = 0.23
    } else if (ht_conductor_diameter < 2.2) {
      ht_covering_thickness = 0.25
    } else if (ht_conductor_diameter < 2.6) {
      ht_covering_thickness = 0.28
    } else if (ht_conductor_diameter < 3.2) {
      ht_covering_thickness = 0.3
    } else {
      ht_covering_thickness = 0.35
    }
  }

  if (ht_nominal_voltage > 18000) {
    ht_covering_thickness *= 1.15
    ht_covering_thickness = Math.floor(ht_covering_thickness * 100 + 0.6) / 100 // TODO: Ask why 0.6?
  }

  if (ht_winding_type === DISC) {
    ht_covering_thickness = 0.5
    if (power_rating > 6300) {
      ht_covering_thickness = 0.75
    }
  }

  /* } HT Covering Calculation ends */

  /* LT Covering { */

  let lt_covering_thickness

  if (lt_current < 100) {
    lt_covering_thickness = 0.3
  } else if (lt_current <= 400) {
    lt_covering_thickness = 0.35
  } else {
    lt_covering_thickness = 0.4
  }
  if (lt_nominal_voltage > 3300) {
    lt_covering_thickness = 0.5
  }

  if (lt_winding_type === DISC) {
    lt_covering_thickness = 0.5
    if (power_rating > 8000) {
      lt_covering_thickness = 0.6
    }
  }

  /* } LT Covering Calculation ends */

  return { lt_covering_thickness, ht_covering_thickness }
}
