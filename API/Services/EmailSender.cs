using System.Net;
using API.Interfaces;
using API.Models;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace API.Services;

public class EmailSender : IEmailSender
{
    private readonly SmtpSettings _smtpSettings;

    public EmailSender(IOptions<SmtpSettings> smtpSettings)
    {
        _smtpSettings = smtpSettings.Value;
    }

    public async Task<string> SendEmailAsync(string recipientEmail, string recipientFirstName, string link,
        string subject)
    {
        var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(_smtpSettings.SenderEmail));
        message.To.Add(MailboxAddress.Parse(recipientEmail));
        message.Subject = subject;
        message.Body = new TextPart("html")
        {
            Text = $"<h1>{subject}</h1><p>{link}</p>"
        };

        var client = new SmtpClient();

        try
        {
            await client.ConnectAsync(_smtpSettings.Server, _smtpSettings.Port, true);
            await client.AuthenticateAsync(new NetworkCredential(_smtpSettings.SenderEmail, _smtpSettings.AppPassword));
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
            return "Email Sent Successfully!";
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
        finally
        {
            client.Dispose();
        }
    }
}