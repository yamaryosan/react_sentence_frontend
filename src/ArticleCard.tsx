import Box from "@mui/material/Box";
import {Link} from 'react-router-dom';

type ArticleCardProps = {
    article: {
        id: number;
        title: string;
        content: string;
        imagePaths: string[];
    }
}

export default function ArticleCard({article}: ArticleCardProps) {
    return (
        <Box key={article.id}
        className=" bg-white pd-2 border border-transparent hover:border hover:border-blue-600 transition duration-2 mb-2">
            <Link to={`/articles/${article.id}`}>
                <div className="flex justify-center items-center h-[200px] overflow-hidden">
                <img src={article.imagePaths[0]} alt="thumbnail" className="max-h-full max-w-full object-contain"/>
                </div>
                <h1 className="pt-2 px-4 text-center xs:text-xl md:text-2xl">{article.title}</h1>
                <p className="px-4 text-lg xs:line-clamp-3 sm:line-clamp-5 md:line-clamp-6">{article.content}</p>
            </Link>
        </Box>
    )

}