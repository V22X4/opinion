import { Button } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

export default function ProfileButton() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.currentUser);
    
  const handleProfile = async (e) => {
        navigate(`/user/${user?.username}`);
  }
  
  return (
    <Button color="inherit" onClick={handleProfile} sx={{ color: 'black' }}>
         Profile
    </Button>
  )
}
