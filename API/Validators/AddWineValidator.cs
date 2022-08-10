using API.DTOs;
using API.Extensions;
using FluentValidation;

namespace API.Validators;

public class AddWineValidator : AbstractValidator<AddWineDto>
{
    public AddWineValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("{PropertyName} på vin er påkrevd.")
            .MinimumLength(3).WithMessage("{PropertyName} på vin må minst være {MinLength} bokstaver.")
            .MaximumLength(120).WithMessage("{PropertyName} på vin kan max være {MaxLength} bokstaver.")
            .WithName("'Navn'");

        RuleFor(x => x.Type)
            .NotEmpty().WithMessage("Type er påkrevd.")
            .MaximumLength(20).WithMessage("Type kan max være {MaxLength} bokstaver.");

        RuleFor(x => x.Year)
            .InclusiveBetween(0, 3000).WithMessage("Årgang må være mellom 0 og 3000.");

        RuleFor(x => x.AlcoholContent).InclusiveBetween(0, 100)
            .WithMessage("Alkoholinnhold kan kun være mellom 0 og 100 prosent.");

        RuleFor(x => x.Volume).InclusiveBetween(0, 100)
            .WithMessage("Volum kan kun være mellom 0 og 100 liter.");
        RuleFor(x => x.Price)
            .GreaterThanOrEqualTo(0).WithMessage("Pris kan ikke være ett negativt tall.")
            .LessThanOrEqualTo(1000000).WithMessage("Pris kan max være 1 000 000 kr.");

        RuleFor(x => x.Country).MaximumLength(56).WithMessage("Land kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.Region).MaximumLength(70).WithMessage("Distrikt kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.SubRegion).MaximumLength(70).WithMessage("Underdistrikt kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.ManufacturerName).MaximumLength(70).WithMessage("Produsent kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.StoragePotential).MaximumLength(70)
            .WithMessage("Lagringsgrad kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.ProductId).MaximumLength(24).WithMessage("Produktnummer kan max være {MaxLength} bokstaver.");

        // taste notes
        RuleFor(x => x.Taste).MaximumLength(500).WithMessage("Smak kan max være 500 bokstaver.");


        RuleFor(x => x.Odour).MaximumLength(500).WithMessage("Duft kan max være {MaxLength} bokstaver.");
        RuleFor(x => x.Colour).MaximumLength(500).WithMessage("Farge kan max være {MaxLength} bokstaver.");


        // file validation
        RuleFor(x => x.File).SetValidator(new FileValidator());

        // Tag Validation
        RuleFor(x => x.Grapes)
            .Must(x => x is {Count: <= 12}).WithMessage("'Råvarer' kan max ha 12 verdier i listen.")
            .Unless(x => x.Grapes.IsNull());

        RuleFor(x => x.RecommendedFood)
            .Must(x => x is {Count: <= 12}).WithMessage("'Annbefalt mat' kan max ha 12 verdier i listen.")
            .Unless(x => x.RecommendedFood.IsNull());

        // Tag Child Elements
        RuleForEach(x => x.Grapes).OverrideIndexer((x, y, z, v) => null).SetValidator(new TagValidator(5));
        RuleForEach(x => x.RecommendedFood).OverrideIndexer((x, y, z, v) => null).SetValidator(new TagValidator(3));

        // Taste Values Validation
        RuleFor(x => x.Bitterness).SetValidator(new TasteValueValidator()).WithName("'Bitterhet'");
        RuleFor(x => x.Sweetness).SetValidator(new TasteValueValidator()).WithName("'Sødme'");
        RuleFor(x => x.Freshness).SetValidator(new TasteValueValidator()).WithName("'Ferskhet'");
        RuleFor(x => x.Fullness).SetValidator(new TasteValueValidator()).WithName("'Fylde'");
        RuleFor(x => x.Tannins).SetValidator(new TasteValueValidator()).WithName("'Tanninsk'");

        // UserDetails Validation
        RuleFor(x => x.UserDetails).SetValidator(new UserDetailsValidator());
    }


    /// <summary>
    /// Validates each value in 'recommended food' and 'grape' list.
    /// In db they will be stored as a string.
    /// </summary>
    private class TagValidator : AbstractValidator<string?>
    {
        public TagValidator(int minLength)
        {
            RuleFor(x => x)
                .NotEmpty().WithMessage("En verdi i listen er ugyldig eller tom.")
                .MinimumLength(minLength).WithMessage(
                    "'{PropertyValue}' må minst ha {MinLength} bokstaver. Verdien har nå {TotalLength} bokstaver.")
                .MaximumLength(40)
                .WithMessage(
                    "'{PropertyValue}' kan max ha {MaxLength} bokstaver. Verdien har nå {TotalLength} bokstaver.");
        }
    }

    private class FileValidator : AbstractValidator<IFormFile?>
    {
        public FileValidator()
        {
            RuleFor(file => file).ChildRules(file =>
            {
                RuleFor(x => x.Length).NotNull().OverridePropertyName("")
                    .LessThanOrEqualTo(2097152)
                    .WithMessage("Størrelsen på filen er for stor, max størrelse er 2MB.");
                RuleFor(x => x.ContentType).NotNull().OverridePropertyName("")
                    .Must(x => x.Equals("image/jpeg") || x.Equals("image/jpg") || x.Equals("image/png"))
                    .WithMessage(
                        "Filtypen '{PropertyValue}' støttes ikke, filtyper som er støttet er: 'jpg, jpeg, png'.");
            }).Unless(f => f == null);
        }
    }

    private class TasteValueValidator : AbstractValidator<int>
    {
        public TasteValueValidator()
        {
            RuleFor(x => x).NotNull().WithMessage("{PropertyName} må ha en verdi.")
                .InclusiveBetween(0, 12).WithMessage("Verdien til {PropertyName} må være ett tall mellom 0 og 12.");
        }
    }

    private class UserDetailsValidator : AbstractValidator<WineUserDetailsDto>
    {
        public UserDetailsValidator()
        {
            RuleFor(x => x.Score).InclusiveBetween(50, 100)
                .WithMessage("{PropertyName} kan kun være mellom 50 og 100.")
                .WithName("'Karakter'");

            RuleFor(x => x.UserRating).InclusiveBetween(0, 10)
                .WithMessage("{PropertyName} må være ett tall mellom 0 og 10.")
                .WithName("'Vurdering'");

            RuleFor(x => x.UserNote).MaximumLength(500)
                .WithMessage("{PropertyName} kan max være {MaxLength} bokstaver.")
                .WithName("'Dine notater'");

            RuleFor(x => x.PurchaseLocation).MaximumLength(70)
                .WithMessage("{PropertyName} kan max være {MaxLength} bokstaver.")
                .WithName("'Kjøpested'");

            RuleFor(x => x.Quantity)
                .NotNull().WithMessage("{PropertyName} må fylles ut.")
                .InclusiveBetween(0, 1000).WithMessage("{PropertyName} må være mellom 0 og 1000.")
                .WithName("'Antall'");

            /*RuleFor(x => x.PurchaseDate).LessThan(DateTime.UtcNow.AddDays(1))
                .WithMessage("Kjøpsdato kan ikke være i fremtiden.");*/

            RuleFor(x => x.DrinkingWindowMin).InclusiveBetween(0, 3000)
                .WithMessage("{PropertyName} må være mellom 0 og 3000.").WithName("'Drikkevindu'");

            RuleFor(x => x.DrinkingWindowMax).InclusiveBetween(0, 3000)
                .WithMessage("{PropertyName} må være mellom 0 og 3000.").WithName("'Drikkevindu'");
        }
    }
}