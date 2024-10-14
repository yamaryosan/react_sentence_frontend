import Box from "@mui/material/Box";

type SidebarThumbnailBoxProps = {
    children: React.ReactNode;
};

export default function ThumbnailBox({children}: SidebarThumbnailBoxProps) {
    return (
    <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        border: '1.5px solid transparent',
        padding: '0.5rem',
        fontSize: '0.8rem',
        transition: 'border 0.2s, background-color 0.2s',
        '&:hover': {
            border: '1.5px solid gray',
            bgcolor: 'secondary.light',
        }
        }}>
        {children}
    </Box>
    );
  }