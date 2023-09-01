import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import React from 'react'

export default function SignupButton() {
  return (
    <Button
      color="inherit"
      component={Link}
      to='/signup'
      sx={{ color: 'black' }}
    >
      Signup
    </Button>
  )
}
