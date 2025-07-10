const { google } = require('googleapis');

exports.handler = async function(event) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    const calendarId = 'alon@riverbanks.com';
    const { summary, start, end, description } = JSON.parse(event.body);

    const auth = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/calendar']
    );

    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary,
        description,
        start: { dateTime: start },
        end: { dateTime: end }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ eventId: res.data.id, htmlLink: res.data.htmlLink }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || err.toString() }),
    };
  }
};
