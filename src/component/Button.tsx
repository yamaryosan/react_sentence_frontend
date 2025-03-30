import { Button, Box } from "@mui/material";
import React from "react";

type color = "primary" | "secondary" | "error" | "success";

type CommonButtonProps = {
    children: React.ReactNode;
    color: color;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    width?: string;
};

export default function CommonButton({
    children,
    color,
    onClick,
    disabled,
    width,
}: CommonButtonProps) {
    return (
        <Button
            sx={{
                padding: "1.5rem",
                marginBottom: "0.5rem",
                backgroundColor: `${color}.light`,
                width: width ?? "100%",
                ":hover": {
                    backgroundColor: `${color}.main`,
                },
                ":disabled": {
                    backgroundColor: `${color}.dark`,
                },
                textTransform: "none",
            }}
            onClick={onClick}
            disabled={disabled}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    gap: "0.5rem",
                    scale: "1.5",
                    color: "black",
                }}
            >
                {children}
            </Box>
        </Button>
    );
}
