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
                px: {xs: 3, md: 5},
                pt: 5,
                fontSize: {xs: '1.2rem', md: '1rem'},
                }}>
                <Box sx={{ 
                    width: {xs: 1, md: 4/6},
                    px: {xs: 0, md: 3},
                    textAlign: 'left'
                    }}>
                    {children}
                </Box>
                <Box sx={{ 
                    width: {xs:1, md: 2/6} }}>
                    <Sidebar />
                </Box>
            </Box>
        </>
    );
}