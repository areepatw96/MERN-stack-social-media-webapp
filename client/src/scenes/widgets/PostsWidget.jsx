import { useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state"; 
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => { // isProfile is a boolean 
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => { // get all posts 
    const response = await fetch("http://localhost:3001/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => { // get posts of a specific user 
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json(); 
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => { // get posts on mount
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts.map( // map over posts and render PostWidget for each post
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget // pass props to PostWidget
            key={_id} 
            postId={_id} 
            postUserId={userId}
            name={`${firstName} ${lastName}`} // combine first and last name
            description={description} // description of post
            location={location} // location of post
            picturePath={picturePath} // picture of post
            userPicturePath={userPicturePath} // picture of user who posted
            likes={likes} // likes of post
            comments={comments} // comments of post
          />
        )
      )}
    </>
  );
};

export default PostsWidget;