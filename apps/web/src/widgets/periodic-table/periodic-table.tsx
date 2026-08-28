import PERIODIC_TABLE_DATA from './data/periodic-table.json';
import { type ReactNode, useEffect, useState } from 'react';
import type { TElement, TPeriodicTable } from '@/widgets/periodic-table/model/types.ts';
import { Element } from '@/widgets/periodic-table/element.tsx';
import { cn } from '@/shared/lib/utils.ts';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter } from '@/shared/ui/drawer.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { Minus, Plus } from 'lucide-react';
import { useUnit } from 'effector-react';
import {
  $elementHover,
  $elementSelected,
  setElementHover,
  setElementSelected,
} from './model/store.ts';
import { useTranslation } from 'react-i18next';

const NumberElement = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        'flex-1 flex items-center justify-center text-[12px] font-light text-foreground/60',
        className
      )}
    >
      {children}
    </div>
  );
};

export const PeriodicTable = () => {
  const { t } = useTranslation();
  const [elementHover, elementSelected] = useUnit([$elementHover, $elementSelected]);
  const DATA: TPeriodicTable = PERIODIC_TABLE_DATA as TPeriodicTable;
  const [openDetails, setOpenDetails] = useState(false);

  const ElementBox = ({ data, className }: { data: TElement; className?: string }) => {
    return (
      <div
        className={cn('w-[calc(100%/18)] aspect-square overflow-hidden', className)}
        onClick={() => {
          setElementSelected(data);
          setOpenDetails(true);
        }}
        onMouseEnter={() => setElementHover(data)}
      >
        <Element data={data} />
      </div>
    );
  };

  useEffect(() => {
    setElementHover(DATA['1']);
    console.log('PERIODIC_TABLE_DATA: ', DATA['10'].name);
  }, []);

  return (
    <>
      <div
        className={cn(
          'w-full flex flex-col gap-0 pl-4 pt-4 relative',
          'transition-all duration-300',
          openDetails && 'scale-95'
        )}
      >
        <div className={cn('absolute top-[13%] left-[14%] w-[49%] h-[15%]', 'flex flex-row gap-4')}>
          {elementHover && (
            <>
              <div className={'aspect-square rounded-md overflow-hidden h-full'}>
                <Element data={elementHover} />
              </div>

              <div className={'flex flex-col gap-0.5 w-[46%] text-[11px]'}>
                <div className={'flex flex-row'}>
                  <span className={'flex-1'}>Благородный газ</span>
                </div>
                <div className={'flex flex-row'}>
                  <span className={'flex-1'}>Атомный вес</span>
                  <span>{elementHover.weight}</span>
                </div>
                <div className={'flex flex-row'}>
                  <span className={'flex-1'}>Температура плавления</span>
                  <span>{elementHover.melting_temperature}</span>
                </div>
                <div className={'flex flex-row'}>
                  <span className={'flex-1'}>Температура кипения</span>
                  <span>{elementHover.boiling_temperature}</span>
                </div>
                <div className={'flex flex-row'}>
                  <span className={'flex-1'}>Плотность</span>
                  <span>{elementHover.density}u/</span>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Числа слева */}
        <div className={cn('absolute top-0 left-0 w-4 h-full pt-4', 'flex flex-col gap-0')}>
          <NumberElement>1</NumberElement>
          <NumberElement>2</NumberElement>
          <NumberElement>3</NumberElement>
          <NumberElement>4</NumberElement>
          <NumberElement>5</NumberElement>
          <NumberElement>6</NumberElement>
          <NumberElement>7</NumberElement>
          <div className={'h-4'} />
          <NumberElement>6</NumberElement>
          <NumberElement>7</NumberElement>
        </div>
        {/* Числа сверху */}
        <div className={cn('absolute top-0 left-0 w-full h-4 pl-4', 'flex flex-row gap-0')}>
          <NumberElement>1</NumberElement>
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <div className={'flex-1'} />
          <NumberElement>18</NumberElement>
        </div>
        {/* Элементы */}
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['1']} className={'rounded-t-sm'} />
          <div className={'flex-1 h-full relative'}>
            <div className={'absolute bottom-0 left-0 w-full flex flex-row'}>
              <NumberElement>2</NumberElement>
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <div className={'flex-1'} />
              <NumberElement>13</NumberElement>
              <NumberElement>14</NumberElement>
              <NumberElement>15</NumberElement>
              <NumberElement>16</NumberElement>
              <NumberElement>17</NumberElement>
            </div>
          </div>
          <ElementBox data={DATA['2']} className={'rounded-t-sm'} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['3']} />
          <ElementBox data={DATA['4']} className={'rounded-tr-sm'} />

          <div className={'flex-1'} />

          <ElementBox data={DATA['5']} className={'rounded-tl-sm'} />
          <ElementBox data={DATA['6']} />
          <ElementBox data={DATA['7']} />
          <ElementBox data={DATA['8']} />
          <ElementBox data={DATA['9']} />
          <ElementBox data={DATA['10']} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['11']} />
          <ElementBox data={DATA['12']} />

          <div className={'flex-1 h-full relative'}>
            <div className={'absolute bottom-0 left-0 w-full flex flex-row'}>
              <NumberElement>3</NumberElement>
              <NumberElement>4</NumberElement>
              <NumberElement>5</NumberElement>
              <NumberElement>6</NumberElement>
              <NumberElement>7</NumberElement>
              <NumberElement>8</NumberElement>
              <NumberElement>9</NumberElement>
              <NumberElement>10</NumberElement>
              <NumberElement>11</NumberElement>
              <NumberElement>12</NumberElement>
            </div>
          </div>

          <ElementBox data={DATA['13']} />
          <ElementBox data={DATA['14']} />
          <ElementBox data={DATA['15']} />
          <ElementBox data={DATA['16']} />
          <ElementBox data={DATA['17']} />
          <ElementBox data={DATA['18']} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['19']} />
          <ElementBox data={DATA['20']} />
          <ElementBox data={DATA['21']} />
          <ElementBox data={DATA['22']} />
          <ElementBox data={DATA['23']} />
          <ElementBox data={DATA['24']} />
          <ElementBox data={DATA['25']} />
          <ElementBox data={DATA['26']} />
          <ElementBox data={DATA['27']} />
          <ElementBox data={DATA['28']} />
          <ElementBox data={DATA['29']} />
          <ElementBox data={DATA['30']} />
          <ElementBox data={DATA['31']} />
          <ElementBox data={DATA['32']} />
          <ElementBox data={DATA['33']} />
          <ElementBox data={DATA['34']} />
          <ElementBox data={DATA['35']} />
          <ElementBox data={DATA['36']} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['37']} />
          <ElementBox data={DATA['38']} />
          <ElementBox data={DATA['39']} />
          <ElementBox data={DATA['40']} />
          <ElementBox data={DATA['41']} />
          <ElementBox data={DATA['42']} />
          <ElementBox data={DATA['43']} />
          <ElementBox data={DATA['44']} />
          <ElementBox data={DATA['45']} />
          <ElementBox data={DATA['46']} />
          <ElementBox data={DATA['47']} />
          <ElementBox data={DATA['48']} />
          <ElementBox data={DATA['49']} />
          <ElementBox data={DATA['50']} />
          <ElementBox data={DATA['51']} />
          <ElementBox data={DATA['52']} />
          <ElementBox data={DATA['53']} />
          <ElementBox data={DATA['54']} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['55']} />
          <ElementBox data={DATA['56']} />
          <ElementBox data={DATA['57']} />
          <ElementBox data={DATA['72']} />
          <ElementBox data={DATA['73']} />
          <ElementBox data={DATA['74']} />
          <ElementBox data={DATA['75']} />
          <ElementBox data={DATA['76']} />
          <ElementBox data={DATA['77']} />
          <ElementBox data={DATA['78']} />
          <ElementBox data={DATA['79']} />
          <ElementBox data={DATA['80']} />
          <ElementBox data={DATA['81']} />
          <ElementBox data={DATA['82']} />
          <ElementBox data={DATA['83']} />
          <ElementBox data={DATA['84']} />
          <ElementBox data={DATA['85']} />
          <ElementBox data={DATA['86']} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['87']} className={'rounded-bl-sm'} />
          <ElementBox data={DATA['88']} />
          <ElementBox data={DATA['89']} />
          <ElementBox data={DATA['104']} />
          <ElementBox data={DATA['105']} />
          <ElementBox data={DATA['106']} />
          <ElementBox data={DATA['107']} />
          <ElementBox data={DATA['108']} />
          <ElementBox data={DATA['109']} />
          <ElementBox data={DATA['110']} />
          <ElementBox data={DATA['111']} />
          <ElementBox data={DATA['112']} />
          <ElementBox data={DATA['113']} />
          <ElementBox data={DATA['114']} />
          <ElementBox data={DATA['115']} />
          <ElementBox data={DATA['116']} />
          <ElementBox data={DATA['117']} />
          <ElementBox data={DATA['118']} className={'rounded-br-sm'} />
        </div>
        <div className={'h-4'} />
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['57']} className={'rounded-tl-sm'} />
          <ElementBox data={DATA['58']} />
          <ElementBox data={DATA['59']} />
          <ElementBox data={DATA['60']} />
          <ElementBox data={DATA['61']} />
          <ElementBox data={DATA['62']} />
          <ElementBox data={DATA['63']} />
          <ElementBox data={DATA['64']} />
          <ElementBox data={DATA['65']} />
          <ElementBox data={DATA['66']} />
          <ElementBox data={DATA['67']} />
          <ElementBox data={DATA['68']} />
          <ElementBox data={DATA['69']} />
          <ElementBox data={DATA['70']} />
          <ElementBox data={DATA['71']} className={'rounded-tr-sm'} />
        </div>
        <div className={'flex flex-row gap-0'}>
          <ElementBox data={DATA['89']} className={'rounded-bl-sm'} />
          <ElementBox data={DATA['90']} />
          <ElementBox data={DATA['91']} />
          <ElementBox data={DATA['92']} />
          <ElementBox data={DATA['93']} />
          <ElementBox data={DATA['94']} />
          <ElementBox data={DATA['95']} />
          <ElementBox data={DATA['96']} />
          <ElementBox data={DATA['97']} />
          <ElementBox data={DATA['98']} />
          <ElementBox data={DATA['99']} />
          <ElementBox data={DATA['100']} />
          <ElementBox data={DATA['101']} />
          <ElementBox data={DATA['102']} />
          <ElementBox data={DATA['103']} className={'rounded-br-sm'} />
        </div>
      </div>

      <Drawer open={openDetails} onOpenChange={setOpenDetails}>
        <DrawerContent className={'w-full'}>
          <div className="w-full overflow-y-auto">
            {/*<DrawerHeader>*/}
            {/*  <DrawerTitle>Move Goal</DrawerTitle>*/}
            {/*  <DrawerDescription>Set your daily activity goal.</DrawerDescription>*/}
            {/*</DrawerHeader>*/}

            {elementSelected && (
              <div className={'w-full flex flex-col px-4 relative'}>
                <span className={'absolute top-4 left-4 text-[18pt] font-extralight'}>
                  {elementSelected.id}
                </span>

                <span className={'font-extrabold text-[120pt]'}>{elementSelected.name}</span>
                <span className={'text-[35pt]'}>
                  {t(`elements.${elementSelected.id}.fullname`)}
                </span>
                <span className={'text-[25pt] font-light text-foreground/60'}>
                  {elementSelected.weight}
                </span>

                <p>{t(`elements.${elementSelected.id}.description`)}</p>
              </div>
            )}

            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {}}
                  // disabled={goal <= 200}
                >
                  <Minus />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">{10}</div>
                  <div className="text-[0.70rem] text-muted-foreground uppercase">Calories/day</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => {}}
                  // disabled={goal >= 400}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
            </div>
            <DrawerFooter>
              <Button>Submit</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
