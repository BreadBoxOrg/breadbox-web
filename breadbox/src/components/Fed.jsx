import React, { useState } from 'react';
import { ResponsiveContainer } from 'recharts';

const data = [
  {/* add whatever data for widget testing */}
];

function Boilerplate() {
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); 
  };



  return (
    <div style={{
      backgroundColor: '#1E1E1E', 
      padding: '20px', 
      borderRadius: '20px', 
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.5)',
      color: 'white',
      position: 'relative' 
    }}>
      <div style={{
        borderBottom: '2px solid #2ecc71',
        paddingBottom: '10px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0}}>Recurring Costs</h2>
        <div style={{ position: 'relative' }}> 
          <button onClick={toggleDropdown} style={{
            backgroundColor: '#2C2C2E', 
            color: 'white', 
            padding: '10px 20px', 
            border: '1px solid #2ecc71',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            outline: 'none'
          }}>
            DROPDOWN TEXT ▼
          </button>
          {dropdownOpen && ( 
            <div style={{
              position: 'absolute',
              backgroundColor: '#2C2C2E',
              marginTop: '5px',
              borderRadius: '10px',
              padding: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)'
            }}>
              <div style={{ padding: '10px', cursor: 'pointer' }}>Monthly</div>
              <div style={{ padding: '10px', cursor: 'pointer' }}>Quarterly</div>
              <div style={{ padding: '10px', cursor: 'pointer' }}>Yearly</div>
            </div>
          )}
        </div>
        
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <ResponsiveContainer width="100%" height={400}>



          {/* WIDGET STUFF GOES IN HERE*/}




        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Boilerplate;
