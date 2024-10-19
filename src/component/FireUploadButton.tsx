import CommonButton from "@/component/Button";

type FireUploadButtonProps = {
    accept: string;
    id: string;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: () => void;
}

export default function FireUploadButton({accept, id, handleFileChange, handleButtonClick}: FireUploadButtonProps) {
    return (
        <>
            <input
                accept={accept}
                style={{ display: 'none' }}
                id={id}
                type="file"
                /* @ts-expect-error */
                directory="true"
                webkitdirectory="true"
                multiple
                onChange={handleFileChange}/>
            <label htmlFor={id}>
                <CommonButton color="primary" onClick={handleButtonClick}>
                    ファイルを選択
                </CommonButton>
            </label>
        </>
    );
}