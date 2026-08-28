import { PeriodicTable } from '@/widgets/periodic-table';

export const MainPage = () => {
  return (
    <div className={'flex justify-center px-10 py-10'}>
      <div className={'flex flex-col w-full max-w-[1400px] items-center'}>
        <PeriodicTable />
      </div>
    </div>
  );
};
