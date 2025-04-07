import ArticleFilesUpload from "@/upload/ArticleFilesUpload";
import ImagesUpload from "@/upload/ImagesUpload";
import SentenceFileUpload from "@/upload/SentenceFileUpload";
import DeleteButtons from "@/upload/DeleteButtons";
import ArticleFilesDeleteButton from "@/upload/ArticleFilesDeleteButton";

/**
 * アップロードフォーム
 * @returns アップロードフォーム
 */
export default function UploadForm() {
    return (
        <>
            <ArticleFilesUpload />
            <ImagesUpload />
            <SentenceFileUpload />
            <DeleteButtons />
            <ArticleFilesDeleteButton />
        </>
    );
}
