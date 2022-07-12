import { useState } from "react";
import {
  CalendarBlank,
  ChartPieSlice,
  Door,
  IdentificationBadge,
  User,
} from "phosphor-react";
import DeleteUserModal from "../../app/components/modals/DeleteUserModal";
import Title from "../../app/layout/Title";
import { useAppSelector } from "../../app/store/configureStore";
import History from "../statistics/History";
import Statistics from "../statistics/Statistics";
import Consumed from "../statistics/Consumed";
import ErrorBox from "../../app/components/ErrorBox";
import Spinner from "../../app/components/loading/Spinner";
import { useGetStatisticsQuery } from "../api/apiSlice";

const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.account);
  const { data, isLoading, isSuccess, isError } = useGetStatisticsQuery();
  const [isOpen, setIsOpen] = useState(false);

  let content;
  if (isLoading) {
    content = <Spinner text="Laster statistikk..." />;
  } else if (isSuccess) {
    content = (
      <>
        <section>
          <Title title="Lagerstatus" border Icon={ChartPieSlice} />
          <Statistics inventoryStatus={data.inventoryStatus} />
        </section>
        <section>
          <Title title="Sist kjøpt" border Icon={CalendarBlank} />
          <History lastPurchased={data.lastPurchased} />
        </section>
        <section>
          <Title title="Sist drukket" border Icon={CalendarBlank} />
          <Consumed lastConsumed={data.lastConsumed} />
        </section>
      </>
    );
  } else if (isError) {
    content = <ErrorBox message="Error, kunne ikke hente statistikk" />;
  }

  return (
    <>
      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="space-y-8">
        <section>
          <Title title="Profil" border Icon={IdentificationBadge} />
          {user && (
            <div className="p-8 border dark:border-gray-700 dark:bg-gray-800/30 md:inline-flex flex md:max-w-md w-full flex-col justify-center items-center gap-y-5 rounded-lg">
              <div className="text-4xl font-medium text-blue-wine-400 dark:text-wine-300">
                {user.userName}
              </div>
              <User size="4rem" weight="regular" />
              <div className="text-2xl text-gray-600 dark:text-gray-200 font-medium">
                {user.email}
              </div>
              <button
                className="btn-primary h-12 rounded-full flex flex-row items-center justify-center gap-x-2 w-full"
                onClick={() => setIsOpen(true)}
              >
                <Door size="1.75rem" weight="duotone" />
                Slett meg
              </button>
            </div>
          )}
        </section>
        {content}
      </div>
    </>
  );
};

export default ProfilePage;
