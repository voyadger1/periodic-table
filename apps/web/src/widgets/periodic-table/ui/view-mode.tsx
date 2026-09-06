import { cn } from '@/shared/lib/utils.ts';

import { useState } from 'react';
import { useUnit } from 'effector-react/effector-react.mjs';
import { $viewMode, setViewMode } from '@/widgets/periodic-table/model/store.ts';
import { VIEW_MODES } from '@/widgets/periodic-table/data/view-mode.ts';
import type { TViewMode } from '@/widgets/periodic-table/model/types.ts';

const ViewButton = ({ viewMode, onClick }: { viewMode: TViewMode; onClick: () => void }) => {
  return (
    <div
      onClick={() => {
        setViewMode(viewMode);
        onClick();
      }}
      className={cn(
        'aspect-square w-full h-full rounded-sm cursor-pointer',
        'bg-white/0 hover:bg-white/10',
        'flex flex-col justify-center items-center gap-2 w-full p-4',
        'text-white text-center font-light text-[10px]'
      )}
    >
      <img
        src={VIEW_MODES[viewMode].img}
        alt={VIEW_MODES[viewMode].title}
        className={'w-[50%] h-[50%] object-contain'}
      />
      {VIEW_MODES[viewMode].title}
    </div>
  );
};

export const ViewMode = () => {
  const [viewMode] = useUnit([$viewMode]);
  const [isOpen, setIsOpen] = useState(false);

  const handleViewModeSelect = () => {
    setIsOpen(false);
  };

  return (
    <div className={'h-full flex items-center'}>
      <div className={'aspect-square h-[70%] relative'}>
        <div
          onClick={() => setIsOpen(true)}
          className={cn(
            'aspect-square h-[130%] rounded-sm p-4 cursor-pointer z-1',
            'bg-white/5 hover:bg-white/10',
            'flex flex-col justify-center items-center gap-2',
            'text-[12px] text-center font-light'
          )}
        >
          <div
            className={
              'absolute top-0 left-0 w-full h-[130%] flex flex-col gap-1 items-center justify-center'
            }
          >
            <img
              src={VIEW_MODES[viewMode].img}
              alt={VIEW_MODES[viewMode].title}
              className={'w-[40%] h-[40%] object-contain'}
            />
            <span className={'text-[10px] w-full text-white/70'}>{VIEW_MODES[viewMode].title}</span>
          </div>
        </div>

        <div
          className={cn(
            'absolute top-[-100%] left-[-100%] w-[300%] h-[300%] z-[10]',
            'grid grid-cols-3 grid-rows-3',
            'pointer-events-none opacity-0 scale-70 bg-[#151515] rounded-sm',
            'transition-all duration-100',
            isOpen && 'pointer-events-auto scale-100 opacity-100'
          )}
        >
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'heatmaps'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'melting'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'bolling'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'atom'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'radius'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'halflife'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'density'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'earth'} />
          <ViewButton onClick={() => handleViewModeSelect()} viewMode={'galaxy'} />
        </div>
      </div>
    </div>
  );
};
