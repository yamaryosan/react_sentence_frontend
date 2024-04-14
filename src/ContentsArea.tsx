import Sidebar from "./Sidebar";

import Box from "@mui/material/Box";

type ContentsAreaProps = {
    children: React.ReactNode;
};

export default function ContentsArea({children}: ContentsAreaProps) {
    return (
        <>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: {xs: 'column', md: 'row'},
                width: 1,
                pt: 5 }}>
                <Box sx={{ flexGrow: 3, mb: {xs: 2, md: 0 } }}>
                    {children}
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Sidebar />
                </Box>
            </Box>
        </>
    );
}