import ArticleFilesUpload from "./ArticleFilesUpload";
import ImagesUpload from "./ImagesUpload";
import ArticlesIndexModal from "./ArticlesIndexModal";

export default function Upload() {
    return (
        <div>
            <ArticleFilesUpload />
            <ImagesUpload />
            <ArticlesIndexModal />
        </div>
    )
};