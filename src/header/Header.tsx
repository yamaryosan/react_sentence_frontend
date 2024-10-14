import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LaptopIcon from '@mui/icons-material/Laptop';
import VerificationProvider from '@/searchWindow/VerificationProvider';
import { HomeOutlined, MailOutlined, ArticleOutlined } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

// ナビゲーションメニューの項目
const pages = [
    {name: 'Home', url: '/', icon: <HomeOutlined />},
    {name: 'Contact', url: '/contact', icon: <MailOutlined />},
    {name: 'Articles', url: '/allArticles', icon: <ArticleOutlined />},
];

export default function Header() {
    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'primary.main'}}>
                <Link to="/" style={{textDecoration: 'none', color: 'white', width: '100%' }}>
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginY: '1rem', fontWeight: 'bold'}}>
                        <LaptopIcon />
                        <h1>Webエンジン</h1>
                    </Box>
                </Link>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'space-around', backgroundColor: 'secondary.light'}}>
                {pages.map((page) => (
                    <React.Fragment key={page.name}>
                        <Button href={page.url} sx={{color: 'black', width: '100%', gap: '0.5rem', fontSize: '1.2rem'}}>
                            {page.icon}
                            {page.name}
                        </Button>
                    </React.Fragment>
                ))}
            </Box>
        </Box>
    );
}