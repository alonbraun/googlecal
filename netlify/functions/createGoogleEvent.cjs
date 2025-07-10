const { google } = require('googleapis');
const { getAuthClient } = require('./googleAuthHelper.cjs');

exports.handler = async function (event) {
  try {
    const { summary, description, start, end } = JSON.parse(event.body);
    const auth = getAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        id: response.data.id,
        link: response.data.htmlLink,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};