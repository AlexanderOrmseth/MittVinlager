import WineFilter from "./list/WineFilter";
import WineList from "./list/WineList";

const InventoryPage = () => {
  return (
    <>
      <div className="flex min-h-full h-full gap-4 sm:flex-row border-t flex-col">
        <aside className="sm:w-50 pt-2">
          <WineFilter />
        </aside>
        <div className="border-l flex-1">
          <WineList />
        </div>
      </div>
    </>
  );
};

export default InventoryPage;
