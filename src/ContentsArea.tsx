import Sidebar from "@/sidebar/Sidebar";
import Box from "@mui/material/Box";

type ContentsAreaProps = {
    children: React.ReactNode;
};

export default function ContentsArea({children}: ContentsAreaProps) {
    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '70%', padding: '0.5rem' }}>
                    {children}
                </Box>
                <Box sx={{ width: '30%', padding: '0.5rem' }}>
                    <Sidebar />
                </Box>
            </Box>
        </>
    );
}