import { useState } from "react";
import { Door, User } from "phosphor-react";
import DeleteUserModal from "../../../app/components/modals/DeleteUserModal";
import { useAppSelector } from "../../../app/store/configureStore";

const ProfileCard = () => {
  const { user } = useAppSelector((state) => state.account);
  const [isOpen, setIsOpen] = useState(false);

  // if user doesn't exist this page will be redirected anyway
  if (!user) return null;

  return (
    <>
      <div className="p-8 block-less-muted md:inline-flex flex md:max-w-md w-full flex-col justify-center items-center gap-y-5 rounded-lg">
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
      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default ProfileCard;
