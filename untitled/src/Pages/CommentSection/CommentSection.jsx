import React, { useEffect } from "react";
import { useState } from "react";
import axios from 'axios';

function CommentSection(){

  const accessTokenBarber = localStorage.getItem('accessTokenBarber');
  const [id , setId] = useState("");
  const [Comments , setComments] = useState([]);
  const [logo , setLogo] = useState("");
  const [barberShop , setBarbershop] = useState("");
  const [replyIndex , setReplyIndex] = useState("");
  const [replyText , setReplyText] = useState("");

    async function getComments(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setId(fetchedData.results[0].barber);
      setComments(fetchedData.results);
    }

  useEffect(()=>{
    const url = ("https://amirmohammadkomijani.pythonanywhere.com/barber/show-comments/");
    const options =  {
      headers : {
        Authorization : `JWT ${accessTokenBarber}`,
        'Content-Type' : 'application/json'
      }
    }
    getComments(url,options);
  },[])

  useEffect(() => {
    const url2 =(`https://amirmohammadkomijani.pythonanywhere.com/barber/info/${id}`);
    const options =  {
      headers : {
        Authorization : `JWT ${accessTokenBarber}`,
        'Content-Type' : 'application/json'
      }
    }
    async function BarberInfo(url,options){
      const response = await fetch(url,options);
      const fetchedData = await response.json();
      setLogo(fetchedData.logo);
      setBarbershop(fetchedData.BarberShop);
    }
    BarberInfo(url2,options);
  },[id])
  
  const handleReply = () => {
    const url = ("https://amirmohammadkomijani.pythonanywhere.com/barber/show-comments/");
    const options =  {
      headers : {
        Authorization : `JWT ${accessTokenBarber}`,
        'Content-Type' : 'application/json'
      }
    }
    if(replyText === ""){
      alert("you cant reply with empty text!");
    }
    else{
      axios({
        method: "put",
        url:`https://amirmohammadkomijani.pythonanywhere.com/barber/comments/${replyIndex}/reply/`,
        headers: {
            'Content-Type': 'application/json',
            Authorization : `JWT ${accessTokenBarber}`
        },
        data: {
            reply : replyText
        }
      })
      .then((res) => {
        getComments(url,options);
      })
    }
  }

  return(
    <div className="w-full min-h-screen bg-WhiteChocolate-500">
      <div className="py-8 lg:py-16 ">
        <div className="rounded max-w-2xl mx-auto px-4 py-2 bg-DesertSand-500">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-AteneoBlue-500 ">Comments</h2>
          </div>
          {Comments.map((Comment) => (
            <div className="bg-WhiteChocolate-500 rounded-lg">
              <article className="p-6 mt-6 text-base rounded-lg ">
                <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-AteneoBlue-600 font-bold"><img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={Comment.customer.profile_pic}
                                alt={Comment.first_name}/>{Comment.customer.first_name} {Comment.customer.last_name}</p>
                        <p className="text-sm text-AteneoBlue-300"><time pubdate datetime="2022-02-08">{Comment.created_at}</time></p>
                    </div>
                </footer>
                <p className="text-AteneoBlue-500">{Comment.body}</p>
                <div className="flex items-center mt-4 space-x-4">
                    <button type="button"
                        onClick={()=>{setReplyText(""); setReplyIndex(Comment.id)}}
                        className="flex items-center text-sm text-AteneoBlue-400 hover:underline">
                        <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                        Reply
                    </button>
                </div>
              </article>
              {Comment.reply !== null  ? (
                <article className="p-6 mb-6 ml-6 lg:ml-12 text-base bg-WhiteChocolate-500 rounded-b-lg">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <p className="inline-flex items-center mr-3 text-sm text-AteneoBlue-600 font-bold"><img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={logo}
                                alt={barberShop}/>{barberShop}</p>
                    </div>
                </footer>
                <p class="text-AteneoBlue-500">{Comment.reply}</p>
                </article>
              ):(<div></div>)}
              {replyIndex !== "" ? (
                replyIndex === Comment.id ? (
                  <form className="m-1 p-1 mb-2">
                    <div className="py-2 px-4 mb-4 bg-DesertSand-500 rounded-lg rounded-t-lg shadow">
                        <label for="comment" className="sr-only">Your comment</label>
                        <textarea id="comment" rows="6" value={replyText}
                            onChange={(event)=>{setReplyText(event.target.value)}}
                            className="px-0 w-full text-sm text-AteneoBlue-500 border-0 focus:ring-0 focus:outline-none placeholder-AteneoBlue-400 bg-DesertSand-500"
                            placeholder="Reply..."></textarea>
                    </div>
                    <div className="flex flex-row justify-between">
                      <button type="submit"
                          onClick={(event)=>{event.preventDefault(); handleReply()}}
                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-MediumRuby-500 rounded-lg focus:ring-4 focus:ring-MediumRuby-300 hover:bg-MediumRuby-600">
                          Reply
                      </button>
                      <button
                          onClick={(event)=>{event.preventDefault(); setReplyIndex(""); setReplyText("");}}
                          className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-MediumRuby-500 rounded-lg focus:ring-4 focus:ring-MediumRuby-300 hover:bg-MediumRuby-600">
                          cancel
                      </button>
                    </div>
                  </form>
                ):(<div></div>)
              ):(<div></div>)}
            </div>  
          ))}
        </div>
      </div>
    </div>
  )
}
export default CommentSection;