import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axiosInstance from "../../../axios/Axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  marginTop: 5,
  p: 4,
};

const AddDocumentsModal = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => setOpen(false);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");

  const handleSubmit = () => {
    const userData = localStorage.getItem("userDetails");
    if (userData) {
      const parseData = JSON.parse(userData);

      const values = {
        documentTitle: documentTitle,
        documentContent: documentContent,
        id: parseData.id,
      };

      axiosInstance.post("add-documents/", values).then((res) => {
        console.log(res.data,"////////////");
        if (res.data.message === "Document created successfully") {
          props.setRender((prev) => !prev);
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        } else {
          toast.warning(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
            autoClose: 3000,
          });
        }
      });
      handleClose();
    }
  };
  return (
    <>
      <Modal open={open} onClose={handleClose} className="edit-modal">
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Your Document Here-
          </Typography>
          <br />

          <form onSubmit={handleSubmit}>
            <TextField
            sx={{marginBottom:'5px'}}
              required
              label="Add Title"
              variant="outlined"
              fullWidth
              onChange={(e) => setDocumentTitle(e.target.value)}
            />

            <TextField
            sx={{marginBottom:'5px'}}
              required
              label="Add Content"
              variant="outlined"
              fullWidth
              onChange={(e) => setDocumentContent(e.target.value)}
            />

            <button className="edit-btn">Click to Submit</button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddDocumentsModal;
