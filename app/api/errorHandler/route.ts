import { NextResponse } from 'next/server';

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

const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1147222511201824898/PRLd3CpMNqDnJ8xzbq3No6Pbnl2epL5GPA1yQqp76S9WvOECtBA7vZH99EJ9PEqIRVBk';

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

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const requestBody = await req.json();
    const { log_id, data } = requestBody.logs[0] as Auth0LogPayload;

    const error_link = `https://manage.auth0.com/dashboard/us/${process.env.AUTH0_DOMAIN}/logs/${log_id}?page=1`;

    const message = `Auth0 Log:\nError Type: ${data.type}\nUser Email: ${data.user_name}\nError Link: ${error_link}`;

    // Forward the log details to the Discord channel
    try {
      await sendToDiscord(message);
    } catch (e) {
      return NextResponse.json({ error: e });
    }
    NextResponse.json({ message: 'Log forwarded to Discord' });
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 }); // Method Not Allowed
  }
}
