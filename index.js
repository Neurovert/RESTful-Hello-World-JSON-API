/*
 * The Assignment A simple "Hello World" API:
 *
 * 1. It should be a RESTful JSON API that listens on a port of your choice.
 * 2. When someone posts anything to the route /hello, you should return a welcome message, in JSON format. This message can be anything you want. 
 *
 */

// Dependencies
const http = require('http');
const url = require('url');

// Server creation and all mechanisms
const server = http.createServer((req, res) => {
    // Get the parsed URL
    const parsedUrl = url.parse(req.url, true);

    // Get the route only with everything after it stripped away.
    const route = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    // Get the request method
    const method = req.method.toLowerCase();

    // Set the response Content-Type header to meet the assignment requirements.
    res.setHeader('Content-Type', 'application/json')

    // Make sure the route is 'hello' and method is 'post'
    if (route == 'hello' && method == 'post') {
        // Take in the request data. Without this, request would linger forever or timeout waiting for data reception. 
        req.on('data', () => {});
        // Work on response once the appropriate request is fully delivered.
        req.on('end', () => {
            // Set the response status code
            res.writeHead(200);

            // Respond with the json message - as required in assignment.
            res.end(JSON.stringify({
                'message': 'Sup World!!!'
            }));
        });
    // In any other case respond with 404 - not found status code and error message.
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({
            'error': 'Request method not POST or URL not /hello'
        }));
    }
});

// Start the server
server.listen(3000, () => {
    console.log('The server is running - try address: localhost:3000');
});