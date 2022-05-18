import Trip from "./Trip/Trip";
import styles from "./trips.module.css";
function Trips({ details }) {
  return (
    <div className={styles.container}>
      {details ? (
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
