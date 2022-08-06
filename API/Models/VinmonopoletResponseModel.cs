using System.Text.Json.Serialization;

namespace API.Models;

public class VinmonopoletResponseModel
{
    [JsonPropertyName("basic")] public Basic Basic { get; set; }
    [JsonPropertyName("logistics")] public Logistics Logistics { get; set; }
    [JsonPropertyName("origins")] public Origins Origins { get; set; }
    [JsonPropertyName("properties")] public Properties Properties { get; set; }
    [JsonPropertyName("classification")] public Classification Classification { get; set; }
    [JsonPropertyName("ingredients")] public IngredientsClass IngredientsClass { get; set; }
    [JsonPropertyName("description")] public Description Description { get; set; }
    [JsonPropertyName("assortment")] public AssortmentClass AssortmentClass { get; set; }
    [JsonPropertyName("prices")] public List<Price> Prices { get; set; }
    [JsonPropertyName("lastChanged")] public LastChanged LastChanged { get; set; }
}

public class Basic
{
    [JsonPropertyName("productId")] public string ProductId { get; set; }
    [JsonPropertyName("productShortName")] public string ProductShortName { get; set; }
    [JsonPropertyName("productLongName")] public string ProductLongName { get; set; }
    [JsonPropertyName("volume")] public double Volume { get; set; }
    [JsonPropertyName("alcoholContent")] public double AlcoholContent { get; set; }
    [JsonPropertyName("vintage")] public int Vintage { get; set; }
    [JsonPropertyName("ageLimit")] public string AgeLimit { get; set; }

    [JsonPropertyName("packagingMaterialId")]
    public string PackagingMaterialId { get; set; }

    [JsonPropertyName("packagingMaterial")]
    public string PackagingMaterial { get; set; }

    [JsonPropertyName("volumTypeId")] public string VolumTypeId { get; set; }
    [JsonPropertyName("volumType")] public string VolumType { get; set; }
    [JsonPropertyName("corkTypeId")] public string CorkTypeId { get; set; }
    [JsonPropertyName("corkType")] public string CorkType { get; set; }

    [JsonPropertyName("bottlePerSalesUnit")]
    public int BottlePerSalesUnit { get; set; }

    [JsonPropertyName("introductionDate")] public string IntroductionDate { get; set; }

    [JsonPropertyName("productStatusSaleId")]
    public string ProductStatusSaleId { get; set; }

    [JsonPropertyName("productStatusSaleName")]
    public string ProductStatusSaleName { get; set; }

    [JsonPropertyName("productStatusSaleValidFrom")]
    public string ProductStatusSaleValidFrom { get; set; }
}

public class Barcode
{
    [JsonPropertyName("gtin")] public string Gtin { get; set; }
    [JsonPropertyName("isMainGtin")] public bool IsMainGtin { get; set; }
}

public class Logistics
{
    [JsonPropertyName("wholesalerId")] public string WholesalerId { get; set; }
    [JsonPropertyName("wholesalerName")] public string WholesalerName { get; set; }
    [JsonPropertyName("vendorId")] public string VendorId { get; set; }
    [JsonPropertyName("vendorName")] public string VendorName { get; set; }
    [JsonPropertyName("vendorValidFrom")] public string VendorValidFrom { get; set; }
    [JsonPropertyName("manufacturerId")] public string ManufacturerId { get; set; }

    [JsonPropertyName("manufacturerName")] public string ManufacturerName { get; set; }
    [JsonPropertyName("barcodes")] public List<Barcode> Barcodes { get; set; }
    [JsonPropertyName("orderPack")] public string OrderPack { get; set; }

    [JsonPropertyName("minimumOrderQuantity")]
    public double MinimumOrderQuantity { get; set; }

    [JsonPropertyName("packagingWeight")] public double PackagingWeight { get; set; }
}

public class Origin
{
    [JsonPropertyName("countryId")] public string CountryId { get; set; }
    [JsonPropertyName("country")] public string Country { get; set; }
    [JsonPropertyName("regionId")] public string RegionId { get; set; }
    [JsonPropertyName("region")] public string Region { get; set; }
    [JsonPropertyName("subRegionId")] public string SubRegionId { get; set; }
    [JsonPropertyName("subRegion")] public string SubRegion { get; set; }
}

public class Production
{
    [JsonPropertyName("countryId")] public string CountryId { get; set; }
    [JsonPropertyName("country")] public string Country { get; set; }
    [JsonPropertyName("regionId")] public string RegionId { get; set; }
    [JsonPropertyName("region")] public string Region { get; set; }
}

public class Origins
{
    [JsonPropertyName("origin")] public Origin Origin { get; set; }
    [JsonPropertyName("production")] public Production Production { get; set; }

    [JsonPropertyName("localQualityClassifId")]
    public string LocalQualityClassifId { get; set; }

    [JsonPropertyName("localQualityClassif")]
    public string LocalQualityClassif { get; set; }
}

public class Properties
{
    [JsonPropertyName("ecoLabellingId")] public string EcoLabellingId { get; set; }
    [JsonPropertyName("ecoLabelling")] public string EcoLabelling { get; set; }

    [JsonPropertyName("storagePotentialId")]
    public string StoragePotentialId { get; set; }

    [JsonPropertyName("storagePotential")] public string StoragePotential { get; set; }
    [JsonPropertyName("organic")] public bool Organic { get; set; }
    [JsonPropertyName("biodynamic")] public bool Biodynamic { get; set; }

    [JsonPropertyName("ethicallyCertified")]
    public bool EthicallyCertified { get; set; }

    [JsonPropertyName("vintageControlled")]
    public bool VintageControlled { get; set; }

    [JsonPropertyName("sweetWine")] public bool SweetWine { get; set; }

    [JsonPropertyName("freeOrLowOnGluten")]
    public bool FreeOrLowOnGluten { get; set; }

    [JsonPropertyName("kosher")] public bool Kosher { get; set; }
    [JsonPropertyName("locallyProduced")] public bool LocallyProduced { get; set; }
    [JsonPropertyName("noAddedSulphur")] public bool NoAddedSulphur { get; set; }

    [JsonPropertyName("environmentallySmart")]
    public bool EnvironmentallySmart { get; set; }

    [JsonPropertyName("productionMethodStorage")]
    public string ProductionMethodStorage { get; set; }
}

public class Classification
{
    [JsonPropertyName("mainProductTypeId")]
    public string MainProductTypeId { get; set; }

    [JsonPropertyName("mainProductTypeName")]
    public string MainProductTypeName { get; set; }

    [JsonPropertyName("subProductTypeId")] public string SubProductTypeId { get; set; }

    [JsonPropertyName("subProductTypeName")]
    public string SubProductTypeName { get; set; }

    [JsonPropertyName("productTypeId")] public string ProductTypeId { get; set; }
    [JsonPropertyName("productTypeName")] public string ProductTypeName { get; set; }
    [JsonPropertyName("productGroupId")] public string ProductGroupId { get; set; }
    [JsonPropertyName("productGroupName")] public string ProductGroupName { get; set; }
}

public class Grape
{
    [JsonPropertyName("grapeId")] public string GrapeId { get; set; }
    [JsonPropertyName("grapeDesc")] public string GrapeDesc { get; set; }
    [JsonPropertyName("grapePct")] public int GrapePct { get; set; }
}

public class IngredientsClass
{
    [JsonPropertyName("grapes")] public List<Grape> Grapes { get; set; }
    [JsonPropertyName("ingredients")] public string Ingredients { get; set; }
    [JsonPropertyName("sugar")] public string Sugar { get; set; }
    [JsonPropertyName("acid")] public string Acid { get; set; }
}

public class Characteristics
{
    [JsonPropertyName("colour")] public string Colour { get; set; }
    [JsonPropertyName("odour")] public string Odour { get; set; }
    [JsonPropertyName("taste")] public string Taste { get; set; }
}

public class RecommendedFood
{
    [JsonPropertyName("foodId")] public string FoodId { get; set; }
    [JsonPropertyName("foodDesc")] public string FoodDesc { get; set; }
}

public class Description
{
    [JsonPropertyName("characteristics")] public Characteristics Characteristics { get; set; }
    [JsonPropertyName("freshness")] public string Freshness { get; set; }
    [JsonPropertyName("fullness")] public string Fullness { get; set; }
    [JsonPropertyName("bitterness")] public string Bitterness { get; set; }
    [JsonPropertyName("sweetness")] public string Sweetness { get; set; }
    [JsonPropertyName("tannins")] public string Tannins { get; set; }
    [JsonPropertyName("recommendedFood")] public List<RecommendedFood> RecommendedFood { get; set; }
}

public class AssortmentClass
{
    [JsonPropertyName("assortmentId")] public string AssortmentId { get; set; }
    [JsonPropertyName("assortment")] public string Assortment { get; set; }
    [JsonPropertyName("validFrom")] public string ValidFrom { get; set; }
    [JsonPropertyName("listedFrom")] public string ListedFrom { get; set; }
    [JsonPropertyName("assortmentGrade")] public string AssortmentGrade { get; set; }
}

public class Price
{
    [JsonPropertyName("priceValidFrom")] public string PriceValidFrom { get; set; }
    [JsonPropertyName("salesPrice")] public double SalesPrice { get; set; }

    [JsonPropertyName("salesPricePrLiter")]
    public double SalesPricePrLiter { get; set; }

    [JsonPropertyName("bottleReturnValue")]
    public int BottleReturnValue { get; set; }
}

public class LastChanged
{
    [JsonPropertyName("date")] public string Date { get; set; }
    [JsonPropertyName("time")] public string Time { get; set; }
}