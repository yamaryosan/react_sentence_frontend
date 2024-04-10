import MainContents from "./MainContents";
import Sidebar from "./Sidebar";

import Box from "@mui/material/Box";

type ContentsAreaProps = {
    name: string;
};

function ContentsArea({name}: ContentsAreaProps) {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <MainContents name={name} />
                <Sidebar />
            </Box>
        </>
    );
}

function Home() {
    return <ContentsArea name="Home" />;
}

function Recommendations() {
    return <ContentsArea name="Recommendations" />;
}

function New() {
    return <ContentsArea name="New" />;
}

function Contact() {
    return <ContentsArea name="Contact" />;
}

export {Home, Recommendations, New, Contact};