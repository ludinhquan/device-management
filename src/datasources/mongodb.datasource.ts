import { juggler } from '@loopback/repository';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';

const config = {
    name: 'mongodb',
    connector: 'mongodb',
    url: 'mongodb+srv://test:Abcd1234@cluster0.od7me.mongodb.net/device-management?retryWrites=true&w=majority',
    protocol: 'mongodb+srv',
    useNewUrlParser: true,
};

@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
    implements LifeCycleObserver {
    static dataSourceName = 'mongodb';
    static readonly defaultConfig = config;

    constructor(
        @inject('datasources.config.mongodb', { optional: true })
        dsConfig: object = config,
    ) {
        super(dsConfig);
    }
}
