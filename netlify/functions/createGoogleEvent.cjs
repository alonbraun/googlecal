const { google } = require('googleapis');

exports.handler = async function(event) {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/calendar']
    );

    await jwtClient.authorize();
    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    const body = JSON.parse(event.body);
    const res = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: body.summary,
        description: body.description,
        start: { dateTime: body.start },
        end: { dateTime: body.end }
      }
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: res.data.id, link: res.data.htmlLink })
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
