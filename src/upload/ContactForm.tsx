import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { fetchContact } from '@/api/contact';
import { SentimentSatisfiedAltOutlined, SentimentVeryDissatisfiedOutlined } from '@mui/icons-material';

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
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);
        const data = await fetchContact(form);
        if (!data) {
            setError('エラーが発生しました');
            setLoading(false);
            return;
        }
        setLoading(false);
        setSuccess(true);
        setForm({
            name: '',
            email: '',
            message: '',
        })
    }

    return (
        <>
            <Box
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: "1rem",
            }}
            autoComplete="off"
            onSubmit={handleSubmit}
            >
            <h2>お問い合わせフォーム</h2>
            <TextField
                label="Name"
                variant="outlined"
                name="name"
                required
                value={form.name}
                onChange={handleFormChange}
            />
            <TextField
                label="Email"
                variant="outlined"
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleFormChange}
            />
            <TextField
                label="Message"
                variant="outlined"
                name="message"
                multiline
                rows={6}
                required
                value={form.message}
                onChange={handleFormChange}
            />
            <Button variant="contained" color="primary" type="submit" sx={{ alignSelf: 'flex-end', width: '20%' }}>
                {loading ? '送信中...' : '送信'}
            </Button>
            {error && <Typography color="error" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SentimentVeryDissatisfiedOutlined />
                <span>{error}</span>
            </Typography>}
            {success && <Typography color="primary" sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SentimentSatisfiedAltOutlined />
                <span>送信完了</span>
            </Typography>}
            </Box>
        </>
    );
};