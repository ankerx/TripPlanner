import styles from "./trip.module.css";

function Trip({ distance, time, price, from, to }) {
  return (
    <div className={styles.container}>
      <p>From: {from}</p>
      <p>To: {to}</p>
      <p>Distance: {distance.toFixed(1)} km</p>
      <p>Time: {time.toFixed(2)} minutes</p>
      <p>Price per kilometer: {price} $</p>
      <p>Total costs: {(distance.toFixed(1) * price * 1.1).toFixed(2)} $</p>
    </div>
  );
}

export default Trip;
