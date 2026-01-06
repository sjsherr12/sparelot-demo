import { Box, Modal, SwipeableDrawer } from "@mui/material";
import 'react-spring-bottom-sheet/dist/style.css'

const InterchangeableSwipeable = ({
    anchor = "center",
    children,
    open,
    onClose,
    onOpen,
    disableSwipeToOpen = false,
    PaperProps = {},
    sx = {},
    BackdropProps = {},
}) => {
    const isDrawer = anchor === "bottom" || anchor === "top" || anchor === "left" || anchor === "right";

    if (isDrawer) {
        return (
            <SwipeableDrawer
                anchor={anchor}
                open={open}
                onClose={onClose}
                onOpen={onOpen}
                disableSwipeToOpen={disableSwipeToOpen}
                disableDiscovery={false}
                ModalProps={{
                    keepMounted:true,
                }}
                PaperProps={{
                    ...PaperProps,
                    sx: {
                    ...PaperProps.sx,
                    },
                }}
                sx={sx}
                BackdropProps={BackdropProps}
            >
                <Box
                    sx={{
                        pt: 1,
                        pb: 2,
                        zIndex:1000,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        display: { xs: 'flex', lg: 'none' },
                    }}
                >
                    <Box
                        sx={{
                            width: 45,
                            height: 4,
                            bgcolor: '#737373',
                            borderRadius: 4,
                        }}
                    />
                </Box>
                {children}
            </SwipeableDrawer>
        );
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...sx,
            }}
        >
            <Box
                sx={{
                    ...PaperProps.sx,
                }}
            >
                {children}
            </Box>
        </Modal>
    );
};

export default InterchangeableSwipeable;