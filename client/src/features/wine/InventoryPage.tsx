import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";

const InventoryPage = () => {
  return (
    <>
      <div className="flex my-4 relative gap-4 sm:flex-row flex-col">
        <aside className="sm:w-60">
          <WineFilter />
        </aside>
        <div className="flex-1">
          <WineList />
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
