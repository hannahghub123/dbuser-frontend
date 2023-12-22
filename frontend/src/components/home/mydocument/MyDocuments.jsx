import React, { useEffect, useState } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import AddDocumentsModal from "./AddDocumentsModal";
import { styled } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import { useSelector } from "react-redux";
import axiosInstance from "../../../axios/Axios";
import "../Style.css";

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.background.level1 : "#fff",
  ...theme.typography["body-sm"],
  padding: theme.spacing(2.5),
  textAlign: "center",
  borderRadius: 5,
  color: theme.vars.palette.text.secondary,
}));

const MyDocuments = () => {
  const [ws, setWs] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [mydocuments, setMyDocuments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const updatedDocuments = useSelector((state) => state.documentReducer.value);

  console.log(updatedDocuments, "in my documents");

  useEffect(() => {
    const socket = new W3CWebSocket("ws://localhost:8000/ws/documents/");

    const userData = localStorage.getItem("userDetails");

    socket.onopen = () => {
      console.log("WebSocket connected");
      if (userData) {
        const parseData = JSON.parse(userData);
        const userId = parseData.id

        const values = {
          id: userId,
        };
        console.log(values, "joooooooooooooooooooo");

        axiosInstance.post("get-documents/", values).then((res) => {
          setMyDocuments(res.data.documents);
        });

        socket.send(JSON.stringify({ action: 'get_documents', userId: userId }));

      }
    };

    console.log(mydocuments, "mydocuments");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log(data, "data in onmessage//////");

      console.log(event.data, "event///");

      // Assuming the server sends updated documents as part of the response
      if (data.action === "document_added") {
        const value = data.documents;
        // setDocuments({ ...documents, value });
        // setMyDocuments(value);

        console.log(value,"in document deleted method!!");
      }

        if (data.action === 'documents_fetched') {
          const value = data.documents
          console.log(value,"value here in mydocuments");
          setMyDocuments(value);
        }

        if (data.action === 'documents_deleted') {
            const value = data.documents
            console.log(value,"value here in mydocuments");
            setMyDocuments(value);
          }

    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };

    setWs(socket);

    // No return cleanup function is needed here
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  //   const editDocument = (documentId) => {
  //     ws.send(JSON.stringify({ action: 'edit_document', documentData }));
  //   };

  const deleteDocument = (documentId) => {
    console.log(documentId, "JJJJJJJJJJSSSSSSSSSSSSSSSSSSSSS");
    ws.send(JSON.stringify({ action: "delete_document", documentId }));
  };

  const openAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  return (
    <div>
      <h1>My Documents</h1>
      {/* Your document display logic goes here */}

      <button onClick={openAddModal}>Add Document</button>

      {/* <button onClick={() => editDocument({})}>
        Edit Document
      </button>
      <button onClick={() => deleteDocument()}>
        Delete Document
      </button> */}

      <div className="notes">
        <h1>Add Notes</h1>
        <span>
          <i class="fa fa-plus icon" aria-hidden="true"></i>
        </span>
      </div>
      <div className="container">
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          sx={{ width: "100%" }}
        >
          {mydocuments &&
            mydocuments.map((item) => (
              <Grid xs={6}>
                <Item>
                  <div className="d-flex flex-row justify-content-between ">
                    <div className="notes-text">
                      {item.title}
                      <br />
                      hii
                      {item.content}
                    </div>

                    <div className="icon-container">
                      {/* <span className='ml-4 ' onClick={()=>editDocument(item.id)}><i className="fas fa-edit icon"></i></span>  */}

                      <span
                        className="ml-1 "
                        onClick={() => deleteDocument(item._id)}
                      >
                        <i className="fas fa-trash icon"></i>
                      </span>
                    </div>
                  </div>
                </Item>
              </Grid>
            ))}
        </Grid>
      </div>

      {showAddModal && <AddDocumentsModal setShowAddModal={setShowAddModal} setMyDocuments={setMyDocuments} />}
    </div>
  );
};

export default MyDocuments;
