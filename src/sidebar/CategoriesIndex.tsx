import { useEffect } from 'react';
import { List } from '@mui/material';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchCategories } from '@/api/category';

export default function CategoriesIndex() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const { data: categories, isLoading, error } = useQuery<string[] | undefined>('categories', fetchCategories);

    if (isLoading) {
        return <div>読み込み中...</div>;
    }

    if (error) {
        return <div>エラーが発生しました</div>;
    }

    const handleClick = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div>
            {categories && categories.length > 0 && (
                <h3>カテゴリ一覧</h3>
            )}
            <ul>
                {categories?.map((category) => (
                    <Link to={`/categories/${category}`} key={category} onClick={handleClick}>
                        <List key={category}
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            transition: '0.3s',
                            paddingLeft: '0.5rem',
                            ":hover": {
                                color: 'blue',
                                bgcolor: 'secondary.light',
                            }}}>
                            <span>{category}</span>
                        </List>
                    </Link>
                ))}
            </ul>
        </div>
    )
}