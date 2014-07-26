using System.Collections.Generic;

namespace EmailDispatcher.TestApp.Models
{
	public class EmailData
	{
		public EmailAddress From { get; set; }
		public List<EmailAddress> To { get; set; }
		public List<EmailAddress> Cc { get; set; }
		public List<EmailAddress> Bcc { get; set; }

		public string Subject { get; set; }
		public string Body { get; set; }
		public bool IsHtml { get; set; }

		public int Priority { get; set; }

		public EmailData()
		{
			To = new List<EmailAddress>();
			Cc = new List<EmailAddress>();
			Bcc = new List<EmailAddress>();
		}
	}
}
