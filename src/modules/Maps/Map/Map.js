import { MapDisplay } from "./MapDisplay/MapDisplay";
import { Route } from "../../../core/api/FetchData";
import axios from "axios";
import { KEY } from "../../../core/api/FetchData";
import { useEffect, useState } from "react";
import Details from "../Details/Details";
import styles from "./map.module.css";
import { Link } from "react-router-dom";
function Map({
  cords,
  setRoadLength,
  setRoadTime,
  roadLength,
  roadTime,
  setPrice,
  price,
  setDetails,
  values,
}) {
  const coordinates = cords ? cords.map((el) => el.data.items[0].position) : "";
  const [firstCords] = useState(`${coordinates[0].lat},${coordinates[0].lng}`);
  const [secondCords] = useState(`${coordinates[1].lat},${coordinates[1].lng}`);
  const [error, setError] = useState("");
  const FetchRouteData = async () => {
    try {
      const { data } = await axios.get(Route(firstCords, secondCords), {
        params: { apikey: KEY },
      });
      if (!data.notices) {
        console.log(data);
        setRoadTime(data.routes[0].sections[0].summary.duration / 60);
        setRoadLength(data.routes[0].sections[0].summary.length / 1000);
      } else {
        setError(data.notices[0]);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  cords && cords.map((el) => console.log(el.data.items));
  useEffect(() => {
    FetchRouteData();
  }, []);

  return (
    <div className={styles.container}>
      <MapDisplay cords={cords} />
      {!error && (
        <Details
          roadTime={roadTime}
          roadLength={roadLength}
          price={price}
          setPrice={setPrice}
          setDetails={setDetails}
          values={values}
        />
      )}
      {error && (
        <div className={styles.error}>
          <p className={styles.message}> {error.title}</p>
          <Link className={styles.link} to="/">
            Back to home
          </Link>
        </div>
      )}
    </div>
  );
}

export default Map;
