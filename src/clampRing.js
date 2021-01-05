const PERMAWOOD = 'permawood'
const MILD_STEEL = 'mild steel'

const clampRing = function (
  power_rating // kVA, kW
) {
  if (isNaN(power_rating)) {
    throw 'power_rating is not a number'
  }

  let clamp_ring_thickness = 0
  let clamp_ring_press_screw_diameter = 0

  if (power_rating > 300 && power_rating <= 400) {
    clamp_ring_thickness = 8
  } else if (power_rating < 750) {
    clamp_ring_thickness = 10
  } else if (power_rating < 1000) {
    clamp_ring_thickness = 11
  } else if (power_rating <= 1500) {
    clamp_ring_thickness = 20
  } else if (power_rating <= 2100) {
    clamp_ring_thickness = 25
  } else if (power_rating <= 3200) {
    clamp_ring_thickness = 30
    clamp_ring_press_screw_diameter = 20
  } else if (power_rating <= 6300) {
    clamp_ring_thickness = 40
    clamp_ring_press_screw_diameter = 32
  } else if (power_rating > 6300) {
    clamp_ring_thickness = 50
    clamp_ring_press_screw_diameter = 38
  }

  let clamp_ring_material = PERMAWOOD
  if (power_rating < 2000) {
    clamp_ring_material = PERMAWOOD
  } else {
    clamp_ring_material = MILD_STEEL
  }

  return {
    clamp_ring_thickness,
    clamp_ring_press_screw_diameter,
    clamp_ring_material,
  }
}
