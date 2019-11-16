using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace WebLoginAndRegister.Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;
        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            return Execute(subject, htmlMessage, email);
        }

        public Task Execute(string subject, string body, string email)
        {
            string emailOwner = _configuration.GetValue<string>("Email");
            string passwordOwner = _configuration.GetValue<string>("Password");
            int portOwner = Convert.ToInt32(_configuration.GetValue<string>("Port"));
            string hostOwner = _configuration.GetValue<string>("Host");
            using (MailMessage mm = new MailMessage(emailOwner, email))
            {
                mm.Subject = subject;
                mm.Body = body;
                mm.IsBodyHtml = true;
                SmtpClient smtp = new SmtpClient();
                smtp.Host = hostOwner;
                smtp.EnableSsl = true;
                NetworkCredential NetworkCred = new NetworkCredential(emailOwner, passwordOwner);
                smtp.UseDefaultCredentials = true;
                smtp.Credentials = NetworkCred;
                smtp.Port = portOwner;
                smtp.Send(mm);
                return Task.FromResult(0);
            }
        }
    }
}
