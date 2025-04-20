export interface LocationData {
  city: string;
  country: string;
  timezone: string;
}

export abstract class GeoLocationService {
  abstract GetLocationByIpAddress(ip: string): Promise<LocationData>;
}
