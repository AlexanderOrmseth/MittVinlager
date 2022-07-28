import { useState } from "react";
import { Door, IdentificationBadge, User } from "phosphor-react";
import DeleteUserModal from "../../../app/components/modals/DeleteUserModal";
import { useAppSelector } from "../../../app/store/configureStore";
import Time from "../../../app/components/Time";
import ChangeDisplayNameModal from "../../../app/components/modals/ChangeDisplayNameModal";

const ProfileCard = () => {
  const { user } = useAppSelector((state) => state.account);
  const [isOpen, setIsOpen] = useState(false);
  const [changeDisplayNameModalIsOpen, setChangeDisplayNameModalIsOpen] =
    useState(false);

  // if user doesn't exist this page will be redirected anyway
  if (!user) return null;

  return (
    <>
      <div className="p-6 md:p-8 block-less-muted md:inline-flex flex md:max-w-lg w-full flex-col justify-center items-center gap-y-5 rounded-lg">
        <User size="4rem" weight="regular" />
        <h3 className="md:text-4xl text-2xl break-all text-center leading-7 font-medium text-blue-wine-400 dark:text-wine-300">
          <p className="text-muted text-base">Brukernavn</p>
          {user?.displayName || "Ikke opprettet navn"}
        </h3>
        <p className="i-flex-row flex-wrap">
          <span className="text-muted">Opprettet:</span>{" "}
          <Time date={user.createdAt} />
        </p>
        <div className="flex gap-2 w-full flex-wrap sm:flex-row flex-col">
          <button
            className="btn-primary flex-1 h-12 rounded-full flex flex-row items-center justify-center gap-x-2 w-full"
            onClick={() => setIsOpen(true)}
          >
            <Door size="1.75rem" weight="duotone" />
            Slett meg
          </button>

          <button
            className="btn-white flex-1 h-12 rounded-full flex flex-row items-center justify-center gap-x-2 w-full"
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
