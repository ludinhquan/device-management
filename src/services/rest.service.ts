import { inject, Provider } from '@loopback/core';
import { getService } from '@loopback/service-proxy';

import { RestDataSource } from '@/datasources';

export interface Account {
  id: string;

  name: string;

  email: string;
}

export interface RestAPI {
  getFbAccount(accessToken: string): Promise<Account>;
}

export class RestAPIProvider implements Provider<Account> {
  constructor(
    @inject('datasources.rest')
    protected dataSource: RestDataSource = new RestDataSource(),
  ) { }

  value(): Promise<Account> {
    return getService(this.dataSource);
  }
}
