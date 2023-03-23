import ace from "ace-builds/src-noconflict/ace";

ace.define("ace/mode/overpass", function (require, exports, module) {
  const oop = require("ace/lib/oop");
  const TextMode = require("ace/mode/text").Mode;
  const Tokenizer = require("ace/tokenizer").Tokenizer;
  const OverpassHighlightRules =
    require("ace/mode/overpass_highlight_rules").OverpassHighlightRules;

  const Mode = function () {
    this.HighlightRules = OverpassHighlightRules;
  };

  oop.inherits(Mode, TextMode);

  (function () {
    this.$id = "ace/mode/overpass";
  }.call(Mode.prototype));

  exports.Mode = Mode;
});

ace.define(
  "ace/mode/overpass_highlight_rules",
  function (require, exports, module) {
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
              /(node|way|relation|nwr|area|out|meta|body|tags|qt|asc|desc|skip|limit|bbox|poly|changed|newer|if|else|foreach|count|set|for|difference|break|continue|return)(?=\s|\(|\[)/,
          },
          {
            token: "variable",
            regex: /([@_][\w]+)/,
          },
          {
            token: "constant.numeric",
            regex: /(-?\d+\.\d+)/,
          },
          {
            token: "constant.numeric",
            regex: /(-?\d+)/,
          },
          {
            token: "constant.numeric",
            regex: /{{AREA}}/,
          },
          {
            token: "string",
            regex: /'.*?'/,
          },
          {
            token: "string",
            regex: /".*?"/,
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
          },
          {
            token: "comment",
            regex: /#.*/,
          },
        ],
      };
    };

    oop.inherits(OverpassHighlightRules, TextHighlightRules);

    exports.OverpassHighlightRules = OverpassHighlightRules;
  }
);
