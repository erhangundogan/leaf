/*
  mwitter
  pure twitter client, enjoy...
  by Erhan Gundogan
  MIT 2014
 */


var mwitter = (function(global) {

  'use strict';

  var mwit = function() {
    this.id = getUniqueId(config.app.idLength);
    return this;
  };

  var user = function() {
    return this;
  };

  /**
   * https://github.com/erhangundogan/jstools/blob/master/lib/jstools.js#L137
   * @param len
   */
  function getUniqueId(len) {
    var buf = [],
        chars = "ABCDEF0123456789",
        charlen = chars.length,
        firstAlphaNumeric = firstAlphaNumeric || false;

    var getRandomInt = function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    for (var i = 0; i < len; ++i) {
      buf.push(chars[getRandomInt(0, charlen - 1)]);
    }

    return buf.join("");
  }

})(window);