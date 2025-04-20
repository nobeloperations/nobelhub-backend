import { Injectable } from '@nestjs/common';

import { GeoLocationService, LocationData } from '@domain/abstractions/integration-services';

@Injectable()
export class IpGeoLocationService implements GeoLocationService {
  private readonly BASE_URL = 'https://api.ipgeolocation.io/ipgeo';

  async GetLocationByIpAddress(ip: string): Promise<LocationData> {
    try {
      const url = `${this.BASE_URL}?apiKey=${process.env.LOCATION_API_KEY}&ip=${ip}`;

      const data = await (await fetch(url)).json();

      return {
        city: data.city ?? 'Unknown City',
        timezone: data.time_zone?.name ?? 'UTC',
        country: data.country_name ?? 'Unknown Country'
      };
    } catch {
      return {
        timezone: 'UTC',
        city: 'Unknown City',
        country: 'Unknown Country'
      };
    }
  }
}
