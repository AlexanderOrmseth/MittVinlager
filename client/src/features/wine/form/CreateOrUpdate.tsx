import { Tab } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FormCountryPicker from "../../../app/components/form/FormCountryPicker";
import FormTasteSelect from "../../../app/components/form/FormTasteSelect";
import FormTextInput from "../../../app/components/form/FormTextInput";
import { UserDetails, Wine } from "../../../app/models/wine";
import { defaultValues } from "./defaultValues";
import FormYearPicker from "../../../app/components/form/FormYearPicker";
import LoadingButton from "../../../app/components/LoadingButton";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  FloppyDisk,
  PlusCircle,
  Trash,
  Warning
} from "phosphor-react";
import { ThreeDots } from "react-loading-icons";
import { WineFormData, wineSchema } from "./validationSchema";

import FormFilePicker from "../../../app/components/form/FormFilePicker";
import FormStarRating from "../../../app/components/form/FormStarRating";
import WineDetailsModal from "../../../app/components/modals/WineDetailsModal";
import FormImage from "./FormImage";
import VinmonopoletModal from "../../../app/components/modals/VinmonopoletModal";
import FormToggle from "../../../app/components/form/FormToggle";
import { AnimatePresence, motion } from "framer-motion";
import FormDatePicker from "../../../app/components/form/FormDatePicker";
import { useGetVinmonopoletCountriesQuery } from "../../../app/services/vinmonopoletApi";
import { Link } from "react-router-dom";
import FormTagInput from "../../../app/components/form/FormTagInput";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

interface Props {
  onSubmit: (data: WineFormData) => void;
  serverErrors: Record<string, string[]> | null;
  setDeleteModalIsOpen?: (isOpen: boolean) => void;
  wine?: Wine;
}

type Keys = keyof WineFormData | keyof UserDetails;
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
  "file"
];
const tab2: Keys[] = [
  "freshness",
  "fullness",
  "bitterness",
  "sweetness",
  "tannins",
  "grapes",
  "colour",
  "recommendedFood",
  "odour",
  "taste"
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
  "userRating"
];
const tabFields = [tab1, tab2, tab3];
const tabs = ["Vindetaljer", "Smaksdetaljer", "Brukerdetaljer"];

const tabAnim = {
  hide: {
    opacity: 0,
    translateY: -8,
    transition: {
      duration: 0.2,
      ease: "linear"
    }
  },
  show: {
    opacity: 1,
    translateY: 0,
    transition: {
      duration: 0.2,
      ease: "linear"
    }
  }
};

const CreateOrUpdate = ({
  onSubmit,
  serverErrors,
  wine,
  setDeleteModalIsOpen
}: Props) => {
  const { data: countries, ...countryStatus } =
    useGetVinmonopoletCountriesQuery();

  // modals
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const [fetchWineIsOpen, setFetchWineIsOpen] = useState(false);

  // tab
  const [tabIndex, setTabIndex] = useState(0);

  // RHF
  const {
    handleSubmit,
    control,
    reset,
    setError,
    watch,
    getValues,
    setValue,
    formState: { isSubmitting, errors, isValid }
  } = useForm<WineFormData>({
    mode: "all",
    defaultValues,
    shouldUseNativeValidation: false,
    resolver: zodResolver(wineSchema)
  });

  // watch
  const watchFile = watch("file", null);

  // Convert .Net Validation Errors to RHF
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
          types: { ...value }
        });
      } else {
        console.log({ key, value });
        toast.error("Ukjent error!");
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
          : null
      }
    };

    reset(modifiedWine);
  }, [wine, reset]);

  // Count errors in tabs
  const getErrorCount = (keyNames: Keys[], userDetails = false) => {
    const err = userDetails ? errors.userDetails : errors;
    if (!err || Object.keys(err).length === 0) return 0;
    let errorNum = 0;
    keyNames.forEach((key) =>
      Object.prototype.hasOwnProperty.call(err, key) ? (errorNum += 1) : null
    );
    return errorNum;
  };

  const handlePreSubmit = async (d: WineFormData) => {
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
        setIsOpen={setPreviewIsOpen}
        isOpen={previewIsOpen}
        getValues={getValues}
      />
      <VinmonopoletModal
        setIsOpen={setFetchWineIsOpen}
        productId={wine?.productId}
        isOpen={fetchWineIsOpen}
        setValues={reset}
        getValues={getValues}
        setValue={setValue}
      />

      <div className="block-less-muted mt-6 rounded-lg p-4 md:p-8 ">
        <Tab.Group selectedIndex={tabIndex} onChange={setTabIndex}>
          <div className="mb-6 flex flex-col items-start justify-between gap-x-2 gap-y-4 lg:flex-row lg:items-center">
            <Tab.List className="xts:flex-row inline-flex w-full max-w-lg flex-col gap-x-1 gap-y-2">
              {tabs.map((tab, i) => (
                <Tab
                  key={i}
                  className={({ selected }) =>
                    `relative rounded-t flex-1 border dark:border-gray-700 focus:outline-none focus:ring-0 md:px-8 px-4 py-4 text-sm select-none font-medium ${
                      selected
                        ? " text-wine-500 border-b-wine-500 dark:text-white bg-white dark:bg-gray-700/80 border-b-2 dark:border-b-wine-500"
                        : "text-gray-700 hover:border-gray-300 dark:bg-gray-800/70 bg-white dark:text-gray-300" +
                          " dark:hover:text-gray-200 dark:hover:border-gray-600 dark:hover:bg-gray-800/60 hover:text-black "
                    }`
                  }
                >
                  {!!getErrorCount(tabFields[i], i === 2) && (
                    <div className="text-wine-400 dark:text-wine-300 pointer-events-none absolute -top-4 left-0 w-full animate-bounce">
                      <div className="border-wine-400 inline-flex flex-row items-center justify-center gap-x-1 rounded bg-slate-200/40 py-2 px-4 backdrop-blur-sm dark:bg-gray-800/40">
                        <Warning size="1.5rem" weight="duotone" />
                        {getErrorCount(tabFields[i], i === 2)}
                      </div>
                    </div>
                  )}
                  {tab}
                </Tab>
              ))}
            </Tab.List>
            <button
              onClick={() => setFetchWineIsOpen(true)}
              className="btn-secondary xs:w-auto flex h-12 w-full flex-row items-center justify-center gap-x-2 rounded-full"
            >
              <ArrowRight size="1.5rem" />
              Hent fra Vinmonopolet
            </button>
          </div>

          <div
            role="separator"
            className="relative my-6 border-t border-slate-200 dark:border-gray-700"
          >
            {getValues("productId") && (
              <span className="dark:bg-gray-950 bg-slate-25 absolute right-4 -top-3 px-1 text-sm text-slate-400">
                <span className="select-none">Varenummer: </span>
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                  <div className="flex-row items-center gap-4 md:flex">
                    <FormImage
                      file={watchFile}
                      wine={{
                        pictureUrl: wine?.pictureUrl,
                        imageByUser: wine?.imageByUser,
                        productId: wine?.productId
                      }}
                      productId={getValues("productId")}
                      name="resetImage"
                      control={control}
                    />
                    <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-3 lg:gap-y-8">
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
                        numeric
                        maxLength={10}
                        definition="liter"
                        placeholder="volum"
                      />
                      <FormTextInput
                        control={control}
                        name="price"
                        numeric
                        maxLength={10}
                        label="Pris"
                        definition="kr"
                        placeholder="pris"
                      />
                      <FormTextInput
                        control={control}
                        name="alcoholContent"
                        numeric
                        maxLength={10}
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
                      {countryStatus.isLoading ? (
                        <div className="flex flex-col items-center justify-center space-x-4">
                          <ThreeDots
                            height={"2rem"}
                            width={"2.5rem"}
                            className="mx-4"
                            fill="gray"
                          />
                          <span className="text-sm text-slate-500">
                            Laster land...
                          </span>
                        </div>
                      ) : (
                        <>
                          {countries ? (
                            <FormCountryPicker
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
                  <FormFilePicker
                    name="file"
                    label="Velg bilde"
                    control={control}
                  />
                </Tab.Panel>
                <Tab.Panel
                  as={motion.div}
                  key={1}
                  initial="hide"
                  animate="show"
                  variants={tabAnim}
                  className="flex flex-col gap-y-4 sm:gap-y-6 lg:gap-y-8"
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
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
                  <FormTagInput
                    label="Passer til"
                    min={3}
                    max={12}
                    name="recommendedFood"
                    control={control}
                  />
                  <FormTagInput
                    label="Råstoff"
                    min={5}
                    max={12}
                    name="grapes"
                    control={control}
                  />
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormTextInput
                      textarea
                      rows={4}
                      maxLength={500}
                      control={control}
                      name="colour"
                      label="Farge"
                      placeholder="farge"
                    />
                    <FormTextInput
                      textarea
                      rows={4}
                      maxLength={500}
                      control={control}
                      name="odour"
                      label="Duft"
                      placeholder="duft"
                    />
                  </div>
                  <FormTextInput
                    textarea
                    rows={4}
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
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <FormTextInput
                      control={control}
                      name="userDetails.quantity"
                      label="Antall"
                      numeric
                      maxLength={4}
                      placeholder="antall"
                    />
                    <FormTextInput
                      control={control}
                      name="userDetails.purchaseLocation"
                      label="Kjøpested"
                      placeholder="kjøpested"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 gap-y-4 sm:grid-cols-2 sm:gap-y-6 lg:grid-cols-3 lg:gap-y-8">
                    <FormTextInput
                      control={control}
                      name="userDetails.score"
                      numeric
                      maxLength={3}
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

                    <FormToggle
                      control={control}
                      name="userDetails.favorite"
                      label="Favoritt"
                    />
                    <FormStarRating
                      control={control}
                      name="userDetails.userRating"
                      label="Din vurdering"
                    />
                    <FormDatePicker
                      control={control}
                      name="userDetails.purchaseDate"
                      label="Dato kjøpt"
                      text="Velg dato"
                      hereafter={false}
                    />
                  </div>
                  <FormTextInput
                    textarea
                    rows={5}
                    maxLength={500}
                    control={control}
                    name="userDetails.userNote"
                    label="Dine notater"
                    placeholder="notater"
                  />
                </Tab.Panel>
              </AnimatePresence>
            </Tab.Panels>

            <hr className="my-6 border-t border-slate-200 dark:border-gray-700" />

            <div
              role="group"
              className="flex flex-col gap-y-4 gap-x-2 sm:grid sm:grid-cols-2 md:flex md:flex-row"
            >
              <Link
                className="btn-white i-flex-row disabled-btn w-auto justify-center rounded-full px-5"
                to={-1 as any}
              >
                <ArrowLeft size="1.5rem" />
                Avbryt
              </Link>
              <button
                className="btn-white i-flex-row disabled-btn w-auto justify-center rounded-full px-5"
                disabled={!isValid}
                type="button"
                onClick={() => setPreviewIsOpen(true)}
              >
                <Eye size="1.5rem" />
                Forhåndsvis
              </button>
              <i className="hidden flex-1 md:block" />
              {setDeleteModalIsOpen && (
                <LoadingButton
                  isPrimary={false}
                  disabled={isSubmitting}
                  type="button"
                  className="i-flex-row disabled-btn w-auto justify-center rounded-full px-5"
                  onClick={() => setDeleteModalIsOpen(true)}
                >
                  <Trash size="1.5rem" />
                  Slett
                </LoadingButton>
              )}
              <LoadingButton
                disabled={!isValid}
                loading={isSubmitting}
                className={`justify-center ${wine ? "" : "col-span-2"}`}
                loadingText={wine ? "Oppdaterer vin..." : "Legger til vin..."}
                type="submit"
              >
                {wine ? (
                  <FloppyDisk size="1.5rem" />
                ) : (
                  <PlusCircle size="1.5rem" />
                )}
                {wine ? "Lagre endringer" : "Legg til"}
              </LoadingButton>
            </div>
          </form>
        </Tab.Group>
      </div>
    </>
  );
};

export default CreateOrUpdate;
