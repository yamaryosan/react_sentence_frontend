import AllArticles from "@/AllArticles";
import HomeContent from "@/home/HomeContent";
import AdminInputForm from "@/upload/AdminInputForm";
import Box from "@mui/material/Box";
import CategoryPage from "@/CategoryPage";

type MainContentsProps = {
    children: React.ReactNode;
};

function MainContents({ children }: MainContentsProps) {
    return <Box>{children}</Box>;
}

function All() {
    return <MainContents children={<AllArticles />} />;
}

function Home() {
    return <MainContents children={<HomeContent />} />;
}

function Contact() {
    return (
        <MainContents children={<AdminInputForm setIsVerified={() => {}} />} />
    );
}

function Category() {
    return <MainContents children={<CategoryPage />} />;
}

export { All, Home, Contact, Category };
