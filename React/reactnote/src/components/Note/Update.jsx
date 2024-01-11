// import React, { useState } from "react";

// const Update = ({ display, id, body, updateNote }) => {
//   const [updatedBody, setUpdatedBody] = useState(body);

//   const handleUpdate = async () => {
//     try {
//       await updateNote(id, updatedBody);
//       // Optionally, close the update UI after successful update
//       display("none");
//     } catch (error) {
//       console.error("Error updating note:", error.response ? error.response.data : error.message);
//     }
//   };

//   return (
//     <div className="p-5 d-flex justify-content-center align-items-start flex-column update">
//       <h3>Update Your Note</h3>
//       <textarea
//         className="note-inputs w-100 p-3"
//         name="body"
//         value={updatedBody}
//         onChange={(e) => setUpdatedBody(e.target.value)}
//       />
//       <div>
//         <button className="btn btn-dark my-4" onClick={handleUpdate}>
//           UPDATE
//         </button>
//         <button className="btn btn-danger my-4 mx-3" onClick={() => display("none")}>
//           Close
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Update;
