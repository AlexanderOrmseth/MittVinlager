import { Tab } from "@headlessui/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormCombobox from "../../../app/components/form/FormCombobox";
import FormRadioTrueFalse from "../../../app/components/form/FormRadioTrueFalse";
import FormTasteSelect from "../../../app/components/form/FormTasteSelect";
import FormTextInput from "../../../app/components/form/FormTextInput";
import { FormModel, Wine } from "../../../app/models/wine";
import Vinmonopolet from "./Vinmonopolet";
import { defaultValues } from "./defaultValues";
import FormYearPicker from "../../../app/components/form/FormYearPicker";
import LoadingButton from "../../../app/components/LoadingButton";
import { PencilSimpleLine, PlusCircle } from "phosphor-react";
import placeholderImg from "../../../app/assets/bottle.png";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getCountries } from "../slices/wineAsyncThunks";
import { ThreeDots } from "react-loading-icons";
import FormDatePicker from "../../../app/components/form/FormDatePicker";
import { schema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormFilePicker from "../../../app/components/form/FormFilePicker";
interface Props {
  title: string;
  submitText: string;
  onSubmit: (data: FormModel) => void;
  serverErrors: Record<string, string[]> | null;
  wine?: Wine;
}

const tabs = ["Generell", "Smaksdetaljer", "Brukerdetaljer"];
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const WineForm = ({
  onSubmit,
  serverErrors,
  wine,
  title,
  submitText,
}: Props) => {
  const dispatch = useAppDispatch();
  const { countries, countryStatus } = useAppSelector((state) => state.wine);

  const {
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    formState: { isSubmitting, isValid },
  } = useForm<FormModel>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const watchFile = watch("file", null);
  const watchProductId = watch("productId", null);

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

  // reset with Wine values
  useEffect(() => {
    if (!wine) return;

    // convert date to date..
    const modifiedWine = {
      ...wine,
      userDetails: {
        ...wine.userDetails,
        purchaseDate: wine.userDetails.purchaseDate
          ? new Date(wine.userDetails.purchaseDate)
          : null,
      },
    };

    reset(modifiedWine);
  }, [wine, reset]);

  // fetch countries
  useEffect(() => {
    if (!countries) dispatch(getCountries());
  }, [dispatch, countries]);

  // Prevent form from submitting on enter
  // TODO: Fix textarea
  const checkKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.code === "Enter") e.preventDefault();
  };

  const imageSrc = (): string => {
    if (watchFile) {
      return URL.createObjectURL(watchFile);
    }

    if (wine && wine.pictureUrl && wine.productId === watchProductId) {
      return wine.pictureUrl;
    }
    if (watchProductId) {
      return `https://bilder.vinmonopolet.no/cache/300x300-0/${watchProductId}-1.jpg`;
    }

    return placeholderImg;
  };

  const handlePreSubmit = async (d: FormModel) => {
    if (!countries) {
      await onSubmit(d);
      return;
    }
    // Adding the countryId to display flags
    const countryId =
      countries
        ?.find((c) => c.country?.toLowerCase() === d.country?.toLowerCase())
        ?.countryId?.toLowerCase() || null;
    const data = { ...d, ...{ countryId } };
    await onSubmit(data);
  };

  return (
    <div className="rounded-lg p-8 border">
      <h2 className="text-3xl mb-6">{title}</h2>
      <form
        autoComplete="off"
        onKeyDown={(e) => checkKeyDown(e)}
        onSubmit={handleSubmit((d) => handlePreSubmit(d))}
      >
        <Vinmonopolet
          handleResetForm={reset}
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
                {countryStatus === "loading" ? (
                  <div className="flex items-center flex-col justify-center space-x-4">
                    <ThreeDots
                      height={"2rem"}
                      width={"2.5rem"}
                      className="mx-4"
                      fill="gray"
                    />
                    <span className="text-slate-500 text-sm">
                      Laster land...
                    </span>
                  </div>
                ) : (
                  <>
                    {countries ? (
                      <FormCombobox
                        name="country"
                        label="Land"
                        control={control}
                        list={countries}
                      />
                    ) : (
                      <FormTextInput
                        control={control}
                        name="country"
                        label="Land"
                        placeholder="land"
                      />
                    )}
                  </>
                )}
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
                    className="mx-auto object-scale-down h-64 w-64"
                    src={`${imageSrc()}`}
                    alt="Bilde av en vin."
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
              <div>
                <FormFilePicker
                  name="file"
                  label="Velg bilde"
                  control={control}
                />
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
                {/* <FormDatePicker
                  control={control}
                  name="userDetails.purchaseDate"
                  label="Kjøpsdato"
                /> */}
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
            {wine ? (
              <PencilSimpleLine size="1.5rem" />
            ) : (
              <PlusCircle size="1.5rem" />
            )}
            {submitText}
          </LoadingButton>
        </div>
      </form>
    </div>
  );
};

export default WineForm;
