import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getStatistics } from "./statisticsSlice";
import Chart, { ReactGoogleChartEvent } from "react-google-charts";

const Statistics = () => {
  const dispatch = useAppDispatch();
  const { wineStatistics, status, statisticsFetched } = useAppSelector(
    (state) => state.statistics
  );

  useEffect(() => {
    if (!statisticsFetched) dispatch(getStatistics());
  }, [dispatch, statisticsFetched]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "rejected") return <div>Error...</div>;

  const data = () => {
    let chartData = [["Type", "Antall"]] as any;
    wineStatistics.forEach((data) =>
      chartData.push([data.type, data.quantity])
    );
    return chartData;
  };

  return (
    <div>
      {wineStatistics.length > 0 && (
        <div className="bg-slate-50 border">
          <Chart
            chartType="PieChart"
            height="600px"
            data={data()}
            options={{
              pieSliceText: "label",
              title: "Antall typer",
            }}
          />
        </div>
      )}

      <pre>{JSON.stringify(wineStatistics, null, 4)}</pre>
    </div>
  );
};

export default Statistics;
