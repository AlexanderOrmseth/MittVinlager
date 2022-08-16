import { useGetAppStatisticsQuery } from "../../app/services/appStatisticsApi";
import Spinner from "../../app/components/loading/Spinner";
import ErrorBox from "../../app/components/ErrorBox";
import { InfoBox } from "../../app/components/InfoBox";

const HomePage = () => {
  const {
    data: statistics,
    isLoading,
    isSuccess,
    isError,
  } = useGetAppStatisticsQuery();

  let content;
  if (isLoading) content = <Spinner text="Henter app-statistikk..." />;
  else if (isError)
    content = <ErrorBox message="Error, kunne ikke hente app-statistikk." />;
  else if (isSuccess && statistics) {
    content = (
      <ul>
        <li>
          Antall brukere: <strong>{statistics.userCount}</strong>
        </li>
        <li>
          Antall vin lagret: <strong>{statistics.wineCount}</strong>
        </li>
      </ul>
    );
  }

  return (
    <div>
      <InfoBox className="mt-0 text-xl" message="under utvikling." />
      <div className="my-4">{content}</div>
    </div>
  );
};

export default HomePage;
