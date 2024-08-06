import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Post = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    comments_count,
    like_count,
    like_id,
    title,
    content,
    image,
    updated_at,
    funny_count,
    sad_count,
    cute_count,
    celebrate_count,
    postPage,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

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
            {is_owner && postPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {content && <Card.Text>{content}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-thumbs-up ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-thumbs-up ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-thumbs-up" />
            </OverlayTrigger>
          )}
          {like_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-grin-squint-tears" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-face-grin-squint-tears ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-face-grin-squint-tears ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-grin-squint-tears" />
            </OverlayTrigger>
          )}
          {funny_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-frown-open" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-face-frown-open ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => { }}>
              <i className={`fa-regular fa-face-frown-open ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-regular fa-face-frown-opens" />
            </OverlayTrigger>
          )}
          {sad_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="far fa-grin-hearts" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => { }}>
              <i className={`far fa-grin-hearts ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => { }}>
              <i className={`far fa-grin-hearts ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="far fa-grin-hearts" />
            </OverlayTrigger>
          )}
          {cute_count}

          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-solid fa-hands-clapping" />
            </OverlayTrigger>
          ) : like_id ? (
            <span onClick={() => { }}>
              <i className={`fa-solid fa-hands-clapping ${styles.Like}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => { }}>
              <i className={`fa-solid fa-hands-clapping ${styles.Likeoutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't react to your own posts!</Tooltip>}
            >
              <i className="fa-solid fa-hands-clapping" />
            </OverlayTrigger>
          )}
          {celebrate_count}

          <Link to={`/posts/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;