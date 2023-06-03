import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function SendEmail() {

  const [email , setEmail] = useState("");
  const[submitError , setSubmitError] = useState("");
  let navigate = useNavigate();

  function handleSubmit(event){
    event.preventDefault();
    if(email !== null){
      setEmail(email.toLowerCase())
    }
    setSubmitError("");
    axios({
      method: "post",
      url: "https://amirmohammadkomijani.pythonanywhere.com/auth/users/reset_password/",
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        email : email
      }
    })
    .then((res) => {
      if (res.status === 204) {
        setSubmitError("no user with this email exists");
      } else {
        alert('Check your email to reset your password!');
        navigate('/');
      }
    })
    .catch(error => {
      setSubmitError(error.response.data["email"]);
    }) 
  }

  return(
    <div className=" bg-WhiteChocolate-500 min-h-screen flex flex-col justify-center">
      <div className="max-w-[800px] container mx-auto">
          <h3 className="text-AteneoBlue-500 font-bold text-2xl text-center">Forgot Password</h3>
          <div className="rounded-lg bg-DesertSand-500">
            <form className="mx-8 mt-6 pt-3 pb-1 rounded">
              <div className="mb-3">
                <label className="text-AteneoBlue-500 block mb-2 text-sm font-bold" for="Email">
                  Email
                </label>
                <div className="relative">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" class="w-5 h-5 text-AteneoBlue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                  </div>
                  <input
                    onChange={(event)=>{setEmail(event.target.value)}}
                    className="bg-WhiteChocolate-500 border-2 border-WhiteChocolate-500 w-full pl-10 py-2 h-9 text-base text-AteneoBlue-500 leading-tight   rounded appearance-none focus:outline-none"
                    id="Email"
                    type="email"
                  />
                </div>
              </div>
              <div className="mb-2 text-center">
                <button
                  onClick={(event)=>{handleSubmit(event)}}
                  className="hover:bg-MediumRuby-600 w-full py-2 font-bold text-white bg-MediumRuby-500 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Send Email
                </button>
              </div>
              <p className="m-1 text-xs italic text-MediumRuby-500">{submitError}</p>
              <hr className="mb-3 border-t text-AteneoBlue-500" />
              <Link to="/SignUpBarber" className="hover:bg-AteneoBlue-600 mb-2 bg-AteneoBlue-500 py-2.5 rounded w-full text-center text-white inline-block text-sm align-baseline">
                Create an Account!
              </Link>
            </form>
          </div>
      </div>
    </div>
  )
}

export default SendEmail;