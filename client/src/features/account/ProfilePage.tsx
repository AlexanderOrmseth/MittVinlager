import {
  CalendarBlank,
  ChartPieSlice,
  Door,
  IdentificationBadge,
  User,
} from "phosphor-react";
import { useState } from "react";
import DeleteUserModal from "../../app/components/modals/DeleteUserModal";
import Title from "../../app/layout/Title";
import { useAppSelector } from "../../app/store/configureStore";
import History from "../statistics/History";
import Statistics from "../statistics/Statistics";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.account);

  return (
    <>
      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className="space-y-8">
        <section>
          <Title title="Profil" border Icon={IdentificationBadge} />
          {user && (
            <div className="p-8 border inline-flex flex-col justify-center items-center gap-y-5 rounded-lg">
              <div className="text-4xl font-medium text-blue-wine-400">
                {user.userName}
              </div>
              <User size="4rem" weight="regular" />
              <div className="text-2xl text-gray-600 font-medium">
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

        <section>
          <Title title="Lagerstatus" border Icon={ChartPieSlice} />
          <Statistics />
        </section>

        <section>
          <Title title="Sist kjøpt" border Icon={CalendarBlank} />
          <History />
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
