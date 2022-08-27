import { Popover, Transition } from "@headlessui/react";
import {
  CalendarBlank,
  CaretDoubleLeft,
  CaretDoubleRight,
  CaretLeft,
  CaretRight,
  X
} from "phosphor-react";
import React, { Fragment, useEffect, useState } from "react";
import Time from "./Time";

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
  "Desember"
];

const today = new Date();

const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);
tomorrow.setHours(0, 0, 0, 0);

const weekdays = ["man", "tir", "ons", "tor", "fre", "lør", "søn"];

interface Props {
  value: Date | null;
  onChange: (date: Date | null) => void;
  text: string;
  hereafter: boolean;
  absolute?: boolean;
  disabled?: boolean;
  id?: string;
}

const DatePicker = ({
  value,
  onChange,
  text,
  hereafter,
  absolute = true,
  disabled,
  id
}: Props) => {
  const [year, setYear] = useState(0);
  const [month, setMonth] = useState(0);

  useEffect(() => {
    if (!value) {
      setYear(today.getFullYear());
      setMonth(today.getMonth());
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
      year + amount < 3000
        ? setYear(year + amount)
        : console.log("max year is 3000.");
    } else {
      year + amount > 0
        ? setYear(year - amount)
        : console.log("min year is 0.");
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
    onChange(new Date(year, month, day + 1, 0, 0, 0, 0));
  };

  const isSelectedDate = (i: number): boolean => {
    if (value) {
      return (
        value.getFullYear() === year &&
        value.getMonth() === month &&
        value.getDate() - 1 === i
      );
    }
    return false;
  };

  const isHereafter = (i: number): boolean => {
    const shownDate = new Date(year, month, i + 1, 0, 0, 0, 0);

    // disable date
    return shownDate > tomorrow;
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
        type="button"
        id={id}
        disabled={!hereafter ? isHereafter(i) : false}
        aria-disabled={!hereafter ? isHereafter(i) : false}
        className={` rounded py-2 ${
          isSelectedDate(i)
            ? "bg-wine-500 dark:bg-wine-400 text-white"
            : "text-gray-700 hover:bg-slate-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
        } disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-700 disabled:opacity-30 dark:disabled:bg-gray-800/80`}
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
      {() => (
        <>
          <Popover.Button
            type="button"
            disabled={disabled}
            className={`btn-white disabled-btn flex w-full flex-row items-center justify-center gap-x-2`}
          >
            <CalendarBlank
              size="1.25rem"
              weight="duotone"
              className="text-slate-700 dark:text-gray-300"
            />
            <Time date={value} fallBackText={text} short />
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave={`${absolute ? "transition duration-75 ease-out" : ""}`}
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Popover.Panel
              className={`${
                absolute ? "absolute z-10 shadow-lg" : "block shadow-sm"
              } mt-1 w-full rounded-lg border bg-white dark:border-gray-700 dark:bg-gray-900 `}
            >
              {({ close }) => (
                <>
                  <div className="flex flex-col gap-y-1 p-1">
                    <div className="flex flex-row items-center gap-x-1">
                      <button
                        aria-label="Vis tidligere måned"
                        type="button"
                        className="btn-white w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        onClick={(event) => handleMonthChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        aria-label="Vis nåværende måned"
                        type="button"
                        className="hover:text-wine-500 dark:hover:text-wine-300 flex-1 font-semibold hover:underline"
                        onClick={(event) => {
                          setMonth(new Date().getMonth());
                          event.preventDefault();
                        }}
                      >
                        {months[month]}
                      </button>
                      <button
                        aria-label="Vis neste måned"
                        type="button"
                        className="btn-white w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        onClick={(event) => handleMonthChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                    <div className="flex flex-row items-center gap-x-1">
                      <button
                        aria-label={`Vis år ${year - 1}`}
                        type="button"
                        className="btn-white w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        onClick={(event) => handleYearChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        aria-label={`Vis år ${year - 5}`}
                        type="button"
                        className="btn-white w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        onClick={(event) => handleYearChange(event, false, 5)}
                      >
                        <CaretDoubleLeft size="1.5rem" />
                      </button>
                      <button
                        aria-label={`Vis år ${today.getFullYear()}`}
                        type="button"
                        className="hover:text-wine-500 dark:hover:text-wine-300 flex-1 font-semibold hover:underline"
                        onClick={(event) => {
                          setYear(today.getFullYear());
                          event.preventDefault();
                        }}
                      >
                        {year}
                      </button>
                      <button
                        aria-label={`Vis år ${year + 5}`}
                        type="button"
                        className="btn-white disabled-btn w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        disabled={!hereafter && year + 5 > today.getFullYear()}
                        onClick={(event) => handleYearChange(event, true, 5)}
                      >
                        <CaretDoubleRight size="1.5rem" />
                      </button>
                      <button
                        aria-label={`Vis år ${year + 1}`}
                        type="button"
                        className="btn-white disabled-btn w-auto p-1 text-gray-700 shadow-none dark:text-gray-300"
                        disabled={!hereafter && year >= today.getFullYear()}
                        onClick={(event) => handleYearChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                  </div>

                  <div className="text-less-muted mb-[1px] grid select-none grid-cols-7 gap-[1px] border-b px-1 text-center text-sm font-medium dark:border-gray-700">
                    {renderWeekDays}
                  </div>
                  {year && (
                    <div className="grid select-none grid-cols-7 gap-[1px] px-1 text-center">
                      <>
                        {renderDaysBefore}
                        {renderDays(close)}
                      </>
                    </div>
                  )}

                  <div className="flex flex-row items-center gap-x-1 p-1">
                    <button
                      type="button"
                      className="btn-white shadow-none"
                      onClick={(event) => {
                        onChange(
                          new Date(
                            today.getFullYear(),
                            today.getMonth(),
                            today.getDate()
                          )
                        );
                        event.preventDefault();
                        close();
                      }}
                    >
                      I dag
                    </button>
                    <button
                      type="button"
                      onClick={(event) => {
                        onChange(null);
                        event.preventDefault();
                        close();
                      }}
                      className="btn-white flex flex-row items-center justify-center gap-x-2 shadow-none"
                    >
                      <X
                        size="1.25rem"
                        className="text-gray-700 dark:text-gray-300"
                      />
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
