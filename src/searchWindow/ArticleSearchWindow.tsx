import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined } from '@mui/icons-material';
import SearchWindow from '@/searchWindow/SearchWindow';

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
        <SearchWindow target="article" path="articles/search" setKeyword={setKeyword} handleSubmit={handleSubmit} />
    )
}