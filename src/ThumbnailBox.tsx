import Box from "@mui/material/Box";

type ThumbnailBoxProps = {
    children: React.ReactNode;
    width: string;
};

export default function ThumbnailBox({children, width}: ThumbnailBoxProps) {
    return (
      <Box 
        sx={{ 
          position: 'relative',
          width: {xs: width, md: width},
          paddingTop: {xs: width, md: width},
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