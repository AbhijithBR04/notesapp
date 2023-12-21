import React from "react";

const Update = ({display}) => {
  return (
    <div className="p-5  d-flex justify-content-center align-items-start flex-column update  ">
      <h3>Update Your Note</h3>
      <textarea
        className="note-inputs w-100 p-3"
        name="body"
        // value={Inputs.body}
        // onChange={change}
      />
      <div>
        <button className="btn btn-dark my-4">UPDATE</button>
        <button className="btn btn-danger my-4 mx-3" onClick={()=>{display('none')}}>Close</button>
      </div>
    </div>
  );
};

export default Update;
