import MuiPagination from '@mui/material/Pagination';
import { useContext } from 'react';
import DeviceTypeContext from '@/hooks/DeviceTypeContext';

type PaginationProps<T> = {
    items: T[];
    pageSize: number;
    page: number;
    setPage: (page: number) => void;
}

export default function Pagination<T>({items, pageSize, page, setPage}: PaginationProps<T>) {
    const deviceType = useContext(DeviceTypeContext);
    return (
        <MuiPagination
            count={Math.ceil((items?.length || 0) / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size={deviceType === 'desktop' ? 'large' : 'medium'}
            sx={{display: 'flex', justifyContent: 'center', paddingY: '1rem'}} />        
    );
}