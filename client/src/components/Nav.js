import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../context/authContext/authContexProvider";

const Nav = () => {
  const { handleLogout, user } = useContext(authContext);
  return (
    <div className="w-full bg-white shadow-md">
      <nav className="flex justify-between py-6 max-w-[1300px] m-auto px-4">
        <div className="header">
          <Link to="/">{user && <h1>{user?.username || user}</h1>}</Link>
        </div>

        <div>
          {!user ? (
            <>
              <Link to="/login">Login</Link> <Link to="/register">Sign Up</Link>{" "}
            </>
          ) : (
            <button onClick={handleLogout}>Logout</button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Nav;
