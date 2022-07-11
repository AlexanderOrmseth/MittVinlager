import { formatDate } from "../util/format";

// date can be a string/Date
interface Props {
  date: string | Date | null | undefined;
  fallBackText?: string;
  short?: boolean;
}

const Time = ({ date, fallBackText, short = false }: Props) => {
  // returns empty span or given fallback-text
  if (!date) {
    return <span>{fallBackText && fallBackText}</span>;
  }

  // convert string to new Date then format
  if (typeof date === "string") {
    return <time dateTime={date}>{formatDate(new Date(date), short)}</time>;
  }

  return <time dateTime={date.toString()}>{formatDate(date, short)}</time>;
};

export default Time;
