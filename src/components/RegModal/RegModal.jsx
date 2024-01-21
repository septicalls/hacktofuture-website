import React from "react";
import Popup from "reactjs-popup";
import "./RegModal.css";
import { auth, provider } from "../../config/firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RegModal = () => {
  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [authDone, setAuthDone] = useState(false);
  const googleAuth = (event) => {
    event.preventDefault();
    signInWithPopup(auth, provider).then((data) => {
      setValue(data.user.email);
      sessionStorage.setItem("email", data.user.email);
      setAuthDone(true);
      navigate("/registration");
    });
  };
  return (
    <Popup
      trigger={
        <button className="text-white bg-blue-500 transition duration-300 ease-in-out text-lg font-bold px-10 py-1 hover:scale-105 rounded-3xl lg:mr-6 ">
          Register
        </button>
      }
      modal
      nested
    >
      {(close) => (
        <div className="modal bg-slate-50 rounded-lg shadow-md p-4 w-80 mx-auto mt-20 md:w-full lg:w-96">
          <div className="header border-b-2 border-gray-300 py-2 text-xl font-bold flex justify-between items-center">
            <span>Register</span>
            <button
              className="text-gray-500 hover:text-gray-600"
              onClick={close}
            >
              &times;
            </button>
          </div>
          <div className="content py-4 text-sm text-gray-700">
            {/* Your content goes here */}
            Dear participant, if you plan on registering for the 36-hour company themed hackathon, an abstract must be submitted along with your application. Please make a copy of <a className="border-b-4 border-blue-300" href="link for the abstract doc: https://docs.google.com/document/d/1b8UOI4Ptn2G0G_Gks3H4MfAa81GuI8QJqq2wPhnBVgY/edit?usp=sharing">this Google Document</a>, edit it to fill your abstract details, and copy the link with access set to "Anyone on the internet with the link can view".
          </div>
          <div className="actions flex flex-col justify-center mt-4">
            <button className="text-text_col_1 bg-bg_color_2 transition duration-300 ease-in-out text-lg font-bold px-6 py-2 hover:scale-105 rounded-md mb-2">
              Open theme
            </button>
            <button
              onClick={(e) => googleAuth(e)}
              className="text-text_col_1 bg-bg_color_2 transition duration-300 ease-in-out text-lg font-bold px-6 py-2 hover:scale-105 rounded-md"
            >
              Company Specific
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};

export default RegModal;
