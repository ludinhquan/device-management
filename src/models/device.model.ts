import { Entity, model, property } from '@loopback/repository';

export interface IAttributes {
    [key: string]: any
}

@model()
export class Device extends Entity {
    @property({
        type: 'string',
        id: true,
        mongodb: {dataType: 'ObjectId'}
    })
    id?: string;

    @property({
        type: 'string',
        required: true,
        index: true
    })
    name?: string;

    @property({
        type: 'string',
    })
    desc?: string;

    @property({
        type: 'object',
    })
    attributes?: IAttributes;

    constructor(data?: Partial<Device>) {
        super(data);
    }
}

export interface DeviceRelations {
    // describe navigational properties here
}

export type DeviceWithRelations = Device & DeviceRelations;
