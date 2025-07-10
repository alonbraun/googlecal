const axios = require("axios");

exports.handler = async function (event, context) {
  const token = process.env.CALENDLY_TOKEN;

  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing Calendly token" }),
    };
  }

  try {
    const response = await axios.get("https://api.calendly.com/scheduled_events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        user: "https://api.calendly.com/users/CHGDJA2RVBTZVTLI",
        sort: "start_time:asc",
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ events: response.data.collection }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.response?.data || error.message }),
    };
  }
};
