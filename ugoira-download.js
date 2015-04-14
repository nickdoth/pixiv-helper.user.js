// pixiv.context.ugokuIllustFullscreenData
var bookmarkButton = $('.add-bookmark, .edit-bookmark')[0];
var ugoiraInfo = pixiv.context.ugokuIllustFullscreenData;
var ugoiraButton;

if (ugoiraInfo) {
	ugoiraButton = $('<a class="edit-bookmark button-on">ugoira!</a>').insertBefore(bookmarkButton)

	ugoiraButton[0].href = ugoiraInfo.src;
}

