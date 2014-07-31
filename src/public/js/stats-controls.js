
var statsList = [];

statsList.push({
	action: function() {
		$.ajax('/stats/totalsent', {
			success: function(json) {
				$('#total').text(json.count);
			}
		});
	}
});

statsList.push({
	action: function() {
		$.ajax('/stats/lastfive', {
			success: function(json) {
				$('#lastfive').text(json[0].from);
			}
		});
	}
});


$(document).ready(function() {

	for (var i = 0; i < statsList.length; i++) {
		statsList[i].action();
	}

});
