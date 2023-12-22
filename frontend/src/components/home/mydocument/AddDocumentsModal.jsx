import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useDispatch, useSelector} from 'react-redux'
import { changeContent, changeCreatedAt, changeTitle } from '../../../features/documentSlice';

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
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");

  const [ws, setWs] = useState(null);
  // const [documents, setDocuments] = useState([]);
  const [userId, setUserId] = useState(false)
  const dispatch = useDispatch()
  const updatedData = useSelector((state)=>state.documentReducer)

  console.log(updatedData,"updated data here");

  useEffect(() => {
    const socket = new W3CWebSocket('ws://localhost:8000/ws/documents/');

    const userData = localStorage.getItem("userDetails");

    socket.onopen = () => {
      console.log('WebSocket connected');
      // if (userData) {
      //   const parseData = JSON.parse(userData);
      //   const userId = parseData.id;
      //   setUserId(userId)
        // Fetch initial documents when WebSocket connection is open
        // socket.send(JSON.stringify({ action: 'get_documents', userId: userId }));
      // }
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "data in onmessage//////modal");

      // Assuming the server sends updated documents as part of the response
      if (data.action === 'document_added') {
        dispatch(changeContent(data.documents.content))
        dispatch(changeCreatedAt(data.documents.created_at))
        dispatch(changeTitle(data.documents.title))
      }
    };

    socket.onclose = () => {
      console.log('WebSocket closed');
    };

    setWs(socket);

    // Note: No return cleanup function is needed here
  }, []);

  const addDocument = (e) => {
    e.preventDefault()
    const documentData = {
      'userId' : userId,
      'title': documentTitle,
      'content' : documentContent
    }
    console.log(documentData,"documentdata///");
    ws.send(JSON.stringify({ action: 'add_document', documentData }));
    handleClose();
  };

  const handleClose = () => {
    setOpen(false)
    props.setShowAddModal((prev)=>!prev)
  };

  
  return (
    <>
      <Modal open={open} onClose={handleClose} className="edit-modal">
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            Add Your Document Here-
          </Typography>
          <br />

          <form onSubmit={addDocument}>
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
