const skullBot = require('./netlify/functions/skullBot');

module.exports = async (event, context) => {
  // You don't need to handle incoming messages here; just return a simple response.
  return {
    statusCode: 200,
    body: JSON.stringify({
      result: 'Message processed successfully',
    }),
  };
};