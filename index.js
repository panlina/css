var what = require('css-what');
module.exports = function (css) {
	var css = what(css);
	var css = css[0];
	return function (node) {
		return css.reduce(function (node, filter) {
			switch (filter.type) {
				case 'child': return [].concat.apply([], node.map(function (n) { return n.children; }));
				default: return node.filter(match(filter));
			}
		}, node.children);
	};
};
function match(filter) {
	switch (filter.type) {
		case 'universal': return function () { return true; };
		case 'tag': return function (node) { return node.type == 'element' && node.name == filter.name; };
	}
}
