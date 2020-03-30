import React from 'react';
import Choropleth from 'react-leaflet-choropleth'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  GeoJSON
} from "react-leaflet";

import  dataLogradouros from "../../data/Logradouros.json";
import  dataQuadras from "../../data/Quadra_GeoJSON.json";

import './styles.css';

const { BaseLayer, Overlay } = LayersControl

const center = [-32.0332, -52.0986]
const rectangle = [
  [-32.0332, -52.0986],
  [-32.0222, -52.0886],
]
const style = {
  fillColor: '#F28F3B',
  weight: 2,
  opacity: 0,
  color: 'white',
  dashArray: '3',
  fillOpacity: 0.5
}
export default function Mapaview (){
  const [activePark, setActivePark] = React.useState(null);

  return (
    <Map center={center} zoom={13}>
    <LayersControl position="topright">

      <BaseLayer checked name="OpenStreetMap.Mapnik">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
      </BaseLayer>

      <BaseLayer name="OpenStreetMap.BlackAndWhite">
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </BaseLayer>
      <Overlay name="Marker with popup">
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Overlay>
      <Overlay checked name="Layer group with circles">
        <LayerGroup>
          <Circle center={center} fillColor="blue" radius={200} />
          <Circle
            center={center}
            fillColor="red"
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              color="green"
              fillColor="green"
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </Overlay>
      <Overlay name="Quadras">
      <LayerGroup>             
        <GeoJSON  
        color="green"
        fillColor="green"
              data={dataQuadras} />

      </LayerGroup>
      </Overlay>

      <Overlay name="Logradouros">
      <LayerGroup>
            <GeoJSON data={dataLogradouros} />

          </LayerGroup>
      </Overlay>

      <Overlay name="Chloropleth">
      <LayerGroup>
            {/* <GeoJSON data={dataLogradouros} /> */}
            <Choropleth           
            data={{type: 'FeatureCollection', features: dataQuadras.features}}
            valueProperty={(feature) => feature.properties.value}
            scale={['#b3cde0', '#011f4b']}
            steps={10}
            mode='e'
            style={style}
            onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.label)}
            ref={LayerGroup}
          />
          </LayerGroup>
      </Overlay>



      <Overlay name="Feature group">
        <FeatureGroup color="purple">
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[-32.0558, -52.0885]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </Overlay>
    </LayersControl>
  </Map>
    );

}