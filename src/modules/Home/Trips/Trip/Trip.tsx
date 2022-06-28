import { Details } from "../../../../App";

function Trip({ distance, time, price, from, to }: Details) {
  return (
    <div>
      <p>From: {from}</p>
      <p>To: {to}</p>
      <p>Distance: {distance.toFixed(1)} km</p>
      <p>Time: {time.toFixed(0)} minutes</p>
      <p>Price per kilometer: {price} $</p>
      <p>Total costs: {(distance * price * 1.1).toFixed(2)} $</p>
    </div>
  );
}

export default Trip;
