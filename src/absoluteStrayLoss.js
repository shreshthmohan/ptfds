// Convert percentage stray loss to percentage

const absoluteStrayLoss = function ({
  percentage_stray_loss_for_design, // %
  specified_copper_loss, // W
}) {
  // W
  const absolute_stray_loss =
    specified_copper_loss -
    specified_copper_loss / (1 + percentage_stray_loss_for_design / 100)

  return absoluteStrayLoss
}
