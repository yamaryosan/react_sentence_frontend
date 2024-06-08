import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// フォームの値の型
type Form = {
    name: string,
    email: string,
    message: string,
};

// フォームからの返り値の型
type Response = Promise<{
    secret: string,
}>;

// フォーム送信時の処理
const fetchContact = async (form: Form) => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const response = await fetch(`${apiUrl}/api/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
    });

    if (!response.ok) {
        throw new Error('送信に失敗しました');
    }
    return await response.json() as Response;
}

export default function ContactForm() {
    const [form, setForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();

    // フォームの値を更新
    const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    // フォームの送信
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        const data = fetchContact(form);
        // データに秘密の文字列が含まれていたら記事投稿ページに遷移
        data.then((res) => {
            if (res.secret) {
                navigate('/upload');
            }
        }).catch((err) => {
            setError(err.message);
        });
        setLoading(false);
        setSuccess(true);
    }

    return (
        <Container>
            <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                mt: 4,
                p: 3,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f9f9f9',
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#3f51b5' }}>
                お問い合わせはこちら
            </Typography>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                required
                sx={{ backgroundColor: '#fff' }}
                onChange={handleFormChange}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                required
                sx={{ backgroundColor: '#fff' }}
                onChange={handleFormChange}
            />
            <TextField
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={4}
                required
                sx={{ backgroundColor: '#fff' }}
                onChange={handleFormChange}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-start' }}>
                {loading ? '送信中...' : '送信'}
            </Button>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="primary">送信完了しました</Typography>}
            </Box>
        </Container>
    );
};