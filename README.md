## Setup Steps 📣

1. Create an Auth0 Account:
    - Visit the Auth0 website (https://auth0.com/) and sign up for a new account if you don't already have one.

2. Log in to Your Auth0 Dashboard:
    - After creating your account, log in to your Auth0 Dashboard using your credentials.
3. Create a New Auth0 Tenant (if necessary):
    - If you're setting up a new log stream for a specific tenant, create a new tenant by navigating to the "Tenants" section in your dashboard and clicking "Create Tenant."

4. Select the Tenant:
    - If you have multiple tenants, select the one for which you want to configure the log stream.

5. Navigate to Logs:
    - From the Auth0 Dashboard, navigate to the "Logs" section, usually found in the left-hand menu.

6. Choose Log Stream:
    - In the "Logs" section, select the "Log Streams" tab.

7. Add a New Log Stream:
    - Click the "Create Log Stream" button to begin configuring your custom log stream.

8. Choose a Name for the Log Stream:
    - Give your log stream a descriptive name to help identify it.

9. Select Webhook as the Type:
    - Choose "Custom Webhook" as the type of log stream you want to create. This is where your logs will be sent.

10. Configure Webhook Settings:
    - Provide the URL of your custom webhook that will receive the logs (nextjs endpoint).
Optionally, set authentication and custom headers if required by your webhook.
Specify the format in which you want to send logs to Object or JSON.

11. Save the Configuration:
    - Click the "Save" or "Create" button to save your log stream configuration.
Enable the Log Stream:

#### Environment Variables

AUTH0_SECRET=

AUTH0_BASE_URL=http://localhost:3000

AUTH0_ISSUER_BASE_URL='https://dev-78834jhkfa893qd.us.auth0.com'

AUTH0_DOMAIN='dev-78834jhkfa893qd'

AUTH0_CLIENT_ID=

AUTH0_CLIENT_SECRET=

DISCORD_WEB_HOOK=