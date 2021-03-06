import { CSSProperties } from "@material-ui/core/styles/withStyles";
import { useEffect, useState } from "react";
import CountryInfo from "./CountryInfo";
import ErrorBoundary from "../components/ErrorBoundary";

interface Props {
  searchValue: string;
}

function ResultView(props: Props) {
  const [country, setCountry] = useState({
    name: "",
    population: 0,
    capital: "",
    language: "",
    currency: "",
    flagUrl: "",
  });

  useEffect(() => {
    async function fetchCountries(searchValue: string) {
      const restCountriesAPI = `https://restcountries.eu/rest/v2/name/${searchValue}`;
      const response = await fetch(restCountriesAPI);
      const result = await response.json();

      if (result.message === "Not Found") {
        return;
      }
      setCountry((prevCountry) => {
        const country = result[0];
        const newCountry = {
          ...prevCountry,
          name: country.name,
          population: country.population,
          capital: country.capital,
          language: country.languages[0].name,
          currency: country.currencies[0].name,
          flagUrl: country.flag,
        };
        return newCountry;
      });
      return result;
    }
    fetchCountries(props.searchValue);
  }, [props.searchValue]);

  return (
    <div style={rootStyle}>
      <ErrorBoundary>
        <CountryInfo
          name={country.name}
          population={country.population}
          capital={country.capital}
          language={country.language}
          currency={country.currency}
          flagUrl={country.flagUrl}
        />
      </ErrorBoundary>
    </div>
  );
}

const rootStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  position: "relative",
};

export default ResultView;
