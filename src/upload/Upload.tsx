import ArticleFilesUpload from "./ArticleFilesUpload";
import ImagesUpload from "./ImagesUpload";
import SentenceFileUpload from "./SentenceFileUpload";
import ArticlesIndexModal from "./ArticlesIndexModal";
import ArticleFilesDeleteModal from "./ArticleFilesDeleteModal";
import ImagesDeleteModal from "./ImagesDeleteModal";
import SentenceFileDeleteModal from "./SentenceFileDeleteModal";

export default function Upload() {
    return (
        <div>
            <ArticleFilesUpload />
            <ImagesUpload />
            <SentenceFileUpload />
            <ArticlesIndexModal />
            <ArticleFilesDeleteModal />
            <ImagesDeleteModal />
            <SentenceFileDeleteModal />
        </div>
    )
};