var ajax = require('./ajax');
var alert = require('./alert');

var added = false;

$('.add-bookmark').on('click', function(event) {
	if (added) {
		return;
	}

	var btn = event.target;
	event.preventDefault();
	var illustId = pixiv.context.illustRecommendSampleIllust;
	
	$(btn).html('请稍候...');
	added = true;

	ajax.post('bookmark_add.php?id=' + illustId, {
		"mode" : "add",
		"tt" : pixiv.context.token,
		"id" : illustId,
		"type" : "illust",
		"from_sid" : "",

		"comment": "",
		"tag": "",
		"restrict": "1"
	}, function(err, data) {
		alert('作品收藏成功');
		$(btn).removeClass('add-bookmark')
			.addClass('edit-bookmark')
			.addClass('button-on')
			.removeClass('_button')
			.html('编辑收藏');
	})
})