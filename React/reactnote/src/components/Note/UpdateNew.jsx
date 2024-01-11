// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const UpdateNote = () => {
//   const [noteBody, setNoteBody] = useState("");
//   const { id } = useParams(); // Get the note ID from the route params

//   useEffect(() => {
//     const fetchNote = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await axios.get(
//           `http://localhost:5002/api/getnote/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setNoteBody(response.data[0].body);
//       } catch (error) {
//         console.error(
//           "Error fetching note:",
//           error.response ? error.response.data : error.message
//         );
//       }
//     };

//     fetchNote();
//   }, [id]); // Include id as a dependency

//   const handleUpdateNote = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       await axios.put(
//         `http://localhost:5002/api/updatepost/${id}`,
//         {
//           body: noteBody,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Note updated successfully");

//       // Implement navigation or any other logic after successful update
//     } catch (error) {
//       console.error(
//         "Error updating note:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };

//   return (
//     <div>
//       <h2>Update Note</h2>
//       <textarea
//         value={noteBody}
//         onChange={(e) => setNoteBody(e.target.value)}
//         placeholder="Enter your updated note..."
//       ></textarea>
//       <button onClick={handleUpdateNote}>Update Note</button>
//     </div>
//   );
// };
// //not og note
// export default UpdateNote;
