exports.handler = async function (event, context) {
  try {
    const { name, email } = JSON.parse(event.body || '{}');
    let url = "https://calendly.com/alonbraun/60-minute-dialog";

    if (name || email) {
      const params = new URLSearchParams();
      if (name) params.append("name", name);
      if (email) params.append("email", email);
      url += `?${params.toString()}`;
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ booking_url: url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
