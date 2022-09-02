import { useState } from "react";
import { Door, IdentificationBadge, User } from "phosphor-react";
import DeleteUserModal from "../../../app/modals/DeleteUserModal";
import { useAppSelector } from "../../../app/store/configureStore";
import Time from "../../../app/components/Time";
import ChangeDisplayNameModal from "../../../app/modals/ChangeDisplayNameModal";

const ProfileCard = () => {
  const { user } = useAppSelector((state) => state.account);
  const [isOpen, setIsOpen] = useState(false);
  const [changeDisplayNameModalIsOpen, setChangeDisplayNameModalIsOpen] =
    useState(false);

  // if user doesn't exist this page will be redirected anyway
  if (!user) return null;

  return (
    <>
      <div className="block-less-muted flex w-full flex-col items-center justify-center gap-y-5 rounded-lg p-4 md:inline-flex md:max-w-lg md:p-8">
        <User size="4rem" weight="regular" />
        <h3 className="text-blue-wine-400 dark:text-blue-wine-light break-all text-center text-2xl font-medium leading-7 md:text-4xl">
          <p className="text-muted text-base">Brukernavn</p>
          {user?.displayName || "Ikke opprettet navn"}
        </h3>
        <p className="i-flex-row flex-wrap">
          <span className="text-muted">Opprettet:</span>{" "}
          <Time date={user.createdAt} />
        </p>
        <div className="flex w-full flex-col flex-wrap gap-4 sm:flex-row">
          <button
            className="btn-primary flex h-12 w-full flex-1 flex-row items-center justify-center gap-x-2 rounded-full"
            onClick={() => setIsOpen(true)}
          >
            <Door size="1.75rem" weight="duotone" />
            Slett meg
          </button>

          <button
            className="btn-white flex h-12 w-full flex-1 flex-row items-center justify-center gap-x-2 rounded-full"
            onClick={() => setChangeDisplayNameModalIsOpen(true)}
          >
            <IdentificationBadge size="1.75rem" weight="regular" />
            Endre visningsnavn
          </button>
        </div>
      </div>
      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <ChangeDisplayNameModal
        isOpen={changeDisplayNameModalIsOpen}
        setIsOpen={setChangeDisplayNameModalIsOpen}
      />
    </>
  );
};

export default ProfileCard;
