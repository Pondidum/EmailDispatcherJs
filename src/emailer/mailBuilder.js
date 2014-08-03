
var formatEmail = function(model) {

	if (model.name != "") {
		return model.name + " <" + model.address + ">";
	}

	return model.address;
}

var buildMail = function(parsed) {

	var mailData = {
		from: formatEmail(parsed.from),
		to: parsed.to.map(formatEmail).join(", "),
		subject: parsed.subject,
		text: parsed.text,
		html: parsed.html,
	};

	return mailData;
}

var parse = function(requestBody) {

	var to = JSON.parse(requestBody.to);
	var from = JSON.parse(requestBody.from);
	var subject = requestBody.subject;
	var body = requestBody.body;
	var htmlBody = requestBody.htmlBody;

	var mail = {
		from: from,
		to: to,
		subject: subject,
		text: body,
		html: htmlBody
	}

	return mail;
}

exports.parse = parse
exports.build = buildMail;
