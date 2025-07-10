
const { google } = require('googleapis');
const auth = require('./auth.cjs');

exports.handler = async () => {
  try {
    const calendar = google.calendar({ version: 'v3', auth });

    const res = await calendar.acl.insert({
      calendarId: 'primary',
      requestBody: {
        role: 'reader',
        scope: {
          type: 'user',
          value: 'gpt-analytics-bot@smart-monitor-373319.iam.gserviceaccount.com',
        },
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, ruleId: res.data.id }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
