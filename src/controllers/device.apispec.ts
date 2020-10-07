import { Device } from '@/models';
import { getModelSchemaRef, OperationObject } from '@loopback/rest';

export const getDevicesApiSpec: OperationObject = {
  summary: "Get list of devices",
  responses: {
    default: {
      description: 'Array devices instance',
      content: {
        'application/json': { schema: Array },
      }
    }
  }
}

export const createDeviceApiSpec: OperationObject = {
  summary: 'Create new device',
  responses: {
    content: {
      'application/json': { schema: getModelSchemaRef(Device) },
    },
  },
}

export const getDeviceApiSpec: OperationObject = {
  summary: 'Get device detail',
  responses: {
    '200': {
      description: 'Device model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Device) },
      },
    },
  },
}

export const updateDeviceApiSpec: OperationObject = {
  summary: 'Update device',
  responses: {
    '200': {
      description: 'Device model instance',
      content: {
        'application/json': { schema: getModelSchemaRef(Device) },
      },
    },
  },
}

export const deleteDeviceApiSpec: OperationObject = {
  summary: 'Delete device by id',
  responses: {
    '200': {
      description: 'Result',
    },
  },
}