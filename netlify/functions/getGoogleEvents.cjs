const { google } = require('googleapis');

exports.handler = async function() {
  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    const jwtClient = new google.auth.JWT(
      credentials.client_email,
      null,
      credentials.private_key,
      ['https://www.googleapis.com/auth/calendar.readonly']
    );

    await jwtClient.authorize();
    const calendar = google.calendar({ version: 'v3', auth: jwtClient });

    const now = new Date().toISOString();
    const res = await calendar.events.list({
      calendarId: 'primary',
      timeMin: now,
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime'
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data.items)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
