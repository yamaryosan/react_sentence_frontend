import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
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
        navigate('/articles/search/' + keyword)
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: '#f0f0f0'
        }}>
            <form action="articles/search" method="get">
                <Box sx={{ display: 'none' }}>
                    <input type="text" name="dummy" />
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0'
                }}>
                    <TextField name="keyword" id="keyword" label="keyword" variant="outlined" onChange={handleForm} />
                    <Button type="button" variant="text" onClick={handleSubmit}>検索</Button>
                </Box>
            </form>
        </Box>
    )
}