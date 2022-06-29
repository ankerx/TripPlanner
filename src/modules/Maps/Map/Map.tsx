import { MapDisplay } from "./MapDisplay/MapDisplay";
import { route } from "../../../core/api/fetchData";
import axios from "axios";
import { KEY } from "../../../core/api/fetchData";
import { useEffect, useState } from "react";
import { Details } from "../Details/Details";
import { Link, useNavigate } from "react-router-dom";
import { Cords, Data } from "../../../App";

interface Props {
  cords: Cords;
  data: Data[];
  setRoadLength: (arg: number) => void;
  setRoadTime: (arg: number) => void;
  roadLength: number;
  roadTime: number;
  setPrice: (arg: number) => void;
  price: number;
  values: {
    firstDestination: string;
    secondDestination: string;
  };
  saveDetails: () => void;
}
function Map({
  cords,
  setRoadLength,
  setRoadTime,
  roadLength,
  roadTime,
  setPrice,
  price,
  data,
  values,
  saveDetails,
}: Props) {
  const navigate = useNavigate();
  const coordinates = cords
    ? cords.map((el: any) => el.data.items[0].position)
    : "";
  const [firstCords] = useState(
    `${coordinates[0]?.lat},${coordinates[0]?.lng}` || ""
  );
  const [secondCords] = useState(
    `${coordinates[1]?.lat},${coordinates[1]?.lng}` || ""
  );

  const [error, setError] = useState<{ title: string }>({ title: "" });
  const FetchRouteData = async () => {
    try {
      const { data } = await axios.get(route(firstCords, secondCords), {
        params: { apikey: KEY },
      });
      if (!data.notices) {
        setRoadTime(data.routes[0].sections[0].summary.duration / 60);
        setRoadLength(data.routes[0].sections[0].summary.length / 1000);
      } else {
        setError(data.notices[0]);
      }
    } catch (err) {
      console.log(err);
      if (err) {
        navigate("/");
      }
    }
  };

  useEffect(() => {
    FetchRouteData();
  }, []);

  return (
    <div>
      <MapDisplay cords={cords} data={data} />
      {error.title.length === 0 && (
        <Details
          roadTime={roadTime}
          roadLength={roadLength}
          price={price}
          setPrice={setPrice}
          values={values}
          saveDetails={saveDetails}
        />
      )}
      {error && (
        <div>
          <p> {error.title}</p>
          <Link to="/">Back to home</Link>
        </div>
      )}
    </div>
  );
}

export default Map;
