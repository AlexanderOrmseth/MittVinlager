const TastePie = ({ percent, size }: { percent: number; size: string }) => {
  return (
    <div
      className={`shadow aspect-square rounded-full`}
      style={{
        height: size,
        width: size,
        background: `conic-gradient(#2e2e2e 0% ${percent}%, #f8fafc ${percent}%)`,
      }}
    ></div>
  );
};

export default TastePie;
