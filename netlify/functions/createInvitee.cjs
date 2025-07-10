const axios = require('axios');

exports.handler = async (event) => {
  const token = process.env.CALENDLY_TOKEN;
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Missing Calendly token' }),
    };
  }

  try {
    const { name, email, event_start_time, event_note } = JSON.parse(event.body);
    const eventTypeUri = "https://api.calendly.com/event_types/alonbraun/60-minute-dialog";

    const response = await axios.post(
      'https://api.calendly.com/scheduled_events',
      {
        invitees: [{ email, name }],
        event_type: eventTypeUri,
        start_time: event_start_time,
        custom_questions: [
          { question: "Purpose", answer: event_note || "Personal block" }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ confirmation: response.data.resource.uri }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.response?.data || error.message }),
    };
  }
};
