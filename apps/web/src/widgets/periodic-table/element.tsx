import type { TElement, TSeries } from '@/widgets/periodic-table/model/types.ts';
import { cn } from '@/shared/lib/utils.ts';
import { useTranslation } from 'react-i18next';

interface ElementProps {
  data: TElement;
  className?: string;
}

const COLORS_DEFAULT: Record<TSeries, string> = {
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

export const Element = ({ data, className }: ElementProps) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'w-full aspect-square p-0.5 pl-1 relative',
        'flex flex-col gap-0',
        'hover:opacity-90 cursor-pointer',
        'transition-all duration-300',
        className
      )}
      style={{ background: COLORS_DEFAULT[data.series] }}
    >
      <span className={'text-[22px] font-extrabold'}>{data.name}</span>
      <span className={'text-[10px]'}>{t(`elements.${data.id}.fullname`)}</span>
      <span className={'text-[10px] text-background'}>{data.weight}</span>

      <span className={'absolute top-1 right-2 text-[12px]'}>{data.id}</span>
    </div>
  );
};
