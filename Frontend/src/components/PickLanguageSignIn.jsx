import React from 'react';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';

function PickLanguageSignIn() {
  const { i18n } = useTranslation();

  const options = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' }
  ];  

  const customStyles = {
    indicatorsContainer: () => ({
        display: 'none', // Hide the indicators container (including the arrow)
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'white', // Default text color
        fontWeight: 'bold',
    }),
    control: (provided, state) => ({
        ...provided,
        backgroundColor: '#109f7a', // Change button background color
        border: 'none', // Change button border color
        borderRadius: '20px',
        width: '150px',
        textAlign: 'center',
        marginLeft: '50px',
        marginTop: '10px',
        cursor: 'pointer',
        boxShadow: state.isFocused ? null : null,
    }),
    menu: (provided) => ({
        ...provided,
        backgroundColor: '#109f7a',
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginLeft: '50px',
        cursor: 'pointer',
        width: '150px',
        
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'white', // Change the color of the selected option
        fontWeight: 'bold',
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isFocused ? 'transparent' : 'transparent',
        cursor: 'pointer',
        ':hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.3)'
        },
      }),
  };

  const handleChange = (selectedOption) => {
    i18n.changeLanguage(selectedOption.value);
  };

  return (
    <Select
        styles={customStyles}
        options={options}
        value={options.find(option => option.value === i18n.language)}
        onChange={handleChange}
        menuPlacement={'top'}
        isSearchable={false}
        defaultValue={options.find(option => option.value === 'en')}
    />
  );
}

export default PickLanguageSignIn;
