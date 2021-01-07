const htCoilCount = function ({
  power_rating,
  lt_nominal_voltage,
  ht_nominal_voltage,
}) {
  let ht_coil_count

  if (ht_nominal_voltage < 12000) {
    if (power_rating <= 400) {
      ht_coil_count = 4
    } else if (power_rating <= 630) {
      ht_coil_count = 6
    } else {
      // power_rating > 630
      ht_coil_count = 8
    }
  } else if (ht_nominal_voltage < 24000) {
    if (power_rating <= 63) {
      ht_coil_count = 6
    } else if (power_rating <= 400) {
      ht_coil_count = 8
    } else {
      // power_rating > 400
      ht_coil_count = 10
    }
  } else if (ht_nominal_voltage <= 36000) {
    if (power_rating <= 63) {
      ht_coil_count = 8
    } else if (power_rating <= 400) {
      ht_coil_count = 10
    } else {
      // power_rating > 400
      ht_coil_count = 12
    }
  } else {
    ht_coil_count = 1
  }

  return ht_coil_count
}
