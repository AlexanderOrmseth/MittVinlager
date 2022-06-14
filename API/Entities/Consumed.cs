using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace API.Entities;

public class Consumed
{
    [JsonIgnore] public int Id { get; set; }
    [JsonIgnore] public virtual Wine Wine { get; set; }
    [JsonIgnore] public int WineId { get; set; }
    [Required] public DateTime Date { get; set; }
}