import { Button } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/UserActions';

export default function SignoutButton() {
  const dispatch = useDispatch();
  const handleLogout = async(e) => {
    e.preventDefault();
    await dispatch(logoutUser());
  }


  return (
    <Button color="inherit" component={Link} onClick={handleLogout} sx={{ color: 'black' }}>
         Logout
    </Button>
  )
}
