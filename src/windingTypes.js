// Evaluate what winding types should LT and HT have.

const SPIRAL = 'spiral'
const DISC = 'disc'
const CROSSOVER = 'crossover'

const windingTypes = function ({
  power_rating, // kW
  lt_nominal_voltage, // V
  ht_nominal_voltage, // V
}) {
  // TODO: Error generation

  let lt_winding_type
  if (lt_nominal_voltage < 6000) {
    lt_winding_type = SPIRAL
  } else {
    lt_winding_type = CROSSOVER
    if (
      (power_rating > 800 && lt_nominal_voltage <= 12000) ||
      (power_rating > 2000 && lt_nominal_voltage > 12000)
    ) {
      lt_winding_type = DISC
    }
  }

  let ht_winding_type
  if (ht_nominal_voltage < 6000) {
    ht_winding_type = SPIRAL
  } else {
    ht_winding_type = CROSSOVER
    if (
      (power_rating > 1200 && ht_nominal_voltage <= 12000) ||
      (power_rating > 2000 && ht_nominal_voltage > 12000)
    ) {
      ht_winding_type = DISC
    }
  }

  return {
    lt_winding_type,
    ht_winding_type,
  }
}
