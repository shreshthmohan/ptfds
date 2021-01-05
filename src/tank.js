const SEALED = 'sealed'
const CONVENTIONAL = 'conventional'
const PRESSED = 'pressed'

const tank = function ({ tank_type, power_rating, radiator_type }) {
  let conservator
  if (tank_type === SEALED) {
    conservator = false
    roller = false
  } else {
    conservator = true
    roller = true
  }

  let tank_body_sheet_thickness
  let tank_top_sheet_thickness

  if (power_rating <= 315) {
    tank_body_sheet_thickness = 3.1
    tank_top_sheet_thickness = 5
    tank_bottom_sheet_thickness = 5
  } else if (power_rating > 315 && power_rating < 1000) {
    tank_body_sheet_thickness = 4
    tank_top_sheet_thickness = 6
    tank_bottom_sheet_thickness = 6
  } else {
    tank_body_sheet_thickness = 5
    tank_top_sheet_thickness = 10
    tank_bottom_sheet_thickness = 8
  }

  const radiator_type = PRESSED

  let stiffener_count

  if (power_rating <= 100) {
    stiffener_count = 1
  } else if (power_rating <= 1000) {
    stiffener_count = 2
  } else {
    // power_rating > 1000
    stiffener_count = 3
  }
  return {
    conservator,
    roller,
    stiffener_count,
    radiator_type,
  }
}
