import ArticleFilesUpload from "@/upload/ArticleFilesUpload";
import ImagesUpload from "@/upload/ImagesUpload";
import SentenceFileUpload from "@/upload/SentenceFileUpload";
import ArticlesIndexModal from "@/upload/ArticlesIndexModal";
import ArticleFilesDeleteModal from "@/upload/ArticleFilesDeleteModal";
import ImagesDeleteModal from "@/upload/ImagesDeleteModal";
import SentenceFileDeleteModal from "@/upload/SentenceFileDeleteModal";

export default function UploadForm() {
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