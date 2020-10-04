import { juggler } from '@loopback/repository';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';

const config = {
  connector: "rest",
  debug: false,
  options: {
    headers: {
      accept: "application/json",
      'content-type': "application/json"
    },
    strictSSL: false
  },
  operations: [
    {
      template: {
        method: "GET",
        url: "https://graph.facebook.com/v8.0/me",
        query: {
          fields: "id,name,email",
          // eslint-disable-next-line @typescript-eslint/naming-convention
          access_token: "{access_token}"
        },
      },
      functions: {
        getFbAccount: ["access_token"]
      }
    }
  ]
};

@lifeCycleObserver('datasource')
export class RestDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'rest';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.rest', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
