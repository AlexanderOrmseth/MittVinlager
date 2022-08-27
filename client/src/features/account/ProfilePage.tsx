import {
  CalendarBlank,
  ChartPieSlice,
  IdentificationBadge
} from "phosphor-react";
import Title from "../../app/layout/Title";
import PurchaseHistory from "./components/PurchaseHistory";
import InventoryStatus from "./components/InventoryStatus";
import ConsumptionHistory from "./components/ConsumptionHistory";
import ErrorBox from "../../app/components/ErrorBox";
import Spinner from "../../app/components/loading/Spinner";
import { useGetStatisticsQuery } from "../../app/services/wineApi";
import ProfileCard from "./components/ProfileCard";

const ProfilePage = () => {
  const { data, isLoading, isSuccess, isError } = useGetStatisticsQuery();

  let content;
  if (isLoading) {
    content = <Spinner text="Laster statistikk..." />;
  } else if (isSuccess) {
    content = (
      <>
        <section>
          <Title title="Lagerstatus" border Icon={ChartPieSlice} />
          <InventoryStatus inventoryStatus={data.inventoryStatus} />
        </section>
        <section>
          <Title title="Sist kjøpt" border Icon={CalendarBlank} />
          <PurchaseHistory lastPurchased={data.lastPurchased} />
        </section>
        <section>
          <Title title="Sist drukket" border Icon={CalendarBlank} />
          <ConsumptionHistory lastConsumed={data.lastConsumed} />
        </section>
      </>
    );
  } else if (isError) {
    content = <ErrorBox message="Error, kunne ikke hente statistikk" />;
  }

  return (
    <div className="space-y-8">
      <section>
        <Title title="Profil" border Icon={IdentificationBadge} />
        <ProfileCard />
      </section>
      {content}
    </div>
  );
};

export default ProfilePage;
