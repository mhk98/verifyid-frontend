import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetAllCommentQuery,
} from "../../features/comment/comment";
import {
  useDeletePostMutation,
  useEditPostDataMutation,
  useGetAllPostQuery,
} from "../../features/post/post";
import {
  useCreateReplyMutation,
  useDeleteReplyMutation,
  useEditReplyMutation,
  useGetAllReplyQuery,
} from "../../features/reply/reply";
import "./PostDisplay.css";

const PostDisplay = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [commentEditId, setCommentEditId] = useState();
  const [editedComment, setEditedComment] = useState("");
  const [replys, setReplys] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [localReactions, setLocalReactions] = useState({
    like: 0,
    love: 0,
    laugh: 0,
    angry: 0,
  });
  const userId = localStorage.getItem("userId");

  const [postEditText, setPostEditText] = useState("");

  const [editImage, setEditImage] = useState(null);

  const handleEditTextChange = (e) => {
    setPostEditText(e.target.value);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setEditImage(selectedImage);
  };

  const [editPostData] = useEditPostDataMutation();
  const handleSubmit = (postId, postEditText, editImage) => {
    const formData = new FormData();
    formData.append("content", postEditText);
    if (editImage) {
      formData.append("Image", editImage);
    }
    console.log("formData", formData);

    editPostData({ id: postId, data: formData });
  };

  const [deletePost] = useDeletePostMutation();

  const handleDeletePost = async (id) => {
    console.log("DeletePostId", id);
    const res = await deletePost(id);
  };

  const image = localStorage.getItem("image");
  const name = localStorage.getItem("name");

  console.log("comments", comments);
  const [commentText, setCommentText] = useState("");
  const handleCommentChange = (postId, e) => {
    const updatedCommentText = {
      ...commentText,
      [postId]: e.target.value,
    };
    setCommentText(updatedCommentText);
  };
  const { data, isLoading, isError, error } = useGetAllPostQuery();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching post data:", error);
    } else if (!isLoading) {
      setPosts(data.data);
    }
  }, [data, isLoading, isError, error]);

  console.log("Posts", data);
  // const [editPost] = useEditPostMutation();

  const handleLocalReaction = async (postId, reactionType) => {
    try {
      // Call the mutation to update the post on the server
      // await editPost({ id: postId, data: reactionType });

      // Update local reactions
      setLocalReactions((prevReactions) => ({
        ...prevReactions,
        [reactionType]: prevReactions[reactionType] + 1,
      }));
    } catch (error) {
      console.error("Error handling reaction:", error);
    }
  };

  const [createComment] = useCreateCommentMutation();

  const handleCommentSubmit = async (id) => {
    // Handle submitting the comment for the postId
    // You can use a mutation to send the comment to the server
    // Example: sendCommentMutation({ postId, commentText });
    const data = {
      postPostId: id,
      content: commentText[id] || "",
    };
    const comment = await createComment(data);
    // Reset comment input after submission
    setCommentText("");
  };

  const {
    data: commentData,
    isLoading: commentLoading,
    isError: commentError,
  } = useGetAllCommentQuery();

  useEffect(() => {
    if (commentError) {
      console.error("Error fetching comment data:", commentError);
    } else if (!commentLoading) {
      if (commentData && commentData.data) {
        setComments(commentData.data); // Update comments state with fetched comments
      }
    }
  }, [commentData, commentLoading, commentError]);

  const [replyingTo, setReplyingTo] = useState(null);

  const handleReply = (id) => {
    setIsReplying(true);
    setReplyingTo(id);
  };

  const [replyText, setReplyText] = useState(""); // State to handle reply text

  const [createReply] = useCreateReplyMutation();
  const handleReplyToComment = async (postId, commentId) => {
    try {
      // Call the function to post a reply using the replyText state

      const data = {
        postId,
        commentId,
        replyText,
      };
      await createReply(data);
      // Additional logic after successful reply
      setReplyText(""); // Reset reply text after posting
    } catch (error) {
      console.error("Error replying to comment:", error);
    }
  };

  // Function to update reply text state
  const handleReplyTextChange = (e) => {
    setReplyText(e.target.value);
  };

  const {
    data: replyData,
    isLoading: replyLoading,
    isError: replyError,
  } = useGetAllReplyQuery();

  useEffect(() => {
    if (replyError) {
      console.error("Error fetching comment data:", replyError);
    } else if (!replyLoading) {
      if (replyData && replyData.data) {
        setReplys(replyData.data); // Update comments state with fetched comments
      }
    }
  }, [replyData, replyLoading, replyError]);

  const handleEdit = (commentId) => {
    setIsEditing(true);
    setCommentEditId(commentId);
    // Fetch the comment content or set the content to be edited in the state
    // For instance, if 'comments' is an object with post IDs as keys and arrays of comments as values:
    // const editedContent = comments[post.post_Id][commentIndex].content;
    // setEditedComment(editedContent);
  };

  const [editReplyText, setEditReplyText] = useState("");

  // Function to update reply text state
  const handleEditReplyTextChange = (e) => {
    setEditReplyText(e.target.value);
  };

  const [editComment] = useEditCommentMutation();
  const handleEditedCommentSubmit = async (postId, commentId) => {
    try {
      console.log(
        `Edited comment with ID ${commentId} from post ID ${postId} with this ${editedComment}`
      );
      // Call the mutation to delete the comment on the server
      await editComment({ content: editReplyText, postId, commentId });

      // Log success or perform any other actions after successful deletion
    } catch (error) {
      // Handle error if the mutation fails
      console.error("Error deleting comment:", error);
    }
    // Reset state variables after editing
    setIsEditing(false);
    setEditedComment("");
    // Update state or refetch comments after editing
  };

  const [deleteComment] = useDeleteCommentMutation();
  const handleDelete = async (postId, commentId) => {
    try {
      console.log(
        `Deleted comment with ID ${commentId} from post ID ${postId}`
      );
      // Call the mutation to delete the comment on the server
      await deleteComment({ postId, commentId });

      // Log success or perform any other actions after successful deletion
    } catch (error) {
      // Handle error if the mutation fails
      console.error("Error deleting comment:", error);
    }
  };

  const [editedReply, setEditedReply] = useState(""); // State to handle edited reply text
  const [isReplyEditing, setIsReplyEditing] = useState(false); // State to handle reply editing
  const [replyBeingEdited, setReplyBeingEdited] = useState(null); // State to track which reply is being edited

  const handleEditReply = (replyId) => {
    setIsReplyEditing(true);
    setReplyBeingEdited(replyId);
  };

  const handleEditedReplyTextChange = (e) => {
    setEditedReply(e.target.value);
  };

  const [editReply] = useEditReplyMutation();
  const handleEditedReplySubmit = async (
    postId,
    commentId,
    replyId,
    editedReply
  ) => {
    try {
      const res = await editReply({
        content: editedReply,
        postId,
        commentId,
        replyId,
      });
      // Additional logic after successful reply edit

      console.log("editedReply", editedReply);
      setIsReplyEditing(false); // Reset editing state
      setEditedReply(""); // Reset edited reply text
      // Update state or refetch replies after editing
    } catch (error) {
      console.error("Error editing reply:", error);
    }
  };

  const [deleteReply] = useDeleteReplyMutation();
  const handleDeleteReply = async (postId, commentId, replyId) => {
    try {
      await deleteReply({ postId, commentId, replyId });
      // Additional logic after successful reply deletion
    } catch (error) {
      console.error("Error deleting reply:", error);
    }
  };

  useEffect(() => {
    const match = posts.filter((d) =>
      d.Identification.toLowerCase().includes(searchText)
    );
    setSearchResult(match);
  }, [searchText]);

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchText(searchTerm);

    // Update searchResult only if there's a search term
    if (searchTerm.trim() !== "") {
      const match = posts.filter((d) =>
        d.Identification.toLowerCase().includes(searchTerm)
      );
      setSearchResult(match);
    } else {
      // If search term is empty, show all default posts
      setSearchResult(posts);
    }
  };

  console.log("searchText", searchText);
  return (
    <div className=" my-12 grid grid-cols-1  max-w-2xl mx-auto border p-4">
      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 items-center mb-8 mx-auto">
        <h2 className=" text-xl font-bold ">Posts</h2>
        <div className="form-control">
          <input
            onChange={handleSearchChange}
            type="text"
            placeholder="Search"
            className="w-24 input input-bordered md:w-auto"
          />
        </div>
      </div>

      <div className="max-w-xl mx-auto">
        {searchResult.length ? (
          searchResult.map((post) => (
            <div className="post grid grid-cols-1" key={post.post_Id}>
              {/* Display post content */}
              <div className="grid grid-cols-2 my-6">
                <div className="grid grid-cols-2">
                  <div className="avatar placeholder">
                    <div className="w-12 rounded-full text-neutral-content">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={`https://verifyid-backend.onrender.com/${post.image}`}
                      />
                    </div>
                  </div>
                  <p>{name}</p>
                </div>

                <Link
                  className="p-1 border border-gray-400 rounded details-btn"
                  to={`/post/${post.post_Id}`}
                >
                  Details
                </Link>
              </div>

              <div className="post-content">
                <p className="text-left">{post.Email}</p>
                <p className="text-left">{post.Contact}</p>
                <p className="text-left">{post.Location}</p>
                <p className="text-left">{post.Description}</p>
                <p className="text-left">{post.Identification}</p>
                {post.Image && (
                  <img
                    src={`https://verifyid-backend.onrender.com/${post.Image}`}
                    alt="Post"
                  />
                )}
              </div>

              <div className="reactions-comments">
                {/* Comment input field */}
                <div className="comment-input">
                  <input
                    type="text"
                    className="mt-2 bg-white"
                    placeholder="Write a comment..."
                    value={commentText[post.post_Id] || ""}
                    onChange={(e) => handleCommentChange(post.post_Id, e)}
                  />

                  <div className="flex gap-2">
                    <div>
                      {comments.length > 1 ? (
                        <small>{comments.length} Comments</small>
                      ) : (
                        <small>{comments.length} Comment</small>
                      )}
                    </div>

                    <div>
                      {replys.length > 1 ? (
                        <small>{replys.length} Replys</small>
                      ) : (
                        <small>{replys.length} Reply</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="reaction-container">
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "like")}
                  className="bg-white reaction-btn"
                >
                  👍 {localReactions.like}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "love")}
                  className="bg-white reaction-btn"
                >
                  ❤️ {localReactions.love}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "laugh")}
                  className="bg-white reaction-btn"
                >
                  😆 {localReactions.laugh}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "angry")}
                  className="bg-white reaction-btn"
                >
                  😠 {localReactions.angry}
                </span>
              </div> */}
                <button
                  style={{
                    border: "1px solid #A8A8A8",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleCommentSubmit(post.post_Id)}
                >
                  Post
                </button>
              </div>

              {comments &&
                comments
                  .filter((comment) => comment.postPostId === post.post_Id)
                  .map((comment) => (
                    <div className="text-left" key={comment.id}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          justifyContent: "left",
                        }}
                      >
                        <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                          <div className="avatar placeholder">
                            <div className="w-12 text-neutral-content">
                              <img
                                alt=""
                                src={`https://verifyid-backend.onrender.com/${post.Image}`}
                              />
                            </div>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>

                      {/* Buttons for reply, delete, and edit */}
                      <div className="flex gap-2">
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() => handleReply(comment.id)}
                        >
                          Reply
                        </small>
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() => handleEdit(comment.id)}
                        >
                          Edit
                        </small>
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() =>
                            handleDelete(comment.postPostId, comment.id)
                          }
                        >
                          Delete
                        </small>
                      </div>
                      {/* Input field for reply */}
                      {isReplying && replyingTo === comment.id && (
                        <div>
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={handleReplyTextChange}
                          />

                          <button
                            onClick={() =>
                              handleReplyToComment(
                                comment.postPostId,
                                comment.id
                              )
                            }
                          >
                            Post Reply
                          </button>
                        </div>
                      )}

                      {isEditing && commentEditId === comment.id && (
                        <div>
                          <input
                            type="text"
                            placeholder="Write edit reply..."
                            value={editReplyText}
                            onChange={handleEditReplyTextChange}
                          />
                          <button
                            onClick={() =>
                              handleEditedCommentSubmit(
                                comment.postPostId,
                                comment.id
                              )
                            }
                          >
                            Update Reply
                          </button>
                        </div>
                      )}

                      {/* Display replies for this comment */}
                      {replys &&
                        replys
                          .filter((reply) => reply.commentId === comment.id)
                          .map((reply) => (
                            <div className="ms-4" key={reply.id}>
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  justifyContent: "left",
                                }}
                              >
                                <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                                  <div className="avatar placeholder">
                                    <div className="w-12 text-neutral-content">
                                      <img
                                        alt=""
                                        src={`https://verifyid-backend.onrender.com/${image}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <p>{reply.content}</p>
                              </div>

                              {/* Buttons for reply, delete, and edit */}
                              <div className="flex gap-2">
                                <small
                                  className="font-semibold cursor-pointer"
                                  onClick={() => handleEditReply(reply.id)}
                                >
                                  Edit
                                </small>
                                <small
                                  className="font-semibold cursor-pointer"
                                  onClick={() =>
                                    handleDeleteReply(
                                      reply.postPostId,
                                      reply.commentId,
                                      reply.id
                                    )
                                  }
                                >
                                  Delete
                                </small>
                              </div>

                              {/* Input field for reply */}
                              {isReplyEditing &&
                                replyBeingEdited === reply.id && (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Write edit reply..."
                                      value={editedReply}
                                      onChange={(e) =>
                                        handleEditedReplyTextChange(e)
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleEditedReplySubmit(
                                          reply.postPostId,
                                          reply.commentId,
                                          reply.id,
                                          editedReply
                                        )
                                      }
                                    >
                                      Update Reply
                                    </button>
                                  </div>
                                )}
                            </div>
                          ))}
                    </div>
                  ))}
            </div>
          ))
        ) : posts.length ? (
          posts.map((post) => (
            <div className="post" key={post.post_Id}>
              {/* Display post content */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  justifyContent: "space-between",
                }}
              >
                <div className="post-header">
                  <div className="avatar placeholder">
                    <div className="w-12 rounded-full text-neutral-content">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={`https://verifyid-backend.onrender.com/${post.Image}`}
                      />
                    </div>
                  </div>
                  <p>{name}</p>
                </div>

                <Link
                  className="p-1 border border-gray-400 rounded details-btn"
                  to={`/post/${post.post_Id}`}
                >
                  Details
                </Link>
              </div>

              <div className="post-content">
                <p className="text-left">{post.Email}</p>
                <p className="text-left">{post.Contact}</p>
                <p className="text-left">{post.Location}</p>
                <p className="text-left">{post.Description}</p>
                <p className="text-left">{post.Identification}</p>
                {post.Image && (
                  <img
                    src={`https://verifyid-backend.onrender.com/${post.Image}`}
                    alt="Post"
                  />
                )}
              </div>

              <div className="reactions-comments">
                {/* Comment input field */}
                <div className="comment-input">
                  <input
                    type="text"
                    className="mt-2"
                    placeholder="Write a comment..."
                    value={commentText[post.post_Id] || ""}
                    onChange={(e) => handleCommentChange(post.post_Id, e)}
                  />

                  <div className="flex gap-2">
                    <div>
                      {comments.length > 1 ? (
                        <small>{comments.length} Comments</small>
                      ) : (
                        <small>{comments.length} Comment</small>
                      )}
                    </div>

                    <div>
                      {replys.length > 1 ? (
                        <small>{replys.length} Replys</small>
                      ) : (
                        <small>{replys.length} Reply</small>
                      )}
                    </div>
                  </div>
                </div>

                {/* <div className="reaction-container">
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "like")}
                  className="bg-white reaction-btn"
                >
                  👍 {localReactions.like}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "love")}
                  className="bg-white reaction-btn"
                >
                  ❤️ {localReactions.love}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "laugh")}
                  className="bg-white reaction-btn"
                >
                  😆 {localReactions.laugh}
                </span>
                <span
                  onClick={() => handleLocalReaction(post.post_Id, "angry")}
                  className="bg-white reaction-btn"
                >
                  😠 {localReactions.angry}
                </span>
              </div> */}
                <button
                  style={{
                    border: "1px solid #A8A8A8",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "10px",
                  }}
                  onClick={() => handleCommentSubmit(post.post_Id)}
                >
                  Post
                </button>
              </div>

              {comments &&
                comments
                  .filter((comment) => comment.postPostId === post.post_Id)
                  .map((comment) => (
                    <div className="text-left" key={comment.id}>
                      <div
                        className=""
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          justifyContent: "left",
                        }}
                      >
                        <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                          <div className="avatar placeholder">
                            <div className="w-12 text-neutral-content">
                              <img
                                alt=""
                                src={`https://verifyid-backend.onrender.com/${post.Image}`}
                              />
                            </div>
                          </div>
                        </div>
                        <p>{comment.content}</p>
                      </div>

                      {/* Buttons for reply, delete, and edit */}
                      <div className="flex gap-2">
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() => handleReply(comment.id)}
                        >
                          Reply
                        </small>
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() => handleEdit(comment.id)}
                        >
                          Edit
                        </small>
                        <small
                          className="font-semibold cursor-pointer"
                          onClick={() =>
                            handleDelete(comment.postPostId, comment.id)
                          }
                        >
                          Delete
                        </small>
                      </div>
                      {/* Input field for reply */}
                      {isReplying && replyingTo === comment.id && (
                        <div>
                          <input
                            type="text"
                            placeholder="Write a reply..."
                            value={replyText}
                            onChange={handleReplyTextChange}
                          />

                          <button
                            onClick={() =>
                              handleReplyToComment(
                                comment.postPostId,
                                comment.id
                              )
                            }
                          >
                            Post Reply
                          </button>
                        </div>
                      )}

                      {isEditing && commentEditId === comment.id && (
                        <div>
                          <input
                            type="text"
                            placeholder="Write edit reply..."
                            value={editReplyText}
                            onChange={handleEditReplyTextChange}
                          />
                          <button
                            onClick={() =>
                              handleEditedCommentSubmit(
                                comment.postPostId,
                                comment.id
                              )
                            }
                          >
                            Update Reply
                          </button>
                        </div>
                      )}

                      {/* Display replies for this comment */}
                      {replys &&
                        replys
                          .filter((reply) => reply.commentId === comment.id)
                          .map((reply) => (
                            <div className="ms-4" key={reply.id}>
                              <div
                                className=""
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "6px",
                                  justifyContent: "left",
                                }}
                              >
                                <div className="-space-x-6 avatar-group rtl:space-x-reverse">
                                  <div className="avatar placeholder">
                                    <div className="w-12 text-neutral-content">
                                      <img
                                        alt=""
                                        src={`https://verifyid-backend.onrender.com/${image}`}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <p>{reply.content}</p>
                              </div>

                              {/* Buttons for reply, delete, and edit */}
                              <div className="flex gap-2">
                                <small
                                  className="font-semibold cursor-pointer"
                                  onClick={() => handleEditReply(reply.id)}
                                >
                                  Edit
                                </small>
                                <small
                                  className="font-semibold cursor-pointer"
                                  onClick={() =>
                                    handleDeleteReply(
                                      reply.postPostId,
                                      reply.commentId,
                                      reply.id
                                    )
                                  }
                                >
                                  Delete
                                </small>
                              </div>

                              {/* Input field for reply */}
                              {isReplyEditing &&
                                replyBeingEdited === reply.id && (
                                  <div>
                                    <input
                                      type="text"
                                      placeholder="Write edit reply..."
                                      value={editedReply}
                                      onChange={(e) =>
                                        handleEditedReplyTextChange(e)
                                      }
                                    />
                                    <button
                                      onClick={() =>
                                        handleEditedReplySubmit(
                                          reply.postPostId,
                                          reply.commentId,
                                          reply.id,
                                          editedReply
                                        )
                                      }
                                    >
                                      Update Reply
                                    </button>
                                  </div>
                                )}
                            </div>
                          ))}
                    </div>
                  ))}
            </div>
          ))
        ) : (
          <h3 className="text-xl text-center">No post found</h3>
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
