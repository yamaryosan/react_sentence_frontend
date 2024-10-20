import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchWindow from '@/searchWindow/SearchWindow';

export default function SentenceSearchWindow() {
    const [keyword, setKeyword] = useState('');
    const navigate = useNavigate();

    /**
     * 値が空白でないことを確認して検索ページに遷移
     */
    const handleSubmit = () => {
        if (keyword === '') {
            return;
        }
        navigate('/sentences/search/' + keyword);
    };

    return (
        <SearchWindow target="sentence" path="sentences/search" setKeyword={setKeyword} handleSubmit={handleSubmit} />
    )
}