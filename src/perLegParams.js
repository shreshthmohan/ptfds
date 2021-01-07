const DELTA = 'delta'
const STAR = 'star'
const ZIGZAG = 'zigzag'

const voltagePerLeg = function (connection, line_voltage) {
  let voltage_per_leg
  if (connection === DELTA) {
    voltage_per_leg = line_voltage
  } else {
    // STAR or ZIGZAG
    voltage_per_leg = line_voltage / Math.sqrt(3)
  }
}

const perLegParams = function (
  power_rating, // kW
  lt_nominal_voltage, // V, volts
  ht_nominal_voltage, // V, volts
  lt_connection, // star, delta or zigzag
  ht_connection // star, delta or zigzag
) {
  // TODO: Error generation

  const power_rating_per_leg = power_rating / 3

  const ht_voltage_per_leg = voltagePerLeg(ht_connection, ht_nominal_voltage) // per phase
  const lt_voltage_per_leg = voltagePerLeg(lt_connection, lt_nominal_voltage) // per phase

  // Since power rating is in kilowatts
  const ht_current = (power_rating_per_leg * 1000) / ht_voltage_per_leg
  const lt_current = (power_rating_per_leg * 1000) / lt_voltage_per_leg

  return {
    power_rating_per_leg,
    ht_voltage_per_leg,
    lt_voltage_per_leg,
    lt_current,
    ht_current,
  }
}
