import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Link } from "react-router-dom";
function Blogs(props) {

  const [blogs, setBlogs] = useState([]);
  const [allBlogs,setAllBlogs]=useState([]);

  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:8000/api/blog")
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  async function fetchApi(){
    const res=await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=300be0372ce64ead840346911752051c').catch((err)=>console.log(err));
    setAllBlogs(res.data.articles);
  }
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
    fetchApi();

  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
            <Blog id={blog._id} title={blog.title} content={blog.content} isUser={blog.user._id} userName={blog.user.name} image={blog.image}
            
          />
        ))}
        {allBlogs.map((allBlog)=>(
          <Blog id={allBlog.source.id} title={allBlog.title} content={allBlog.content} isUser={false} userName={allBlog.author} image={allBlog.urlToImage}/>))}
    </div>
  );
}

export default Blogs;
