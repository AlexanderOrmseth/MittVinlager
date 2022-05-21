using API.DTOs;
using FluentValidation;

namespace API.Validators;

public class AddWineValidator : AbstractValidator<AddWineDto>
{
    public AddWineValidator()
    {
        RuleFor(x => x.Name)
            .NotNull().WithMessage("Navn på vin er påkrevd.")
            .NotEmpty().WithMessage("Navn på vin er påkrevd.")
            .MinimumLength(3).WithMessage("Navn på vin må minst være 3 bokstaver.")
            .MaximumLength(120).WithMessage("Navn på vin kan max være 120 bokstaver.");

        RuleFor(x => x.Type)
            .NotNull().WithMessage("Type er påkrevd.")
            .NotEmpty().WithMessage("Type er påkrevd.")
            .MaximumLength(20).WithMessage("Type kan max være 20 bokstaver.");

        RuleFor(x => x.Year)
            .InclusiveBetween(0, 3000).WithMessage("Årgang må være mellom 0 og 3000.");

        RuleFor(x => x.AlcoholContent).InclusiveBetween(0, 100)
            .WithMessage("Alkoholinnhold kan kun være mellom 0 og 100 prosent.");

        RuleFor(x => x.Volume).InclusiveBetween(0, 100)
            .WithMessage("Volum kan kun være mellom 0 og 100 liter.");
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0).WithMessage("Pris kan ikke være ett negativt tall.")
            .LessThanOrEqualTo(1000000).WithMessage("Pris kan max være 1 000 000 kr.");

        RuleFor(x => x.Country).MaximumLength(56).WithMessage("Land kan max være 56 bokstaver.");
        RuleFor(x => x.Region).MaximumLength(70).WithMessage("Distrikt kan max være 70 bokstaver.");
        RuleFor(x => x.SubRegion).MaximumLength(70).WithMessage("Underdistrikt kan max være 70 bokstaver.");
        RuleFor(x => x.ManufacturerName).MaximumLength(70).WithMessage("Produsent kan max være 70 bokstaver.");
        RuleFor(x => x.StoragePotential).MaximumLength(70).WithMessage("Lagringsgrad kan max være 100 bokstaver.");
        RuleFor(x => x.ProductId).MaximumLength(24).WithMessage("Produktnummer kan max være 24 bokstaver.");

        // taste notes
        RuleFor(x => x.Taste).MaximumLength(500).WithMessage("Smak kan max være 500 bokstaver.");
        RuleFor(x => x.Grapes).MaximumLength(500).WithMessage("Råstoff kan max være 500 bokstaver.");
        RuleFor(x => x.Odour).MaximumLength(500).WithMessage("Duft kan max være 500 bokstaver.");
        RuleFor(x => x.Colour).MaximumLength(500).WithMessage("Farge kan max være 500 bokstaver.");

        // taste values
        RuleFor(x => x.Bitterness)
            .NotNull().WithMessage("Bitterhet må ha en verdi.")
            .InclusiveBetween(0, 12).WithMessage("Verdien til Bitterhet må være ett tall mellom 0 og 12.");
        RuleFor(x => x.Sweetness)
            .NotNull().WithMessage("Sødme må ha en verdi.")
            .InclusiveBetween(0, 12).WithMessage("Verdien til Sødme må være ett tall mellom 0 og 12.");
        RuleFor(x => x.Freshness)
            .NotNull().WithMessage("Ferskhet må ha en verdi.")
            .InclusiveBetween(0, 12).WithMessage("Verdien til Ferskhet må være ett tall mellom 0 og 12.");
        RuleFor(x => x.Fullness)
            .NotNull().WithMessage("Fylde må ha en verdi.")
            .InclusiveBetween(0, 12).WithMessage("Verdien til Fylde må være ett tall mellom 0 og 12.");
        RuleFor(x => x.Tannins)
            .NotNull().WithMessage("Tanninsk må ha en verdi.")
            .InclusiveBetween(0, 12).WithMessage("Verdien til Tanninsk må være ett tall mellom 0 og 12.");

        // user inputs
        RuleFor(x => x.UserDetails.Score).InclusiveBetween(50, 100)
            .WithMessage("Karakter kan kun være mellom 50 og 100.");
        RuleFor(x => x.UserDetails.UserRating).InclusiveBetween(0, 10)
            .WithMessage("Vurdering må være ett tall mellom 0 og 10.");
        RuleFor(x => x.UserDetails.UserNote).MaximumLength(500).WithMessage("Dine notater kan max være 500 bokstaver.");
        RuleFor(x => x.UserDetails.PurchaseLocation).MaximumLength(70)
            .WithMessage("Kjøpested kan max være 70 bokstaver.");
        RuleFor(x => x.UserDetails.Quantity)
            .NotNull().WithMessage("Antall må fylles ut.")
            .InclusiveBetween(0, 1000).WithMessage("Antall må være mellom 0 og 1000.");

        /*RuleFor(x => x.UserDetails.PurchaseDate).LessThan(DateTime.UtcNow.AddDays(1))
            .WithMessage("Kjøpsdato kan ikke være i fremtiden.");*/

        RuleFor(x => x.UserDetails.DrinkingWindowMin).InclusiveBetween(0, 3000)
            .WithMessage("Drikkevindu må være mellom 0 og 3000.");
        RuleFor(x => x.UserDetails.DrinkingWindowMax).InclusiveBetween(0, 3000)
            .WithMessage("Drikkevindu må være mellom 0 og 3000.");
    }
}