import React, { useEffect, useState } from "react";
import TextInput from "../../../../../app/components/TextInput";
import {
  useAppDispatch,
  useAppSelector
} from "../../../../../app/store/configureStore";
import { setParams } from "../../../wineSlice";
import { z } from "zod";
import { Check } from "phosphor-react";

interface Props {
  disabled: boolean;
}

const priceSchema = z
  .object({
    priceFrom: z
      .number({ invalid_type_error: "'Pris fra' må være et tall." })
      .min(0, "'Pris fra' må være et positivt tall.")
      .int("'Pris fra' må være et heltall.")
      .nullable(),
    priceTo: z
      .number({ invalid_type_error: "'Pris til' må være et tall." })
      .positive("'Pris til' må være et positivt tall.")
      .int("'Pris til' må være et heltall.")
      .nullable()
  })
  .refine((val) => {
    if (val.priceFrom && val.priceTo) return val.priceTo >= val.priceFrom;
    return true;
  }, "'Pris til' må være høyere enn 'pris fra'.");

const Price = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();
  const {
    wineParams: { priceTo: priceToParam, priceFrom: priceFromParam }
  } = useAppSelector((state) => state.wine);
  const [error, setError] = useState<null | string>(null);
  const [priceFrom, setPriceFrom] = useState<null | number>(
    priceFromParam || null
  );
  const [priceTo, setPriceTo] = useState<null | number>(priceToParam || null);

  // when params are reset -> reset internal state
  useEffect(() => {
    if (priceToParam === null && priceFromParam === null) {
      setPriceFrom(null);
      setPriceTo(null);
    }
  }, [priceToParam, priceFromParam]);

  const handleApplyPriceFilter = () => {
    if (disabled) return;

    const result = priceSchema.safeParse({ priceFrom, priceTo });
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
      dispatch(setParams({ priceFrom, priceTo }));
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <label htmlFor="input-price-from" className="label">
          Fra
        </label>
        <TextInput
          id="input-price-from"
          maxLength={8}
          numeric={true}
          placeholder="Fra"
          resetValueBtn
          value={priceFrom}
          onChange={setPriceFrom}
          onEnter={handleApplyPriceFilter}
          hasError={!!error}
        />
      </div>
      <div>
        <label htmlFor="input-price-to" className="label">
          Til
        </label>
        <TextInput
          id="input-price-to"
          maxLength={8}
          numeric={true}
          placeholder="Til"
          resetValueBtn
          value={priceTo}
          onChange={setPriceTo}
          onEnter={handleApplyPriceFilter}
          hasError={!!error}
        />
      </div>
      {error && <em className="form-error col-span-2">{error}</em>}
      <button
        disabled={disabled}
        onClick={handleApplyPriceFilter}
        className="btn-white disabled-btn i-flex-row col-span-2 justify-center"
      >
        <Check size="1.25rem" />
        Sett pris
      </button>
    </div>
  );
};

export default Price;
