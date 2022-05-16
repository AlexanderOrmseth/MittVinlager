import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";

const DetailsPage = () => {
  const { wine, status } = useFetchSingleWine();

  if (status === "loading") return <div>Laster inn vin!</div>;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  return (
    <div>
      <h2 className="text-lg font-medium">{wine.name}</h2>
    </div>
  );
};

export default DetailsPage;
