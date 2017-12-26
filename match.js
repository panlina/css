var select = require('./select.js');
var SPECIFICITY = require('specificity');
module.exports = function (css) {
	return function (element, adapt) {
		var ruleelement =
			css.map(function (rule) {
				return {
					rule: rule,
					element: select(rule.selector)(element, adapt)
				};
			});
		var elementrule = {};
		var id = 0;
		for (var i in ruleelement)
			ruleelement[i].element.forEach(function (element, j) {
				if (!('$id' in element))
					elementrule[element.$id = id++] = {
						element: element,
						rule: []
					};
				elementrule[element.$id].rule.push(ruleelement[i].rule);
			});
		for (var id in elementrule) {
			var rule = elementrule[id].rule;
			rule.sort(function (r, s) {
				return SPECIFICITY.compare(r.selector, s.selector);
			});
		}
		return elementrule;
	};
}
