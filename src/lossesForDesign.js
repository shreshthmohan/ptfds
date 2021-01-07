const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

const lossesForDesign = function ({
  power_rating,
  specified_copper_loss,
  ht_conductor_material,
  ht_nominal_voltage,
}) {
  // TODO: error generation

  let i2r_loss_for_design // W
  let stray_loss_for_design // %

  if (power_rating <= 100) {
    i2r_loss_for_design = specified_copper_loss - power_rating
    stray_loss_for_design = (100 * power_rating) / specified_copper_loss
    if (ht_conductor_material === ALUMINIUM) {
      stray_loss_for_design *= 1.3
      i2r_loss_for_design = specified_copper_loss - 1.3 * power_rating
    }
  } else if (power_rating <= 250) {
    stray_loss_for_design = 8
    if (ht_conductor_material === ALUMINIUM) {
      stray_loss_for_design = 10
      if (power_rating < 200) {
        stray_loss_for_design = 9
      }
    }
    i2r_loss_for_design =
      specified_copper_loss / (1 + stray_loss_for_design / 100)
  } else if (power_rating <= 325) {
    stray_loss_for_design = 10
    if (ht_conductor_material === ALUMINIUM) {
      stray_loss_for_design = 12
    }
    i2r_loss_for_design =
      specified_copper_loss / (1 + stray_loss_for_design / 100)
  } else if (power_rating <= 500) {
    i2r_loss_for_design = specified_copper_loss / 1.15
    stray_loss_for_design = 14
  } else if (power_rating <= 725) {
    i2r_loss_for_design = specified_copper_loss / 1.15
    stray_loss_for_design = 15
  } else if (power_rating < 1000) {
    i2r_loss_for_design = specified_copper_loss / 1.18
    stray_loss_for_design = 18
  } else {
    // power_rating >= 1000
    if (ht_nominal_voltage < 1100) {
      i2r_loss_for_design = specified_copper_loss / 1.2
      stray_loss_for_design = 20
    } else {
      i2r_loss_for_design = specified_copper_loss / 1.1
      stray_loss_for_design = 0
    }
  }
  return { i2r_loss_for_design, stray_loss_for_design }
}
