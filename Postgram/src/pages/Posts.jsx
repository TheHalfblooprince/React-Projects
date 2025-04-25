import React, { use, useEffect } from "react";
import { UsersContext } from "../context/UserContext";
import axios from "axios";
function Posts() {
  // create a state to store and fetch data from the post API.
  const { currentUser } = React.useContext(UsersContext);

  const [postsData, setPostsData] = React.useState([]);

  const [comments, setComments] = React.useState([]);
  // use the useEffect hook to fetch the data from the API.
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => setPostsData(data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    postsData.forEach((post) => {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((res) => {
          setComments((prev) => ({ ...prev, [post.id]: res.data }));
        });
    });
  }, [postsData]);

  console.log("Comments: ", comments);

  const posts = postsData.map((post) => {
    return (
      <div
        className="border-2 border-orange-400 rounded-lg p-4 m-4 wrap leading-relaxed max-w-250 mt-10"
        key={post.id}
      >
        <h1 className="text-3xl font-bold text-orange-500">
          {" "}
          Title: {post?.title}
        </h1>
        <p className="text-lg mt-10 text-white">Body : {post.body}</p>
        <button
          onClick={() => handleDelete(post.id)}
          className="p-2 mt-6 rounded-lg text-center bg-orange-500 cursor-pointer"
        >
          Delete Post
        </button>
        <button
          onClick={() =>
            handleEdit(
              post.id,
              prompt("Edit title", post.title),
              prompt("Edit content", post.body)
            )
          }
          className="p-2 mt-6 ml-3 rounded-lg text-center bg-orange-500 cursor-pointer"
        >
          Edit Post
        </button>

        <h1 className="text-2xl font-bold text-orange-500 mt-10">Comments:</h1>

         
        {comments[post.id]?.map((comment) => (
        <div
          className="border-2 border-orange-400 rounded-lg p-4 m-4 wrap leading-relaxed max-w-250 mt-10"
          key={comment.id}
        >
          <h1 className="text-xs text-orange-500">Name: {comment.email}</h1>
          <p className="text-xs mt-10 text-white">Body: {comment.body}</p>

          {/* Edit and Delete Buttons for Comments */}
          {comment.email === currentUser?.email && (
            <div className="flex gap-3 mt-1 text-xs">
              <button
                onClick={() => {
                  const newBody = prompt("Edit Comment", comment.body);
                  if (newBody) {
                    handleEditComment(post.id, comment.id, newBody);
                  }
                }}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteComment(post.id, comment.id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
            
        

        {/* Add commeent Section */}
        {currentUser && (
          <input
            type="text"
            className="mt-3
            w-full
            px-3
            py-2
            border
            rounded-md
            focus:outline-none
            focus:ring-2
            focus:ring-blue-300"
            placeholder="Write a comment and press Enter"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.value.trim() !== "") {
                addComment(post.id, e.target.value);
                e.target.value = "";
              }
            }}
          />
        )}

      </div>
    );
  });

  function addPost(e) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const formData = Object.fromEntries(new FormData(e.currentTarget));
    const newPost = {
      id: postsData.length + 1,
      title: formData.title,
      body: formData.body,
      // how to get the current user and assign that userId to him.
    };
    setPostsData((prevPosts) => [newPost, ...prevPosts]);
    formEl.reset();
    // console.log(postsData)
  }

  function handleEdit(id, title, body) {
    const editedPost = postsData.map((post) => {
      if (post.id === id) {
        return { ...post, title: title, body: body };
      }
      return post;
    });
    console.log("Edited Post: ", editedPost);
    setPostsData(editedPost);
  }

  function handleDelete(id) {
    const newPosts = postsData.filter((post) => post.id !== id);
    setPostsData(newPosts);
  }

  function addComment(postId, body) {
    const comment = { postId, body, email: currentUser.email, id: Date.now() };
    setComments((prev) => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])],
    }));
  }


  const handleDeleteComment = (postId, commentId) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId]?.filter((comment) => comment.id !== commentId) || [],
    }));
  };

  const handleEditComment = (postId, commentId, newBody) => {
    setComments((prev) => ({
      ...prev,
      [postId]: prev[postId]?.map((comment) =>
        comment.id === commentId ? { ...comment, body: newBody } : comment
      ),
    }));
  };

  return (
    <div className="flex flex-col mt-16 font-bold text-white">
      <form
        className="p-4 flex flex-col border-1 border-white rounded-lg "
        onSubmit={addPost}
      >
        <h1 className="text-white text-2xl text-center">Add a post</h1>

        <label
          className="text-orange-500"
          name="title"
          id="title"
          htmlFor="title"
        >
          Title:
        </label>
        <input
          className="m-4 bg-gray-500 p-4"
          type="text"
          name="title"
          id="title"
          placeholder="Enter the title"
          required
        />

        <label className="mt-4 text-orange-500 text-lg" htmlFor="body">
          Body:
        </label>
        <textarea
          className="m-4 bg-gray-500 p-4 text-sm"
          type="text"
          name="body"
          id="body"
          placeholder={`What's on your Mind....`}
          required
        />

        <button className="flex items-center justify-center rounded-lg cursor-pointer text-center mt-4 bg-orange-400 p-3">
          Add Post
        </button>
      </form>
      <h1 className="text-5xl text-orange-500 mt-16">Posts: </h1>
      {posts}
    </div>
  );
}

export default Posts;
