import React from "react";
import { Link } from "react-router-dom";
import { useState} from "react";
import axios from "axios";
import backGroundImageBarberSignUp from "./images/SignUpBarber.png"

function SignUpBarber(){
  //states
  const [username , setUsername] = useState(null);
  const [emailAddress , setEmailAddress] = useState(null);
  const [password , setPassword] = useState(null);
  const [confirmPassword , setConfirmPassword] = useState(null);
  const [isPasswordVisible , setIsPasswordVisible] = useState(false);
  const [isCPasswordVisible , setIsCPasswordVisible] = useState(false);
  //errors
  const[usernameError,setUsernameError] = useState(true);
  const[emailAddressError , setEmailAddressError] = useState(true);
  const[passwordError , setPasswordError] = useState(true);
  const[confirmPasswordError , setConfirmPasswordError] = useState(true);
  const[submitError , setSubmitError] = useState(true);


  const validEmailAddress = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  );
  const validPassword = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/
  );
  const validUserName =  new RegExp(
    /^[A-Za-z0-9_]{4,15}$/
  );

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  }
  const toggleCPasswordVisibility = () => {
    setIsCPasswordVisible((prevState) => !prevState);
  }

  const handleEmail = (event) => {
    if(event.target.value === "")
    {
      setEmailAddressError("Please enter email");
    }
    else if(!validEmailAddress.test(event.target.value)){
      setEmailAddressError("Invalid email");
    }
    else{
      setEmailAddressError(false);
      setEmailAddress(event.target.value);
    }
  }

  const handlePassword = (event) => {
    if(event.target.value === ""){
      setPasswordError("Please enter password");
    }
    else if(!validPassword.test(event.target.value)){
      setPasswordError("its not 8 to 15 char.have 1 uppercase,1 lower case and 1 special char");
    }
    else{
      setPasswordError(false);
      setPassword(event.target.value);
    }
  }

  const handleConfirmPassword = (event) => {
    if(event.target.value === ""){
      setConfirmPasswordError("Please confirm password");
    }
    else if(event.target.value !== password){
      setConfirmPasswordError("password != confirm password");
    }
    else{
      setConfirmPasswordError(false);
      setConfirmPassword(event.target.value);
    }
  }
  const handleUsername = (event) => {
    if(event.target.value === ""){
      setUsernameError("Please enter username");
    }
    else if(!validUserName.test(event.target.value)){
      setUsernameError("Username must start with a letter and only contains letters,numbers and _ and have 4 to 15 char");
    }
    else{
      setUsernameError(false);
      setUsername(event.target.value);
    }
  }
  
  const togglePassword = (event) => {
    let x = document.getElementById("pswrd");
    if(x.type === "password"){
      x.type = "text";
    } else {
      x.type = "password"
    }
  }
  const toggleConfirmPassword = (event) => {
    let x = document.getElementById("pswrdConfirm");
    if(x.type === "password"){
      x.type = "text";
    } else {
      x.type = "password"
    }
  }
  
  function handleSubmit(event){
    event.preventDefault();
    setSubmitError("");
    if( emailAddressError === false && passwordError === false && confirmPasswordError === false && usernameError === false)
    {
      axios({
        method: "post",
        url: "https://amirmohammadkomijani.pythonanywhere.com/auth/users/",
        headers: {
            'Content-Type': 'application/json',
        },
        data: {
          "role" : "barber",
          "username" : username,
          "email": emailAddress,
          "password": password
        }
      })
      .then((res) => {
        alert('Your salon registered succesfully');
      })
      .catch(error => {
        setUsernameError(error.response.data["username"]);
        setEmailAddressError(error.response.data["email"]);
        setPasswordError(error.response.data["password"]);
        console.log(error.response.data);
      }) 
      setSubmitError(false)
    }
    else{
      setSubmitError("Please check again!");
    }
  }

  return(
    <div className="min-h-screen bg-backGround-500">
    <div className="flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-center mx-3">
          <div className="bg-backGround-500 w-full flex appearance-none">
            <div className="w-full items-center hidden lg:flex lg:w-1/2 bg-cover rounded-l-lg">
              <img src={backGroundImageBarberSignUp} alt="SignUp" />
            </div>
            <div className="w-full lg:w-1/2 rounded-lg lg:rounded-l-none">
              <h3 className="text-Mauve-700 mt-12 text-2xl text-center">Sign Up Your Salon</h3>
              <form className="mx-8 mt-6 pb-8 mb-4 rounded">
              <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-Mauve-700" for="Username">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    </div>
                    <input
                      className="bg-backGround-500 border-2 border-gray-400 focus:border-Mauve-700 w-full pl-10 py-2 text-base text-Mauve-700 leading-tight   rounded appearance-none focus:outline-none"
                      id="Username"
                      type="text"
                      onChange={handleUsername}
                    />
                  </div>
                  <p className="m-1 text-xs italic text-red-500">{usernameError}</p>
                </div>
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
                <div className="mb-4 md:flex md:justify-between">
                  <div className="relative mb-4 md:mr-2 md:mb-0">
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
                    <p className="m-1 text-xs italic text-red-500"><p>{passwordError}</p></p>
                    <button
                      type="button"
                      className="absolute inset-y-12 right-0 flex items-center px-2 text-gray-400"
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
                  <div className="relative md:ml-2">
                    <label className="text-Mauve-700 block mb-2 text-sm font-bold" for="C_password">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                      </div>
                      <input
                        className="border-gray-400 bg-backGround-500 border-2 focus:border-Mauve-700 w-full pl-10 py-2 text-base text-Mauve-700 leading-tight   rounded appearance-none focus:outline-none"
                        id="C_password"
                        type={isCPasswordVisible ? "text" : "password"}
                        onChange={handleConfirmPassword}
                      />
                    </div>
                    <p className="m-1 text-xs italic text-red-500"><p>{confirmPasswordError}</p></p>
                    <button
                      type="button"
                      className="absolute inset-y-12 right-0 flex items-center px-2 text-gray-400"
                      onClick={toggleCPasswordVisibility}
                    >
                      {isCPasswordVisible ? (
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
                </div>
                <div className="mb-4 text-center">
                  <button
                    className="w-full py-2 font-bold text-white bg-Mauve-700 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Register Your Salon
                  </button>
                  <p className="m-1 text-xs italic text-red-500">{submitError}</p>
                </div>
                <hr className="mb-3 border-t text-gray-400" />
                <Link to="/LoginBarber" className="inline-block text-sm text-white align-baseline py-2.5 w-full rounded bg-gray-600 text-center">
                  Already have an account? Login!
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

export default SignUpBarber;