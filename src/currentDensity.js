const COPPER = 'copper'
const ALUMINIUM = 'aluminium'
const currentDensity = function ({
  ht_conductor_material,
  lt_conductor_material,
}) {
  //TODO: error generation

  let ht_current_density // A/mm²
  let lt_current_density // A/mm²
  if (ht_conductor_material === COPPER) {
    ht_current_density = 3.2
  }
  if (ht_conductor_material === ALUMINIUM) {
    ht_current_density = 1.6
  }
  if (lt_conductor_material === COPPER) {
    lt_current_density = 3.5
  }
  if (lt_conductor_material === ALUMINIUM) {
    lt_current_density = 1.7
  }

  return { lt_current_density, ht_current_density }
}
