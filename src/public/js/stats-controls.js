
var statsList = [];

statsList.push(function() {

	$.ajax('/stats/totalsent', {
		success: function(json) {
			$('#total').text(json.count);
		}
	});

});



$(document).ready(function() {

	for (var i = 0; i < statsList.length; i++) {
		statsList[i]();
	}

});
