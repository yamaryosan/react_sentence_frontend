import Sidebar from "./sidebar/Sidebar";

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
                px: 5,
                pt: 5,
                pb: 5,
                fontSize: {xs: '1.2rem', md: '1rem'},
                }}>
                <Box sx={{ 
                    width: {xs: 1, md: 5/6},
                    textAlign: 'left',
                    pr: {xs: 0, md: 5},
                    mr: {xs: 0, md: 5},
                    backgroundColor: 'whitesmoke',
                    }}>
                        <Box sx={{p: 2}}>{children}</Box>
                </Box>
                <Box sx={{ 
                    width: {xs:1, md: 1/6} }}>
                    <Sidebar />
                </Box>
            </Box>
        </>
    );
}