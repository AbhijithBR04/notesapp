import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const UpdateNote = () => {
  const { noteId } = useParams(); // Use useParams to get the noteId from the URL
  const [noteBody, setNoteBody] = useState("");
  const history = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        console.log("Fetching note with ID:", noteId); // Add this log statement
        const response = await axios.get(
          `http://localhost:5002/api/getnote/${noteId}`
        );

        if (response.data.length > 0) {
          setNoteBody(response.data[0].body);
        }
      } catch (error) {
        console.error(
          "Error fetching note:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchNote();
  }, [noteId]);

  const handleUpdateNote = async () => {
    try {
      const uuid = localStorage.getItem("uuid");
      console.log("Note ID:", noteId); // Add this log statement
      console.log("Note Body:", noteBody); // Add this log statement
      const response = await axios.post(
        `http://localhost:5002/api/updatepost`,
        {
          noteId,
          body: noteBody,
          uuid: uuid,
        }
        );
        toast.success("Note Updated")
      console.log(response.data);
    //   alert(response.data.message);
     history("/notenew");
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response ? error.response.data : error.message
      );
      toast.error("Note Updation failed")
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
        <h2>Update Note</h2>
        <textarea
          className="note-inputs w-100 p-3"
          name="body"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
          placeholder="Enter your updated note..."
        ></textarea>
        <div>
          <button className="btn btn-dark my-4" onClick={handleUpdateNote}>
            Update Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateNote;
