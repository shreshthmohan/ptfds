// Cost factor is based on the cost of winding conductor and cost of core laminations

const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

const costFactor = function ({
  ht_conductor_material,
  lt_conductor_material,
  lt_conductor_cost, // ₹/kg
  ht_conductor_cost, // ₹/kg
  core_crgo_cost, // ₹/kg
}) {
  // Error generation

  let cost_factor
  const average_conductor_cost = (lt_conductor_cost + ht_conductor_material) / 2
  if (average_conductor_cost != 0 && core_crgo_cost != 0) {
    cost_factor = core_crgo_cost / average_conductor_cost
  } else {
    if (ht_conductor_material === ALUMINIUM) {
      cost_factor = 1.2
    }
    if (ht_conductor_material === COPPER) {
      cost_factor = 0.7
    }
  }

  return cost_factor
}
