import { juggler } from '@loopback/repository';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';

const config = {
    name: 'mongodb',
    connector: 'mongodb',
    host: 'localhost',
    port: 27017,
    user: '',
    password: '',
    database: 'device-management',
    useNewUrlParser: true
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
