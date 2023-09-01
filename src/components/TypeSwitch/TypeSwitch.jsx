import React, { useEffect, useState } from 'react';
import styles from './TypeSwitch.module.css';
import { useDispatch } from 'react-redux';
import { feedchange, profileInfochange, followchange, Postchange, likechange, likedPostchange  } from '../../Actions/RenderActions';

function TypeSwitch(props) {
  const type1 = props.types[0];
  const type2 = props.types[1];
  const changefunction = props?.req;
  const [selected, setSelected] = useState(type1); 
  const dispatch = useDispatch();

  const handleChange = async(Type) => {
    setSelected(Type); 
  };


  useEffect(() => {

    if (changefunction) {
      const sendreq = async() => {
        await dispatch(changefunction(selected));
      }

      sendreq();
    }
    
  }, [selected, dispatch])


  return (
    <div className={styles['type-buttons']}>
      <button
        onClick={() => handleChange(type1)}
        className={`${styles['type-button']} ${selected === type1 && styles['active-type-button']}`}
      >
        {type1}
      </button>
      <button
        onClick={() => handleChange(type2)}
        className={`${styles['type-button']} ${selected === type2 && styles['active-type-button']}`}
      >
        {type2}
      </button>
    </div>
  );
}

export default TypeSwitch;
