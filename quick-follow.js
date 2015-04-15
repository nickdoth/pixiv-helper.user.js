var ajax = require('./ajax');

$('body').on('submit', function(event) {
	console.log(event.target)
	var form = $(event.target);
	if (form.find('[name="type"]').val() === 'user') {
		event.preventDefault();
	}
	else {
		return;
	}

	ajax.submitForm(form[0], function(err, data) {
		if (!err) {
			alert('操作完成');
		}
		else {
			alert('系统繁忙');
		}
	});
})