export type TPeriodicTable = Record<string, TElement>;

export type TElement = {
  id: number;
  name: string;
  exists_in_nature: boolean;
  weight: number;
  group: number | null;
  period: number;
  row: number;
  aggregation?: 'gas' | 'solid' | 'liquid' | null;
  type: 'metal' | 'semimetal' | 'nonmetal';
  series: TSeries;
  melting_temperature?: number | null;
  boiling_temperature?: number | null;
  density?: number | null;
  radius?: number | null;
  'half-life_period'?: number | null;
  'half-life_symbol'?: 'y' | 'm' | 'd' | 'h' | 's';
  abundance_in_earth_crust?: number | null;
  abundance_in_universe?: number | null;
  electronegativity?: number | null;
};

export type TSeries =
  | 'transition_metal'
  | 'post_transition_metal'
  | 'actinide'
  | 'halogen'
  | 'noble_gas'
  | 'alkali_metals'
  | 'alkaline_earth_metal'
  | 'semimetal'
  | 'lanthanide'
  | 'nonmetal';
