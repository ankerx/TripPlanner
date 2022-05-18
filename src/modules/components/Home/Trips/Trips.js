import Trip from "./Trip/Trip";
import styles from "./trips.module.css";
function Trips({ details }) {
  //   details && details.map((el) => console.log(el));
  return (
    <div className={styles.container}>
      {details ? (
        details.map((el) => (
          <Trip
            distance={el.distance}
            time={el.time}
            price={el.price}
            from={el.from}
            to={el.to}
          />
        ))
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default Trips;
