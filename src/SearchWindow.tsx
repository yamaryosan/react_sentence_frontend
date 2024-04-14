import { Box } from '@mui/material';

export default function SearchWindow() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#f0f0f0'
        }}>
            <form action="/search" method="get">
                <input type="text" name="q" />
                <input type="submit" value="検索" />
            </form>
        </Box>
    )
}