import NewArticles from './NewArticles';
import HomeContent from './HomeContent';
import ContactForm from './ContactForm';
import Box from '@mui/material/Box';
import CategoryPage from './CategoryPage';

type MainContentsProps = {
    children: React.ReactNode;
};

function MainContents({children}: MainContentsProps) {
    return (
        <Box>
            {children}
        </Box>
    );
}

function New() {
    return <MainContents children={<NewArticles />} />;
}

function Home() {
    return <MainContents children={<HomeContent />} />;
}

function Contact() {
    return <MainContents children={<ContactForm />} />;
}

function Category() {
    return <MainContents children={<CategoryPage />} />;
}

export {New, Home, Contact, Category};