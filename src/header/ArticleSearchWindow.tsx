import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ArticleSearchWindow() {
    const [keyword, setKeyword] = useState<string>('');
    const navigate = useNavigate();

    // 値が空白でないことを確認して検索ページに遷移
    const handleSubmit = () => {
        if (keyword === '') {
            return;
        }
        navigate('/articles/search/' + keyword)
    };

    return (
        <Box>
            <form action="articles/search" method="get">
                <Box sx={{ display: 'none' }}>
                    <input type="text" name="dummy" />
                </Box>
                <Box>
                    <TextField name="keyword" id="keyword" label="article" variant="outlined" onChange={(e) => setKeyword(e.target.value)} />
                    <Button type="button" variant="text" onClick={handleSubmit}>検索</Button>
                </Box>
            </form>
        </Box>
    )
}