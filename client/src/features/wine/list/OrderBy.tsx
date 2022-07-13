import React, { FunctionComponent } from "react";
import ListBox from "../../../app/components/ListBox";
import { setOrderBy, setOrderByDescending } from "../wineSlice";
import { OrderBy as OrderByType } from "../../../app/models/params";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../app/store/configureStore";
import { SortAscending, SortDescending } from "phosphor-react";

interface Props {
  disabled: boolean;
  selectedOrder: OrderByType;
}

interface ListBoxItems {
  value: OrderByType;
  displayText: string;
}

// sort options
const listBoxItems: ListBoxItems[] = [
  {
    value: "name",
    displayText: "Navn",
  },
  {
    value: "price",
    displayText: "Pris",
  },
  {
    value: "country",
    displayText: "Land",
  },
  {
    value: "type",
    displayText: "Type",
  },
];

const OrderBy: FunctionComponent<Props> = ({ disabled, selectedOrder }) => {
  const dispatch = useAppDispatch();
  const { orderByDescending } = useAppSelector((state) => state.wine);

  const handleToggleDesc = () => {
    if (selectedOrder === "name") return;
    const newOrderBy = orderByDescending
      ? selectedOrder.replace("Desc", "")
      : `${selectedOrder}Desc`;
    dispatch(setOrderBy(newOrderBy as OrderByType));
    dispatch(setOrderByDescending(!orderByDescending));
  };

  return (
    <div className="i-flex-row items-end">
      <div className="flex-1">
        <ListBox
          label="Sorter"
          items={listBoxItems}
          disabled={disabled}
          selected={selectedOrder.replace("Desc", "")}
          onChange={(item: string) => {
            dispatch(
              setOrderBy(
                (orderByDescending && item !== "name"
                  ? `${item}Desc`
                  : item) as OrderByType
              )
            );
          }}
        />
      </div>
      <button
        disabled={disabled || selectedOrder === "name"}
        onClick={handleToggleDesc}
        className={`btn-white disabled-btn w-auto`}
      >
        {selectedOrder.includes("Desc") ? (
          <SortDescending size="1.25rem" />
        ) : (
          <SortAscending size="1.25rem" />
        )}
      </button>
    </div>
  );
};

export default OrderBy;
