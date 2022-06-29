import React from "react";

import onResize from "simple-element-resize-detector";
import { Cords, Data } from "../../../../App";
interface Props extends Cords {
  data: Data[];
}
export const MapDisplay = ({ cords, data }: Props) => {
  const KEY = "gfWzZOqGZJ_sGQ-L-zHN_9CrpD3D6rGn1v65eQW_CPg";
  // Create a reference to the HTML element we want to put the map on
  const mapRef = React.useRef(null);
  const coordinates = cords
    ? cords.map((el: any) => el.data.items[0].position)
    : "";
  // const coordinates1 = data ? data.map(item => item.position.lat) : "";
  // const coordinates2 = data ? data.map(item => item.position.lng) : "";
  // const newData = data.map((item) => item);

  const firstDestination = coordinates[0];
  const secondDestination = coordinates[1];
  const firstCords = `${firstDestination?.lat},${firstDestination?.lng}`;
  const secondCords = `${secondDestination?.lat},${secondDestination?.lng}`;

  React.useLayoutEffect(() => {
    if (!mapRef.current) return;
    // @ts-ignore
    const H = window.H;
    const platform = new H.service.Platform({
      apikey: KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 52, lng: 21 },
      zoom: 1,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const routingParameters = {
      routingMode: "fast",
      transportMode: "car",
      // The start point of the route:
      // origin: "50.1120423728813,8.68340740740811",
      origin: firstCords,
      destination: secondCords,
      // The end point of the route:
      // destination: "52.5309916298853,13.3846220493377",
      // Include the route shape in the response
      return: "polyline",
    };
    const onResult = (result: any) => {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section: any) => {
          // Create a linestring to use as a point source for the route line
          let linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          let routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: "blue", lineWidth: 3 },
          });

          // Create a marker for the start point:
          let startMarker = new H.map.Marker(section.departure.place.location);

          // Create a marker for the end point:
          let endMarker = new H.map.Marker(section.arrival.place.location);

          // Add the route polyline and the two markers to the map:
          map.addObjects([routeLine, startMarker, endMarker]);

          // Set the map's viewport to make the whole route visible:
          map
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };

    const router = platform.getRoutingService(null, 8);
    router.calculateRoute(
      routingParameters,
      onResult,
      function (error: { message: string }) {
        alert(error.message);
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    const ui = H.ui.UI.createDefault(map, defaultLayers);
    onResize(mapRef.current, () => {
      map.getViewPort().resize();
    });
    return () => {
      map.dispose();
    };
  }, [mapRef, firstCords, secondCords]);

  return (
    <div
      className="map"
      ref={mapRef}
      style={{ position: "relative", width: "100%", height: "400px" }}
    />
  );
};
