import React, { useState } from "react";
import { ChangeEvent } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { fetchAdminAuth } from "@/api/admin";
import {
    SentimentSatisfiedAltOutlined,
    SentimentVeryDissatisfiedOutlined,
} from "@mui/icons-material";

type AdminInputFormProps = {
    setIsVerified: (isVerified: boolean) => void;
};

/**
 * 管理者画面用入力フォーム
 */
export default function AdminInputForm({ setIsVerified }: AdminInputFormProps) {
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    /**
     * パスワードの値を更新
     * @param e イベント
     */
    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    /**
     * フォームの送信
     * @param e イベント
     */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        const data = await fetchAdminAuth(password);
        if (data === undefined) {
            setError("エラーが発生しました");
            setLoading(false);
            return;
        }
        setIsVerified(data);
        setLoading(false);
        setSuccess(true);
        setPassword("");
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                }}
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <h2>管理者認証画面</h2>
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    name="password"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ alignSelf: "flex-end", width: "20%" }}
                >
                    {loading ? "送信中..." : "送信"}
                </Button>
                {error && (
                    <Typography
                        color="error"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <SentimentVeryDissatisfiedOutlined />
                        <span>{error}</span>
                    </Typography>
                )}
                {success && (
                    <Typography
                        color="primary"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                    >
                        <SentimentSatisfiedAltOutlined />
                        <span>送信完了</span>
                    </Typography>
                )}
            </Box>
        </>
    );
}
