import Article from "./Article";
import Box from '@mui/material/Box';

function MainContents() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            pl: {xs: 5, md: 25}}}>
            <Article id={1} />
        </Box>
    );
}

export default MainContents;