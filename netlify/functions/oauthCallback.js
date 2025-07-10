const { google } = require('googleapis');
const querystring = require('querystring');

exports.handler = async (event) => {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    'https://snazzy-panda-b261ac.netlify.app/.netlify/functions/oauthCallback'
  );

  const params = querystring.parse(event.rawQuery || '');
  const code = params.code;

  if (!code) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Missing code parameter' }),
    };
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Authorization successful', tokens }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};