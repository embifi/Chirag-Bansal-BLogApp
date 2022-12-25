import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Link } from "react-router-dom";
function UserBlogs() {
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");
  const flag=false;
  const [userName,setUserName]=useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`http://localhost:8000/api/blog/user/${id}`)
      .catch((err) => console.log(err));
    setUserName(res.data.user.name);
    const data = await res.data;
    console.log(res.data.user);
    // console.log("UserName",userName);
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);

  return (
    <div>
      {user &&
        user.blogs.length>0 &&
        user.blogs.map((blog, index) => (
          <Blog id={blog._id} title={blog.title} content={blog.content} isUser={blog.user._id} userName={userName} image={blog.image}/>
        ))}
    </div>
  );
}

export default UserBlogs;