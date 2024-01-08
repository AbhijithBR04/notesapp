import React, { useEffect, useState } from "react";
import axios from "axios";
import './allnotes.css'
import { useParams } from "react-router-dom";

const AllNotes = () => {
  const { uuid } = useParams();
  const [allNotes, setAllNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:5002/api/getnote/${uuid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAllNotes(response.data);
      } catch (error) {
        console.error("Error fetching all notes:", error.message);
      }
    };

    fetchAllNotes();
  }, [uuid]);

  return (
    <div >
      <h2 className=" d-flex justify-content-center align-items-center">All Notes</h2>
      <ol>
        {allNotes.map((note) => (
          <li key={note.id}>{note.body}</li>
        ))}
      </ol>
    </div>
  );
};

export default AllNotes;
