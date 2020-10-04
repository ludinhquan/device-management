import path from 'path';
import { BootMixin } from '@loopback/boot';
import { ApplicationConfig } from '@loopback/core';
import { RestApplication } from '@loopback/rest';
import { RepositoryMixin } from '@loopback/repository';
import { ServiceMixin } from '@loopback/service-proxy';
import { RestExplorerComponent } from '@loopback/rest-explorer';
import { AuthenticationComponent } from '@loopback/authentication';
import { JWTAuthenticationComponent, UserServiceBindings } from '@loopback/authentication-jwt';

import { MySequence } from './sequence';
import { MongodbDataSource } from './datasources'

export { ApplicationConfig };

export class DeviceManagementApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    this.component(AuthenticationComponent);
    this.component(JWTAuthenticationComponent);

    this.component(RestExplorerComponent);

    this.dataSource(MongodbDataSource, UserServiceBindings.DATASOURCE_NAME)

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
}
