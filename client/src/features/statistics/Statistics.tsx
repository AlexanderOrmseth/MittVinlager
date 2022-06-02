import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getStatistics } from "./statisticsSlice";

import { PieChart } from "react-minimal-pie-chart";
import { formatPrice } from "../../app/util/format";

const colors = [
  "#a1b9e6",
  "#507cd1",
  "#3568ca",
  "#a91f36",
  "#e77e8f",
  "#d72845",
  "#6bd1d8",
  "#35c0ca",
];

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

  var randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div>
      {wineStatistics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 my-8 bg-slate-50 rounded-lg p-8">
          <div>
            <h3 className="text-center font-medium mb-2">Antall</h3>
            <PieChart
              animate={true}
              className="h-80"
              labelPosition={90}
              lineWidth={50}
              paddingAngle={2}
              labelStyle={{ fontSize: "4px" }}
              label={({ dataEntry }) =>
                dataEntry.title + ": " + dataEntry.value
              }
              data={wineStatistics.map((data, i) => {
                return {
                  title: data.type,
                  value: data.quantity,
                  color: colors[i],
                };
              })}
            />
          </div>
          <div>
            <h3 className="text-center font-medium mb-2">Verdi</h3>
            <PieChart
              animate={true}
              className="h-80"
              labelPosition={90}
              lineWidth={50}
              paddingAngle={2}
              labelStyle={{ fontSize: "4px" }}
              label={({ dataEntry }) =>
                dataEntry.title + ": " + formatPrice(dataEntry.value)
              }
              data={wineStatistics.map((data, i) => {
                return {
                  title: data.type,
                  value: data.value,
                  color: colors[i],
                };
              })}
            />
          </div>
        </div>
      )}

      <pre>{JSON.stringify(wineStatistics, null, 4)}</pre>
    </div>
  );
};

export default Statistics;
