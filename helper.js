exports.messages = function(req, res) {
  return function() {
    var buf = [];

    var flashMessages = req.flash(),
        types = Object.keys(flashMessages),
        length = types.length,
        type,
        msg;

    if (!length) return '';
    for (var i = 0; i < length; ++i) {
      type = types[i];
      msgs = flashMessages[type];

      if (msgs) {
        buf.push("<div class='alert alert-dismissable alert-" + type + " message-box'>");
        buf.push("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>");
        buf.push("<ul class='messages-list'>");
        for (var j = 0, l = msgs.length; j < l; ++j) {
          msg = msgs[j];
          buf.push("    <li>" + msg + "</li>");
        }
        buf.push("</ul></div>");
      }
    }
    return buf.join("\n");
  };
};