

var showTotal = function() {
	$.ajax('/stats/totalsent', {
		success: function(json) {
			$('#total').text(json.count);
		}
	});
};

$(document).ready(function() {
	showTotal();
});

//setInterval(, 1000);