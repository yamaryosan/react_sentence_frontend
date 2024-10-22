import '@/App.css';
import Footer from '@/Footer';
import Header from '@/header/Header';
import { Outlet } from 'react-router-dom';
import theme from '@/theme/index';
import ArticleSearchWindow from '@/searchWindow/ArticleSearchWindow';

import { CssBaseline, ThemeProvider } from '@mui/material';

function App() {
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <ArticleSearchWindow />
            <Outlet />
            <Footer />
        </ThemeProvider>
    </div>
    );
}

export default App;
