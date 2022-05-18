import { MapDisplay } from "./MapDisplay/MapDisplay";
import { Route } from "../../../core/api/FetchData";
import axios from "axios";
import { KEY } from "../../../core/api/FetchData";
import { useEffect, useState } from "react";
import Details from "../Details/Details";
import styles from "./map.module.css";
function Map({
  cords,
  setRoadLength,
  setRoadTime,
  roadLength,
  roadTime,
  setPrice,
  price,
}) {
  const coordinates = cords ? cords.map((el) => el.data.items[0].position) : "";
  const [firstCords] = useState(`${coordinates[0].lat},${coordinates[0].lng}`);
  const [secondCords] = useState(`${coordinates[1].lat},${coordinates[1].lng}`);

  const FetchRouteData = async () => {
    const { data } = await axios.get(Route(firstCords, secondCords), {
      params: { apikey: KEY },
    });
    console.log(data);
    setRoadTime(data.routes[0].sections[0].summary.duration / 60);
    setRoadLength(data.routes[0].sections[0].summary.length / 1000);
  };
  useEffect(() => {
    FetchRouteData();
  }, []);
  return (
    <div className={styles.container}>
      <MapDisplay cords={cords} />
      <Details
        roadTime={roadTime}
        roadLength={roadLength}
        price={price}
        setPrice={setPrice}
      />
    </div>
  );
}

export default Map;
