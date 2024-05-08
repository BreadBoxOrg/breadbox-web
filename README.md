# BreadBox

 

 [Body text Pending]   
  
#

### Screenshots

![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/e94be178-fa6f-4ad5-a9b0-752d9fee7455)
![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/74a6da2a-92d3-418a-bd61-5e4e0c1cdae2)
![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/553cb6ef-c08d-4123-bf62-f3727c407546)
![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/f0eb4b48-4e93-4a73-a20b-8c7bee185ee8)
![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/349fe0ae-28c4-43c1-916b-8fa0a7ef83ff)
![Image](https://github.com/BreadBoxOrg/breadbox-web/assets/67339817/6a49bdf2-e000-410c-af82-716070f34a88)



### Developing - Initial Setup

The BreadBox source code requires two .env files:
* One in ``/Backend``
* One in ``/Frontend``
##### ``.env`` file example in /Backend
```
MONGO_URL=

# Get your Plaid API keys from the dashboard: https://dashboard.plaid.com/team/keys
PLAID_CLIENT_ID=
# PLAID_SECRET=
PLAID_SECRET=

# Use 'sandbox' to test with fake credentials in Plaid's Sandbox environment
# Use 'development' to test with real credentials while developing
# Use 'production' to go live with real users

# To test these institutions with live data, get production approval first at https://dashboard.plaid.com/overview/production
# Once approved, set your environment to 'development' to test.
PLAID_ENV=sandbox

# PLAID_PRODUCTS is a comma-separated list of products to use when
# initializing Link, e.g. PLAID_PRODUCTS=auth,transactions.
# see https://plaid.com/docs/api/tokens/#link-token-create-request-products for a complete list.

PLAID_PRODUCTS=transactions, accounts

# See https://plaid.com/docs/api/tokens/#link-token-create-request-country-codes for a complete list

PLAID_COUNTRY_CODES=US

# PLAID_REDIRECT_URI is optional for this Quickstart application.
# If you're not sure if you need to use this field, you can leave it blank
PLAID_REDIRECT_URI=

OPENAI_API_KEY=
OPENAI_ORG_KEY=
OPENAI_ASSISTANT_ID=

# Port definition for the backend
BACKEND_PORT=3001
```


##### ``.env`` file example in /Frontend

```
# Assuming you stick with localhost when developing and not using an entirely different endpoint like in production, 
# MAKE SURE THE PORT IS THE SAME ONE YOU DEFINED IN YOUR /Backend .env FILE (http://localhost:[BACKEND_PORT])

REACT_APP_BACKEND_URL = http://localhost:3001

# API Key used for the crypto widget (https://site.financialmodelingprep.com/)
REACT_APP_FMP_API = 

Port definition for the frontend
FRONTEND_PORT = 3005
```

From then on you can cd in the root of the folder (``/breadbox-web``) and run ``npm test`` to run the backend and frontend simultaneously.

						
