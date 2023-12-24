import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    
  }, [token]);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <Link to="/"  className="navbar-brand ms-5"><img src='https://i.postimg.cc/y87S3rd2/image-1-removebg-preview.png'></img></Link>
        <div className='d-flex w-25 ms-5'>
          {!token ?
            <Link to="/login" className='btn btn-success me-5'>Sign In</Link> :
            <div>
              <button className='btn  me-2' onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('uuid');
                navigate('/');
              }}>Sign Out</button>
              <Link to="/accounts" className='btn'>Private Page</Link>
            </div>
          }
        </div>
      </nav>
    </>
  );
}

export default Navbar;