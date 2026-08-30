import { Drawer, DrawerContent, DrawerFooter } from '@/shared/ui/drawer.tsx';
import { useTranslation } from 'react-i18next';
import { useUnit } from 'effector-react';
import { $elementSelected } from '@/widgets/periodic-table/model/store.ts';

export interface AtomDetailProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AtomDetail = ({ open, onOpenChange }: AtomDetailProps) => {
  const { t } = useTranslation();
  const [elementSelected] = useUnit([$elementSelected]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={'w-full'}>
        <div className="w-full overflow-y-auto">
          {/*<DrawerHeader>*/}
          {/*  <DrawerTitle>Move Goal</DrawerTitle>*/}
          {/*  <DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
          {/*</DrawerHeader>*/}

          {elementSelected && (
            <div className={'w-full flex flex-row gap-10 px-4 relative'}>
              <span className={'absolute top-4 left-4 text-[18pt] font-extralight'}>
                {elementSelected.id}
              </span>
              <span className={'font-extrabold text-[120pt]'}>{elementSelected.name}</span>

              <div className={'flex flex-col gap-4'}>
                <span className={'text-[35pt]'}>
                  {t(`elements.${elementSelected.id}.fullname`)}
                </span>
                <span className={'text-[25pt] font-light text-foreground/60'}>
                  {elementSelected.weight}
                </span>
                <p>{t(`elements.${elementSelected.id}.description`)}</p>
              </div>
            </div>
          )}

          <DrawerFooter></DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
