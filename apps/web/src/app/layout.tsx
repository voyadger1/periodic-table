import { App } from '@/app/app.tsx';
import { ThemeProvider } from '@/shared/ui/theme-provider.tsx';

export const Layout = () => {
  return (
    <>
      <ThemeProvider defaultTheme={'dark'}>
        <App />
      </ThemeProvider>
    </>
  );
};
