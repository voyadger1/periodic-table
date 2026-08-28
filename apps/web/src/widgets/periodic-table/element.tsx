import type { TElement } from '@/widgets/periodic-table/model/types.ts';
import { cn } from '@/shared/lib/utils.ts';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react/effector-react.mjs';
import { $viewMode } from '@/widgets/periodic-table/model/store.ts';
import { VIEW_MODES } from './data/view-mode.ts';
import { useMemo } from 'react';

interface ElementProps {
  data: TElement;
  className?: string;
}

export const Element = ({ data, className }: ElementProps) => {
  const { t } = useTranslation();
  const [viewMode] = useUnit([$viewMode]);

  const dataPrint = useMemo(() => {
    if (viewMode === 'atom') {
      return data.electronegativity;
    }
    if (viewMode === 'bolling') {
      return data.boiling_temperature && `${data.boiling_temperature} °C`;
    }
    if (viewMode === 'density') {
      return data.density && `${data.density} g/l`;
    }
    if (viewMode === 'earth') {
      return data.abundance_in_earth_crust && `${data.abundance_in_earth_crust}%`;
    }
    if (viewMode === 'galaxy') {
      return data.abundance_in_universe && `${data.abundance_in_universe}%`;
    }
    if (viewMode === 'halflife') {
      return data['half-life_period'] && `${data['half-life_period']} ${data['half-life_symbol']}`;
    }
    if (viewMode === 'melting') {
      return data.melting_temperature && `${data.melting_temperature} °C`;
    }
    if (viewMode === 'radius') {
      return data.radius;
    }

    return data.weight;
  }, [viewMode]);

  return (
    <div
      className={cn(
        'w-full aspect-square p-0.5 pl-1 relative',
        'flex flex-col gap-0',
        'hover:opacity-90 cursor-pointer',
        'transition-all duration-300',
        className
      )}
      style={{ background: VIEW_MODES[viewMode].getColor(data) }}
    >
      <span className={'text-[22px] font-extrabold'}>{data.name}</span>
      <span className={'text-[10px]'}>{t(`elements.${data.id}.fullname`)}</span>
      <span className={'text-[10px] text-background'}>{dataPrint ?? 'N/A'}</span>

      <span className={'absolute top-1 right-2 text-[12px]'}>{data.id}</span>
    </div>
  );
};
