import { TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaLocationArrow } from "react-icons/fa6";


function Post({ title, content, author, profile_picture, date, likes, comments, imageUrl_1, imageUrl_2 }: { title: string, content: string, author: string, profile_picture:string, date: string, likes: number, comments: number, imageUrl_1: string, imageUrl_2: string}) {
  author = author || 'Anonymous';

  return (
    <div className="rounded-md max-w-[30rem] mx-2 my-2 shadow-md p-4 bg-white">
      <div className="flex justify-between items-start mb-3">
        <div className="flex gap-4">
          <img
            src={profile_picture}
            alt="pp"
            className="h-8 w-8 rounded-full object-cover"
          />
          <div>
            <h5 className="text-sm font-bold text-gray-800">{author}</h5>
            <p className="text-xs mt-1 text-gray-500">{date}</p>
          </div>
        </div>
        <div>
          <button className="text-gray-400 hover:text-gray-600 focus:outline-none p-1 hover:bg-gray-100 rounded-md">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path></svg>
            </svg>
          </button>
        </div>
      </div>
      <h4 className="text-xl font-bold text-gray-800 mb-3">{title}</h4>
      <p className="mb-4 text-gray-600">
        {content}
      </p>
      <div className="flex gap-4">
        <img src={imageUrl_1} alt="image post 1" className="h-36 w-36 rounded-md object-cover" />
        <img src={imageUrl_2} alt="image post 2" className="h-36 w-36 rounded-md object-cover" />
      </div>
      <div className="flex mt-6 gap-4">
        <Link to="/Feed" className="flex items-center gap-2 ml-2 hover:underline text-gray-700 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="mt-1" viewBox="0 0 16 16">
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm3.5 1a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zm0 2.5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z" />
          </svg>
          {comments} Comments
        </Link>
        <Link to="/Feed" className="flex items-center gap-2 ml-2 hover:underline text-gray-700 hover:text-gray-800">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
          </svg>
          {likes} Likes
        </Link>

      </div>
      <div className="flex gap-1 mt-6">
        <TextInput placeholder="Write a comment..." className="mt-4 flex-1" />
        <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-md mt-4"><FaLocationArrow /></button>
      </div>
    </div>
  )
}

export default Post
