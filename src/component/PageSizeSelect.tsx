import { Box, Select, MenuItem } from '@mui/material';

type props = {
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}

export default function PageSizeSelect({pageSize, setPageSize}: props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
            <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
            </Select>
            <span>件ずつ表示</span>
        </Box>
    );
}