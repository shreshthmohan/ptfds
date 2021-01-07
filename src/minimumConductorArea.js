const minimumConductorArea = function (current_density, current_per_phase) {
  const minimum_conductor_area = current_per_phase / current_density

  return minimum_conductor_area
}
