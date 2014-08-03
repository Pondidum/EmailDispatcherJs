using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using EmailDispatcher.TestApp.Infrastructure;
using Xunit;

namespace EmailDispatcher.TestApp
{
	public class SendTests
	{
		//[Fact]
		//public void Sends_successfully()
		//{
		//	var sender = new Sender(new Uri("http://localhost:3000/send/async"));

		//	var message = new MailMessage();
		//	message.To.Add(new MailAddress("to.test@example.com", "To Test"));
		//	message.From = new MailAddress("from.test@example.com", "From Test");
		//	message.Subject = "This is the subject.";
		//	message.Body = "This is the body.";

		//	sender.Send(message);
		//}


		[Fact]
		public void Builds_random_usage_set()
		{
			var random = new Random();

			var recipients = new[]
			{
				new MailAddress("nisi.sem.semper@luctus.edu", "Jakeem Martin"),
				new MailAddress("eget@vitae.edu", "Otto Ross"),
				new MailAddress("faucibus.orci@quisdiam.net", "Ruth Tran"),
				new MailAddress("lorem.eget.mollis@iaculisenimsit.net", "Ayanna Haney"),
				new MailAddress("Mauris.quis@nislelementum.ca", "Medge Ryan"),
				new MailAddress("ante.Nunc.mauris@adipiscing.net", "Kathleen Webster"),
				new MailAddress("vehicula.et@tellusPhaselluselit.edu", "Wesley Hays"),
				new MailAddress("porttitor.tellus@mauris.edu", "Benedict Salazar"),
				new MailAddress("felis.Nulla.tempor@urna.edu", "Blake Dillon"),
				new MailAddress("Phasellus.in.felis@elementum.edu", "Hammett Frye"),
				new MailAddress("malesuada@etliberoProin.org", "Lee Pitts"),
				new MailAddress("interdum.feugiat@vestibulumneceuismod.ca", "Colin Avila"),
				new MailAddress("orci.consectetuer.euismod@necanteblandit.net", "Burke Barry"),
				new MailAddress("nonummy.ipsum.non@consequatpurusMaecenas.com", "Cleo Browning"),
				new MailAddress("lobortis.tellus.justo@molestietortornibh.ca", "Burton Ferguson"),
				new MailAddress("Nullam.nisl.Maecenas@eu.ca", "Emily Bentley"),
				new MailAddress("Nam.ac.nulla@vitaemaurissit.edu", "Rylee Reilly"),
				new MailAddress("a@cubiliaCuraeDonec.ca", "Francis Gallegos"),
				new MailAddress("interdum@urnajusto.ca", "Cairo Kane"),
				new MailAddress("molestie@cursus.org", "Kelly Garcia"),
			};

			var senders = new[]
			{
				new MailAddress("lacus.Aliquam@eulacusQuisque.com", "Nasim Richardson"),
				new MailAddress("ac.urna.Ut@feugiatnonlobortis.co.uk", "Kessie Gillespie"),
				new MailAddress("in.tempus.eu@diamSed.edu", "Plato Reynolds"),
				new MailAddress("ante@nonarcu.org", "Kylie Shepherd"),
				new MailAddress("ut.eros@quispede.co.uk", "Danielle Stein"),
				new MailAddress("commodo@magna.ca", "Kermit Chan"),
				new MailAddress("Donec.consectetuer@nonlacinia.co.uk", "Wing Goodwin"),
				new MailAddress("Vestibulum.accumsan.neque@tinciduntpede.net", "Dale Murray"),
				new MailAddress("in.cursus.et@ultricesVivamus.com", "Liberty Massey"),
				new MailAddress("Integer.urna@sed.ca", "Rosalyn Poole"),
				new MailAddress("Ut.tincidunt.vehicula@estvitaesodales.net", "Zeph Turner"),
				new MailAddress("semper@perconubianostra.net", "Desirae Sullivan"),
				new MailAddress("mattis.ornare@elitelitfermentum.net", "Wynne Joyce"),
				new MailAddress("Maecenas@eu.ca", "Zachary Malone"),
				new MailAddress("magnis.dis@DonecestNunc.ca", "Danielle Pate"),
				new MailAddress("enim.Etiam@sapiengravida.org", "Indira Combs"),
				new MailAddress("elit@scelerisquesedsapien.ca", "Clinton Dale"),
				new MailAddress("Nulla.facilisi.Sed@magna.co.uk", "Eugenia Grant"),
				new MailAddress("eu@nonluctus.edu", "Kessie Cohen"),
				new MailAddress("erat@laoreetlectusquis.com", "Amena Collier"),
				new MailAddress("pede.Cras@nonlobortisquis.edu", "Austin Conner"),
				new MailAddress("tristique.pharetra@ideratEtiam.co.uk", "Raymond Yang"),
				new MailAddress("sed@dui.co.uk", "Timothy Fitzgerald"),
				new MailAddress("Proin@etrutrum.org", "Carol Middleton"),
				new MailAddress("quam.Curabitur.vel@mattis.edu", "Sasha Wilcox"),
				new MailAddress("mi.pede@risus.net", "MacKenzie West"),
				new MailAddress("Phasellus.dapibus@nunc.edu", "Claire Vega"),
				new MailAddress("ultrices.iaculis.odio@ametornarelectus.ca", "Hector Osborne"),
				new MailAddress("mauris@Duisatlacus.net", "Brady Pollard"),
				new MailAddress("dis.parturient.montes@Mauris.net", "Allen Castaneda"),
			};


			
			var sender = new Sender(new Uri("http://localhost:3000/send/async"));

			for (int i = 0; i < 100; i++)
			{
				var from = senders[random.Next(senders.Count() - 1)];
				var to = recipients[random.Next(recipients.Count() - 1)];

				var message = new MailMessage();
				message.To.Add(to);
				message.From = from;
				message.Subject = "This is the subject.";
				message.Body = "This is the body.";

				Thread.Sleep(random.Next(0, 1000));
				sender.Send(message);
			
			}
		}


	}
}
