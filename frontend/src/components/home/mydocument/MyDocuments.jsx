import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/joy/styles";
import Grid from "@mui/joy/Grid";
import Sheet from "@mui/joy/Sheet";
import '../Style.css';
import AddDocumentsModal from "./AddDocumentsModal";
import axiosInstance from "../../../axios/Axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const navigate = useNavigate();

  const [addnotes,setAddNotes] = useState(false);
  const [render,setRender] = useState(false);
  const [documents,setDocuments] = useState([]);

  useEffect(()=>{
    const userData = localStorage.getItem("userDetails")
    if (userData){
        const parseData = JSON.parse(userData)
        const values ={
          id:parseData.id
        }
        axiosInstance.post('get-documents/',values)
        .then((response)=>{
          console.log(response.data);
          setDocuments(response.data.documents)
        })
    }
},[render])

  const notesAddHandle=()=>{
      setAddNotes(!addnotes);
  }

  const homeHandle = () => {
    navigate("../home");
  };

  const DeleteHandle=(id)=>{
    showDeleteConfirmation(id);
  }

  const showDeleteConfirmation = (id) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this document ?</p>
        <button className='ml-5 mr-5' onClick={() => documentsDeleteHandle(id)}>Delete</button>
        <button className='ml-3' onClick={toast.dismiss}>Cancel</button>
      </div>,
      {
        position: 'top-center',
        autoClose: false,
        closeOnClick: true,
        closeButton: false,
      }
    );
  };

  const documentsDeleteHandle=(id)=>{
    // alert("Are your sure you want to delete this notes?")
    const values = {
      id:id,
    }
    console.log(values,'/////');
    axiosInstance.post("delete-documents/",values)
    .then((res)=>{
      console.log(res.data);
      setRender(!render)

      toast.success(res.data.message, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 3000,
      });

      setRender(!render)
    })
  }

  return (
    <>
    <div className="notes">
      <h2>My documents</h2>
       <span onClick={notesAddHandle}> 
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
          {documents.map((item) => (
      <Grid xs={6}>
        <Item>
          <div className='d-flex flex-row justify-content-between '>
            <div className='notes-text'>
            <b>{item.title}</b>
            <br />
            {item.content}
            </div>
            <div className='icon-container'>
              <span className='ml-4 ' 
              // onClick={()=>notesEditHandle(item.id)}
              ><i className="fas fa-edit icon"></i></span>

              <span className='ml-1 ' 
              onClick={()=>DeleteHandle(item._id)}
              ><i className="fas fa-trash icon"></i></span>

            </div>
          </div>
        </Item>
      </Grid>
   ))}
        </Grid>
      </div>
      <button onClick={homeHandle}>Back to Home</button>
      {addnotes ? <AddDocumentsModal setRender={setRender} /> : null}
    </>
  );
};

export default MyDocuments;
