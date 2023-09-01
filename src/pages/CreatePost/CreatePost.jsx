import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import {stripHtml} from 'string-strip-html';
import DOMPurify from 'dompurify';
import styles from './CreatePost.module.css';
import Header from '../../components/Header/Header';
import { createNewPost } from '../../Actions/PostActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loaduser from '../../components/Loaduser/Loaduser';

export default function CreatePost() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const canSubmit = content.length >= 10 && content.length <= 400;

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (canSubmit) {
      e.preventDefault();
      const sanitizedContent = DOMPurify.sanitize(content, { USE_PROFILES: { html: true } });
      const plainTextContent = stripHtml(sanitizedContent);
      await dispatch(await createNewPost(plainTextContent.result));
      console.log('New Post Content:', plainTextContent.result);
      navigate('/');
    }
  };


  return (
    <>
      <Loaduser/>
      <Header />
      <div className={styles.createPostContainer}>
        <h1>Create New Post</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainers}>
            <ReactQuill
              value={content}
              onChange={handleContentChange}
              className={styles.reactQuillContainer}
              placeholder="Compose your post..."
              theme="snow"
              modules={{
                toolbar: [
						[{ 'header': [] }, { 'font': [] }],
						[{ size: [] }],
						['bold', 'italic', 'underline', 'strike', 'blockquote'],
						[
							{ 'list': 'ordered' },
							{ 'list': 'bullet' },
							{ 'indent': '-1' },
							{ 'indent': '+1' },
						],
						['link'],
						['clean'],
						[{ 'color': [] }, { 'background': [] }],
						[{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
					],
              }}
            />
          </div>
          <div className={styles.submitContainer}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!canSubmit || !isAuthenticated}
            >
              Create Post
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
