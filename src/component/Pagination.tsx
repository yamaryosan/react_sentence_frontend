import MuiPagination from '@mui/material/Pagination';
import { useContext } from 'react';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';

type PaginationProps = {
    total: number;
    pageSize: number;
    page: number;
    setPage: (page: number) => void;
}

export default function Pagination({total, pageSize, page, setPage}: PaginationProps) {
    const deviceType = useContext(DeviceTypeContext);
    return (
        <MuiPagination
            count={Math.ceil(total / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size={deviceType === 'desktop' ? 'large' : 'medium'}
            sx={{display: 'flex', justifyContent: 'center', paddingY: '1rem'}} />        
    );
}