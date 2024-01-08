import React from "react";
import "./home.css";
const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="container d-flex justify-content-center align-items-center flex-column ">
        <p>
        NoteXpress is a versatile and user-friendly notes application designed to
          streamline <br />
          your note-taking experience. Whether you're a student, professional,
          or anyone in need of a convenient way to note <br />
          down thoughts, ideas, or important information, NoteXpress has you
          covered.
        </p>
        {/* <button class="home-btn p-2">Make Todo List</button> */}
      </div>
    </div>
  );
};

export default Home;
