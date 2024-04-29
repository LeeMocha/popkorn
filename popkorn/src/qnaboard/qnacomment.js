import React, { useState, useEffect } from 'react';
import { apiCall } from '../service/apiService';

function Qnacomment({ sno }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');
    const [visibleComments, setVisibleComments] = useState(5);

    useEffect(() => {
        if (!sno) {
            console.error("Post ID is undefined or null.");
            return;
        }
        async function fetchComments() {
            const response = await apiCall(`/api/qna/replies/${sno}`, 'GET');
            if (response.status === 200) {
                setComments(response.data);
            } else {
                console.error("Failed to fetch comments.");
            }
        }
        fetchComments();
    }, [sno]);

    const handleAddComment = async () => {
        if (!commentText.trim()) return;
        const postData = {
            root: sno,
            content: commentText,
            id: sessionStorage.getItem("loginID")
        };

        const response = await apiCall('/api/qna/reply', 'POST', postData);
        if (response.status === 200) {
            setComments([...comments, response.data]);
            setCommentText('');
            alert('Comment added successfully');
        } else {
            alert('Failed to add comment');
        }
    };

    const handleShowMoreComments = () => {
        setVisibleComments(prev => prev + 5);
    };

    return (
        <div>
            <div className='commentflex'>
                <textarea
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className='commentarea'
                    placeholder="Write your Comment"
                />
                <button onClick={handleAddComment} className='commentBtn'>Add Comment</button>
            </div>
            <div>
                {comments.slice(0, visibleComments).map(comment => (
                    <div key={comment.sno} className='commentinfo'>
                        {comment.id}
                        <p>{new Date(comment.updatedat).toLocaleString()}</p>
                        <p>{comment.content}</p>
                    </div>
                ))}
                {visibleComments < comments.length && (
                    <button onClick={handleShowMoreComments} className='commentviewBtn'>Show More Comments</button>
                )}
            </div>
        </div>
    );
}

export default Qnacomment;
