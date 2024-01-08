import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import { Link, useNavigate } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import "./note.css";
import { ToastContainer, toast } from "react-toastify"; 

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
    if (noteBody === "") {
      toast.error("Note should not be empty");
    } else {
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

        // alert("Note added successfully");
        toast.success("Note Added");
        setNoteBody("");

        // Fetch the updated list of notes
        fetchNotes();
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to add note");
      }
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

  const updateNote = (id, body) => {
    // Set the selectedNoteId state and navigate to the update page
    setSelectedNoteId(id);

    history(`/update/${id}`); // Pass the noteId as a parameter in the URL
    console.log(`Update note with ID: ${id}`);
  };

  const del = async (id) => {
    try {
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this note?"
      );

      if (!shouldDelete) {
        return;
      }

      const token = localStorage.getItem("token");
      const uuid = localStorage.getItem("uuid");

      await axios.delete(`http://localhost:5002/api/deletenote/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          uuid: uuid,
        },
      });

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      toast.success("Note deleted");
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div>
      <ToastContainer />
      <div className="note-main container d-flex justify-content-center align-items-center my-4 flex-column">
        <div className="d-flex flex-column note-inputs-div w-lg-50 w-100 p-1-note">
          <textarea
            placeholder="Type your note here..."
            id="textarea"
            type="text"
            name="body"
            className=" p-2 note-inputs"
            value={noteBody}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div className=" w-50 w-100 d-flex justify-content-end my-3">
          <button className="home-btn px-2 py-1" onClick={handleAddNote}>
            Add Note
          </button>
        </div>
        <Link to={`/all-notes/${localStorage.getItem("uuid")}`}>
            View All Notes
          </Link>
      </div>

      {/* Render UpdateNote component if selectedNoteId is not null */}
      {selectedNoteId !== null && <UpdateNote noteId={selectedNoteId} />}
      <div className="note-body">
        <div className="container-fluid">
          <div className="row">
            {notes.map((note) => (
              <div className="col-lg-3 col-11 mx-lg-5 mx-3 my-2">
                <NoteCard
                  key={note.id}
                  id={note.id}
                  body={note.body}
                  del={del}
                  updateNote={() => updateNote(note.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
