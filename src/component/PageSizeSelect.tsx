import { Box, Select, MenuItem } from "@mui/material";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";

type props = {
    pageSize: number;
    setPageSize: (pageSize: number) => void;
};

export default function PageSizeSelect({ pageSize, setPageSize }: props) {
    const deviceType = useContext(DeviceTypeContext);

    const pageSizeOptions = [50, 100, 200, 500];

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: deviceType === "desktop" ? "1.2rem" : "1rem",
            }}
        >
            <Select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
            >
                {pageSizeOptions.map((option, index) => (
                    <MenuItem value={option} key={index}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
            <span>件ずつ表示</span>
        </Box>
    );
}
