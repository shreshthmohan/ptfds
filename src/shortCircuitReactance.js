// * TFXSC CALCULATES THE SHORT CIRCUIT REACTANCE OF THE T/F IN % AT 50 HZ.
// PARAMETER ID1,OD1,ID2,OD2,WHT,KVALEG,VLEG,TURNS,TAPMX,XSC,AKR1,AKQ
// * ID1     ID OF THE LT WINDING
// * OD1     OD OF THE LT WINDING
// * ID2     ID OF THE HT WINDING
// * OD2     OD OF THE HT WINDING
// * WHT     AVERAGE WINDING HEIGHT OF THE WINDINGS
// * KVALEG  PER LEG KVA OF THE T/F
// * VLEG    PER LEG VOLAGE OF THE WINDING WHOSE TURNS ARE FED
// * TURNS   TURNS OF THE WINDING WHOSE VLEG IS FED
// * TAPMX   MAX. TAPPING OF THE T/F IN %
// * XSC     CALCULATED SHORT CIRCUIT IMPEDANCE
// * AKR1    CONSTANT KR1
// * AKQ     CONSTANT AKQ
// *
// PI=3.14160
// D1=(ID1+OD1)/2.000
// D2=(ID2+OD2)/2.000
// D12=(OD1+ID2)/2.000
// DEL12=(ID2-OD1)/2.000
// B1=(OD1-ID1)/2.000
// B2=(OD2-ID2)/2.000
// SIGMAD=D12*DEL12+(B1*D1+B2*D2)/3.000
// E0=VLEG/TURNS
// TAU=B1+B2+DEL12
// U=WHT/TAU
// AKR1=1.0000-(1.0-EXP(-PI*U))/(PI*U)
// IF HVWIND='D'
//  AKQ=1+0.9*TAPMX*TAPMX*WHT/(20000.0*AKR1*B2)
// ELSE
//  AKQ=1.0
// ENDIF
// XSC=0.1238*KVALEG*AKR1*AKQ*SIGMAD/(E0*E0*WHT)
// RETURN
//

const DISC = 'disc'

const shortCircuitReactance = function ({
  lt_inner_diameter,
  lt_outer_diameter,
  ht_inner_diameter,
  ht_outer_diameter,
  ht_winding_type,
  average_winding_height, // average height of ht and lt windings
  power_rating_per_leg,
  voltage_per_leg, // of the winding whose turns are input
  turns,
  max_tapping,
}) {
  const lt_average_diameter = (lt_inner_diameter + lt_outer_diameter) / 2
  const ht_average_diameter = (ht_inner_diameter + ht_outer_diameter) / 2
  const lt_ht_middle = (lt_outer_diameter + ht_inner_diameter) / 2
  const delta_lt_ht = (ht_inner_diameter - lt_outer_diameter) / 2 // gap between ht and lt
  const lt_depth = (lt_outer_diameter - lt_inner_diameter) / 2
  const ht_depth = (ht_outer_diameter - ht_inner_diameter) / 2
  const sigma_d =
    (lt_ht_middle *
      delta_lt_ht *
      (lt_depth * lt_average_diameter + ht_depth * ht_average_diameter)) /
    3
  const voltage_per_turn = voltage_per_leg / turns
  const tau = lt_depth + ht_depth + delta_lt_ht
  const u = average_winding_height / tau
  const kr1 = 1 - (1 - Math.exp(-Math.PI * u)) / (Math.PI * u)
  if (ht_winding_type === DISC) {
    kq =
      1 +
      (0.9 * (max_tapping ^ 2) * average_winding_height) /
        (20000 * kr1 * ht_depth)
  } else {
    kq = 1
  }
  // Assuming frequency to be 50 Hz
  // TODO: confirm if for other frequencies this needs to simply be adjusted assuming that reactance is proportional to frequency
  const short_circuit_reactance =
    (0.1238 * power_rating_per_leg * kr1 * kq * sigma_d) /
    ((voltage_per_turn ^ 2) * average_winding_height)
  return {
    short_circuit_reactance,
    kr1,
    kq,
  }
}
