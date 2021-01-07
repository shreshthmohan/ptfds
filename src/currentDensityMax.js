const COPPER = 'copper'
const ALUMINIUM = 'aluminium'
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
