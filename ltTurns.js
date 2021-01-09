const ALUMINIUM = 'aluminium'
const COPPER = 'copper'
const ZIGZAG = 'zigzag'
const ltTurns = function ({
  power_rating,
  ht_nominal_voltage,
  ht_conductor_material,
  short_circuit_test,
  cost_factor,
  lt_voltage_per_leg,
  percentage_impedance,
  lt_connection,
}) {
  // TODO: Error generation

  let cost_impedance_factor
  let x // Ampere^-1
  let lt_turns
  if (ht_nominal_voltage < 13000) {
    if (ht_conductor_material === ALUMINIUM) {
      //   CASE CTYPE#'A' .AND. NOMHTV<13000
      cost_impedance_factor =
        cost_factor * Math.sqrt(percentage_impedance / 4.5)
      if (power_rating < 63) {
        if (cost_impedance_factor < 1.1) {
          x = 0.316
        } else if (
          cost_impedance_factor >= 1.1 &&
          cost_impedance_factor < 1.4
        ) {
          x = 0.308
        } else {
          x = 0.3
        }
        lt_turns = lt_voltage_per_leg / (x * Math.sqrt(power_rating))
        lt_turns = 2 * Math.round(lt_turns / 2)
      } else if (power_rating < 100) {
        if (cost_impedance_factor < 1.1) {
          x = 0.34
        } else if (
          cost_impedance_factor >= 1.1 &&
          cost_impedance_factor < 1.4
        ) {
          x = 0.325
        } else {
          x = 0.315
        }
        lt_turns = Math.round(lt_voltage_per_leg / x / Math.sqrt(power_rating))
      } else if (power_rating < 200) {
        if (cost_impedance_factor < 1.1) {
          x = 0.35
        } else if (
          cost_impedance_factor >= 1.1 &&
          cost_impedance_factor < 1.4
        ) {
          x = 0.33
        } else {
          x = 0.315
        }
        lt_turns = Math.round(lt_voltage_per_leg / x / Math.sqrt(power_rating))
      } else {
        // power_rating >= 200
        if (cost_impedance_factor < 1.1) {
          x = 0.34
        } else if (
          cost_impedance_factor >= 1.1 &&
          cost_impedance_factor < 1.4
        ) {
          x = 0.32
        } else {
          x = 0.305
        }
        lt_turns = Math.round(lt_voltage_per_leg / x / Math.sqrt(power_rating))
      }
    } else if (ht_conductor_material === COPPER) {
      if (power_rating <= 200) {
        cost_impedance_factor =
          cost_factor * Math.sqrt(percentage_impedance / 4.5)
        if (cost_impedance_factor < 0.7) {
          x = 0.38
        } else if (cost_impedance_factor < 0.9) {
          x = 0.36
        } else {
          x = 0.35
        }
      } else if (power_rating <= 500) {
        cost_impedance_factor =
          cost_factor * Math.sqrt(percentage_impedance / 4.65)
        if (cost_impedance_factor < 0.7) {
          x = 0.39
        } else if (cost_impedance_factor < 0.9) {
          x = 0.37
        } else {
          x = 0.35
        }
      } else {
        // power_rating > 500
        cost_impedance_factor =
          cost_factor * Math.sqrt(percentage_impedance / 5)
        if (cost_impedance_factor < 0.7) {
          x = 0.42
        } else if (cost_impedance_factor < 0.9) {
          x = 0.39
        } else {
          x = 0.37
        }
      }
      lt_turns = Math.round(lt_voltage_per_leg / x / Math.sqrt(power_rating))
      if (power_rating > 250 && short_circuit_test) {
        lt_turns = lt_turns - 1
      }
    }
  } else {
    // You won't normally have a transformer with ht voltage above 13kv and conductor material aluminium. Reason? Size?
    // ht_nominal_voltage >= 13000
    if (power_rating < 200) {
      cost_impedance_factor =
        cost_factor * Math.sqrt(percentage_impedance / 4.75)
      if (cost_impedance_factor < 0.7) {
        x = 0.38
      } else if (cost_impedance_factor < 0.9) {
        x = 0.365
      } else {
        x = 0.347
      }
    } else if (power_rating <= 500) {
      cost_impedance_factor = cost_factor * Math.sqrt(percentage_impedance / 5)
      if (cost_impedance_factor < 0.7) {
        x = 0.42
      } else if (cost_impedance_factor < 0.9) {
        x = 0.38
      } else {
        x = 0.36
      }
    } else if (power_rating <= 1600) {
      cost_impedance_factor =
        cost_factor * Math.sqrt(percentage_impedance / 5.5)
      if (cost_impedance_factor < 0.7) {
        x = 0.44
      } else if (cost_impedance_factor < 0.9) {
        x = 0.42
      } else {
        x = 0.395
      }
    } else {
      // power_rating > 1600
      if (power_rating < 5000) {
        cost_impedance_factor =
          cost_factor * Math.sqrt(percentage_impedance / 6.25)
      } else {
        cost_impedance_factor =
          cost_factor * Math.sqrt(percentage_impedance / 7.5)
      }
      if (cost_impedance_factor < 0.7) {
        x = 0.44
      } else if (cost_impedance_factor < 0.9) {
        x = 0.42
      } else {
        x = 0.395
      }
    }
    lt_turns = Math.round(lt_voltage_per_leg / x / Math.sqrt(power_rating))
    if (power_rating > 250 && short_circuit_test) {
      lt_turns = lt_turns - 1
    }
  }
  if (lt_connection === ZIGZAG) {
    lt_turns *= 2 / Math.sqrt(3)
  }
  return lt_turns
}
