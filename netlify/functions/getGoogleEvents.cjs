const { google } = require('googleapis');
const { getAuthClient } = require('./googleAuthHelper.cjs');

exports.handler = async function () {
  try {
    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const result = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    return {
      statusCode: 200,
      body: JSON.stringify(result.data.items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};