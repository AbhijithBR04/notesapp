import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./NoteCard";
import { Link, useNavigate } from "react-router-dom";
import UpdateNote from "./UpdateNote";
import "./note.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNote = () => {
  const history = useNavigate();
  const [noteBody, setNoteBody] = useState("");
  const [notes, setNotes] = useState([]);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNotes, setFilteredNotes] = useState([]);

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

        toast.success("Note Added");
        setNoteBody("");
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

  const updateNote = (id) => {
    setSelectedNoteId(id);
    history(`/update/${id}`);
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
      toast.error("Note deleted");
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handleSearch = () => {
    const trimmed = searchTerm.trim();
    const filtered = notes.filter((note) =>
      note.body.toLowerCase().includes(trimmed.toLowerCase())
    );
    setFilteredNotes(filtered);
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
        <div className=" w-100  d-flex justify-content-center my-2">
          <button className="home-btn px-2 py-1" onClick={handleAddNote}>
            Add Note
          </button>
          <Link
            className="w-100 d-flex justify-content-end "
            to={`/all-notes/${localStorage.getItem("uuid")}`}
          >
            View All Notes
          </Link>
        </div>
      </div>
      <div className="note-search d-flex flex-row gap-2 justify-content-end px-5 py-1">
        <input
          type="text"
          placeholder="Search your notes here..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="home-btn px-2 py-1" onClick={handleSearch}>
          Search
        </button>
      </div>
      {searchTerm && (
        <div className="note-body">
          <div className="container-fluid">
            <div className="row">
              {filteredNotes.map((note) => (
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
      )}

      {!searchTerm && (
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
      )}

      {selectedNoteId !== null && <UpdateNote noteId={selectedNoteId} />}
    </div>
  );
};

export default AddNote;
