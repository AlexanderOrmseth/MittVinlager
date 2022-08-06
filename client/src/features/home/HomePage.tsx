import { toast } from "react-hot-toast";

const HomePage = () => {
  return (
    <div className="">
      <div className="i-flex-row flex-wrap">
        <button
          onClick={() => toast.success("Hello World!")}
          className="btn-primary"
        >
          Toast Success
        </button>
        <button
          onClick={() => toast.error("Internal Server Error!")}
          className="btn-primary"
        >
          Toast Error
        </button>
        <button onClick={() => toast("Hello World!")} className="btn-primary">
          Toast Normal
        </button>
      </div>

      <h1 className="mb-4 text-3xl">Mitt Vinlager</h1>
      <div className="my-4 font-bold">website image gallery</div>
      <div className="space-y-3 max-w-screen-md">
        <p>
          Med Mitt Vinlager får du tilgang til din egen vinkjeller på nettet der
          du kan lagre opplysninger om de vinene du har kjøpt, spart på eller
          smakt eller ønsker å kjøpe.
        </p>
        <p>
          Du kan hente opplysninger om vinen fra Vinmonopolet med enten link
          eller produkt id og derretter legge dem til i din egen vinkjeller.
        </p>
        <p>
          Foruten å legge inn de tradisjonelle opplysningene om vintype, navn,
          årgang, pris, område, land etc. kan du også lagre opplysninger om hvor
          mange flasker du har av ulike slag, når den bør drikkes og hva den
          kostet. Dessuten og ikke minst kan du selvfølgelig legge inn dine
          smaksnotater.
        </p>
        <p>
          Men ikke bare dine egne meninger om vinen er det plass til, også
          andres vurderinger, samt poeng og stjerner.
        </p>
        <p>
          Med enkle klikk ser du umiddelbart hva du har av informasjon om viner
          innenfor valgt kriteria, det være seg vintype, land, område og årgang.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
