import React from "react";
import { useState } from "react";

function CommentSection(){
  
  const [comments , setComments] = useState([]);
  return(
    <div className="w-full min-h-screen bg-WhiteChocolate-500">
      <div className="py-8 lg:py-16 ">
        <div className="rounded max-w-2xl mx-auto px-4 py-2 bg-DesertSand-500">
          <div className="flex justify-center items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-AteneoBlue-500 ">Comments</h2>
          </div>
          <article className="p-6 mb-6 text-base bg-WhiteChocolate-500 rounded-lg ">
            <footer className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                    <p className="inline-flex items-center mr-3 text-sm text-AteneoBlue-600 font-bold"><img
                            className="mr-2 w-6 h-6 rounded-full"
                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                            alt="Michael Gough"/>Ehsan Ahmadpoor</p>
                    <p className="text-sm text-AteneoBlue-300"><time pubdate datetime="2022-02-08"
                            title="February 8th, 2022">Feb. 8, 2022</time></p>
                </div>
            </footer>
            <p className="text-AteneoBlue-500">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                instruments for the UX designers. The knowledge of the design tools are as important as the
                creation of the design strategy.</p>
            <div className="flex items-center mt-4 space-x-4">
                <button type="button"
                    className="flex items-center text-sm text-AteneoBlue-400 hover:underline">
                    <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    Reply
                </button>
            </div>
          </article>
          <form className="mb-6">
            <div className="py-2 px-4 mb-4 bg-WhiteChocolate-500 rounded-lg rounded-t-lg shadow">
                <label for="comment" className="sr-only">Your comment</label>
                <textarea id="comment" rows="6"
                    className="px-0 w-full text-sm text-AteneoBlue-500 border-0 focus:ring-0 focus:outline-none placeholder-AteneoBlue-400 bg-WhiteChocolate-500"
                    placeholder="Reply..."></textarea>
            </div>
            <button type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-MediumRuby-500 rounded-lg focus:ring-4 focus:ring-MediumRuby-300 hover:bg-MediumRuby-600">
                Post comment
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default CommentSection;