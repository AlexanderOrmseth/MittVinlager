import { useState } from "react";
import DeleteUserModal from "../../app/components/modals/DeleteUserModal";
import { useAppSelector } from "../../app/store/configureStore";
import Statistics from "../statistics/Statistics";

const ProfilePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAppSelector((state) => state.account);

  return (
    <div>
      {user && (
        <div className="space-y-2 p-4 border rounded-lg">
          <div className="">
            Brukernavn: <span className="font-medium">{user.userName}</span>
          </div>
          <div className="">
            E-post: <span className="font-medium">{user.email}</span>
          </div>
        </div>
      )}
      <div className="mt-4">
        <button className="btn-white w-auto" onClick={() => setIsOpen(true)}>
          Slett bruker
        </button>
      </div>

      <Statistics />

      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProfilePage;
