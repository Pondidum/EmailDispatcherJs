
var formatEmail = function(model) {

	if (model.name != "") {
		return model.name + " <" + model.address + ">";
	}

	return model.address;
}

var buildMail = function(requestBody) {

	var to = JSON.parse(requestBody.to);
	var from = JSON.parse(requestBody.from);
	var subject = requestBody.subject;
	var body = requestBody.body;
	var htmlBody = requestBody.htmlBody;

	var mailData = {
		from: formatEmail(from),
		to: to.map(formatEmail),
		subject: subject,
		text: body,
		html: htmlBody
	};

	return mailData;
}

var handleRequest = function(req) {

	return buildMail(req.body);

};

exports.handle = handleRequest;
