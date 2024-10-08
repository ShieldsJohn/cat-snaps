import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import PropTypes from 'prop-types';

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    like_count,
    title,
    caption,
    image,
    updated_at,
    funny_count,
    sad_count,
    cute_count,
    celebrate_count,
    postPage,
    setPosts,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/posts/${id}/edit`)
  }

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/posts/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }

  };

  const handleReaction = async (reactionType) => {
    try {
      const { data } = await axiosRes.post("/reactions/", {
        post: id,
        reaction_type: reactionType,
      });
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                [`${reactionType}_count`]: post[`${reactionType}_count`] + 1,
                [`${reactionType}_Reaction_id`]: data.id,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUndoReaction = async (reactionType) => {
    try {
      const reactionId = props[`${reactionType}_Reaction_id`];
      await axiosRes.delete(`/reactions/${reactionId}/`);
      setPosts((prevPosts) => ({
        ...prevPosts,
        results: prevPosts.results.map((post) => {
          return post.id === id
            ? {
                ...post,
                [`${reactionType}_count`]: post[`${reactionType}_count`] - 1,
                [`${reactionType}_Reaction_id`]: null,
              }
            : post;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Post}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
            {is_owner && postPage && <MoreDropdown 
            handleEdit={handleEdit}
            handleDelete={handleDelete}/>}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {caption && <Card.Text>{caption}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          ) : props.like_Reaction_id ? (
            <span onClick={() => handleUndoReaction('like')}>
              <i className={`fa-regular fa-thumbs-up ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => handleReaction('like')}>
              <i className={`fa-regular fa-thumbs-up ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to react to posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          )}
          {like_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-grin-squint-tears" />
            </OverlayTrigger>
          ) : props.funny_Reaction_id ? (
            <span onClick={() => handleUndoReaction('funny')}>
              <i className={`fa-regular fa-face-grin-squint-tears ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => handleReaction('funny')}>
              <i className={`fa-regular fa-face-grin-squint-tears ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to react to posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-grin-squint-tears" />
            </OverlayTrigger>
          )}
          {funny_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-frown-open" />
            </OverlayTrigger>
          ) : props.sad_Reaction_id ? (
            <span onClick={() => handleUndoReaction('sad')}>
              <i className={`fa-regular fa-face-frown-open ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => handleReaction('sad')}>
              <i className={`fa-regular fa-face-frown-open ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to react to posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-frown-open" />
            </OverlayTrigger>
          )}
          {sad_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
            >
              <i className="far fa-grin-hearts" />
            </OverlayTrigger>
          ) : props.cute_Reaction_id ? (
            <span onClick={() => handleUndoReaction('cute')}>
              <i className={`far fa-grin-hearts ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => handleReaction('cute')}>
              <i className={`far fa-grin-hearts ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to react to posts!</Tooltip>}
            >
              <i className="far fa-grin-hearts" />
            </OverlayTrigger>
          )}
          {cute_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can&apos;t react to your own posts!</Tooltip>}
            >
              <i className="fa-solid fa-hands-clapping" />
            </OverlayTrigger>
          ) : props.celebrate_Reaction_id ? (
            <span onClick={() => handleUndoReaction('celebrate')}>
              <i className={`fa-solid fa-hands-clapping ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => handleReaction('celebrate')}>
              <i className={`fa-solid fa-hands-clapping ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You need to log in to react to posts!</Tooltip>}
            >
              <i className="fa-solid fa-hands-clapping" />
            </OverlayTrigger>
          )}
          {celebrate_count}

          <Link aria-label="Comments icon" to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

Post.propTypes = {
  id: PropTypes.number.isRequired,
  owner: PropTypes.string.isRequired,
  profile_id: PropTypes.number.isRequired,
  profile_image: PropTypes.string.isRequired,
  comments_count: PropTypes.number.isRequired,
  like_count: PropTypes.number.isRequired,
  title: PropTypes.string,
  caption: PropTypes.string,
  image: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  funny_count: PropTypes.number.isRequired,
  sad_count: PropTypes.number.isRequired,
  cute_count: PropTypes.number.isRequired,
  celebrate_count: PropTypes.number.isRequired,
  postPage: PropTypes.bool,
  setPosts: PropTypes.func.isRequired,
  like_Reaction_id: PropTypes.number,
  funny_Reaction_id: PropTypes.number,
  sad_Reaction_id: PropTypes.number,
  cute_Reaction_id: PropTypes.number,
  celebrate_Reaction_id: PropTypes.number,
};

export default Post;