import ArticleFilesUpload from "@/upload/ArticleFilesUpload";
import ImagesUpload from "@/upload/ImagesUpload";
import SentenceFileUpload from "@/upload/SentenceFileUpload";
import DeleteButtons from "@/upload/DeleteButtons";
import IndexButton from "@/upload/IndexButton";

export default function UploadForm() {
    return (
        <>
            <ArticleFilesUpload />
            <ImagesUpload />
            <SentenceFileUpload />
            <DeleteButtons />
            <IndexButton />
        </>
    )
};