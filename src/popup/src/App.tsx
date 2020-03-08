import React, { Suspense } from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Store from 'store/GlobalStore';

const MainScreen = React.lazy(() =>
  import('./components/Cookies/List/MainScreen')
); // Lazy-loaded

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={null}>
        <Store>
          <MainScreen />
        </Store>
      </Suspense>
    </ThemeProvider>
  );
};

export default App;
