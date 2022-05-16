import { UserMinus } from "phosphor-react";
import LoadingButton from "../../app/components/LoadingButton";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { resetAll } from "../wine/slices/wineSlice";
import { deleteUser } from "./accountSlice";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
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
        <LoadingButton
          onClick={() => {
            dispatch(deleteUser());
            dispatch(resetAll());
          }}
          loading={status === "loading"}
          disabled={status === "loading"}
          loadingText="Sletter bruker..."
        >
          <UserMinus size="1.5rem" />
          Slett meg
        </LoadingButton>
      </div>
    </div>
  );
};

export default ProfilePage;
