import Box from "@mui/material/Box";

type SidebarThumbnailBoxProps = {
    children: React.ReactNode;
};

export default function SidebarThumbnailBox({children}: SidebarThumbnailBoxProps) {
    return (
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          paddingTop: '100%',
          backgroundColor: 'white',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {children}
        </Box>
      </Box>
    );
  }