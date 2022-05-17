import { UserMinus } from "phosphor-react";
import { useState } from "react";
import LoadingButton from "../../app/components/LoadingButton";
import DeleteUserModal from "../../app/components/modals/DeleteUserModal";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { resetAll } from "../wine/slices/wineSlice";
import { deleteUser } from "./accountSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { user, status } = useAppSelector((state) => state.account);

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
      <DeleteUserModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default ProfilePage;
