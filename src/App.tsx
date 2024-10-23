import '@/App.css';
import Footer from '@/Footer';
import Header from '@/header/Header';
import { Outlet } from 'react-router-dom';
import theme from '@/theme/index';
import ArticleSearchWindow from '@/searchWindow/ArticleSearchWindow';
import DeviceTypeProvider from '@/hooks/DeviceTypeProvider';

import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <div className="App">
        <DeviceTypeProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <ArticleSearchWindow />
                <Outlet />
                <Footer />
            </ThemeProvider>
        </DeviceTypeProvider>
    </div>
    );
}

export default App;
