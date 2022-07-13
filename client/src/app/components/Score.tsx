interface Props {
  value?: number | null;
  hideDefinition?: boolean;
  size?: number;
}

const Score = ({ value, hideDefinition, size = 8 }: Props) => {
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

  return (
    <div
      className={`inline-block ${
        hideDefinition ? "" : " flex flex-grow gap-x-2 items-center"
      }`}
    >
      <div
        style={{ height: 4 * size + "px", width: 4 * size + "px" }}
        className={`relative block rounded-full select-none`}
      >
        <div
          id={"LOL"}
          style={{
            background: `conic-gradient(#a91f36 0% ${value}%, rgba(0, 0, 0, 0.2) ${value}%)`,
          }}
          className={`rounded-full h-full w-full bg-slate-100 flex items-center justify-center `}
        >
          <div
            style={{
              height: 4 * size - 4 + "px",
              width: 4 * size - 4 + "px",
              lineHeight: 4 * size - 4 + "px",
            }}
            className={`rounded-full text-less-muted dark:bg-gray-900 overflow-hidden text-center ${
              size && size < 7 ? "text-xs" : "text-sm"
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
