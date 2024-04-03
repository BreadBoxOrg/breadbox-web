import React, { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";
import PlaidLogo from "../images/Plaid_Logo.png"

const LinkComponent = (props) => {
const [linkToken, setLinkToken] = useState(null);
const backendURL = process.env.REACT_APP_BACKEND_URL;

// Fetch the link token from your backend
useEffect(() => {
  const fetchLinkToken = async () => {
    try {
      const response = await fetch(`${backendURL}/link/create_link_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
      setLinkToken(data.link_token);
    } catch (error) {
      console.log(error);
    }
  };

  fetchLinkToken();
}, [backendURL]);

const onSuccess = async (publicToken) => {
  // Send the public token to your server to exchange for an access token
  const response = await fetch(`${backendURL}/link/exchange_link_token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ public_token: publicToken }),
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Access Token:', data.access_token);
    // You can now use the access token to make Plaid requests
    
    
    props.onSuccess();
    
  } else {
    console.error('Failed to exchange public token');
  }
};

const config = {
  token: linkToken,
  onSuccess,
  // Add other necessary configuration options here
};

const { open, ready } = usePlaidLink(config);

return (
  <Button className="plaid-button" onClick={() => open()} disabled={!ready}>
    <img alt="Plaid Logo" src={PlaidLogo}></img>
    Connect your accounts
  </Button>
);
};

export default LinkComponent;