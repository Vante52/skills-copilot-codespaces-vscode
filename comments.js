// Create web server
var express = require('express');
var app = express();

// Create a comment array
var comments = [
    {name: 'John', content: 'A comment'},
    {name: 'Jane', content: 'Another comment'}
];

// Create a GET route that sends the comments array
app.get('/comments', function(req, res) {
    res.send(comments);
});

// Create a POST route that adds a new comment to the comments array
app.post('/comments', function(req, res) {
    comments.push(req.body);
    res.send(comments);
});

// Start the server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});