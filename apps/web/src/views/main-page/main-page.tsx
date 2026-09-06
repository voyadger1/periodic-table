import { PeriodicTable } from '@/widgets/periodic-table';
import { Calculator } from '@/widgets/calculator/calculator.tsx';

export const MainPage = () => {
  return (
    <div className={'flex justify-center px-10 py-10'}>
      <div className={'flex flex-col w-full max-w-[1400px] items-center'}>
        <Calculator />

        <PeriodicTable />
      </div>
    </div>
  );
};
