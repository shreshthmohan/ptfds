const CIRCULAR = 'circular'
const LINEAR = 'linear'
const ONLINE = 'online' // TODO: on-load?
const tapping_switches = [CIRCULAR, LINEAR, ONLINE]

const OUTDOOR = 'outdoor'
const INDOOR = 'indoor'
const location = [OUTDOOR, INDOOR]

const COPPER = 'copper'
const ALUMINIUM = 'aluminium'
const winding_conductor_metals = [COPPER, ALUMINIUM] // TODO: Allow HT and LT conductor metals to be different?

const DELTA = 'delta'
const STAR = 'star'
const ZIGZAG = 'zigzag'
const connections = [DELTA, STAR, ZIGZAG] // TODO: zigzag?

const RECTANGULAR = 'rectangular'
const OVAL = 'oval'
const tank_shape = [RECTANGULAR, OVAL]

const SEALED = 'sealed'
const CONVENTIONAL = 'conventional'
const transformer_type = [SEALED, CONVENTIONAL]

const COARSE_FINE = 'coarse-fine' // TODO: Ask, coarse-fine vs linear on-load tap changer
// linear is already declared above
const online_tap_changer_type = [COARSE_FINE, LINEAR]

const PRESSED = 'pressed'
const ELLEPTICAL = 'elleptical'
const CORRUGATED = 'corrugated'
const radiator_type = [PRESSED, ELLEPTICAL, CORRUGATED]

const DOUBLE_PAPER_COVERING = 'double paper covering'
const TRIPLE_PAPER_COVERING = 'triple paper covering'
const SUPER_ENAMELLED = 'super enamelled'
const insulation_type = [
  DOUBLE_PAPER_COVERING,
  TRIPLE_PAPER_COVERING,
  SUPER_ENAMELLED,
]

const MILD_STEEL = 'mild steel' // TODO: Confirm MS = Mild Steel
const PERMAWOOD = 'permawood'
const FIBRE = 'fibre'

const clamp_ring_material = [MILD_STEEL, PERMAWOOD, FIBRE]

const SPIRAL = 'spiral'
const DISC = 'disc'
const CROSSOVER = 'crossover'
