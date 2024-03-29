import { PieChart } from "react-minimal-pie-chart";
import { formatPrice } from "../../../app/util/format";
import { InfoBox } from "../../../app/components/InfoBox";
import { InventoryStatus as InventoryStatusInterface } from "../../../app/models/statistics";
import { useNavigate } from "react-router-dom";
import { setTypeOnly } from "../../wine/wineSlice";
import { useAppDispatch } from "../../../app/store/configureStore";

// chart colors
const chartColors = [
  "#a1b9e6",
  "#507cd1",
  "#3568ca",
  "#a91f36",
  "#e77e8f",
  "#d72845",
  "#6bd1d8",
  "#35c0ca"
];

// chart options
const chartOptions = {
  animate: true,
  className: "h-80 overflow-visible dark:fill-white",
  labelPosition: 80,
  lineWidth: 50,
  paddingAngle: 2,
  labelStyle: { fontSize: "4.5px", letterSpacing: -0.1, fontWeight: 500 }
};

interface Props {
  inventoryStatus: InventoryStatusInterface[];
}

const InventoryStatus = ({ inventoryStatus }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  if (!inventoryStatus || inventoryStatus.length === 0)
    return <InfoBox message="Ingen data å vise. Du har ingen vin på lager." />;

  const total = [
    {
      title: "Antall vin",
      data: inventoryStatus.reduce((prev, curr) => prev + curr.quantity, 0)
    },
    {
      title: "Typer",
      data: inventoryStatus.length
    },
    {
      title: "Verdi av vinkjeller",
      data: formatPrice(
        inventoryStatus.reduce((prev, curr) => prev + curr.value, 0)
      )
    }
  ];

  const handleTypeClicked = (type: string) => {
    dispatch(setTypeOnly(type));
    navigate("/inventory");
  };

  return (
    <div className="my-4">
      <div className="my-4 grid gap-4 text-center sm:grid-cols-2 lg:grid-cols-[1fr_1fr_2.2fr]">
        {total.map(({ title, data }) => (
          <div
            key={title}
            className="block-less-muted rounded-lg p-4 sm:last:col-span-2 md:p-8 lg:last:col-span-1"
          >
            <h3 className="mb-2 text-sm font-medium uppercase text-gray-700 dark:text-gray-500 md:mb-4">
              {title}
            </h3>
            <p className="text-7xl font-extrabold text-gray-900 dark:text-gray-200 md:text-8xl">
              {data}
            </p>
          </div>
        ))}
      </div>
      <div className="block-less-muted rounded-lg p-4 md:p-8">
        <div className="mb-8 flex flex-col items-center gap-x-2 gap-y-4 md:flex-row">
          <div className="flex-1">
            <h3 className="mb-4 text-center text-sm font-medium uppercase text-gray-700 dark:text-gray-500">
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
                  color: chartColors[i]
                };
              })}
            />
          </div>
          {inventoryStatus.some((data) => data.value) && (
            <div className="flex-1">
              <h3 className="mb-4 text-center text-sm font-medium uppercase text-gray-700 dark:text-gray-500">
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
                      color: chartColors[i]
                    };
                  })}
              />
            </div>
          )}
        </div>
        <div className="block-muted col-span-2 rounded-lg p-4">
          <div className="mb-1 grid grid-cols-3 gap-2 border-b font-medium dark:border-gray-700">
            <div>Type</div>
            <div className="text-right">Antall</div>
            <div className="text-right">Verdi</div>
          </div>
          {inventoryStatus.map((data, i) => (
            <div
              key={i}
              className="dark:odd:bg-gray-950/50 grid grid-cols-3 items-center gap-2 rounded p-3 leading-tight odd:bg-slate-50"
            >
              <div>
                <button
                  className="link text-left"
                  onClick={() => handleTypeClicked(data.type)}
                >
                  {data.type}
                </button>
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

export default InventoryStatus;
