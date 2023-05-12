'use client'
//pngs are imported here and assigned to the their icons below 
/* 
MapContainer component creates the leaflet map instance
L 
*/
import 'leaflet/dist/leaflet.css'

import L from 'leaflet' 
import { MapContainer, Marker, TileLayer } from 'react-leaflet'
//the following imports make the marker work 
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

//these are used to reset the icons 
//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconUrl: markerIcon.src,
    iconRetinaUrl: markerIcon2x.src,
    shadowUrl: markerShadow.src
})


interface MapProps {
    center?: number[]
}

const Map: React.FC<MapProps> = ({
    center
}) => {
  return (
    //map container is the gray box that holds the serves as the placeholder for the rest of the components
    //since it calls the instance
    <MapContainer
        center={center as L.LatLngExpression || [51, -0.09]}
        zoom={center ? 4 : 2 }
        scrollWheelZoom={false}
        className='h-[35vh] rounded-lg'
    >
    {/* the tile layer is the map iself that lays on top */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center && (
          <Marker 
            position={center as L.LatLngExpression}
          />
      )}
    </MapContainer>
        
    

  )
}

export default Map
