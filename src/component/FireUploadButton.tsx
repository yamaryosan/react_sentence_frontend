import CommonButton from "@/component/Button";

type FireUploadButtonProps = {
    accept: string;
    id: string;
    multiple: boolean;
    directory: boolean;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleButtonClick: () => void;
}

export default function FireUploadButton({accept, id, multiple, directory, handleFileChange, handleButtonClick}: FireUploadButtonProps) {
    return (
        <>
            <input
                accept={accept}
                style={{ display: 'none' }}
                id={id}
                type="file"
                /* @ts-expect-error */
                directory={directory.toString()}
                webkitdirectory={directory.toString()}
                multiple={multiple}
                onChange={handleFileChange}/>
            <label htmlFor={id}>
                <CommonButton color="primary" onClick={handleButtonClick}>
                    ファイルを選択
                </CommonButton>
            </label>
        </>
    );
}