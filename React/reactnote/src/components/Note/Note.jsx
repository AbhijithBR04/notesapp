import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NoteCard from "./NoteCard";
import Update from "./Update";
import "./note.css";
import axios from "axios";

const Note = () => {
  const id=localStorage.getItem('id') ||null
  console.log(id)
  const [Inputs, setInputs] = useState({ body: "" });
  const [Array, setArray] = useState([]);
  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };
  // const submit = async() => {
  //   if (Inputs.body === "") {
  //     toast.error("Description should not be empty");
  //   } else {
  //     if(id){
        
  //       const resdata = await axios.post("http://localhost:5002/api/post", {
  //         body: Inputs.body,
  //         userUuid: id,
  //       });
  //       console.log(resdata);
  //     }
  //     setArray([...Array, Inputs]);
  //     console.log(Inputs);
  //     setInputs({ body: "" });
  //     toast.success("Note Added");
  //     toast.error("Note will no be saved,Please Sign up!");
  //   }
  // };
  const submit = async () => {
    if (Inputs.body === "") {
      toast.error("Description should not be empty");
    } else {
      try {
        const response = await axios.post("http://localhost:5002/api/post", {
          body: Inputs.body,
          userUuid: id,
        });
  
        setArray([...Array, response.data]); // Assuming the response.data is the new note
        setInputs({ body: "" });
        toast.success("Note Added");
      } catch (error) {
        console.error('Error creating note:', error);
        toast.error("Failed to add note");
      }
    }
  };
  
  const del = (id) => {
    console.log(id);
    Array.splice(id, 1);
    setArray([...Array]);
  };
  const dis = (value) => {
    document.getElementById("note-update").style.display = value;
  };
  return (
    <div>
      <ToastContainer />
      <div className="note-main container d-flex justify-content-center align-items-center my-4 flex-column">
        <div className="d-flex flex-column note-inputs-div w-lg-50 w-100 p-1">
          <textarea
            id="textarea"
            type="text"
            placeholder="Description"
            name="body"
            className=" p-2 note-inputs"
            value={Inputs.body}
            onChange={change}
          />
        </div>
        <div className=" w-50 w-100 d-flex justify-content-end my-3">
          <button className="home-btn px-2 py-1" onClick={submit}>
            Add
          </button>
        </div>
      </div>
      <div className="note-body">
        <div className="container-fluid">
          <div className="row">
            {Array &&
              Array.map((item, index) => (
                <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2" key={index}>
                  <NoteCard
                    body={item.body}
                    id={index}
                    delid={del}
                    display={dis}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="note-update" id="note-update">
        <div className="container update">
          <Update display={dis} />
        </div>
      </div>
    </div>
  );
};

export default Note;

//The splice() method adds and/or removes array elements.
// The splice() method overwrites the original array.
