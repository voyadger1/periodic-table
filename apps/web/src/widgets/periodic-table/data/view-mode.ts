import type { TElement, TSeries, TViewMode } from '../model/types';
import AtomImg from '../ui/icons/icon-atom.png';
import BollingImg from '../ui/icons/icon-boiling.png';
import DensityImg from '../ui/icons/icon-density.png';
import EarthImg from '../ui/icons/icon-earth.png';
import GalaxyImg from '../ui/icons/icon-galaxy.png';
import HalflifeImg from '../ui/icons/icon-halflife.png';
import HeatmapsImg from '../ui/icons/icon-heatmaps.png';
import MeltingImg from '../ui/icons/icon-melting.png';
import RadiusImg from '../ui/icons/icon-radius.png';

export type TViewModeData = {
  img: string;
  title: string;
  getColor: (element: TElement) => string;
};

export const COLORS_DEFAULT: Record<TSeries, string> = {
  alkali_metals: 'rgb(208, 73, 73)',
  alkaline_earth_metal: 'rgb(218, 146, 17)',
  semimetal: 'rgb(102, 178, 201)',
  transition_metal: 'rgb(149, 176, 215)',
  post_transition_metal: 'rgb(127, 154, 217)',
  nonmetal: 'rgb(121, 173, 38)',
  noble_gas: 'rgb(232, 137, 213)',
  halogen: 'rgb(211, 144, 122)',
  lanthanide: 'rgb(110, 176, 157)',
  actinide: 'rgb(81, 122, 110)',
};

const colorInterpolation = (a: string, b: string, amount: number) => {
  let ah = parseInt(a.replace(/#/g, ''), 16),
    ar = ah >> 16,
    ag = (ah >> 8) & 0xff,
    ab = ah & 0xff,
    bh = parseInt(b.replace(/#/g, ''), 16),
    br = bh >> 16,
    bg = (bh >> 8) & 0xff,
    bb = bh & 0xff,
    rr = ar + amount * (br - ar),
    rg = ag + amount * (bg - ag),
    rb = ab + amount * (bb - ab);

  return '#' + (((1 << 24) + (rr << 16) + (rg << 8) + rb) | 0).toString(16).slice(1);
};

const colorInterpolationGradient = (colors: string[], amount: number) => {
  const segmentLength = 1 / (colors.length - 1);
  // @ts-ignore
  let segment = parseInt(amount / segmentLength);
  if (segment > colors.length - 2) {
    segment = colors.length - 2;
  }

  const min = segment * segmentLength;
  const max = (segment + 1) * segmentLength;
  amount = (amount - min) / (max - min);

  return colorInterpolation(colors[segment], colors[segment + 1], amount);
};

const colorDefault = '#626262';

export const VIEW_MODES: Record<TViewMode, TViewModeData> = {
  atom: {
    img: AtomImg,
    title: 'Электро-отрицательность',
    getColor: (element) => {
      if (!element['electronegativity']) {
        return colorDefault;
      }

      const min = 0.08;
      const max = 4;
      const amount = (element['electronegativity'] - min) / (max - min);
      return colorInterpolationGradient(['#5bd2e8', '#8700fc', '#e80aaa'], amount);
    },
  },
  bolling: {
    img: BollingImg,
    title: 'Температура кипения',
    getColor: (element) => {
      if (!element['boiling_temperature']) {
        return colorDefault;
      }

      const min = -260;
      const max = 5600;
      const amount = (element['boiling_temperature'] - min) / (max - min);
      return colorInterpolationGradient(
        ['#0fb8f5', '#d7b05f', '#dc9c17', '#f5ac0f', '#d37d6e', '#e14222'],
        amount
      );
    },
  },
  density: {
    img: DensityImg,
    title: 'Плотность',
    getColor: (element) => {
      if (!element['density']) {
        return colorDefault;
      }

      const min = 0.0899;
      const max = 23;
      const amount = (element['density'] - min) / (max - min);
      return colorInterpolationGradient(['#675c4c', '#64461b'], amount);
    },
  },
  earth: {
    img: EarthImg,
    title: 'Содержание в земной коре',
    getColor: (element) => {
      if (!element['abundance_in_earth_crust']) {
        return colorDefault;
      }

      const min = 0;
      const max = 50;
      const amount = (element['abundance_in_earth_crust'] - min) / (max - min);
      return colorInterpolationGradient(
        ['#939fa6', '#5b9ec7', '#3791c9', '#1e89cc', '#148bd7'],
        amount
      );
    },
  },
  galaxy: {
    img: GalaxyImg,
    title: 'Содержание во вселенной',
    getColor: (element) => {
      if (!element['abundance_in_universe']) {
        return colorDefault;
      }

      const min = 0;
      const max = 50;
      const amount = (element['abundance_in_universe'] - min) / (max - min);
      return colorInterpolationGradient(
        ['#939fa6', '#5b9ec7', '#3791c9', '#1e89cc', '#148bd7'],
        amount
      );
    },
  },
  halflife: {
    img: HalflifeImg,
    title: 'Период полураспада',
    getColor: (element) => {
      if (!element['half-life_period']) {
        return colorDefault;
      }

      const min = 4;
      const max = 210000;
      const amount = (element['half-life_period'] - min) / (max - min);
      return colorInterpolationGradient(['#dab31e', '#987c06'], amount);
    },
  },
  heatmaps: {
    img: HeatmapsImg,
    title: 'Нормальный режим',
    getColor: (element) => COLORS_DEFAULT[element.series],
  },
  melting: {
    img: MeltingImg,
    title: 'Температура плавления',
    getColor: (element) => {
      if (!element['melting_temperature']) {
        return colorDefault;
      }

      const min = -260;
      const max = 3500;
      const amount = (element['melting_temperature'] - min) / (max - min);
      return colorInterpolationGradient(
        ['#0fb8f5', '#d7b05f', '#dc9c17', '#f5ac0f', '#d37d6e', '#e14222'],
        amount
      );
    },
  },
  radius: {
    img: RadiusImg,
    title: 'Атомный радиус',
    getColor: (element) => {
      if (!element['radius']) {
        return colorDefault;
      }

      const min = 30;
      const max = 300;
      const amount = (element['radius'] - min) / (max - min);
      return colorInterpolationGradient(['#ecab7f', '#9f51bb', '#a90ae8'], amount);
    },
  },
};
