import "./App.css";
import Header from "./components/Header";
import Auth from "./components/Auth";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import Blog from './components/Blog';
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(authActions.signin());
    }
  }, [dispatch]);
  const isEmpty=true;
  return (
    <React.Fragment>
      <Header>
        <Header />
      </Header>
      <main>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route exact path="/auth" element={<Auth />} />
              <Route exact path="/" element={<Blogs isEmpty={isEmpty}/>} />
            </>
          ) : (
            <>
              <Route exact path="/" element={<Blogs/>} />
              <Route exact path="/blogs/add" element={<AddBlog />} />
              <Route exact path="/myBlogs" element={<UserBlogs />} />
              <Route exact path="/myBlogs/:id" element={<BlogDetail />} />
            </>
          )}
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
