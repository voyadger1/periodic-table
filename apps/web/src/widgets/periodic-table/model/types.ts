export type TPeriodicTable = Record<string, TElement>;

export type TElement = {
  id: number;
  name: string;
  exists_in_nature: boolean;
  weight: number;
  group: number;
  period: number;
  row: number;
  aggregation?: 'gas' | 'solid' | 'liquid' | null;
  type: 'metal' | 'semimetal' | 'nonmetal';
  series: TSeries;
  melting_temperature?: number;
  boiling_temperature?: number;
  density?: number;
  radius?: number;
  'half-life_period'?: number;
  'half-life_symbol'?: 'y' | 'm' | 'd' | 'h' | 's';
  abundance_in_earth_crust?: number;
  abundance_in_universe?: number;
  electronegativity?: number;
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
