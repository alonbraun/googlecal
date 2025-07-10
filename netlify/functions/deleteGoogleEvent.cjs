const { google } = require('googleapis');
const { getAuthClient } = require('./googleAuthHelper.cjs');

exports.handler = async function (event) {
  try {
    const { eventId } = JSON.parse(event.body);
    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};