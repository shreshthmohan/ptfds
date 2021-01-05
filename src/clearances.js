// This helper will give you clearances inside (oil) and outside (air) the transformer
// based on nominal HT and LT voltages, power rating and existence of cable end box

const clearances = function ({
  lt_cable_end_box, // boolean
  ht_cable_end_box, // boolean
  ht_nominal_voltage, // number, volts (V)
  lt_nominal_voltage, // number, volts (V)
  power_rating, // kVA, kW
}) {
  // All clearance values in mm
  const air = {
    ht_to_ht: 0,
    ht_to_earth: 0,
    lt_to_lt: 0,
    lt_to_earth: 0,
  }

  const oil = {
    ht_to_lt: 0,
    ht_to_yoke: 0,
    ht_to_ht: 0,
    ht_to_tank: 0,
    lt_to_yoke: 0,
    lt_to_earth: 0,
  }

  // TODO: error handling

  if (ht_nominal_voltage < 1100) {
    air.ht_to_ht = 75
    air.ht_to_earth = 40

    oil.ht_to_lt = 6
    oil.ht_to_yoke = 8
    oil.ht_to_ht = 6
    oil.ht_to_tank = 25
  } else if (ht_nominal_voltage <= 12000) {
    air.ht_to_ht = 255
    air.ht_to_earth = 140

    oil.ht_to_lt = 10
    oil.ht_to_yoke = 20
    oil.ht_to_ht = 10
    oil.ht_to_tank = 25
  } else if (ht_nominal_voltage <= 24000) {
    air.ht_to_ht = 330
    air.ht_to_earth = 230

    oil.ht_to_lt = 14
    oil.ht_to_yoke = 40
    oil.ht_to_ht = 15
    oil.ht_to_tank = 40
  } else {
    ht_nominal_voltage > 24000
    // TODO: Ask what's the upper limit
    air.ht_to_ht = 350
    air.ht_to_earth = 320

    oil.ht_to_lt = 20
    oil.ht_to_yoke = 55
    oil.ht_to_ht = 20
    oil.ht_to_tank = 60
  }

  if (lt_nominal_voltage < 1100) {
    air.lt_to_lt = 75
    air.lt_to_earth = 40

    if (lt_cable_end_box) {
      air.lt_to_lt = 45
      air.lt_to_earth = 20
    }
    oil.lt_to_yoke = 8
    oil.lt_to_earth = 2.5

    if (power_rating > 200) {
      oil.lt_to_yoke = 11
      oil.lt_to_earth = 3
    }

    if (power_rating > 500) {
      oil.lt_to_yoke = 13
      oil.lt_to_earth = 3.5
    }
  } else if (lt_nominal_voltage <= 12000) {
    air.lt_to_lt = 255
    air.lt_to_earth = 140
    oil.lt_to_yoke = 20
    oil.lt_to_earth = 9.5
  } else if (lt_nominal_voltage <= 24000) {
    air.lt_to_lt = 330
    air.lt_to_earth = 230
    oil.lt_to_yoke = 40
    oil.lt_to_earth = 14
  } else {
    // lt_nominal_voltage > 24000
    air.lt_to_lt = 350
    air.lt_to_earth = 320
    oil.lt_to_yoke = 55
    oil.lt_to_earth = 18
  }
}
