const { google } = require('googleapis');
const path = require('path');

exports.handler = async (event) => {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'service-account.json'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data.items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};