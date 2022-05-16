import { useState } from "react";
import api from "../../app/api";
import useFetchSingleWine from "../../app/hooks/useFetchSingleWine";
import { FormModel } from "../../app/models/wine";
import WineForm from "./form/WineForm";

const UpdateWinePage = () => {
  const { wine, status } = useFetchSingleWine();
  const [serverErrors, setServerErrors] = useState<Record<
    string,
    string[]
  > | null>(null);

  if (status === "loading") return <div>Laster inn vin!</div>;
  if (!wine) return <div>vinen eksisterer ikke!</div>;

  const onSubmit = async (data: FormModel) => {
    try {
      console.log(data);
      const response = await api.Wine.updateWine(data);
      console.log("update wine response", response);
    } catch (error: any) {
      console.error("Update wine error", error);
      if (error) {
        setServerErrors(error);
      }
    }
  };

  return (
    <div>
      <WineForm
        title="Rediger Vin"
        submitText="Rediger vin"
        onSubmit={onSubmit}
        wine={wine}
        serverErrors={serverErrors}
      />
    </div>
  );
};

export default UpdateWinePage;
