// NoteCard.jsx
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";
import { Link } from "react-router-dom";
import "./note.css";

const NoteCard = ({ body, id, del, updateNote }) => {
  return (
    <div className="p-3 note-card">
      <div>
        <p className="note-card-p">{body.split("", 1000)}..</p>
      </div>
      <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-center align-items-center card-icon-body px-2 py-1">
          <Link to={`/update/${id}`}>
            <GrDocumentUpdate
              className="card-icons"
              onClick={() => updateNote(id)}
            />
            Update
          </Link>
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-body px-2 py-1 text-danger"
          onClick={() => del(id)}
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
