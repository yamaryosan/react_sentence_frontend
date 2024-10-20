import '@/App.css';
import Footer from '@/Footer';
import Header from '@/header/Header';
import { Outlet } from 'react-router-dom';
import theme from '@/theme/index';
import SentenceVerificationProvider from '@/searchWindow/SentenceVerificationProvider';

import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <SentenceVerificationProvider />
            <Outlet />
            <Footer />
        </ThemeProvider>
    </div>
    );
}

export default App;
