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
const StringDecoder = require('string_decoder').StringDecoder;

// My message for 2.
message = {
    'Hello': 'Sup World?'
}
messageErr = {
    'Error': 'Request method not POST or URL not /hello'
}

// Server creation and all mechanisms
const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');

    const method = req.method.toLowerCase();

    // Get the payload,if any
    const decoder = new StringDecoder('utf-8');
    let payload = '';
    if (trimmedPath == 'hello' && method == 'post') {
        req.on('data', (data) => {
            payload += decoder.write(data);
        });
        req.on('end', () => {
            payload += decoder.end();

            // Send the response
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(200);
            res.end(JSON.stringify(message));
        });
    } else {
        // Not required according to assignment requirements, but...
        // If rquest is NOT a POST method OR NOT /hello URL, then:
        res.setHeader('Content-Type', 'application/json')
        res.writeHead(404);
        res.end(JSON.stringify(messageErr));
    }
});

// Start the server
server.listen(3000, () => {
    console.log('The server is up and running now: address localhost:3000');
});
