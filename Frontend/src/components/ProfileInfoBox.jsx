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
