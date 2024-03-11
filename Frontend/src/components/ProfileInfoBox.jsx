import React from 'react';

const ProfileInfoBox = ({text}) => {
  return (
    <div style={styles.container}>
      <input type="text" value={text} readOnly style={styles.input} />
    </div>
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
};

export default ProfileInfoBox