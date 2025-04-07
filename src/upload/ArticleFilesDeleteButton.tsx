import { useState, useEffect } from "react";
import CommonButton from "@/component/Button";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined";
import CommonDeleteModal from "@/component/CommonDeleteModal";
import { Box } from "@mui/material";
import { fetchCategories } from "@/api/category";

type UploadResponse = {
    message: string;
};

type CategoryWithCount = {
    category: string;
    count: number;
};

/**
 * 記事ファイルをカテゴリーごとに削除する処理
 * @param categories 削除するカテゴリー
 * @returns 記事ファイルの削除結果
 */
async function fetchDeleteByCategory(categories: string[]) {
    const apiUrl = process.env.REACT_APP_API_URL;

    const response = await fetch(`${apiUrl}/api/articles/deleteByCategory`, {
        method: "DELETE",
        body: JSON.stringify({ categories }),
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const error = (await response.json()).message;
        throw new Error(error);
    }
    return (await response.json()) as UploadResponse;
}

/**
 * 記事ファイルをカテゴリーごとに削除するボタン
 */
export default function ArticleFilesDeleteButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [response, setResponse] = useState<UploadResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryWithCount[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    /**
     * 全削除ボタンを押したときの処理
     */
    const handleDeleteButton = () => {
        setIsModalOpen(true);
    };

    /**
     * モーダルを閉じたときの処理
     */
    const handleClose = () => {
        setIsModalOpen(false);
    };

    /**
     * カテゴリー一覧を取得する処理
     */
    const fetchAllCategories = async () => {
        const categories = await fetchCategories();
        setCategories(categories || []);
    };

    /**
     * カテゴリーのチェックボックスを選択したときの処理
     */
    const handleCategorySelect = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const categories = [...selectedCategories];

        if (event.target.checked) {
            categories.push(event.target.value);
        } else {
            categories.splice(categories.indexOf(event.target.value), 1);
        }
        setSelectedCategories(categories);
    };

    /**
     * 記事ファイルをカテゴリーごとに削除する処理
     */
    const handleDelete = async (categories: string[]) => {
        try {
            const response = await fetchDeleteByCategory(categories);
            setResponse(response);
            setIsModalOpen(false);
            setError(null);
            await fetchAllCategories(); // 削除直後にカテゴリー一覧を更新し、重複削除を防ぐ
        } catch (error) {
            setError(error as string);
        }
    };

    /**
     * 全選択ボタンを押したときの処理
     */
    const handleSelectAll = () => {
        setSelectedCategories(categories.map((category) => category.category));
        if (selectedCategories.length === categories.length) {
            setSelectedCategories([]);
        }
    };

    // 初めにカテゴリー一覧を取得する
    useEffect(() => {
        fetchAllCategories();
    }, []);

    return (
        <>
            <h3>カテゴリー別記事削除</h3>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid #e0e0e0",
                    padding: "1rem",
                    borderRadius: "0.5rem",
                }}
            >
                {categories.map((category) => (
                    <label
                        key={category.category}
                        style={{ marginBottom: "0.5rem" }}
                    >
                        <p
                            key={category.category}
                            style={{ fontSize: "1.5rem" }}
                        >
                            <input
                                type="checkbox"
                                value={category.category}
                                checked={selectedCategories.includes(
                                    category.category
                                )}
                                onChange={handleCategorySelect}
                            />
                            {category.category} ({category.count})
                        </p>
                    </label>
                ))}
                <CommonButton color="primary" onClick={handleSelectAll}>
                    全選択・全解除
                </CommonButton>
                <CommonButton color="error" onClick={handleDeleteButton}>
                    <DeleteOutlined />
                    記事削除
                </CommonButton>
                <CommonDeleteModal
                    open={isModalOpen}
                    handleClose={handleClose}
                    handleDelete={() => handleDelete(selectedCategories)}
                />
                {response && <p>{response.message}</p>}
                {error && <p>{error.toString()}</p>}
            </Box>
        </>
    );
}
