const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

// Design note:
// Current density affect losses. Higher current density leads to higher losses.
// The way to reduce losses is by increasing the conductor cross-sectional area.
// Increase in cross-sectional area leads to lower current density and in turn lower
// resistive losses
// Do note that increasing cross-sectional area increase the cost of the transformer as well.
// So you need to find the right compormise.

const currentDensityMax = function ({
  ht_conductor_material,
  lt_conductor_material,
}) {
  //TODO: error generation

  let ht_current_density_max // A/mm²
  let lt_current_density_max // A/mm²
  if (ht_conductor_material === COPPER) {
    ht_current_density_max = 3.2
  }
  if (ht_conductor_material === ALUMINIUM) {
    ht_current_density_max = 1.6
  }
  if (lt_conductor_material === COPPER) {
    lt_current_density_max = 3.5
  }
  if (lt_conductor_material === ALUMINIUM) {
    lt_current_density_max = 1.7
  }

  return { lt_current_density_max, ht_current_density_max }
}
