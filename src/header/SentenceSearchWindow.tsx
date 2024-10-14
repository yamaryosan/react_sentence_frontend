import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

export default function SentenceSearchWindow() {
    const [keyword, setKeyword] = useState('');
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
        navigate('/sentences/search/' + keyword)
    };

    return (
        <Box>
            <form action="sentences/search" method="get">
                <Box sx={{ display: 'none' }}>
                    <input type="text" name="dummy" />
                </Box>
                <Box>
                    <TextField name="keyword" id="keyword" label="sentence" variant="outlined" onChange={handleForm} />
                    <Button type="button" variant="text" onClick={handleSubmit}>検索</Button>
                </Box>
            </form>
        </Box>
    )
}