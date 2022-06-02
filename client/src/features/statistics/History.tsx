import { useState } from "react";
import api from "../../app/api";
import { LastPurchased } from "../../app/models/statistics";

const History = () => {
  const [lastPurchased, setLastPurchased] = useState<LastPurchased[] | null>(
    null
  );

  const handleFetchLastPurchased = async () => {
    try {
      const response = await api.Wine.getHistory();
      setLastPurchased(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        disabled={lastPurchased != null}
        onClick={handleFetchLastPurchased}
        className="btn-white disabled:bg-red-300"
      >
        FETCH
      </button>
      <pre>{JSON.stringify(lastPurchased, null, 4)}</pre>
    </div>
  );
};

export default History;
