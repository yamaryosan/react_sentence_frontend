import { Box, Select, MenuItem } from '@mui/material';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';
import { useContext } from 'react';

type props = {
    pageSize: number;
    setPageSize: (pageSize: number) => void;
}

export default function PageSizeSelect({pageSize, setPageSize}: props) {
    const deviceType = useContext(DeviceTypeContext);

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: deviceType === 'desktop' ? '1.2rem' : '1rem' }}>
            <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
            </Select>
            <span>件ずつ表示</span>
        </Box>
    );
}