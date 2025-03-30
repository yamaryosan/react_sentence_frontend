import { Box, Button, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";

type props = {
    target: string;
    path: string;
    setKeyword: (keyword: string) => void;
    handleSubmit: () => void;
};

export default function SearchWindow({
    target,
    path,
    setKeyword,
    handleSubmit,
}: props) {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                paddingY: "0.5rem",
            }}
        >
            <form action={path} method="get">
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                        name="keyword"
                        id="keyword"
                        label={target}
                        variant="outlined"
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <Button
                        type="button"
                        variant="outlined"
                        onClick={handleSubmit}
                    >
                        <SearchOutlined />
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
