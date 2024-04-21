/*
  * File: 
    *ProfileInfoBox.jsx

  * Description: 
    * This file defines the ProfileInfoBox component which is used to display user information in the profile page.
    * The component is a text input field that can be edited by the user if the isEditable prop is set to true.
    * The onChangeText prop is a function that is called when the text in the input field is changed.
    * The component uses the useState hook to manage the state of the input field.
  * 
*/

import React, { useState } from 'react';

const ProfileInfoBox = ({ text, isEditable, onChangeText }) => {
  const [editableText, setEditableText] = useState(text);

  const handleChange = (event) => {
    setEditableText(event.target.value);
    onChangeText(event.target.value);
  };

  return (
    <input
        type="text"
        value={editableText}
        readOnly={!isEditable} // Toggle readOnly based on isEditable prop
        onChange={handleChange}
        style={{ ...styles.input, ...(isEditable && styles.editable) }}
      />
  );
};

// Define CSS styles as an object
const styles = {
  input: {
    marginTop: '5px',
    borderRadius: '25px',
    fontSize: '16px',
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    backgroundColor: '#2d2d2e',
    border: 'none',
    color: '#949495',
  },
  editable: {
    display: 'inline-block',
    transition: 'backgroundColor 10s ease',
    marginTop: '5px',
    borderRadius: '25px',
    fontSize: '16px',
    textAlign: 'center',
    paddingTop: '15px',
    paddingBottom: '15px',
    fontWeight: 'bold',
    backgroundColor: 'white',
    border: 'none',
    color: 'black',
  },
};

export default ProfileInfoBox;
