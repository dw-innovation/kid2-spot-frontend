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
          regex: /\[.*?\]/,
        },
        {
          token: "keyword",
          regex:
            /\b(node|way|relation|nwr|area|out|meta|body|tags|qt|asc|desc|skip|limit|bbox|poly|changed|newer|if|else|foreach|count|set|for|difference|break|continue|return)\b/,
        },
        {
          token: "variable",
          regex: /[@_]\w+/,
        },
        {
          token: "constant.numeric",
          regex: /-?\d+(\.\d+)?/,
        },
        {
          token: "constant.numeric",
          regex: /{{AREA}}/,
        },
        {
          token: "string",
          regex: /'(?:\\.|[^'])*'/,
        },
        {
          token: "string",
          regex: /"(?:\\.|[^"])*"/,
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
        {
          token: "support.function",
          regex: /\b\w+(?=\()/,
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
