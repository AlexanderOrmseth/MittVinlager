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
  "Desember",
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
}

const DatePicker = ({
  value,
  onChange,
  text,
  hereafter,
  absolute = true,
  disabled,
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
        disabled={!hereafter ? isHereafter(i) : false}
        className={` py-2 rounded ${
          isSelectedDate(i)
            ? "bg-wine-500 dark:bg-wine-400 text-white"
            : "text-gray-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-gray-800 dark:hover:text-gray-100 hover:text-gray-900"
        } disabled:bg-gray-100 dark:disabled:bg-gray-800/80 disabled:opacity-30 disabled:cursor-not-allowed disabled:text-gray-700`}
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
            className={`btn-white disabled-btn w-full flex flex-row items-center gap-x-2 justify-center`}
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
              } bg-white dark:bg-gray-900 dark:border-gray-700 border w-full rounded-lg mt-1 `}
            >
              {({ close }) => (
                <>
                  <div className="flex flex-col gap-y-1 p-1">
                    <div className="flex flex-row gap-x-1 items-center">
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleMonthChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        className="hover:underline font-semibold flex-1 hover:text-wine-500 dark:hover:text-wine-300"
                        onClick={(event) => {
                          setMonth(new Date().getMonth());
                          event.preventDefault();
                        }}
                      >
                        {months[month]}
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleMonthChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                    <div className="flex flex-row gap-x-1 items-center">
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleYearChange(event, false)}
                      >
                        <CaretLeft size="1.5rem" />
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleYearChange(event, false, 5)}
                      >
                        <CaretDoubleLeft size="1.5rem" />
                      </button>
                      <button
                        className="hover:underline font-semibold flex-1 hover:text-wine-500 dark:hover:text-wine-300"
                        onClick={(event) => {
                          setYear(new Date().getFullYear());
                          event.preventDefault();
                        }}
                      >
                        {year}
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleYearChange(event, true, 5)}
                      >
                        <CaretDoubleRight size="1.5rem" />
                      </button>
                      <button
                        className="btn-white shadow-none text-gray-700 dark:text-gray-300 w-auto p-1"
                        onClick={(event) => handleYearChange(event, true)}
                      >
                        <CaretRight size="1.5rem" />
                      </button>
                    </div>
                  </div>

                  <div className="grid px-1 mb-[1px] grid-cols-7 gap-[1px] text-center text-sm text-gray-700 dark:text-gray-400 dark:border-gray-700 border-b">
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
                      onClick={(event) => {
                        onChange(null);
                        event.preventDefault();
                        close();
                      }}
                      className="btn-white shadow-none justify-center flex flex-row gap-x-2 items-center"
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
