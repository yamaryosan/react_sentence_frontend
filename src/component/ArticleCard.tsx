import Box from "@mui/material/Box";
import {Link} from 'react-router-dom';
import Image from '@/component/Image';

type ArticleCardProps = {
    article: {
        id: number;
        title: string;
        content: string;
        imagePaths: string[];
    }
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
            <h1 style={{
                    paddingTop: '0.5rem',
                    paddingLeft: '1rem',
                    paddingRight: '1rem',
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                }}>{article.title}
            </h1>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <Image imagePath={article.imagePaths[0]} />
                <p className='line-clamp-3'>{article.content}</p>
            </Box>
            </Link>
        </Box>
    )
}