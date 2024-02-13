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
import admit from "../../image/admit-card.jpg";
import dolil from "../../image/dolil.jpg";
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

  console.log("Posts", posts);
  // const [editPost] = useEditPostMutation();

  const postsFilter = posts.filter((post) => post.Post_Status === "Approved");

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
    const match = postsFilter.filter((d) =>
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
    <div className="post-creation mt-24">
      <div className=" post-display my-12 grid grid-cols-1  max-w-4xl mx-auto border border-slate-500 p-4">
        <div className=" my-12 grid grid-cols-2 ">
          <h2 className=" text-xl font-bold ">Posts</h2>
          <div className="form-control">
            <input
              onChange={handleSearchChange}
              type="text"
              placeholder="Search"
              className="max-w-xs input input-bordered md:w-auto"
            />
          </div>
        </div>

        {/* <div className="post grid grid-cols-1"> */}
        {searchResult.length ? (
          searchResult.map((post) => (
            <div className=" grid grid-cols-1 border mb-6 " key={post.post_Id}>
              {/* Display post content */}
              <div className="grid grid-cols-2 my-6">
                <div className="grid grid-cols-2">
                  <div className="avatar placeholder">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={`https://doctrack-server.onrender.com/${post.Profile_Url}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                  <p>{post.Name}</p>
                </div>

                {post.Status === "Found" && (
                  <Link
                    className="p-1 border border-gray-400 rounded details-btn"
                    to={`/post/${post.post_Id}`}
                  >
                    Details
                  </Link>
                )}
              </div>

              <div className="post-content">
                <p className="text-left">
                  <span className="font-bold">Name: </span>
                  {post.Name}
                </p>

                <p className="text-left">
                  <span className="font-bold">Status: </span>

                  {post.Status}
                </p>
                <p className="text-left">
                  <span className="font-bold">Type: </span>

                  {post.Identification}
                </p>
                <p className="text-left">
                  <span className="font-bold">Last 6 digit: </span>

                  {post.IdNumber.slice(-6)}
                </p>

                <p className="text-left">
                  {" "}
                  <span className="font-bold">Owner Name: </span>
                  {post.Owner_Name}
                </p>
                <p className="text-left">
                  {" "}
                  <span className="font-bold">Location: </span>
                  {post.Location}
                </p>
                <p className="text-left">
                  {" "}
                  <span className="font-bold">Description: </span>
                  {post.Description}
                </p>

                {post.Identification === "NID" ? (
                  <img src="https://i.ibb.co/51ntN8n/nid.jpg" alt="Post" />
                ) : post.Identification === "Certificate" ? (
                  <img
                    src="https://i.ibb.co/G58WTDf/certificate.jpg"
                    alt="Post"
                  />
                ) : post.Identification === "Licence" ? (
                  <img src="https://i.ibb.co/jT445Qt/licence.jpg" alt="Post" />
                ) : post.Identification === "Admit Card" ? (
                  <img
                    src="https://i.ibb.co/xHBNNND/admit-card.jpg"
                    alt="Post"
                  />
                ) : post.Identification === "Dolil" ? (
                  <img src="https://i.ibb.co/HCsdzTB/dolil.jpg" alt="Post" />
                ) : null}
              </div>
            </div>
          ))
        ) : posts.length ? (
          postsFilter.map((post) => (
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
                        src={`https://doctrack-server.onrender.com/${post.Profile_Url}`}
                      />
                    </div>
                  </div>
                  <p>{post.Name}</p>
                </div>

                {post.Status === "Found" && (
                  <Link
                    className=" border bg-primary text-white p-3 rounded details-btn"
                    to={`/post/${post.post_Id}`}
                  >
                    Details
                  </Link>
                )}
              </div>

              <div className="post-content">
                <p className="text-left">
                  <span className="font-bold">Name: </span>
                  {post.Name}
                </p>

                <p className="text-left">
                  <span className="font-bold">Status: </span>

                  {post.Status}
                </p>
                <p className="text-left">
                  <span className="font-bold">Type: </span>

                  {post.Identification}
                </p>
                <p className="text-left">
                  <span className="font-bold">Last 6 digit: </span>

                  {post.IdNumber.slice(-6)}
                </p>

                <p className="text-left">
                  {" "}
                  <span className="font-bold">Owner Name: </span>
                  {post.Owner_Name}
                </p>
                <p className="text-left">
                  {" "}
                  <span className="font-bold">Location: </span>
                  {post.Location}
                </p>
                <p className="text-left">
                  {" "}
                  <span className="font-bold">Description: </span>
                  {post.Description}
                </p>

                {post.Identification === "NID" ? (
                  <img src="https://i.ibb.co/51ntN8n/nid.jpg" alt="Post" />
                ) : post.Identification === "Certificate" ? (
                  <img
                    src="https://i.ibb.co/G58WTDf/certificate.jpg"
                    alt="Post"
                  />
                ) : post.Identification === "Licence" ? (
                  <img src="https://i.ibb.co/jT445Qt/licence.jpg" alt="Post" />
                ) : post.Identification === "Admit Card" ? (
                  <img
                    src="https://i.ibb.co/xHBNNND/admit-card.jpg"
                    alt="Post"
                  />
                ) : post.Identification === "Dolil" ? (
                  <img src="https://i.ibb.co/HCsdzTB/dolil.jpg" alt="Post" />
                ) : null}
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-xl text-center">No post found</h3>
        )}
        {/* </div> */}
      </div>
    </div>
  );
};

export default PostDisplay;
