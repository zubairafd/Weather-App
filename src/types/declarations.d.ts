/// <reference types="vite/client" />
/// <reference types="@testing-library/jest-dom" />

declare module '*.css' {
  const content: Record<string, string>
  export default content
}

declare module 'react-leaflet' {
  export const MapContainer: any
  export const TileLayer: any
  export const Marker: any
  export const Popup: any
  export const useMap: any
}
