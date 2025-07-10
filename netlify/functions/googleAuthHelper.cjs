const { google } = require('googleapis');

function getAuthClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

  if (!clientEmail || !privateKey) {
    throw new Error('Missing required environment variables');
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/calendar'],
  });
}

module.exports = { getAuthClient };