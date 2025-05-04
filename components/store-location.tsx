"use client"

import { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, MapPin, Phone } from "lucide-react"

// Store location data
const storeLocation = {
  name: "ModernStore Flagship",
  address: "123 Fashion Avenue, New York, NY 10001",
  phone: "+1 (555) 123-4567",
  hours: "Mon-Sat: 10am-8pm, Sun: 11am-6pm",
  position: [40.7128, -74.006], // New York coordinates
}

export default function StoreLocation() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient) {
      // @ts-ignore
      delete L.Icon.Default.prototype._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      })
    }
  }, [isClient])

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold">{storeLocation.name}</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-start">
              <MapPin className="mr-3 h-5 w-5 text-primary" />
              <span>{storeLocation.address}</span>
            </div>
            <div className="flex items-start">
              <Phone className="mr-3 h-5 w-5 text-primary" />
              <span>{storeLocation.phone}</span>
            </div>
            <div className="flex items-start">
              <Clock className="mr-3 h-5 w-5 text-primary" />
              <span>{storeLocation.hours}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="h-[400px] overflow-hidden rounded-lg">
        {isClient && (
          <MapContainer
            center={[storeLocation.position[0], storeLocation.position[1]]}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[storeLocation.position[0], storeLocation.position[1]]}>
              <Popup>
                <b>{storeLocation.name}</b>
                <br />
                {storeLocation.address}
              </Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  )
}
