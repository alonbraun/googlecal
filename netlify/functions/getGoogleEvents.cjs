const { google } = require('googleapis');
const { auth } = require('./googleAuthHelper.cjs'); // Adjust path if needed

exports.handler = async () => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = res.data.items || [];

    return {
      statusCode: 200,
      body: JSON.stringify(events),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};