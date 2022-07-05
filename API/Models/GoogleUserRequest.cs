using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.Models;

public class GoogleUserRequest
{
    public const string PROVIDER = "google";

    [JsonProperty("idToken")] [Required] public string IdToken { get; set; }
}