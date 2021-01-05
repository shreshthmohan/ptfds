import { COPPER, ALUMINIUM } from './specificationOptions'

// const COPPER = 'copper'
// const ALUMINIUM = 'aluminium'

const ltKraftPaperThickness = function (
  minimum_lt_conductor_area, // mm² TODO: confirm?
  lt_winding_conductor // conductor metal
) {
  let lt_kraft_paper_thickness
  // Kraft paper thickness in mm

  if (lt_winding_conductor === ALUMINIUM) {
    if (minimum_lt_conductor_area <= 90) {
      lt_kraft_paper_thickness = 5
    } else if (minimum_lt_conductor_area <= 400) {
      lt_kraft_paper_thickness = 7
    } else {
      lt_kraft_paper_thickness = 8
      // TODO: Ask what's the limit
    }
  } else if (lt_winding_conductor === COPPER) {
    if (minimum_lt_conductor_area <= 50) {
      lt_kraft_paper_thickness = 5
    } else if (minimum_lt_conductor_area <= 300) {
      lt_kraft_paper_thickness = 7
    } else {
      lt_kraft_paper_thickness = 8
      // TODO: Ask what's the limit
    }
  } else {
    throw 'Invalid LT winding conductor material'
  }

  return lt_kraft_paper_thickness
}

// console.log(ltKraftPaperThickness(85, 'copper'))

export default ltKraftPaperThickness
