import { useState } from 'react';
import { Box } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchWindow() {
    const [keyword, setKeyword] = useState<string>('');
    const navigate = useNavigate();

    // 値を更新
    const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    }

    // 値が空白でないことを確認して検索ページに遷移
    const handleSubmit = () => {
        if (keyword === '') {
            return;
        }
        navigate('/search/' + keyword)
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#f0f0f0'
        }}>
            <form action="/search" method="get">
                <input type="text" name="keyword" onChange={handleForm} />
                <input type="button" value="検索" onClick={handleSubmit} />
            </form>
        </Box>
    )
}