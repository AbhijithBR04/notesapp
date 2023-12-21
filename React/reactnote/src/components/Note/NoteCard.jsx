import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { GrDocumentUpdate } from "react-icons/gr";

const NoteCard = ({ body, id, delid ,display }) => {
  return (
    <div className="p-3 note-card">
      <div>
        <p className="note-card-p">{body.split("", 20)}..</p>
      </div>
      <div className="d-flex justify-content-around ">
        <div className="d-flex justify-content-center align-items-center card-icon-body px-2 py-1 " onClick={()=>{display("block")}}>
          <GrDocumentUpdate className="card-icons" /> Update
        </div>
        <div
          className="d-flex justify-content-center align-items-center card-icon-body  px-2 py-1 text-danger"
          onClick={() => {
            delid(id);
          }}
        >
          <AiFillDelete className="card-icons del" /> Delete
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

// basic syntax of the split function:
// string.split(separator, limit);
