const { google } = require('googleapis');
const path = require('path');

exports.handler = async (event) => {
  try {
    const { summary, description, start, end } = JSON.parse(event.body);

    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(__dirname, 'service-account.json'),
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    const authClient = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: authClient });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: response.data.id, link: response.data.htmlLink }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};