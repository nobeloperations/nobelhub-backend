import { Module } from '@nestjs/common';

import { GeoLocationService } from '@domain/abstractions/integration-services';

import { IpGeoLocationService } from './ip-geo-location/ip-geo-location-service';

@Module({
  providers: [
    {
      provide: GeoLocationService,
      useClass: IpGeoLocationService
    },
    IpGeoLocationService
  ],
  exports: [GeoLocationService]
})
export class GeoLocationServiceModule {}
