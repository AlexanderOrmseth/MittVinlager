import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getStatistics } from "./statisticsSlice";

import { PieChart } from "react-minimal-pie-chart";
import { formatPrice } from "../../app/util/format";
import { Link } from "react-router-dom";

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

  if (status === "loading") return <div>Laster statistikk...</div>;

  if (status === "rejected")
    return <div>Error, kunne ikke hente statistikk.</div>;

  if (!wineStatistics || wineStatistics.length === 0) return null;

  const total = [
    {
      title: "Antall vin",
      data: wineStatistics.reduce((prev, curr) => prev + curr.quantity, 0),
    },
    {
      title: "Typer",
      data: wineStatistics.length,
    },
    {
      title: "Verdi av vinkjeller",
      data: formatPrice(
        wineStatistics.reduce((prev, curr) => prev + curr.value, 0)
      ),
    },
  ];

  return (
    <div className="my-8">
      <div className="grid my-4 grid-cols-[1fr_1fr_2.2fr] gap-4 text-center">
        {total.map(({ title, data }) => (
          <div key={title} className="p-8 rounded-lg bg-slate-50">
            <h3 className="font-medium mb-4 text-gray-700 uppercase text-sm">
              {title}
            </h3>
            <p className="font-extrabold text-gray-900 text-8xl">{data}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-x-2 gap-y-8 my-4 bg-slate-50 rounded-lg p-8">
        <div>
          <h3 className="font-medium mb-4 text-center text-gray-700 uppercase text-sm">
            Antall
          </h3>
          <PieChart
            animate={true}
            className="h-80"
            labelPosition={90}
            lineWidth={50}
            paddingAngle={2}
            labelStyle={{ fontSize: "4px" }}
            label={({ dataEntry }) => dataEntry.title + ": " + dataEntry.value}
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
          <h3 className="font-medium mb-4 text-center text-gray-700 uppercase text-sm">
            Verdi
          </h3>
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
        <div className="bg-slate-50 col-span-2 rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2 mb-1 border-b font-medium">
            <div>Type</div>
            <div className="text-right">Antall</div>
            <div className="text-right">Verdi</div>
          </div>
          {wineStatistics.map((data, i) => (
            <div
              key={i}
              className="grid grid-cols-3 py-2 rounded gap-2 px-2 text-gray-700 hover:text-gray-900 hover:bg-slate-100"
            >
              <div className="">
                <Link
                  className="text-green-wine-500 font-medium"
                  to="/inventory"
                >
                  {data.type}
                </Link>
              </div>
              <div className="text-right">{data.quantity}</div>
              <div className="text-right">{formatPrice(data.value)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
