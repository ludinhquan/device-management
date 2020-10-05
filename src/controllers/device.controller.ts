import { repository } from '@loopback/repository';
import { authenticate } from '@loopback/authentication';
import { get, param, post, del, put, requestBody, getModelSchemaRef, patch } from '@loopback/rest';

import { Device } from '@/models';
import { DeviceRepository } from '@/repositories';

export class DeviceController {
  constructor(
    @repository(DeviceRepository) protected deviceRepo: DeviceRepository,
  ) { }

  @authenticate('jwt')
  @get('/devices', {
    responses: {
      '200': {
        description: 'Get Device List',
      },
    },
  })
  async getDevices(): Promise<Device[]> {
    return this.deviceRepo.find();
  }

  @authenticate('jwt')
  @post('/devices', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Device) },
        },
      },
    },
  })
  async createDevice(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Device, {
            title: 'NewDevice',
            exclude: ['id'],
          }),
        },
      },
    })
    device: Omit<Device, 'id'>,
  ): Promise<Device> {
    return this.deviceRepo.create(device);
  }

  @authenticate('jwt')
  @get('/devices/{id}', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Device) },
        },
      },
    },
  })
  async getDeviceById(
    @param.path.string('id') id: string,
  ): Promise<Device> {
    return this.deviceRepo.findById(id);
  }

  @authenticate('jwt')
  @put('/devices/{id}', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Device) },
        },
      },
    },
  })
  async updateDevice(
    @param.path.string('id') id: string,
    @requestBody() device: Omit<Device, 'id'>,
  ): Promise<void> {
    return this.deviceRepo.updateById(id, device);
  }

  @authenticate('jwt')
  @del('/devices/{id}', {
    responses: {
      '200': {
        description: 'Device model instance',
      },
    },
  })
  async deleteDevice(
    @param.path.string('id') id: string,
  ): Promise<void> {
    return this.deviceRepo.deleteById(id);
  }

  @authenticate('jwt')
  @patch('/devices/{id}/attributes', {
    responses: {
      '200': {
        description: 'Device model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(Device) },
        },
      },
    },
  })
  async updateAttributesById(
    @param.path.string('id') id: string,
    @requestBody() attributes: object,
  ): Promise<Device> {
    return this.deviceRepo.updateAttributes(id, attributes);
  }

  @authenticate('jwt')
  @del('/devices/{id}/attributes', {
    responses: {
      '200': {
        description: 'Delete Attributes',
      },
    },
  })
  async removeAttributesById(
    @param.path.string('id') id: string,
    @requestBody() data: { deleteFields: Array<string> },
  ): Promise<boolean> {
    return this.deviceRepo.deleteAttributes(id, data.deleteFields);
  }
}
