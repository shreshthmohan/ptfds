const impedanceRange = function (
  percentage_impedance,
  tolerance_over_impedance
) {
  const impedance_low =
    percentage_impedance * (1 - tolerance_over_impedance / 100)
  const impedance_high =
    percentage_impedance * (1 + tolerance_over_impedance / 100)

  return { impedance_high, impedance_low }
}
