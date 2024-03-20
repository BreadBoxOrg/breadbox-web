import Select from "react-select";

function NotificationOptions({ value, onChange, options }) {

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
            backgroundColor: '#2d2d2e', // Change button background color
            border: 'none', // Change button border color
            borderRadius: '20px',
            width: '150px',
            textAlign: 'center',
            marginLeft: '50px',
            marginTop: '10px',
            boxShadow: state.isFocused ? null : null,
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#2d2d2e',
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            marginLeft: '50px',
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
          }),
      };

    return(<>
    <Select
        styles={customStyles}
        placeholder="Select"
        defaultValue={value}
        onChange={onChange}
        options={options}
        isSearchable={false}
    />
    </>)
}

export default NotificationOptions