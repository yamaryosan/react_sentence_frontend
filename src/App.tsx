import '@/App.css';
import Footer from '@/Footer';
import Header from '@/header/Header';
import { Outlet } from 'react-router-dom';
import theme from '@/theme/index';

import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Outlet />
            <Footer />
        </ThemeProvider>
    </div>
  )
}

export default App;
