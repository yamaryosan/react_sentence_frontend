import MainContents from "./MainContents";
import Sidebar from "./Sidebar";

import Box from "@mui/material/Box";

function ContentsArea() {
    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: {xs: 'column', md: 'row'},
                width: 1 }}>
                <Box sx={{ flexGrow: 3, mb: {xs: 2, md: 0 } }}>
                    <MainContents />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Sidebar />
                </Box>
            </Box>
        </>
    );
}

function Home() {
    return <ContentsArea />;
}

function Recommendations() {
    return <ContentsArea />;
}

function New() {
    return <ContentsArea />;
}

function Contact() {
    return <ContentsArea />;
}

export {Home, Recommendations, New, Contact};