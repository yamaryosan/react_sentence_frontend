import Box from "@mui/material/Box";

type Article = {
    id: number;
    title: string;
    content: string;
    created_at: string;
};

type Articles = Article[];

type ResultArticlesProps = {
    articles?: Articles;
};

export default function ResultArticles({articles}: ResultArticlesProps) {
    return (
        <Box sx={{
            textAlign: 'left',
            pl: {xs: 5, md: 25}
            }}>
                {articles?.length === 0 ? (
                    <div>記事が見つかりませんでした</div>
                ) : (
                    articles?.map((article) => (
                        <div key={article.id}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                            <p>{article.created_at}</p>
                        </div>
                    ))
                )}
        </Box>
    );
}