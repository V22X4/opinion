import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react'

export default function LoginButton() {
  return (
    <Button
      color="inherit"
      component={Link}
      to='/login'
      sx={{ color: 'black' }}
    >
      Login
    </Button>
  )
}
