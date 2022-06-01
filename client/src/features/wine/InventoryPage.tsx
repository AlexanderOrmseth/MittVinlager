import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";

const InventoryPage = () => {
  return (
    <>
      <div className="flex flex-grow flex-1 min-h-full gap-4 sm:flex-row flex-col">
        <aside className="basis-60 relative">
          <WineFilter />
        </aside>
        <WineList />
      </div>
    </>
  );
};

export default InventoryPage;
