import { Box, Modal } from "@mui/material";

const BasicModal = (props) => {

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const { showModal, handleClose, modalData } = props;

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="flex flex-col gap-2">
          <section className="flex justify-end">
            <button
              className="px-2 border border-black-200"
              onClick={handleClose}
            >
              x
            </button>
          </section>
          <section className="flex gap-5">
            <section>
              <img src={modalData.urls?.small} alt="" />
            </section>
            <section className="flex flex-col gap-1">
              <span className="text-lg font-medium">
                {modalData.alt_description}
              </span>
              <span>width: {modalData.width}px</span>
              <span>height: {modalData.height}px</span>
            </section>
          </section>
        </div>
      </Box>
    </Modal>
  );
};

export default BasicModal;
