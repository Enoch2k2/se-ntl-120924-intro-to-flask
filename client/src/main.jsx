import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App.jsx';
import { GenresProvider } from './context/GenresContext.jsx';
import { GamesProvider } from './context/GamesContext.jsx';
import { UsersProvider } from './context/UsersContext.jsx';
import { UserGamesProvider } from './context/UserGamesContext.jsx';

const theme = createTheme({
  palette: {
    primary: {
      main: '#107c10',
    },
    secondary: {
      main: '#000000',
    },
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <UsersProvider>
        <GenresProvider>
          <GamesProvider>
            <UserGamesProvider>
              <App />
            </UserGamesProvider>
          </GamesProvider>
        </GenresProvider>
      </UsersProvider>
    </ThemeProvider>
  </StrictMode>,
);
