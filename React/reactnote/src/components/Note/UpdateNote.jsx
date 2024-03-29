import React, { useState, useEffect } from "react";
import axios from "axios";
import "./note.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateNote = () => {
  const { noteId } = useParams();
  const [noteBody, setNoteBody] = useState("");
  const [temp, setDefault] = useState("");
  const history = useNavigate();

  const getone = async () => {
    try {
      const resp = await axios.get(
        `http://localhost:5002/api/getsinglenote/${noteId}`
      );
      setDefault(resp.data.note);
    } catch (error) {}
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("Fetching note with ID:", noteId);
        const response = await axios.get(
          `http://localhost:5002/api/getnote/${noteId}`
        );

        console.log(response);
        if (response.data.length > 0) {
          // Set the initial state of noteBody with the existing note body
          setNoteBody(response.data.body);
          console.log("Note body set:", response);
        }
      } catch (error) {
        console.error(
          "Error fetching note:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchNote();
    getone();
  }, [noteId]);

  const handleUpdateNote = async () => {
    try {
      const uuid = localStorage.getItem("uuid");
      console.log("Note ID:", noteId);
      console.log("Note Body:", noteBody);
      const response = await axios.post(
        `http://localhost:5002/api/updatepost`,
        {
          noteId,
          body: noteBody,
          uuid: uuid,
        }
      );
      toast.success("Note Updated");
      console.log(response.data);
      history("/notenew");
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response ? error.response.data : error.message
      );
      toast.error("Note Updation failed");
    }
  };
  const back = () => {
    history("/notenew");
  };

  return (
    <div>
      <ToastContainer />
      <div className="note-main container d-flex my-4 flex-column">
        <h2>Update Note</h2>
        <div className="d-flex flex-column note-inputs-div w-lg-50 w-100 p-1-note">
          <textarea
            className="note-inputs w-100 p-3"
            name="body"
            defaultValue={temp.body}
            onChange={(e) => setNoteBody(e.target.value)}
            placeholder="Enter your updated note..."
          ></textarea>
        </div>

        <div className=" d-flex gap-2">
          <button className="btn btn-dark my-4" onClick={handleUpdateNote}>
            Update Note
          </button>
          <button className="btn btn-dark my-4  " onClick={back}>
            Go back to notes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
