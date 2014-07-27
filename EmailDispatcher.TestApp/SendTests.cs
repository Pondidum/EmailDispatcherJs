using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using EmailDispatcher.TestApp.Infrastructure;
using Xunit;

namespace EmailDispatcher.TestApp
{
	public class SendTests
	{
		[Fact]
		public void Sends_successfully()
		{
			var sender = new Sender(new Uri("http://localhost:3000/send/async"));

			var message = new MailMessage();
			message.To.Add(new MailAddress("to.test@example.com", "To Test"));
			message.From = new MailAddress("from.test@example.com", "From Test");
			message.Subject = "This is the subject.";
			message.Body = "This is the body.";

			sender.Send(message);
		}
	}
}
