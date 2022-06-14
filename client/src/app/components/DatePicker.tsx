import { Popover, Transition } from "@headlessui/react";
import {
  CalendarBlank,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  X,
} from "phosphor-react";
import { Fragment, useEffect, useState } from "react";
import { formatDate } from "../util/format";

const months = [
  "Januar",
  "Februar",
  "Mars",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Desember",
];

const weekdays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
  text: string;
}

const DatePicker = ({ value, onChange, text }: Props) => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    if (!value) {
      setYear(new Date().getFullYear());
      setMonth(new Date().getMonth());
    } else {
      setYear(value.getFullYear());
      setMonth(value.getMonth());
    }
  }, [value]);

  const handleYearChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    add?: boolean,
    amount?: number
  ) => {
    e.preventDefault();
    amount = amount ?? 1;
    if (add) {
      year + amount < 3000 ? setYear(year + amount) : console.log("year error");
    } else {
      year + amount > 0 ? setYear(year - amount) : console.log("year error");
    }
  };
  const handleMonthChange = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    add?: boolean
  ) => {
    e.preventDefault();
    if (add) {
      if (month >= 11) {
        setMonth(0);
        if (year < 3000) {
          setYear(year + 1);
        }
      } else {
        setMonth(month + 1);
      }
    } else {
      if (month <= 0) {
        setMonth(11);
        if (year > 0) {
          setYear(year - 1);
        }
      } else {
        setMonth(month - 1);
      }
    }
  };

  const handleDateChange = (day: number) => {
    onChange(new Date(year, month, day + 1));
  };

  const isSelectedDate = (i: number): boolean => {
    if (value) {
      return value.getFullYear() === year &&
        value.getMonth() === month &&
        value.getDate() - 1 === i
        ? true
        : false;
    }
    return false;
  };

  // days before
  const renderDaysBefore = [...Array(new Date(year, month, 0).getDay())].map(
    (_, i) => <div key={i} />
  );

  // clickable days
  const renderDays = (close: () => void) =>
    [...Array(new Date(year, month + 1, 0).getDate())].map((_, i) => (
      <button
        onClick={(event) => {
          handleDateChange(i);
          close();
          event.preventDefault();
        }}
        disabled={isSelectedDate(i)}
        className={`text-gray-700 hover:bg-slate-100 hover:text-gray-900 py-2 rounded disabled:bg-wine-500 disabled:text-white`}
        key={i}
      >
        {i + 1}
      </button>
    ));

  // render weekdays
  const renderWeekDays = weekdays.map((dayName) => (
    <div key={dayName}>{dayName}</div>
  ));

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button
            type="button"
            className={`btn-white w-full flex flex-row items-center gap-x-2 justify-center`}
          >
            <CalendarBlank size="1.5rem" className="text-gray-700" />
            {value ? formatDate(value, true) : text}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
              {({ close }) => (
                <>
                  <div className="flex flex-col gap-y-1 p-1">
                    <div className="flex flex-row gap-x-1 items-center">
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleMonthChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        className="hover:underline font-semibold flex-1 hover:text-wine-500"
                        onClick={(event) => {
                          setMonth(new Date().getMonth());
                          event.preventDefault();
                        }}
                      >
                        {months[month]}
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleMonthChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                    <div className="flex flex-row gap-x-1 items-center">
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleYearChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleYearChange(event, false, 5)}
                      >
                        <CaretDoubleLeft size="1.5rem" />
                      </button>
                      <button
                        className="hover:underline font-semibold flex-1 hover:text-wine-500"
                        onClick={(event) => {
                          setYear(new Date().getFullYear());
                          event.preventDefault();
                        }}
                      >
                        {year}
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleYearChange(event, true, 5)}
                      >
                        <CaretDoubleRight size="1.5rem" />
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 w-auto p-1"
                        onClick={(event) => handleYearChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                  </div>

                  <div className="grid px-1 mb-[1px] grid-cols-7 gap-[1px] text-center text-sm text-gray-700 border-b">
                    {renderWeekDays}
                  </div>
                  {year && (
                    <div className="grid px-1 select-none gap-[1px] grid-cols-7 text-center">
                      <>
                        {renderDaysBefore}
                        {renderDays(close)}
                      </>
                    </div>
                  )}

                  <div className="flex flex-row items-center gap-x-1 p-1">
                    <button
                      className="btn-white shadow-none"
                      onClick={(event) => {
                        onChange(new Date());
                        event.preventDefault();
                        close();
                      }}
                    >
                      I dag
                    </button>
                    <button
                      onClick={(event) => {
                        onChange(null);
                        event.preventDefault();
                        close();
                      }}
                      className="btn-white shadow-none justify-center flex flex-row gap-x-2 items-center"
                    >
                      <X size="1.25rem" className="text-gray-700" />
                      Fjern dato
                    </button>
                  </div>
                </>
              )}
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default DatePicker;
