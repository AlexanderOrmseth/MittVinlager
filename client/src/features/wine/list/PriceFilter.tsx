import React, { useState } from "react";
import TextInput from "../../../app/components/TextInput";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { setParams } from "../wineSlice";
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
      .min(0, "'Pris til' må være et positivt tall.")
      .int("'Pris til' må være et heltall.")
      .nullable(),
  })
  .refine((val) => {
    if (val.priceFrom && val.priceTo) return val.priceTo >= val.priceFrom;
    return true;
  }, "'Pris til' må være høyere enn 'pris fra'.");

const PriceFilter = ({ disabled }: Props) => {
  const dispatch = useAppDispatch();
  const {
    wineParams: { priceTo: priceToParam, priceFrom: priceFromParam },
  } = useAppSelector((state) => state.wine);
  const [error, setError] = useState<null | string>(null);
  const [priceFrom, setPriceFrom] = useState<null | number>(
    priceFromParam || null
  );
  const [priceTo, setPriceTo] = useState<null | number>(priceToParam || null);

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
        <label className="label">Pris fra</label>
        <TextInput
          maxLength={8}
          numeric={true}
          value={priceFrom}
          onChange={setPriceFrom}
          onEnter={handleApplyPriceFilter}
        />
      </div>
      <div>
        <label className="label">Pris til</label>
        <TextInput
          maxLength={8}
          numeric={true}
          value={priceTo}
          onChange={setPriceTo}
          onEnter={handleApplyPriceFilter}
        />
      </div>
      {error && <em className="col-span-2 form-error">{error}</em>}
      <button
        disabled={disabled}
        onClick={handleApplyPriceFilter}
        className="btn-white justify-center disabled-btn i-flex-row col-span-2"
      >
        <Check size="1.25rem" />
        Sett pris
      </button>
    </div>
  );
};

export default PriceFilter;
