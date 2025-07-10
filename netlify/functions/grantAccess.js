const { google } = require('googleapis');

exports.handler = async () => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://snazzy-panda-b261ac.netlify.app/.netlify/functions/oauthCallback'
  );

  const scopes = ['https://www.googleapis.com/auth/calendar'];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent',
  });

  return {
    statusCode: 302,
    headers: {
      Location: url,
    },
  };
};