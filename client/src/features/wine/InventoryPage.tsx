import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";

const InventoryPage = () => {
  return (
    <>
      <div className="flex my-4 relative flex-row">
        <aside className="w-60 max-h-screen mr-3 pr-1 overflow-auto sticky top-2">
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
