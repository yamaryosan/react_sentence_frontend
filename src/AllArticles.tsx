import {useState} from 'react';
import {useQuery} from 'react-query';
import Article from '@/Article';
import Box from '@mui/material/Box';
import MuiPagination from '@mui/material/Pagination';
import ArticleCard from '@/component/ArticleCard';
import {useEffect} from 'react';
import { fetchAllArticles } from '@/api/article';
import { ArticleOutlined } from '@mui/icons-material';
import PageSizeSelect from '@/component/PageSizeSelect';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
};

export default function AllArticles() {
    const {data: articles, isLoading, error} = useQuery<Article[] | undefined>('articles', fetchAllArticles);
    const [pageSize, setPageSize] = useState(10);
    /* ページネーション */
    const [page, setPage] = useState(1);

    /* ページネーションがクリックされたときに自動でページトップにスクロールする */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    const indexOfLast = page * pageSize;
    const indexOfFirst = indexOfLast - pageSize;
    const currentArticles = articles?.slice(indexOfFirst, indexOfLast);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <Box>
            {articles?.length === 0 && <p>記事がありません</p>}
            {articles && articles.length > 0 && (
            <>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <ArticleOutlined />
                <h2>記事一覧({articles?.length || 0}件)</h2>
                <PageSizeSelect pageSize={pageSize} setPageSize={setPageSize} />
            </Box>
            {currentArticles?.map((article) => (
                <ArticleCard key={article.id} article={article} />
            ))}
            <MuiPagination
            count={Math.ceil((articles?.length || 0) / pageSize)}
            page={page}
            onChange={(e, value) => setPage(value)}
            size='large'
            sx={{display: 'flex', justifyContent: 'center', paddingY: '1rem'}} />
            </>
            )}
        </Box>
    );
}
