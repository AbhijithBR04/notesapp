import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateNote = () => {
  const { noteId } = useParams(); // Use useParams to get the noteId from the URL
  const [noteBody, setNoteBody] = useState("");

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
      console.log(response.data);
      alert(response.data.message);
    } catch (error) {
      console.error(
        "Error updating note:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <h2>Update Note</h2>
      <textarea
        value={noteBody}
        onChange={(e) => setNoteBody(e.target.value)}
        placeholder="Enter your updated note..."
      ></textarea>
      <button onClick={handleUpdateNote}>Update Note</button>
    </div>
  );
};

export default UpdateNote;
