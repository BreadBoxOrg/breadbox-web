/*
  * File: 
    *LinkComponenet.jsx

  * Description: 
    * This file contains the code for the LinkComponent component.
    * This component is responsible for rendering the Plaid Link button.
    * The Plaid Link button is used to connect the user's bank account to the application.
    * The component fetches the link token from the backend and uses it to create the Plaid Link button.
  * 
*/


import React, { useEffect, useState, useContext } from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from "plaid-threads/Button";
import PlaidLogo from "../images/Plaid_Logo.png";
import { AccessTokenContext } from "../App";
import { useTranslation } from 'react-i18next';

const LinkComponent = (props) => {
    const [linkToken, setLinkToken] = useState(null);
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const { setAccessToken } = useContext(AccessTokenContext);
    const { t, i18n } = useTranslation();

// Fetch the link token from your backend
    useEffect(() => {
        const fetchLinkToken = async () => {
            const languageCode = i18n.language || 'en'; // Ensure a default of 'en' if language is not set
            const supportedLanguages = ['en', 'fr', 'es']; // Example of supported languages
            const effectiveLanguage = supportedLanguages.includes(languageCode) ? languageCode : 'en';
            try {
                const response = await fetch(`${backendURL}/link/create_link_token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ languageCode: effectiveLanguage }),
                });
                const data = await response.json();
                if (response.ok) {
                    setLinkToken(data.link_token);
                } else {
                    console.error('Error fetching link token:', data);
                }
            } catch (error) {
                console.error('Network error when fetching link token:', error);
            }
        };

        fetchLinkToken();
    }, [backendURL, i18n.language]);

    const onSuccess = async (publicToken) => {
        const response = await fetch(`${backendURL}/link/exchange_link_token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ public_token: publicToken }),
        });

        if (response.ok) {
            const data = await response.json();
            setAccessToken(data.access_token);
            props.onSuccess();
        } else {
            console.error('Failed to exchange public token');
        }
    };

    const config = {
        token: linkToken,
        onSuccess,
    };

    const { open, ready } = usePlaidLink(config);

    return (
        <Button className="plaid-button" onClick={() => open()} disabled={!ready}>
            <img alt="Plaid Logo" src={PlaidLogo} />
            {t('settings.plaid-link-button')}
        </Button>
    );
};

export default LinkComponent;
