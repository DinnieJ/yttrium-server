const yt = require('../index');

const { $, server, router } = yt;

// add a test route on the root (e.g. localhost/test)
$.route('index')
  .append('<test>');

// add handler to index route
$.route('index')
  .on('route', (e, req, res) => {
    res.end('Index route!');
    return false;
  });

// add handler to test route
$.route('test')
  .on('route', (e, req, res) => {
    // example of sending HTML template
    $('body').html('<div>Hello world!</div>');
    res.end($('html').html());
    return false;
  });

// send requests to the router
$(server).on('request', router);

// start up server
$.listen(server, 8000);
$(server).on('listening', (e) => {
  console.log('Server is listening on port:', e.target.address().port);
});

