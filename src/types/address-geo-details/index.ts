export type TAddressGeoCodeDetails = {
  address_components: Addresscomponent[];
  formatted_address: string;
  geometry: Geometry;
  place_id: string;
  types: string[];
};

interface Geometry {
  bounds: Bounds;
  location: Northeast;
  location_type: string;
  viewport: Bounds;
}

interface Bounds {
  northeast: Northeast;
  southwest: Northeast;
}

interface Northeast {
  lat: number;
  lng: number;
}

interface Addresscomponent {
  long_name: string;
  short_name: string;
  types: string[];
}
