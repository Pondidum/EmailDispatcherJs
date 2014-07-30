
var statsList = [];

statsList.push(function() {

	$.ajax('/stats/totalsent', {
		success: function(json) {
			$('#total').text(json.count);
		}
	});

});



$(document).ready(function() {

	for(var stat in statsList)
	{
		stat();
	}
});
