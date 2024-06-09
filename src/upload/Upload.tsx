import ArticleFilesUpload from "./ArticleFilesUpload";
import ImagesUpload from "./ImagesUpload";
import ArticlesIndex from "./ArticlesIndex";

export default function Upload() {
    return (
        <div>
            <ArticleFilesUpload />
            <ImagesUpload />
            <ArticlesIndex />
        </div>
    )
};