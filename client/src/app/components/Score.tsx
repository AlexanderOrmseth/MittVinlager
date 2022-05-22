interface Props {
  value?: number | null;
}
const Score = ({ value }: Props) => {
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
    <div className="flex flex-row flex-wrap items-center gap-2">
      <div className="w-12 h-12 aspect-square  relative select-none">
        <div
          style={{ backgroundImage: style }}
          className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center"
        >
          <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white">
            {value}
          </div>
        </div>
      </div>
      <div>{getScoreDefinition()}</div>
    </div>
  );
};

export default Score;
