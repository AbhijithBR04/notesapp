import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ViewNote = () => {
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

  const back = () => {
    history("/notenew");
  };
  return (
    <div>
      <div className="note-main container d-flex my-4 flex-column">
        <h2>Note</h2>

        <p>{temp.body}</p>
      </div>
      <div className="d-flex w-75 mx-auto    ">
        <button className="text-start " onClick={back}>back</button>
      </div>
    </div>
  );
};

export default ViewNote;
