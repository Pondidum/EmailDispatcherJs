using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Mail;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace EmailDispatcher.TestApp.Infrastructure
{
	public class Sender
	{
		private readonly Uri _host;

		public Sender(Uri host)
		{
			_host = host;
		}

		public void Send(MailMessage mail)
		{
			var values = new Dictionary<string, string>();
			values["to"] = Serialize(mail.To.Select(t => new EmailAddress(t.DisplayName, t.Address)));
			values["from"] = Serialize(new EmailAddress(mail.From.DisplayName, mail.From.Address));
			values["subject"] = mail.Subject;
			values["body"] = mail.Body;
			values["htmlBody"] = "";

			var content = new MultipartFormDataContent();

			foreach (var value in values)
			{
				content.Add(new StringContent(value.Value), value.Key);
			}

			var request = new HttpRequestMessage
			{
				Method = HttpMethod.Post,
				RequestUri = _host,
				Content = content
			};

			var client = new HttpClient();
			var result = client.SendAsync(request).Result;

			Console.WriteLine(result.StatusCode);
			Console.WriteLine(result.Content.ReadAsStringAsync().Result);
		}

		private string Serialize(object input)
		{
			var settings = new JsonSerializerSettings
			{
				ContractResolver =  new CamelCasePropertyNamesContractResolver()
			};

			return JsonConvert.SerializeObject(input, settings);
		}

		private struct EmailAddress
		{
			public string Name { get; set; }
			public string Address { get; set; }
			public Guid ID { get; set; }

			public EmailAddress(string name, string address) : this()
			{
				Name = name;
				Address = address;
				ID = Guid.Empty;
			}
		}
	}
}
