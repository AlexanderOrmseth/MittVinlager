import {
  At,
  CalendarBlank,
  ChartPieSlice,
  IdentificationBadge,
  Smiley,
  User,
} from "phosphor-react";
import { useState } from "react";
import DeleteUserModal from "../../app/components/modals/DeleteUserModal";
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex border-b pb-2 flex-row gap-x-2 items-center">
            <IdentificationBadge
              className="text-gray-700"
              size="1.2em"
              weight="regular"
            />
            Profil
          </h2>
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
                className="btn-primary h-12 rounded-full w-full"
                onClick={() => setIsOpen(true)}
              >
                Slett meg
              </button>
            </div>
          )}
        </section>

        <section>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex border-b pb-2 flex-row gap-x-2 items-center">
            <ChartPieSlice
              className="text-gray-700"
              size="1.2em"
              weight="regular"
            />
            Lagerstatus
          </h2>
          <Statistics />
        </section>

        <section>
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex border-b pb-2 flex-row gap-x-2 items-center">
            <CalendarBlank
              className="text-gray-700"
              size="1.2em"
              weight="regular"
            />
            Sist kjøpt
          </h2>
          <History />
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
