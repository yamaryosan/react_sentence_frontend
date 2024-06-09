import ArticleFilesUpload from "./ArticleFilesUpload";
import ImagesUpload from "./ImagesUpload";
import ArticlesIndexModal from "./ArticlesIndexModal";
import ArticleFilesDeleteModal from "./ArticleFilesDeleteModal";
import ImagesDeleteModal from "./ImagesDeleteModal";

export default function Upload() {
    return (
        <div>
            <ArticleFilesUpload />
            <ImagesUpload />
            <ArticlesIndexModal />
            <ArticleFilesDeleteModal />
            <ImagesDeleteModal />
        </div>
    )
};