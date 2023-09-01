import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PostOpinionCSS from './PostOpinion.module.css';
import { useSelector } from 'react-redux';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFocus = () => {
    setIsFocused(true);

    if (isAuthenticated) {
      navigate('/submit');
    }
    else {
      navigate('/login'); 
    }
 
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className={PostOpinionCSS['post-an-opinion-container']}>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Post an opinion"
        className={`${PostOpinionCSS['post-an-opinion']} ${isFocused ? PostOpinionCSS['focused'] : ''}`}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </div>
  );
}