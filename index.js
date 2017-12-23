var what = require('css-what');
module.exports = function (css) {
	var css = what(css);
	var css = css[0];
	return function (node, adapt) {
		return css.reduce(function (node, filter) {
			switch (filter.type) {
				case 'child': return [].concat.apply([], node.map(function (n) { return adapt.child(n); }));
				case 'descendant': return [].concat.apply([], node.map(descendant));
				default: return node.filter(match(filter));
			}
		}, descendant(node));
		function match(filter) {
			switch (filter.type) {
				case 'universal': return function () { return true; };
				case 'tag': return function (node) { return adapt.type(node) == 'element' && adapt.name(node) == filter.name; };
			}
		}
		function descendant(node) {
			return [].concat.apply([node], adapt.child(node).map(descendant));
		}
	};
};
