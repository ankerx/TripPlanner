import { Details } from "../../../App";
import Trip from "./Trip/Trip";
// import styles from "./trips.module.css";

interface Props {
  details: Details[];
}
function Trips({ details }: Props) {
  return (
    <div>
      {details && details.length > 0 ? (
        details.map((el, index) => (
          <Trip
            key={index}
            distance={el.distance}
            time={el.time}
            price={el.price}
            from={el.from}
            to={el.to}
          />
        ))
      ) : (
        <div>Choose your first trip!</div>
      )}
    </div>
  );
}

export default Trips;
