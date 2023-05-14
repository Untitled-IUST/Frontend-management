import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { json } from "react-router-dom";
import backgroundImageLoginBarber from "./images/LoginBarber.png";

function LoginBarber(){

  const [emailAddress , setEmailAddress] = useState("");
  const [emailAddressError , setEmailAddressError] = useState("");
  const [passwordError , setPasswordError] = useState("");
  const [Error , setError] = useState("");
  const [password , setpassword] = useState("");
  const [isPasswordVisible , setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  }

  //tokens
  let accessToken = localStorage.getItem('accessToken');
  let refreshToken = localStorage.getItem('refreshToken');

  const handleLogin = (event) => {
    setError("");
    event.preventDefault();
    axios({
      method: "post",
      url: "https://amirmohammadkomijani.pythonanywhere.com/auth/jwt/create/",
      headers: {
          'Content-Type': 'application/json',
          Authorization : `JWT ${accessToken}`
      },
      data: {
          email: emailAddress,
          password: password,
      }
    })
    .then((res) => {
      alert('You are logged in'); 
      localStorage.setItem('accessToken',res.data.access);
      localStorage.setItem('refreshToken',res.data.refresh);
    })
    .catch(error => {
      setError(error.response.data["detail"]);
      setEmailAddressError(error.response.data["email"]);
      setPasswordError(error.response.data["password"]);
    }) 
  }

  const handleEmail = (event) => {
    setEmailAddress(event.target.value);
  }
  const handlePassword = (event) => {
    setpassword(event.target.value);
  }

  return(
    <div className="bg-backGround-500 min-h-screen">
    <div className=" flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-center mx-3">
          <div className="bg-backGround-500 w-full flex appearance-none">
            <div className="w-full lg:flex items-center hidden lg:w-1/2 bg-cover rounded-l-lg">
              <img src={backgroundImageLoginBarber} alt="Login"/>
            </div>
            <div className="w-full lg:w-1/2 rounded-lg lg:rounded-l-none">
              <h3 className="text-Mauve-700 mt-12 text-2xl text-center">Login To Your Salon</h3>
              <form className="mx-8 mt-6 mb-4 rounded">
                <div className="mb-4">
                  <label className="text-Mauve-700 block mb-2 text-sm font-bold" for="Email">
                    Email
                  </label>
                  <div className="relative">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                    </div>
                    <input
                      className="bg-backGround-500 border-2 border-gray-400 focus:border-Mauve-700 w-full pl-10 py-2 text-base text-Mauve-700 leading-tight   rounded appearance-none focus:outline-none"
                      id="Email"
                      type="email"
                      onChange={handleEmail}
                    />
                  </div>
                  <p className="m-1 text-xs italic text-red-500">{emailAddressError}</p>
                </div>
                <div className="relative mb-4">
                  <label className="text-Mauve-700 block mb-2 text-sm font-bold" for="Password">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg aria-hidden="true" class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                    </div>
                    <input
                      className="border-gray-400 bg-backGround-500 border-2 focus:border-Mauve-700 w-full pl-10 py-2 text-base text-Mauve-700 leading-tight   rounded appearance-none focus:outline-none"
                      id="Password"
                      type={isPasswordVisible ? "text" : "password"}
                      onChange={handlePassword}
                    />
                  </div>
                  <p className="text-xs italic text-red-500">{passwordError}</p>
                  <button
                      type="button"
                      className="text-gray-400 absolute inset-y-12 right-0 flex items-center px-2"
                      onClick={togglePasswordVisibility}
                    >
                      {isPasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      )}
                    </button>
                </div>
                <div className="mb-4 text-center">
                  <button
                    className="w-full py-2 font-bold text-white bg-Mauve-700 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleLogin}
                  >
                    Login
                  </button>
                </div>
                <p className="m-1 text-xs italic text-red-500">{Error}</p>
                <hr className="mb-3 border-t text-gray-400" />
                <Link to="/SignUpBarber" className="bg-gray-600 py-2.5 rounded w-full text-center text-white inline-block text-sm align-baseline">
                  Create an Account!
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default LoginBarber;