import { NextApiRequest, NextApiResponse } from 'next';

type Auth0LogPayload = {
  log_id: string;
  data: {
    date: string;
    type: string;
    description: string;
    client_id: string;
    client_name: string;
    ip: string;
    user_agent: string;
    user_id: string;
    user_name: string;
    log_id: string;
  };
};

const errorTypes = {
  f: 'Failed Login',
  fapi: 'Operation on API failed',
  fce: 'Failed Change Email',
  fco: 'Failed by CORS',
  fcp: 'Failed Change Password',
  fcpr: 'Failed Change Password Request',
  fcu: 'Failed Change Username',
  fd: '	Failed Delegation',
  fdeac: 'Failed Device Activation',
  fdecc: 'User Canceled Device Confirmation',
  fdu: 'Failed User Deletion',
  feacft: 'Failed to exchange authorization code for Access Token',
  feccft: 'Failed exchange of Access Token for a Client Credentials Grant',
  fede: 'Failed to exchange Device Code for Access Token',
  fens: 'Failed exchange for Native Social Login',
  feoobft: 'Failed exchange of Password and OOB Challenge for Access Token',
  feotpft: 'Failed exchange of Password and OTP Challenge for Access Token',
  fepft: 'Failed exchange of Password for Access Token',
  fepotpft: 'Failed exchange of Passwordless OTP for Access Token',
  fercft: 'Failed Exchange	Failed Exchange of Password and MFA Recovery code for Access Token',
  fertft: 'Failed Exchange of Refresh Token for Access Token.',
  ferrt: 'Failed Exchange of Rotating Refresh Token',
  fi: 'Failed invite accept	Failed to accept a user invitation',
  flo: 'Failed Logout',
  fn: 'Failed Sending Notification',
  fp: 'Failed Login (Incorrect Password)',
  fs: 'Failed Signup',
  fsa: 'Failed Silent Auth',
  fu: 'Failed Login (Invalid Email/Username)',
  fui: 'Failed users import	Failed to import users',
  fv: 'Failed to send verification email',
  fvr: 'Failed Verification Email Request'
};

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEB_HOOK || '';

async function sendToDiscord(message: string) {
  const payload = {
    content: message
  };

  await fetch(DISCORD_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const errorLogs = req.body.logs;

    let allMessages = '';

    errorLogs.map((message: Auth0LogPayload) => {
      const error_link = `https://manage.auth0.com/dashboard/us/${process.env.AUTH0_DOMAIN}/logs/${message.log_id}`;
      allMessages += `Auth0 Log:\nError Type: ${errorTypes[message.data.type] ?? message.data.type}\nUser email: ${
        message.data.user_name
      }\nError Link: ${error_link}\n\n`;
    });

    // Forward the log details to the Discord channel
    try {
      await sendToDiscord(allMessages);
    } catch (e) {
      res.json({ error: e });
    }
    return res.json({ message: 'Sent to discord' });
  } else {
    return res.json({ error: 'Method not allowed' });
  }
}
