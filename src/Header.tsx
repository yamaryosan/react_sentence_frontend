import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LaptopIcon from '@mui/icons-material/Laptop';
import VerificationProvider from '@/header/VerificationProvider';

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
            <VerificationProvider />
        </Box>
    );
}
export default Header;