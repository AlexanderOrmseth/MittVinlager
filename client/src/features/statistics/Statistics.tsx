import { PieChart } from "react-minimal-pie-chart";
import { formatPrice } from "../../app/util/format";
import { Link } from "react-router-dom";
import { InfoBox } from "../../app/components/InfoBox";
import { InventoryStatus } from "../../app/models/statistics";

// chart colors
const chartColors = [
  "#a1b9e6",
  "#507cd1",
  "#3568ca",
  "#a91f36",
  "#e77e8f",
  "#d72845",
  "#6bd1d8",
  "#35c0ca",
];

// chart options
const chartOptions = {
  animate: true,
  className: "h-80",
  labelPosition: 90,
  lineWidth: 50,
  paddingAngle: 2,
  labelStyle: { fontSize: "4px" },
};

interface Props {
  inventoryStatus: InventoryStatus[];
}

const Statistics = ({ inventoryStatus }: Props) => {
  if (!inventoryStatus || inventoryStatus.length === 0)
    return <InfoBox message="Ingen data å vise. Du har ingen vin på lager." />;

  const total = [
    {
      title: "Antall vin",
      data: inventoryStatus.reduce((prev, curr) => prev + curr.quantity, 0),
    },
    {
      title: "Typer",
      data: inventoryStatus.length,
    },
    {
      title: "Verdi av vinkjeller",
      data: formatPrice(
        inventoryStatus.reduce((prev, curr) => prev + curr.value, 0)
      ),
    },
  ];

  return (
    <div className="my-4">
      <div className="grid my-4 lg:grid-cols-[1fr_1fr_2.2fr] sm:grid-cols-2 gap-4 text-center">
        {total.map(({ title, data }) => (
          <div
            key={title}
            className="md:p-8 p-4 lg:last:col-span-1 sm:last:col-span-2 rounded-lg bg-slate-50 dark:bg-gray-800/40"
          >
            <h3 className="font-medium md:mb-4 mb-2  text-gray-700 dark:text-gray-500 uppercase text-sm">
              {title}
            </h3>
            <p className="font-extrabold text-gray-900 dark:text-gray-200 md:text-8xl text-7xl">
              {data}
            </p>
          </div>
        ))}
      </div>
      <div className="bg-slate-50 dark:bg-gray-800/40 rounded-lg p-8">
        <div className="flex items-center mb-4 md:flex-row flex-col gap-x-2 gap-y-4">
          <div className="flex-1">
            <h3 className="font-medium mb-4 text-center text-gray-700 dark:text-gray-500 uppercase text-sm">
              Antall
            </h3>
            <PieChart
              {...chartOptions}
              label={({ dataEntry }) =>
                dataEntry.title + ": " + dataEntry.value
              }
              data={inventoryStatus.map((data, i) => {
                return {
                  title: data.type,
                  value: data.quantity,
                  color: chartColors[i],
                };
              })}
            />
          </div>
          {inventoryStatus.some((data) => data.value) && (
            <div className="flex-1">
              <h3 className="font-medium mb-4 text-center text-gray-700 dark:text-gray-500 uppercase text-sm">
                Verdi
              </h3>
              <PieChart
                {...chartOptions}
                label={({ dataEntry }) =>
                  dataEntry.title + ": " + formatPrice(dataEntry.value)
                }
                data={inventoryStatus
                  .filter((data) => data.value)
                  .map((data, i) => {
                    return {
                      title: data.type,
                      value: data.value,
                      color: chartColors[i],
                    };
                  })}
              />
            </div>
          )}
        </div>
        <div className="bg-slate-50 dark:bg-gray-800/40 col-span-2 rounded-lg dark:shadow-md p-4">
          <div className="grid grid-cols-3 gap-2 mb-1 border-b dark:border-gray-700 font-medium">
            <div>Type</div>
            <div className="text-right">Antall</div>
            <div className="text-right">Verdi</div>
          </div>
          {inventoryStatus.map((data, i) => (
            <div
              key={i}
              className="grid grid-cols-3 py-2 odd:bg-slate-100 dark:odd:bg-gray-900/40 rounded gap-2 px-2"
            >
              <div>
                <Link className="link" to="/inventory">
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
