import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormCombobox from "../../../app/components/form/FormCombobox";
import FormTasteSelect from "../../../app/components/form/FormTasteSelect";
import FormTextInput from "../../../app/components/form/FormTextInput";
import { FormModel, UserDetails, Wine } from "../../../app/models/wine";
import { defaultValues } from "./defaultValues";
import FormYearPicker from "../../../app/components/form/FormYearPicker";
import LoadingButton from "../../../app/components/LoadingButton";
import {
  ArrowRight,
  Bug,
  Eye,
  PencilSimpleLine,
  PlusCircle,
} from "phosphor-react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { getCountries } from "../slices/wineAsyncThunks";
import { ThreeDots } from "react-loading-icons";
import { schema } from "./validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import FormFilePicker from "../../../app/components/form/FormFilePicker";
import FormStarRating from "../../../app/components/form/FormStarRating";
import WineDetailsModal from "../../../app/components/modals/WineDetailsModal";
import FormImage from "./FormImage";
import VinmonopoletModal from "../../../app/components/modals/VinmonopoletModal";
import FormToggle from "../../../app/components/form/FormToggle";
import { AnimatePresence, motion } from "framer-motion";
import Title from "../../../app/layout/Title";
interface Props {
  title: string;
  submitText: string;
  onSubmit: (data: FormModel) => void;
  serverErrors: Record<string, string[]> | null;
  wine?: Wine;
}

type Keys = keyof FormModel | keyof UserDetails;
const tab1: Keys[] = [
  "name",
  "type",
  "volume",
  "price",
  "storagePotential",
  "region",
  "subRegion",
  "year",
  "alcoholContent",
  "manufacturerName",
  "country",
];
const tab2: Keys[] = [
  "freshness",
  "fullness",
  "bitterness",
  "sweetness",
  "tannins",
  "grapes",
  "colour",
  "odour",
  "taste",
];
const tab3: Keys[] = [
  "quantity",
  "purchaseDate",
  "drinkingWindowMin",
  "drinkingWindowMax",
  "purchaseLocation",
  "userNote",
  "favorite",
  "score",
  "userRating",
];
const tabFields = [tab1, tab2, tab3];
const tabs = ["Vindetaljer", "Smaksdetaljer", "Brukerdetaljer"];
const classNames = (...classes: string[]) => classes.filter(Boolean).join(" ");

const tabAnim = {
  hide: {
    opacity: 0,
    translateY: -8,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.2,
      ease: "linear",
    },
  },
};

const WineForm = ({
  onSubmit,
  serverErrors,
  wine,
  title,
  submitText,
}: Props) => {
  const dispatch = useAppDispatch();
  const { countries, countryStatus } = useAppSelector((state) => state.wine);
  const [isOpen, setIsOpen] = useState(false);
  const [vinmonopoletModalIsOpen, setVinmonopoletModalIsOpen] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const {
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    getValues,
    setValue,
    trigger,
    formState: { isSubmitting, errors, isValid },
  } = useForm<FormModel>({
    mode: "all",
    defaultValues,
    resolver: yupResolver(schema),
  });

  const watchFile = watch("file", null);
  const watchDrinkingWindowMin = watch("userDetails.drinkingWindowMin");

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

  // effect watching on drinkingwindowMin
  useEffect(() => {
    trigger("userDetails.drinkingWindowMax");
  }, [watchDrinkingWindowMin, trigger]);

  // fetch countries
  useEffect(() => {
    if (!countries) dispatch(getCountries());
  }, [dispatch, countries]);

  // Count errors in tabs
  const getErrorCount = (keyNames: Keys[], userDetails = false) => {
    const err = userDetails ? errors.userDetails : errors;
    if (!err || Object.keys(err).length === 0) return 0;
    let errorNum = 0;
    keyNames.forEach((key) =>
      err.hasOwnProperty(key) ? (errorNum += 1) : null
    );
    return errorNum;
  };

  const handlePreSubmit = async (d: FormModel) => {
    // if countries failed to load -> submit without country id
    if (!countries) {
      await onSubmit(d);
      return;
    }

    // find country id
    const countryId =
      countries
        ?.find((c) => c.country?.toLowerCase() === d.country?.toLowerCase())
        ?.countryId?.toLowerCase() || null;

    // add country id to form values
    const data = { ...d, ...{ countryId } };
    // submit
    await onSubmit(data);
  };

  return (
    <>
      <WineDetailsModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        getValues={getValues}
      />
      <VinmonopoletModal
        setIsOpen={setVinmonopoletModalIsOpen}
        productId={wine?.productId}
        isOpen={vinmonopoletModalIsOpen}
        setValues={reset}
        getValues={getValues}
        setValue={setValue}
      />
      <Title title={title} border Icon={wine ? PencilSimpleLine : PlusCircle} />
      <div className="mt-4 text-slate-700">
        Her kan du legge til vin. Trykk på "Hent fra Vinmonopolet" knappen for å
        hente vin fra Vinmonopolet.no.
      </div>

      <div className="bg-slate-25 mt-6 border rounded-lg md:p-8 p-4 ">
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <div className="mb-6 flex lg:flex-row flex-col gap-x-2 gap-y-4 justify-between items-start">
            <Tab.List className="inline-flex bg-white rounded shadow flex-row">
              {tabs.map((tab, i) => (
                <Tab
                  key={i}
                  className={({ selected }) =>
                    classNames(
                      "relative last:border-r-0 border-r focus:outline-none focus:ring-0 first:rounded-tl last:rounded-tr",
                      "h-12 md:px-8 px-4 text-sm select-none font-medium border-b-2",
                      selected
                        ? " text-wine-500 rounded-b-none border-b-wine-500"
                        : "text-gray-700 hover:text-black border-b-transparent"
                    )
                  }
                >
                  {!!getErrorCount(tabFields[i], i === 2) && (
                    <div className="text-wine-400 pointer-events-none absolute -top-2 left-0 w-full animate-bounce">
                      <div className="flex flex-row items-center gap-x-1 justify-center">
                        <Bug size="1.5rem" weight="duotone" />
                        {getErrorCount(tabFields[i], i === 2)}
                      </div>
                    </div>
                  )}
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <button
              onClick={() => setVinmonopoletModalIsOpen(true)}
              className="btn-secondary flex rounded-full flex-row gap-x-2 items-center h-12"
            >
              <ArrowRight size="1.5rem" />
              Hent fra Vinmonopolet
            </button>
          </div>
          <div className="mt-6 border-t relative border-slate-200 mb-6">
            {getValues("productId") && (
              <span className="absolute right-4 px-1 text-sm -top-3 text-slate-400 bg-slate-25">
                <span className="select-none">produktId: </span>
                {getValues("productId")}
              </span>
            )}
          </div>
          <form
            autoComplete="off"
            onSubmit={handleSubmit((d) => handlePreSubmit(d))}
          >
            <Tab.Panels>
              <AnimatePresence initial={false}>
                <Tab.Panel
                  key={0}
                  as={motion.div}
                  initial="hide"
                  animate="show"
                  variants={tabAnim}
                  className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8"
                >
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

                  <div className="md:flex flex-row items-center gap-4">
                    <FormImage
                      file={watchFile}
                      wine={{
                        pictureUrl: wine?.pictureUrl,
                        imageByUser: wine?.imageByUser,
                        productId: wine?.productId,
                      }}
                      productId={getValues("productId")}
                      name="resetImage"
                      control={control}
                    />
                    <div className="grid flex-1 grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 sm:gap-y-6 lg:gap-y-8">
                      <FormTextInput
                        required
                        control={control}
                        name="type"
                        label="Type"
                        placeholder="Vintype"
                      />
                      <FormYearPicker
                        control={control}
                        minValue={0}
                        maxValue={3000}
                        dropDownMinValue={new Date().getFullYear() - 10}
                        dropDownMaxValue={new Date().getFullYear() + 1}
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
                        name="manufacturerName"
                        label="Produsent"
                        placeholder="produsent"
                      />
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
                  </div>
                  <div>
                    <FormFilePicker
                      name="file"
                      label="Velg bilde"
                      control={control}
                    />
                  </div>
                </Tab.Panel>
                <Tab.Panel
                  as={motion.div}
                  key={1}
                  initial="hide"
                  animate="show"
                  variants={tabAnim}
                  className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8"
                >
                  <div className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
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
                <Tab.Panel
                  as={motion.div}
                  key={2}
                  initial="hide"
                  animate="show"
                  variants={tabAnim}
                  className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8"
                >
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
                      name="userDetails.score"
                      label="Karakter (50-100)"
                      placeholder="karakter"
                    />
                    <FormYearPicker
                      control={control}
                      minValue={0}
                      maxValue={3000}
                      dropDownMinValue={new Date().getFullYear() - 5}
                      dropDownMaxValue={new Date().getFullYear() + 5}
                      name="userDetails.drinkingWindowMin"
                      label="Drikkevindu (fra)"
                      placeholder="år fra"
                    />
                    <FormYearPicker
                      control={control}
                      minValue={0}
                      maxValue={3000}
                      dropDownMinValue={new Date().getFullYear() - 5}
                      dropDownMaxValue={new Date().getFullYear() + 10}
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
                  <div className="grid grid-cols-3 gap-4">
                    <FormToggle
                      control={control}
                      name="userDetails.favorite"
                      label="Favoritt?"
                    />
                    <FormStarRating
                      control={control}
                      name="userDetails.userRating"
                      label="Din vurdering"
                    />
                  </div>
                </Tab.Panel>
              </AnimatePresence>
            </Tab.Panels>
            <div className="mt-6 border-t border-slate-200 mb-6"></div>
            <div className="flex flex-row flex-wrap gap-2 items-center">
              <LoadingButton
                disabled={!isValid}
                loading={isSubmitting}
                loadingText={wine ? "Oppdaterer vin..." : "Legger til vin..."}
                type="submit"
              >
                {wine ? (
                  <PencilSimpleLine size="1.5rem" />
                ) : (
                  <PlusCircle size="1.5rem" />
                )}
                {submitText}
              </LoadingButton>
              <button
                className="px-5 btn-white shadow-none focus-primary flex rounded-full flex-row gap-x-2 items-center text-sm disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:bg-gray-300 font-medium w-auto h-auto py-2"
                disabled={!isValid}
                type="button"
                onClick={() => setIsOpen(true)}
              >
                <Eye size="1.5rem" />
                Forhåndsvis
              </button>
            </div>
          </form>
        </Tab.Group>
      </div>
    </>
  );
};

export default WineForm;
