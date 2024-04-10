import MainContents from "./MainContents";
import Sidebar from "./Sidebar";

import Box from "@mui/material/Box";

type ContentsAreaProps = {
    name: string;
};

function ContentsArea({name}: ContentsAreaProps) {
    return (
        <>
            <Box sx={{ display: 'flex', width: 1 }}>
                <Box sx={{ flexGrow: 3 }}>
                    <MainContents name={name} />
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Sidebar />
                </Box>
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