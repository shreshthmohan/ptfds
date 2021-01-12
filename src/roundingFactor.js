// Calculates the area wasted due to rounding of corners of a strip
// with a rectangular cross-section

const roundingFactor = function (depth) {
  // usually it's based on the depth
  let rounding_factor
  if (depth <= 1.6) {
    rounding_factor = 0.215
  } else if (depth <= 2.4) {
    rounding_factor = 0.363
  } else if (depth <= 3.55) {
    rounding_factor = 0.55
  } else {
    rounding_factor = 0.86
  }
  return rounding_factor
}
