import Sidebar from "@/sidebar/Sidebar";
import Box from "@mui/material/Box";
import DeviceTypeContext from "@/hooks/DeviceTypeContext";
import { useContext } from "react";

type ContentsAreaProps = {
    children: React.ReactNode;
};

export default function ContentsArea({ children }: ContentsAreaProps) {
    const deviceType = useContext(DeviceTypeContext);

    return (
        <>
            {deviceType === "desktop" && (
                <Box sx={{ display: "flex" }}>
                    <Box sx={{ width: "70%", padding: "0.5rem" }}>
                        {children}
                    </Box>
                    <Box sx={{ width: "30%", padding: "0.5rem" }}>
                        <Sidebar />
                    </Box>
                </Box>
            )}
            {deviceType === "mobile" && (
                <>
                    <Box sx={{ width: "100%", padding: "0.5rem" }}>
                        {children}
                    </Box>
                    <Sidebar />
                </>
            )}
        </>
    );
}
