// * CALCULATES THE I**2*R LOSS AND WT. OF WARE COND.OF A WINDING
// PARAMETER DM,CAREA,TURNS,CTYPE,CURR,IRLOSS,CWT
// * DM     MEAN DIA. OF THE WINDING
// * CAREA  CROSS SECTION AREA OF THE CONDUCTOR
// * TURNS  NO. OF TURNS
// * CTYPE  TYPE COND. MATERIAL ,I.E.,AL/CU (A/C) SINGLE CHARACTER STRING
// * CURR   CURRENT IN THE WINDING
// * IRLOSS I**2*R LOSS IN THE WINDING
// * CWT    WEIGHT OF THE WARE CONDUCTOR OF THE WINDING
// *
// FACLOSS=2.36
// DEN=8.9
// IF CTYPE='A'
//   DEN=2.703
//   FACLOSS=12.664
// ENDIF
// PI=3.14
// IF KVA<= 100
//   X=500
// ELSE
//   X=600
// ENDIF
// CWT=DEN*CAREA*(DM*PI*TURNS+X)*0.000001
// DJ=CURR/CAREA
// IRLOSS=FACLOSS*CWT*DJ*DJ
// RETURN

const COPPER = 'copper'
const ALUMINIUM = 'aluminium'

const resistiveLoss = function ({
  power_rating,
  winding_mean_diameter, // mm
  conductor_area, // cross-sectional, mm²
  turns,
  conductor_material, // copper or aluminium
  current, // in the winding, A
}) {
  // TODO: Error generation
  let loss_factor = 2.36
  let density = 8.9 // g/cm³
  if (conductor_material === ALUMINIUM) {
    density = 2.703
    loss_factor = 12.664
  }
  let extra_conductor_length // mm, for termination / connection
  if (power_rating <= 100) {
    extra_conductor_length = 500
  } else {
    extra_conductor_length = 600
  }
  const core_weight =
    (density *
      conductor_area *
      (winding_mean_diameter * Math.PI * turns + extra_conductor_length)) /
    0.000001
  const current_density = current / conductor_area
  const resistive_loss = loss_factor * core_weight * (current_density ^ 2)
  return {
    resistive_loss,
    core_weight,
  }
}
