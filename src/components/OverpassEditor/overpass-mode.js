import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-text";

const ace = require("ace-builds/src-noconflict/ace");
const TextMode = ace.require("ace/mode/text").Mode;

const OverpassHighlightRules = ace.require(
  "ace/mode/text_highlight_rules"
).TextHighlightRules;

const OverpassModeRules = function () {
  this.$rules = new TextMode().getRules();

  // Add your custom highlighting rules for Overpass Turbo queries here.
  // For example, you can highlight keywords or operators.
  this.$rules.start.push({
    token: "keyword.operator",
    regex: /\[.*?\]|node|way|relation|area|out/,
  });
};

OverpassModeRules.prototype = new OverpassHighlightRules();

const OverpassMode = function () {
  this.HighlightRules = OverpassModeRules;
  this.$behaviour = this.$defaultBehaviour;
};

OverpassMode.prototype = new TextMode();

export default OverpassMode;
