import React from "react";
import {Box} from "@mui/material";
import {Typography} from "@mui/material";
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider} from '@mui/material';
import { useState ,useRef} from "react";
import axios from "axios";
import cn from "classnames";
import "./css/styles.css";
import { useParams } from "react-router-dom";


const Comment = () => {

  let access_token =localStorage.getItem('accessTokenCustomer');
  let { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [comments, setComments] = useState([]);
  const [visibleComments, setVisibleComments] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
  const [replyIndex, setReplyIndex] = useState(-1);


  const outerHeight = useRef(46);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const onExpand = () => {
    if (!isExpanded) {
      outerHeight.current = containerRef.current.scrollHeight;
      setIsExpanded(true);
    }
  }
  const onChange = (e) => {
    setCommentValue(e.target.value);
	}
  const onClose = () => {
    setCommentValue("");
    setIsExpanded(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (comments.length >= 3) {
      alert(`You have reached the maximum number of ${3} comments.`);
      return;
    }
    axios.post('https://amirmohammadkomijani.pythonanywhere.com/barber/comments/create/', { barber: id, body: commentValue }, {
      headers: {
        'Authorization': `JWT ${access_token}`,
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Fetch updated comments
        console.log("post it darling",response.data)
        fetchComments();
      })
      .catch(error => {
        console.error(error);
      });

    setCommentValue('');
  };
  const fetchComments = () => {
    axios.get(`https://amirmohammadkomijani.pythonanywhere.com/barber/${id}/show-comments/`)
      .then(response => {
        setComments(response.data.results);
        setVisibleComments(response.data.results.slice(0, 3));
      })
      .catch(error => {
        console.error(error);
      });
  };
  const onReplyClick = (index) => {
    setReplyIndex(index);
  }
  const onReplySubmit = (e) => {
    e.preventDefault();
    const replyValue = e.target.elements.reply.value;
    if (replyValue.trim() === "") {
      alert("Please enter a reply.");
      return;
    }
    const newComments = [...comments];
    newComments[replyIndex].replies.push(replyValue);
    setComments(newComments);
    // setVisibleComments(newComments.slice(0, 3));
    setReplyIndex(-1);
    e.target.elements.reply.value = "";
  }

  const onCancelClick = () => {
    setReplyIndex(-1);
    document.getElementById(`reply-${replyIndex}`).value = "";
  }
  const onLoadMoreClick = () => {
    setVisibleComments(comments.slice(0, visibleComments.length + 3));
  };

  return(
    <div>
    <Box sx={{ width: '100%',pb:3}}>
    <List sx={{ width: '100%', maxWidth: 520 ,marginBottom:60,bgcolor:'#edc7b7',marginLeft:'3%',
        paddingBottom:0,borderRadius:3,boxShadow: '0px 3px 5px 4px rgba(0, 0, 0, 0.4)' }}>
        <Typography sx={{ marginLeft: '15px',fontFamily:'Roboto, ',color:'#ac3b61',fontSize:22 }} >Comments</Typography>
        {visibleComments.map((comment, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="User" src={comment.customer.profile_pic} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.customer.first_name} {comment.customer.last_name}
                    </Typography>
                    <br />
                    {comment.body}
                  </>
                }
                secondary={
                  <>
                    {comment.reply && (
                      <>
                        <br />
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          &nbsp;&nbsp;&nbsp;&nbsp;Reply:
                        </Typography>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          &nbsp;{comment.reply}
                        </Typography>
                      </>
                    )}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}

        {visibleComments.length < comments.length && (
            <button onClick={onLoadMoreClick} className='bt17'>Load more</button>
          )}
  
                <form
                onSubmit={onSubmit}
                ref={containerRef}
                className={cn("comment-box", {
                  expanded: isExpanded,
                  collapsed: !isExpanded,
                        modified: commentValue.length > 0,
                })}
                style={{
                  minHeight: isExpanded ? outerHeight.current : 46
                }}
              >
                <div className="header">
                    <div className="user1">
                        <img
                        src="https://s2.uupload.ir/files/348ad8c26d7ff7b6c23fe3e30f3e44dd_ducd.jpg"
                        alt="User avatar"
                        />
                        <span>User Name</span>
                    </div>
                </div>
                
            <label for="comment" className='cmt'>What are your thoughts?</label>
                    <textarea
                    ref={textRef}
                    onClick={onExpand}
                    onFocus={onExpand}
                    onChange={onChange}
                    className="comment-field"
                    placeholder="What are your thoughts?"
                    value={commentValue}
                    name="comment"
                    id="comment"
                    />
                    <div className="actions">
                        <button type="button" className="cancel" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit"  className='subim' disabled={commentValue.length < 1}>
                            Respond
                        </button>
                    </div>
                    ...
                </form>


        </List>
        </Box>
        </div>

  )
}
export default Comment;