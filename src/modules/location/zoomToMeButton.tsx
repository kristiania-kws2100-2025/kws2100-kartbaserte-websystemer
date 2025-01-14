import { View } from "ol";
import React from "react";

export function ZoomToMeButton({ view }: { view: View }) {
  function handleClick() {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        view.animate({ center: [longitude, latitude], zoom: 15 });
      },
      (positionError) => {
        console.log({ positionError });
      },
    );
  }

  return <button onClick={handleClick}>Zoom to my location</button>;
}
