//  CALCULATES ID OF LT COILS
// PARAMETER KVA,NOMLTV,CDIA,CLRLTE,IDLT
// DO CASE
//   CASE CDIA<120
//     IDLT=0.5*INT((CDIA+2.00*CLRLTE)*2.00+1)
//   CASE CDIA>=120 .AND. CDIA<160
//     IDLT=0.5*INT((CDIA+2.00*CLRLTE)*2.00+1.5)
//   CASE CDIA>=160 .AND. CDIA<200
//     IDLT=0.5*INT((CDIA+2.00*CLRLTE)*2.00+2.5)
//   CASE CDIA>=200 .AND. CDIA<240
//     IDLT=0.5*INT((CDIA+2.0*CLRLTE)*2.00+3.5)
//   CASE CDIA>=240 .AND. CDIA<300
//     IDLT=0.5*INT((CDIA+2.0*CLRLTE)*2.00+4.5)
//   CASE CDIA>=300
//     IDLT=0.5*INT((CDIA+2.0*CLRLTE)*2.00+5.5)
// ENDCASE
// RETURN

const ltInnerDiameter = function ({
  power_rating, // kW
  ht_nominal_voltage, // V
  core_diameter, // mm
  lt_to_earth_clearance_oil, // mm
}) {
  let lt_inner_diameter
  if (core_diameter < 120) {
    lt_inner_diameter =
      0.5 * Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 1)
  } else if (core_diameter < 160) {
    lt_inner_diameter =
      0.5 *
      Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 1.5)
  } else if (core_diameter < 200) {
    lt_inner_diameter =
      0.5 *
      Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 2.5)
  } else if (core_diameter < 240) {
    lt_inner_diameter =
      0.5 *
      Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 3.5)
  } else if (core_diameter < 300) {
    lt_inner_diameter =
      0.5 *
      Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 4.5)
  } else {
    lt_inner_diameter =
      0.5 *
      Math.floor((core_diameter + 2 * lt_to_earth_clearance_oil) * 2 + 5.5)
  }
  return lt_inner_diameter
}
