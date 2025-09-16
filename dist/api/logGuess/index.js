module.exports = async function (context, req) {
  // Only accept POST
  if (req.method !== 'POST') {
    context.res = { status: 405, body: "Method not allowed. Use POST." };
    return;
  }

  // Get payload
  const payload = req.body || {};
  // Add some server-side metadata if you'd like
  const telemetry = {
    receivedAt: new Date().toISOString(),
    payload
  };

  // IMPORTANT: context.log statements are picked up by App Insights when deployed in Azure
  context.log('GameTelemetry', telemetry);

  // Optionally you can add more logs at different severity levels:
  // context.log.info('info message', telemetry);
  // context.log.warn('warn message', telemetry);
  // context.log.error('error message', telemetry);

  // Return a lightweight success response
  context.res = {
    status: 200,
    body: { status: 'ok' }
  };
};
