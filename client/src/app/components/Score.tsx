interface Props {
  value?: number | null;
  hideDefinition?: boolean;
  size?: number;
}
const Score = ({ value, hideDefinition, size }: Props) => {
  if (!value) return null;

  const getScoreDefinition = () => {
    if (value >= 96) return `Spektakulær`;
    if (value >= 93) return `Eksepsjonell`;
    else if (value >= 90) return `Strålende`;
    else if (value >= 87) return `Meget god`;
    else if (value >= 84) return `God`;
    else if (value >= 80) return `Gjennomsnittlig`;
    else if (value >= 70) return `Akseptabel`;
    else if (value >= 60) return `Dårlig`;
    else if (value >= 50) return `Uakseptabel`;
  };

  const degrees = (value - 50) * 3.6 - 90;
  const style = `linear-gradient(-90deg, #a91f36 50%, transparent 50%), linear-gradient(${degrees}deg, #a91f36 50%, transparent 50%)`;

  return (
    <div
      className={`${
        hideDefinition
          ? size
            ? `w-${size} h-${size}`
            : "w-9 h-9"
          : "flex flex-row flex-wrap items-center gap-2"
      }`}
    >
      <div
        className={` ${
          size ? `w-${size} h-${size}` : "w-9 h-9"
        } relative flex items-center justify-center rounded-full select-none`}
      >
        <div
          style={{ backgroundImage: style }}
          className={`rounded-full w-full h-full bg-slate-100 flex items-center justify-center `}
        >
          <div
            className={`flex rounded-full overflow-hidden items-center ${
              size && size < 7 ? "text-xs" : "text-sm"
            } ${
              size ? `w-${size - 1} h-${size - 1}` : "w-8 h-8"
            } justify-center  bg-white`}
          >
            {value}
          </div>
        </div>
      </div>
      {!hideDefinition && <div>{getScoreDefinition()}</div>}
    </div>
  );
};

export default Score;
