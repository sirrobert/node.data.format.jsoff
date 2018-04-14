"use strict";

const JSOFF  = require('../index.js');
const expect = require('unexpected');

describe("JSOFF", function () {
  var obj = {
    abc: 123,
    def: function (a,b) { return a * 2 + b * 3; },
    ghi: a => { return a * 2 },
    jkl: (a,b) => { return ((d,e) => { return a*d + b*e })(2,4) }
  };

  describe("static .stringify(obj)", function () {
    it("should serialize objects with functions", function () {
      var str = JSOFF.stringify(obj);
      expect(str, "to be", '{"abc":123,"def":"function (a,b) { return a * 2 + b * 3; }","ghi":"a => { return a * 2 }","jkl":"(a,b) => { return ((d,e) => { return a*d + b*e })(2,4) }"}');
    });
  });

  describe("static .parse(obj)", function () {
    it("should deserialize strings representing objects with functions", function () {
      var str = JSOFF.stringify(obj);
      var clone = JSOFF.parse(str);
      expect(clone.def(10,5), "to equal", 35);
    });

    it("should deserialize arrow function strings", function () {
      var str = JSOFF.stringify(obj);
      var clone = JSOFF.parse(str);

      expect(clone.ghi(5), "to equal", 10);
      expect(clone.jkl(10,20), "to equal", 100);
    })
  });

});


