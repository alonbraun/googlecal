const axios = require('axios');

exports.handler = async () => {
  try {
    const token = process.env.CALENDLY_TOKEN;
    const res = await axios.get("https://api.calendly.com/scheduled_events", {
      headers: { Authorization: `Bearer ${token}` }
    });

    const events = res.data.collection.map(event => ({
      name: event.name,
      start_time: event.start_time,
      status: event.status,
    }));

    return {
      statusCode: 200,
      body: JSON.stringify({ events }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
