// Create new server
const server = http.createServer((req, res) => {
    // Get the URL and parse it
    const parsedUrl = url.parse(req.url, true);

    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Choose the handler this request should go to
    const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

    // Route the request to the handler specified in the router
    chosenHandler((statusCode, payload) => {
        // Use the status code called back by the handler, or default to 200
        statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

        // Use the payload called back by the handler, or default to an empty object
        payload = typeof (payload) == 'object' ? payload : {};

        // Convert the payload to a string
        const payloadString = JSON.stringify(payload);

        // Return the response
        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadString);

        // Log the request path
        console.log('Returning this response: ', statusCode, payloadString);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('The server is up and running now');
});

// Define the handlers
const handlers = {};

// Sample handler
handlers.sample = (callback) => {
    // Callback an HTTP status code, and a payload object
    callback(406, { 'name': 'sample handler' });
};

// Not found handler
handlers.notFound = (callback) => {
    callback(404);
};

// Define a request router
const router = {
    'sample': handlers.sample
};