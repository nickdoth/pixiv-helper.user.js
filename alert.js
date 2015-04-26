module.exports = function al(msg) {
	var node = $('<div>');

	node.css({
	    'position': 'fixed',
	    'background-color': 'black',
	    'color': '#fff',
	    'top': '10%',
	    'left': '50%',
	    'padding': '15px',
	    'border-radius': '2px',
	    'z-index': 999,
	    'transition': 'opacity .8s',

	    'opacity': 0
	});

	node.html(msg);

	$('body').append(node);

	setTimeout(function() {
		node.css('opacity', 1);

		setTimeout(function() {
			node.on('transitionend', function(event) {
				node.remove();
			});

			node.css('opacity', 0);
		}, 3000);
	}, 1);

		
}