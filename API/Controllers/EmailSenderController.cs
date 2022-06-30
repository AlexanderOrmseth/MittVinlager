using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class EmailSenderController : BaseApiController
{
    private readonly IEmailSender _emailSender;

    public EmailSenderController(IEmailSender emailSender)
    {
        _emailSender = emailSender;
    }

    [HttpPost, Route("SendEmail")]
    public async Task<IActionResult> SendEmailAsync(string recipientEmail, string recipientFirstName, string link,
        string subject)
    {
        try
        {
            var messageStatus = await _emailSender.SendEmailAsync(recipientEmail, recipientFirstName, link, subject);
            return Ok(messageStatus);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}