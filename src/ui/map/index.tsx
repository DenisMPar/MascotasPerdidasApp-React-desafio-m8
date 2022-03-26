import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import css from "./index.css";
import { MyText } from "ui/text";
import { useRecoilValue } from "recoil";
import { petState } from "atoms";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiZGVuaXNwYXJhZGEiLCJhIjoiY2t2cmhwbjZlMDM5czJ2cWlyczZoODg4cSJ9.6obRc3i_TK7qdx_A6_y-qg",
});

type MapBoxSearchProps = {
  onChange?: (any) => any;
};

function MapboxSearch(props: MapBoxSearchProps) {
  const { onChange } = props;
  const petData = useRecoilValue(petState);
  const [query, setQuery] = useState("");
  const [zone, setZone] = useState("");
  //coordenadas por defecto del mapa
  //lo seteo any porque center map se queja
  const [coords, setCoords] = useState([-58.38162, -34.60376] as any);

  //si hay data de la mascota la guardo en el query y en las coords
  //esto sirve para mostrar la data anterior cuando quiero editar la mascota
  useEffect(() => {
    if (petData) {
      setQuery(petData.zone);
      setCoords([petData?.lng, petData?.lat]);
    }
  }, []);

  async function search() {
    const data = await fetch(
      `https://us1.locationiq.com/v1/search.php?key=pk.bf4604bc2b3ea328e732de26a4387fa9&q=${query}&format=json`
    ).then((r) => r.json());

    const array = data[0].display_name.split([","], [1]);
    //zone es el area donde se perdio la mascota que luego figura en la petCard
    const zone = array[0];
    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    const newCoords = [lon, lat];

    setCoords(newCoords);
    setZone(zone);

    if (onChange) {
      onChange({
        query: query,
        coords: newCoords,
        zone: zone,
      });
    }
  }

  function inputChangeHandler(e) {
    setQuery(e.target.value);
  }

  function keydownInputHandler(e) {
    if (e.key == "Enter") {
      search();
    }
  }

  return (
    <div>
      <div className={css.containerMap}>
        <Map
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: "100%",
            width: "100%",
          }}
          zoom={[15]}
          center={coords}
          movingMethod="easeTo"
        >
          <Layer
            type="circle"
            paint={{
              "circle-color": "#FA8025",
              "circle-radius": 6,
              "circle-stroke-color": "black",
              "circle-stroke-width": 2,
            }}
          >
            <Feature coordinates={coords} />
          </Layer>
        </Map>
      </div>
      <label className={css.label}>
        UBICACIÓN
        <div className={css.containerInput}>
          <input
            className={css.input}
            type="text"
            onChange={inputChangeHandler}
            onKeyDown={keydownInputHandler}
            value={query}
          />
          <button className={css.button} onClick={search} type="button">
            Buscar
          </button>
        </div>
      </label>
      <MyText>
        Buscá un punto de referencia para reportar a tu mascota. Puede ser una
        dirección, un barrio o una ciudad.
      </MyText>
    </div>
  );
}
//

export { MapboxSearch };
