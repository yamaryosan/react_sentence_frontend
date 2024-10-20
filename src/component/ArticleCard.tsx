import Box from "@mui/material/Box";
import {Link} from 'react-router-dom';
import Image from '@/component/Image';

type Article = {
    id: number;
    title: string;
    content: string;
    category: string;
    imagePaths: string[];
}

type ArticleCardProps = {
    article: Article;
}

/**
 * 記事のカードを表示するコンポーネント
 * @param article 記事
 */
export default function ArticleCard({article}: ArticleCardProps) {
    return (
        <Box key={article.id}
             sx={{
                padding: '0.5rem',
                border: '1.5px solid transparent',
                transition: 'border 0.2s, background-color 0.2s',
                marginY: '0.25rem',
                '&:hover': {
                    border: '1.5px solid gray',
                    bgcolor: 'secondary.light',
                }
             }}>
            <Link to={`/articles/${article.id}`}>
            <Box sx={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{article.title}</h1>
                <p style={{ fontSize: '1rem' }}>{article.category}</p>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Image imagePath={article.imagePaths[0]} />
                <p className='line-clamp-3'>{article.content}</p>
            </Box>
            </Link>
        </Box>
    )
}