import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useRegister from "../../hooks/useRegister";

function Register() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { register, loading, error } = useRegister(
    "http://localhost:4000/users/signup"
  );
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      username,
      password,
    };
    register(user.username, user.password, "/");
  };
  return (
    <div className="w-full">
      <form
        className="dark:bg-[#111827] max-w-lg p-12 m-auto rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="text-center mb-14">
          <h1 className="text-gray-900 dark:text-white text-4xl">Sign Up</h1>
        </div>

        <div className="mb-6">
          <label
            htmfor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your username
          </label>
          <input
            onChange={(e) => setUserName(e.target.value)}
            type="username"
            id="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="tunahangediz"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmfor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
            placeholder="********"
          />
        </div>
        {/* <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                type="checkbox"
                value=""
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                required
              />
            </div>
            <label
              for="remember"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Remember me
            </label>
          </div> */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
        <p className="text-white mt-6">
          You have an account{" "}
          <Link className="text-blue-500 hover:text-blue-700" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
