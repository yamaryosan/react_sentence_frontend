import NewArticles from './NewArticles';
import Box from '@mui/material/Box';

type MainContentsProps = {
    children: React.ReactNode;
};

function MainContents({children}: MainContentsProps) {
    return (
        <Box sx={{pl: {xs: 5, md: 25}}}>
            {children}
        </Box>
    );
}

function New() {
    return <MainContents children={<NewArticles />} />;
}

function Home() {
    return <MainContents children={<p>テスト</p>} />;
}

function Contact() {
    return <MainContents children={<p>テスト</p>} />;
}

export {New, Home, Contact};