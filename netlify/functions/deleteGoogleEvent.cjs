const { google } = require('googleapis');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { eventId } = JSON.parse(event.body);

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'service-account.json'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};