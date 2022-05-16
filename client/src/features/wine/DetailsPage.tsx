import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import placeholderImg from "../../app/assets/bottle.png";

const DetailsPage = () => {
  const { wine, status } = useFetchSingleWine();

  if (status === "loading") return <div>Laster inn vin!</div>;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  return (
    <div>
      <h2 className="text-lg font-medium">{wine.name}</h2>
      <div className="p-2 shadow inline-block border">
        <img
          src={`${wine.pictureUrl ? wine.pictureUrl : placeholderImg}`}
          alt="Bilde av en vin"
        />
      </div>
    </div>
  );
};

export default DetailsPage;
