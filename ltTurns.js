const ALUMINIUM = 'aluminium'
const COPPER = 'copper'
const ltTurns = function ({
  power_rating,
  ht_nominal_voltage,
  ht_conductor_material,
  short_circuit_test,
  cost_factor,
  lt_voltage_per_leg,
  percentage_impedance,
}) {
  let cost_impedance_factor
  let x // Ampere^-1
  let lt_turns
  if (ht_conductor_material === ALUMINIUM) {
    cost_impedance_factor = cost_factor * Math.sqrt(percentage_impedance / 4.5)
    if (power_rating < 63) {
      if (cost_impedance_factor < 1.1) {
        x = 0.316
      } else if (cost_impedance_factor >= 1.1 && cost_impedance_factor < 1.4) {
        x = 0.308
      } else {
        x = 0.3
      }
      lt_turns = lt_voltage_per_leg / (x * Math.sqrt(power_rating))
      lt_turns = 2 * Math.floor(lt_turns / 2 + 0.5)
    } else if (power_rating < 100) {
      if (cost_impedance_factor < 1.1) {
        x = 0.34
      } else if (cost_impedance_factor >= 1.1 && cost_impedance_factor < 1.4) {
        x = 0.325
      } else {
        x = 0.315
      }
      lt_turns = Math.floor(
        lt_voltage_per_leg / x / Math.sqrt(power_rating) + 0.5
      )
      //  TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
    }
  }
}

// PARAMETER KVA,NOMHTV,SCTEST,LVLEG,CTYPE,COSTFACT,TURNLT
// DO CASE
//   CASE CTYPE='A'
//     FACT=COSTFACT*SQRT(Z/4.500)
//     IF KVA<63
//       IF FACT < 1.1
//         X=0.316
//       ELSE
//         IF FACT>= 1.1 .AND. FACT<1.4
//           X=0.308
//         ELSE
//           X=0.3
//         ENDIF
//       ENDIF
//       TURNLT=LVLEG/(X*SQRT(KVA))
//       TURNLT=2*INT(TURNLT/2.0+0.5)
//     ENDIF
//     IF KVA>=63 .AND. KVA<100
//       IF FACT<1.1
//         X=0.34
//       ELSE
//         IF FACT>= 1.1 .AND. FACT<1.4
//           X=0.325
//         ELSE
//           X=0.315
//         ENDIF
//       ENDIF
//       TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
//     ENDIF
//     IF KVA>= 100 .AND. KVA<200
//       IF FACT<1.1
//         X=0.35
//       ELSE
//         IF FACT>=1.1 .AND. FACT<1.4
//           X=0.33
//         ELSE
//           X=0.315
//         ENDIF
//       ENDIF
//       TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
//     ENDIF
//     IF KVA>=200
//       IF FACT<1.1
//         X=0.34
//       ELSE
//         IF FACT>=1.1 .AND. FACT<1.4
//           X=0.32
//         ELSE
//           X=0.305
//         ENDIF
//       ENDIF
//       TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
//     ENDIF
//   CASE CTYPE#'A' .AND. NOMHTV<13000
// * CU CONDUCTOR BELOW 13KV CLASS T/F.
//     IF KVA<=200
//       FACT=COSTFACT*SQRT(Z/4.5)
//       IF FACT<0.7
//         X=0.38
//       ELSE
//         IF FACT>=0.7 .AND. FACT<.9
//           X=0.36
//         ELSE
//           X=0.35
//         ENDIF
//       ENDIF
//     ENDIF
//     IF KVA>200 .AND. KVA<=500
//       FACT=COSTFACT*SQRT(Z/4.650)
//       IF FACT<0.7
//         X=0.39
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.37
//         ELSE
//           X=0.35
//         ENDIF
//       ENDIF
//     ENDIF
//     IF KVA>500
//       FACT=COSTFACT*SQRT(Z/5.000)
//       IF FACT<0.7
//         X=0.42
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.39
//         ELSE
//           X=0.37
//         ENDIF
//       ENDIF
//     ENDIF
//     TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
//     IF KVA>250 .AND. UPPER(SCTEST)='Y'
//       TURNLT=TURNLT-1
//     ENDIF
//   CASE NOMHTV>=13000
//     IF KVA<200
//       FACT=COSTFACT*SQRT(Z/4.75)
//       IF FACT<0.7
//         X=0.38
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.365
//         ELSE
//           X=0.347
//         ENDIF
//       ENDIF
//     ENDIF
//     IF KVA>=200 .AND. KVA<=500
//       FACT=COSTFACT*SQRT(Z/5.0)
//       IF FACT<0.7
//         X=0.42
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.38
//         ELSE
//           X=0.36
//         ENDIF
//       ENDIF
//     ENDIF
//     IF KVA>500 .AND. KVA<=1600
//       FACT=COSTFACT*SQRT(Z/5.5)
//       IF FACT<0.7
//         X=0.44
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.42
//         ELSE
//           X=0.395
//         ENDIF
//       ENDIF
//     ENDIF
//     IF KVA>1600 .AND. KVA<5000
//       FACT=COSTFACT*SQRT(Z/6.25)
//     ELSE
//       IF KVA>=5000
//         FACT=COSTFACT*SQRT(Z/7.5)
//       ENDIF
//     ENDIF
//     IF KVA>1600
//       IF FACT<0.7
//         X=0.44
//       ELSE
//         IF FACT>=0.7 .AND. FACT<0.9
//           X=0.42
//         ELSE
//           X=0.4
//         ENDIF
//       ENDIF
//     ENDIF
//     TURNLT=INT(LVLEG/X/SQRT(KVA)+0.5)
//     IF KVA>250 .AND. UPPER(SCTEST)='Y'
//       TURNLT=TURNLT-1
//     ENDIF
//   OTHERWISE
//     CLEAR
//     @ 10,10 SAY 'SOME THING WRONG ?'
//     WAIT
// ENDCASE
// IF CONNLT='Z'
//   TURNLT=TURNLT*2/SQRT(3.000)
// ENDIF
// RETURN
// 
