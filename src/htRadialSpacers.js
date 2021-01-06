const radialSpacerCount = function (power_rating) {
  let radial_spacer_count = 12

  if (power_rating < 150) {
    radial_spacer_count = 6
  } else if (power_rating <= 250) {
    radial_spacer_count = 8
  } else if (power_rating <= 630) {
    radial_spacer_count = 10
  } else {
    radial_spacer_count = 12
  }
  return radial_spacer_count
}
