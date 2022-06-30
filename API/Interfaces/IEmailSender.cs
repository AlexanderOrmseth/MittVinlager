namespace API.Interfaces;

public interface IEmailSender
{
    Task<string> SendEmailAsync(string recipientEmail, string recipientFirstName, string link, string subject);
}