# README #

The JavaScript Object-Function Format (JSOFF).  It's a drop-in replacement for JSON that supports functions.

## Installation

Install with your favorite manager; easy as pork:

    npm install jsoff
    yarn add jsoff

## Usage

It's a drop-in replacement for JSON, so you can use JSOFF anywhere you use
JSON.  If you find something missing, let me know.  Here are examples.

### Round-Trip Example

Require the JSOFF module.  Create an object with functions.  You can use

    const JSOFF  = require('jsoff');

    var obj = {
      abc: 123,
      def: function (a,b) { return a * 2 + b * 3; },
      ghi: a => { return a * 2 },
      jkl: (a,b) => { return ((d,e) => { return a*d + b*e })(2,4) }
    };

    var str = JSOFF.stringify(obj);
    // str is now:  
    // '{"abc":123,"def":"function (a,b) { return a * 2 + b * 3; }","ghi":"a => { return a * 2 }","jkl":"(a,b) => { return ((d,e) => { return a*d + b*e })(2,4) }"}');
    });

    var clone = JSOFF.parse(str);
    clone.def(10,5)   // 35
    clone.ghi(5)      // 10
    clone.jkl(10,20)  // 100

Pretty straight-forward.  It *will* let you round-trip functions with
enclosed variables, but you won't like it.  *Caveat emptor*.  Anyway, a nice
kid like you wouldn't do that, would you?  What are you, some kind of
jamoke?

## TODO

It doesn't currently handle unembraced ES6 arrow functions like this:

    {
      abc :  a  => { return 'this will work' },
      def : (a) => { return 'so will this' },
      ghi :  a  => "but this won't"
    }

It shouldn't be hard, but I haven't gotten to it yet.  Pull requests
welcome!

## License

MIT.

