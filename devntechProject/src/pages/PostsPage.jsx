import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

const PostsPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setPosts(res.data));
  }, []);

  useEffect(() => {
    posts.forEach((post) => {
      axios
        .get(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
        .then((res) => {
          setComments((prev) => ({ ...prev, [post.id]: res.data }));
        });
    });
  }, [posts]);

  const addPost = () => {
    const post = { ...newPost, userId: user.id, id: Date.now() };
    setPosts([post, ...posts]);
    setNewPost({ title: "", body: "" });
  };

  const editPost = (id, title, body) => {
    setPosts(posts.map((p) => (p.id === id ? { ...p, title, body } : p)));
  };

  const deletePost = (id) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const addComment = (postId, body) => {
    const comment = { postId, body, email: user.email, id: Date.now() };
    setComments((prev) => ({
      ...prev,
      [postId]: [comment, ...(prev[postId] || [])],
    }));
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Community Posts
      </h2>

      {user && (
        <div className="bg-white p-5 rounded-lg shadow mb-8 space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">Create a Post</h3>
          <input
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Title"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <textarea
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="What's on your mind?"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <button
            onClick={addPost}
            className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Post
          </button>
        </div>
      )}

      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white p-5 rounded-lg shadow mb-6 space-y-3"
        >
          <div className="flex items-start justify-between">
            <h3 className="text-2xl font-semibold text-gray-800">{post.title}</h3>
            {user && user.id === post.userId && (
              <div className="space-x-2 text-sm text-right">
                <button
                  onClick={() =>
                    editPost(
                      post.id,
                      prompt("Edit title", post.title),
                      prompt("Edit content", post.body)
                    )
                  }
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deletePost(post.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          <p className="text-gray-700">{post.body}</p>


          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Comments</h4>
            <div className="space-y-2">
              {comments[post.id]?.map((c) => (
                <div
                  key={c.id}
                  className="bg-gray-50 p-3 rounded border border-gray-200"
                >
                  <p className="text-sm text-gray-800">
                    <span className="font-medium text-gray-600">{c.email}:</span>{" "}
                    {c.body}
                  </p>
                  {c.email === user?.email && (
                    <div className="flex gap-3 mt-1 text-xs">
                      <button
                        onClick={() => {
                          const newBody = prompt("Edit Comment", c.body);
                          if (newBody) {
                            setComments((prev) => ({
                              ...prev,
                              [post.id]: prev[post.id].map((comment) =>
                                comment.id === c.id
                                  ? { ...comment, body: newBody }
                                  : comment
                              ),
                            }));
                          }
                        }}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() =>
                          setComments((prev) => ({
                            ...prev,
                            [post.id]: prev[post.id].filter(
                              (comment) => comment.id !== c.id
                            ),
                          }))
                        }
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {user && (
              <input
                className="mt-3 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
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
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
