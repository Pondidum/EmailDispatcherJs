
var statsList = [];

statsList.push(function() {

	$.ajax('/stats/totalsent', {
		success: function(json) {
			$('#total').text(json.count);
		}
	});

});

statsList.push(function() {

	$.ajax('/stats/lastfive', {
		success: function(json) {
			console.log(json);
			$('#lastfive').text(json[0].from);
		}
	})
});


$(document).ready(function() {

	for (var i = 0; i < statsList.length; i++) {
		statsList[i]();
	}

});
