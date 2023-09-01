import React, { useEffect } from 'react'
import { loadUser } from '../../Actions/UserActions'
import { useDispatch } from 'react-redux';

function Loaduser() {
    const dispatch = useDispatch();

    useEffect(() => {
        const req = async () => {
            await dispatch(await loadUser());
        }
        req();
    }, []);

  return (
    <></>
  )
}

export default Loaduser