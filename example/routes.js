module.exports = ($) => {
  // add routes onto the root (e.g. localhost/get-example)
  $.route('index')
    .append('<get-example>')
    .append('<html-example>')
    .append('<param-example data-dynamic="name">');

  // add handler to index route
  $.route('index')
    .on('route', (e, req, res) => {
      // it's important to stop propagation of the route event
      // unless you want to trigger the parental route functions
      // which can be useful in middleware situations
      e.stopPropagation();
      return res.end('Index route!');
    });

  // add handler for get example
  // http://localhost:8000/get-example?test=shoot
  $.route('get-example')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      const query = $.route('get-example').data('query');
      if (!Object.keys(query).length) {
        return res.end('Add a query string parameter of test to this example like /get-example?test=happiness');
      }
      return res.end(`Get query string params: ${JSON.stringify(query)}`);
    });

  // add handler to html example route
  $.route('html-example')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      // example of sending HTML template
      $('body').html('<h1>This example uses HTML</h1>');
      return res.end($('html').html());
    });

  // this route responds to /param-example/:name
  $.route('param-example')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      const param = $.route('param-example').data('name');
      if (!param) {
        return res.end('Navigate to /param-example/anything to see dynamic routes in action');
      }
      return res.end(`I found a name! ${param}`);
    });

  // this is a handler for the 404 name specified in options
  // alternatively we could have handled the default 'not-found' route
  $.route('oh-noes')
    .on('route', (e, req, res) => {
      e.stopPropagation();
      res.end('My custom 404 page!');
    });
};
