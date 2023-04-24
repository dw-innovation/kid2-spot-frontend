import ace from "ace-builds/src-noconflict/ace";

ace.define("ace/mode/overpass", function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const OverpassHighlightRules =
    require("ace/mode/overpass_highlight_rules").OverpassHighlightRules;

  const Mode = function () {
    this.HighlightRules = OverpassHighlightRules;
  };

  oop.inherits(Mode, TextMode);

  (function () {
    this.$id = "ace/mode/overpass";
  }).call(Mode.prototype);

  exports.Mode = Mode;
});

ace.define("ace/mode/overpass_highlight_rules", function (require, exports) {
  const oop = require("ace/lib/oop");
  const TextHighlightRules =
    require("ace/mode/text_highlight_rules").TextHighlightRules;

  const OverpassHighlightRules = function () {
    this.$rules = {
      start: [
        {
          token: "keyword.operator",
          regex:
            /\b(out|json|xml|custom|popup|timeout|maxsize|bbox|date|diff|adiff|foreach|relation|rel|way|node|is_in|area|around|user|uid|newer|changed|poly|pivot|nwr|nw|nr|wr|derived|meta|body|skel|tags|ids|count|qt|asc|center|bb|geom)\b/,
        },
        {
          token: "paren.lparen",
          regex: /[\[{(]/,
        },
        {
          token: "paren.rparen",
          regex: /[\]})]/,
        },
        {
          token: "comment",
          regex: /\/\/.*/,
          next: "singleLineComment",
        },
        {
          token: "comment",
          regex: /#.*/,
          next: "singleLineComment",
        },
        {
          token: "comment.start",
          regex: /\/\*/,
          next: "multiLineComment",
        },
      ],
      singleLineComment: [
        {
          token: "comment",
          regex: /$/,
          next: "start",
        },
        {
          defaultToken: "comment",
        },
      ],
      multiLineComment: [
        {
          token: "comment.end",
          regex: /\*\//,
          next: "start",
        },
        {
          defaultToken: "comment",
        },
      ],
    };
  };

  oop.inherits(OverpassHighlightRules, TextHighlightRules);

  exports.OverpassHighlightRules = OverpassHighlightRules;
});
