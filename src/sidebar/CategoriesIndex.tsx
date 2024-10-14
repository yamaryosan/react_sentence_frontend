import { List } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';

async function fetchCategories() {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/articles/categories`);

    if (!response.ok) {
        throw new Error('カテゴリの取得に失敗しました');
    }
    return await response.json() as string[];
}

export default function CategoriesIndex() {
    const { data: categories, isLoading, error } = useQuery<string[]>('categories', fetchCategories);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    return (
        <div>
            <h2>カテゴリー</h2>
            <ul>
                {categories?.map((category) => (
                    <Link to={`/categories/${category}`} key={category}>
                        <List key={category}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            transition: '0.3s',
                            ":hover": {
                                color: 'blue',
                                bgcolor: 'secondary.light',
                            }}}>
                            <span>・{category}</span>
                        </List>
                    </Link>
                ))}
            </ul>
        </div>
    )
}