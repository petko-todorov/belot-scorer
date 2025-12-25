import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ModalWin = ({ openModal, confirmEndGame, cancelEndGame }) => {
    return (
        <>
            <Modal
                open={openModal}
                onClose={(event, reason) => {
                    if (reason === 'backdropClick') return;
                }}
                disableEscapeKeyDown
            >
                <Box sx={style}>
                    <Typography variant="h6">Приключи ли играта?</Typography>

                    <Box className="flex justify-center gap-3 mt-3">
                        <Button variant="outlined" onClick={cancelEndGame}>
                            Не
                        </Button>
                        <Button variant="contained" onClick={confirmEndGame}>
                            Да
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </>
    );
};

export default ModalWin;
