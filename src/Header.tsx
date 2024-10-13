import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LaptopIcon from '@mui/icons-material/Laptop';
import SentenceSearchWindow from './sidebar/SentenceSearchWindow';

import {Link} from 'react-router-dom';
import { HomeOutlined, MailOutlined } from '@mui/icons-material';

// ナビゲーションメニューの項目
const pages = [
    {name: 'Home', url: '/', icon: <HomeOutlined />},
    {name: 'Contact', url: '/contact', icon: <MailOutlined />},
];

function Header() {
    return (
        <Box>
            <LaptopIcon />
            <h1>Webエンジン</h1>
            <Box>
                {pages.map((page) => (
                    <Button key={page.name} href={page.url}>{page.name}</Button>
                ))}
            </Box>
            <SentenceSearchWindow />
        </Box>
    );
}
export default Header;