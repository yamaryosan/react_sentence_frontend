import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CommonButton from "@/component/Button";

type CommonModalProps = {
    open: boolean;
    handleClose: () => void;
    handleDelete: () => void;
};

export default function CommonDeleteModal({
    open,
    handleClose,
    handleDelete,
}: CommonModalProps) {
    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    padding: "2rem",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                >
                    <p>本当に削除しますか？</p>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1rem",
                        }}
                    >
                        <CommonButton color="error" onClick={handleDelete}>
                            削除
                        </CommonButton>
                        <CommonButton color="secondary" onClick={handleClose}>
                            キャンセル
                        </CommonButton>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}
