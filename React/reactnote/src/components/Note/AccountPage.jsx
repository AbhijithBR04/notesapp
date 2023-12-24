import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import { useNavigate } from "react-router-dom";
import UpdateNote from "./UpdateNote";  // Import the UpdateNote component

const AddNote = () => {
  const history = useNavigate();
  const [noteBody, setNoteBody] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleInputChange = (e) => {
    setNoteBody(e.target.value);
  };

  const handleAddNote = async () => {
    try {
      const token = localStorage.getItem("token");
      const uuid = localStorage.getItem("uuid");

      await axios.post(
        "http://localhost:5002/api/post",
        {
          uuid,
          body: noteBody,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Note added successfully");

      // Clear the textarea after successfully adding the note
      setNoteBody("");

      // Fetch the updated list of notes
      fetchNotes();
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const uuid = localStorage.getItem("uuid");

      const response = await axios.get(
        `http://localhost:5002/api/getnote/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNotes(response.data);
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateNote = (id) => {
    // Set the selectedNoteId state and navigate to the update page
    setSelectedNoteId(id);
    history(`/update/${id}`);  // Pass the noteId as a parameter in the URL
    console.log(`Update note with ID: ${id}`);
  };

  return (
    <div className="add-note">
      <textarea
        placeholder="Type your note here..."
        value={noteBody}
        onChange={handleInputChange}
      ></textarea>
      <button onClick={handleAddNote}>Add Note</button>

      {/* Render UpdateNote component if selectedNoteId is not null */}
      {selectedNoteId !== null && <UpdateNote noteId={selectedNoteId} />}

      <div className="note-list-container">
        <h2>Your Notes</h2>
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            body={note.body}
            updateNote={() => updateNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AddNote;
