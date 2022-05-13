import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../../app/api";
import FormCombobox from "../../../app/components/form/FormCombobox";
import FormRadioTrueFalse from "../../../app/components/form/FormRadioTrueFalse";
import FormTasteSelect from "../../../app/components/form/FormTasteSelect";
import FormTextInput from "../../../app/components/form/FormTextInput";
import { Country } from "../../../app/models/country";
import { FormModel, Wine } from "../../../app/models/wine";
import Vinmonopolet from "./Vinmonopolet";
import { defaultValues } from "./defaultValues";
import FormYearPicker from "../../../app/components/form/FormYearPicker";
import LoadingButton from "../../../app/components/LoadingButton";
import { PlusCircle } from "phosphor-react";
import placeholderImg from "../../../app/assets/bottle.png";

interface Props {
  title: string;
  submitText: string;
  onSubmit: (data: FormModel) => void;
  serverErrors: Record<string, string[]> | null;
  wine?: Wine;
}

const tabs = ["Generell", "Smaksdetaljer", "Brukerdetaljer"];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const WineForm = ({
  onSubmit,
  serverErrors,
  wine,
  title,
  submitText,
}: Props) => {
  const [countries, setCountries] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setError,
    formState: { isSubmitting, errors, isValid, isDirty },
  } = useForm<FormModel>({
    mode: "all",
    defaultValues,
    //resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (!serverErrors) return;
    for (const [key, value] of Object.entries(serverErrors)) {
      if (key in defaultValues || key.includes("userDetails.")) {
        let _key = key;
        // userDetails to camelCase...
        if (_key.includes("userDetails.")) {
          const c = _key.charAt(_key.indexOf(".") + 1);
          _key = "userDetails." + c.toLowerCase() + _key.split(`.${c}`)[1];
        }
        //@ts-expect-error
        setError(_key, {
          types: { ...value },
        });
      }
    }
  }, [serverErrors, setError]);

  useEffect(() => {
    if (!wine) return;
    console.log("I AM UPDATE FORM");
    reset(wine);
  }, [wine, reset]);

  useEffect(() => {
    async function fetchCountries() {
      console.log("fetching countries");
      try {
        const data = await api.Vinmonopolet.getCountries();
        setCountries(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    if (!countries) fetchCountries();
  }, [countries]);

  if (loading)
    return <div className="p-8 border rounded-lg text-lg">Laster land...</div>;

  const handleResetForm = (vales: FormModel) => {
    reset(vales);
  };

  // Prevent form from submitting on enter
  // TODO: Fix textarea
  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  return (
    <div className="rounded-lg p-8 mb-8 border">
      <h2 className="text-3xl mb-6">{title}</h2>
      <form
        autoComplete="off"
        onKeyDown={(e) => checkKeyDown(e)}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Vinmonopolet
          handleResetForm={handleResetForm}
          productId={wine?.productId}
          name={wine?.name}
        />
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded bg-white-100 border-2 border-green-wine-500 mt-4 p-0.5">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "w-full transition-all rounded py-3 text-sm select-none font-medium",
                    selected
                      ? "bg-green-wine-500 text-white"
                      : "text-green-wine-500  hover:text-black hover:bg-slate-50 active:bg-slate-100"
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-6">
            <Tab.Panel className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormTextInput
                  required
                  control={control}
                  name="name"
                  label="Navn"
                  placeholder="navn på vin"
                />
                <FormTextInput
                  control={control}
                  name="storagePotential"
                  label="Lagringsgrad"
                  placeholder="lagringsgrad"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormCombobox
                  name="country"
                  label="Land"
                  control={control}
                  list={countries}
                />
                <FormTextInput
                  control={control}
                  name="region"
                  label="Distrikt"
                  placeholder="distrikt"
                />
                <FormTextInput
                  control={control}
                  name="subRegion"
                  label="Underdistrikt"
                  placeholder="underdistrikt"
                />
              </div>
              <div className="sm:flex flex-row items-center gap-4">
                <div className="sm:mb-0 select-none mb-4 rounded-lg border p-6 bg-white">
                  <img
                    className="mx-auto max-h-80"
                    src={`${
                      getValues("productId")
                        ? "https://bilder.vinmonopolet.no/cache/300x300-0/" +
                          getValues("productId") +
                          "-1.jpg"
                        : placeholderImg
                    }`}
                    alt={`Bilde av en vin`}
                  />
                </div>
                <div className="grid flex-1 grid-cols-2 gap-x-4 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                  <FormTextInput
                    required
                    control={control}
                    name="type"
                    label="Type"
                    placeholder="Vintype"
                  />
                  <FormTextInput
                    control={control}
                    name="year"
                    label="Årgang"
                    placeholder="årgang"
                  />
                  <FormTextInput
                    control={control}
                    name="volume"
                    label="Volum"
                    definition="liter"
                    placeholder="volum"
                  />
                  <FormTextInput
                    control={control}
                    name="price"
                    label="Pris"
                    definition="kr"
                    placeholder="pris"
                  />
                  <FormTextInput
                    control={control}
                    name="alcoholContent"
                    label="Alkoholdinnhold"
                    definition="%"
                    placeholder="alkoholinnhold"
                  />
                  <FormTextInput
                    control={control}
                    name="productId"
                    label="Produktnummer"
                    definition="!"
                    placeholder="produktnummer"
                  />
                  <FormTextInput
                    control={control}
                    name="manufacturerName"
                    label="Produsent"
                    placeholder="produsent"
                  />
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8">
              <div className="grid grid-cols-5 gap-4">
                <FormTasteSelect
                  control={control}
                  name="freshness"
                  type="freshness"
                  label="Ferskhet"
                />
                <FormTasteSelect
                  label="Fylde"
                  type="fullness"
                  name="fullness"
                  control={control}
                />
                <FormTasteSelect
                  label="Bitterhet"
                  type="bitterness"
                  name="bitterness"
                  control={control}
                />
                <FormTasteSelect
                  label="Sødme"
                  type="sweetness"
                  name="sweetness"
                  control={control}
                />
                <FormTasteSelect
                  label="Tanninsk"
                  type="tannins"
                  name="tannins"
                  control={control}
                />
              </div>
              <FormTextInput
                textarea
                rows={2}
                maxLength={500}
                control={control}
                name="grapes"
                label="Råstoff"
                placeholder=""
              />
              <div className="grid grid-cols-2 gap-4">
                <FormTextInput
                  textarea
                  rows={2}
                  maxLength={500}
                  control={control}
                  name="colour"
                  label="Farge"
                  placeholder="farge"
                />
                <FormTextInput
                  textarea
                  rows={2}
                  maxLength={500}
                  control={control}
                  name="odour"
                  label="Duft"
                  placeholder="duft"
                />
              </div>
              <FormTextInput
                textarea
                rows={3}
                maxLength={500}
                control={control}
                name="taste"
                label="Smak"
                placeholder="smak"
              />
            </Tab.Panel>
            <Tab.Panel className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8">
              <div className="grid grid-cols-2 gap-4">
                <FormTextInput
                  control={control}
                  name="userDetails.quantity"
                  label="Antall"
                  placeholder="antall"
                />
                <FormTextInput
                  control={control}
                  name="userDetails.purchaseLocation"
                  label="Kjøpested"
                  placeholder="kjøpested"
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <FormTextInput
                  control={control}
                  name="userDetails.purchaseDate"
                  label="Kjøpsdato"
                  placeholder="kjøpsdato"
                />
                <FormYearPicker
                  control={control}
                  name="userDetails.drinkingWindowMin"
                  label="Drikkevindu (fra)"
                  placeholder="år fra"
                />
                <FormYearPicker
                  control={control}
                  name="userDetails.drinkingWindowMax"
                  label="Drikkevindu (til)"
                  placeholder="år til"
                />
              </div>
              <FormTextInput
                textarea
                rows={3}
                maxLength={500}
                control={control}
                name="userDetails.userNote"
                label="Dine notater"
                placeholder="notater"
              />
              <FormRadioTrueFalse
                control={control}
                name="userDetails.userRating"
                label="Din vurdering (1-10)"
                options={[...Array(11)].map((_, i) => {
                  const hasRating = i > 0;
                  return {
                    displayText: hasRating ? i.toString() : "Ingen",
                    value: hasRating ? i : null,
                  };
                })}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormRadioTrueFalse
                  control={control}
                  name="userDetails.favorite"
                  label="Favoritt?"
                  options={[
                    { displayText: "Nei", value: false },
                    { displayText: "Ja", value: true },
                  ]}
                />
                <FormTextInput
                  control={control}
                  name="userDetails.score"
                  label="Karakter (50-100)"
                  placeholder="karakter"
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <div className="mt-6 border-t mb-6"></div>
        <div className="">
          <LoadingButton
            disabled={!isValid}
            loading={isSubmitting}
            loadingText="Legger til vin..."
            type="submit"
          >
            <PlusCircle size="1.5rem" />
            {submitText}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default WineForm;
