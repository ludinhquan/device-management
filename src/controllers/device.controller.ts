import { repository } from '@loopback/repository';
import { authenticate } from '@loopback/authentication';
import { get, param, post, del, put, requestBody, getModelSchemaRef, patch } from '@loopback/rest';

import { DeviceRepository } from '@/repositories';
import { CreateDeviceDTO, UpdateDeviceDTO, Device, IAttributes } from '@/models';

import * as apispec from './device.apispec';

export class DeviceController {
  constructor(
    @repository(DeviceRepository) protected deviceRepo: DeviceRepository,
  ) { }

  @authenticate('jwt')
  @get('/devices', apispec.getDevicesApiSpec)
  async getDevices(
    @param.query.string('name') name?: string,
    @param.query.string('desc') desc?: string,
    @param.query.object('attributes', { example: { 'attribute': 'value' } }) attributes?: IAttributes,
  ): Promise<Device[]> {
    return this.deviceRepo.getDevicesByParams({ name, desc, attributes });
  }


  @authenticate('jwt')
  @post('/devices', apispec.createDeviceApiSpec)
  async createDevice(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CreateDeviceDTO),
        },
      },
    })
    device: CreateDeviceDTO,
  ): Promise<Device> {
    return this.deviceRepo.create(device);
  }

  @authenticate('jwt')
  @get('/devices/{id}', apispec.getDeviceApiSpec)
  async getDeviceById(
    @param.path.string('id') id: string,
  ): Promise<Device> {
    return this.deviceRepo.findById(id);
  }

  @authenticate('jwt')
  @put('/devices/{id}', apispec.updateDeviceApiSpec)
  async updateDevice(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UpdateDeviceDTO),
        },
      },
    }) device: UpdateDeviceDTO,
  ): Promise<void> {
    return this.deviceRepo.updateById(id, device);
  }

  @authenticate('jwt')
  @del('/devices/{id}', apispec.deleteDeviceApiSpec)
  async deleteDevice(
    @param.path.string('id') id: string,
  ): Promise<void> {
    return this.deviceRepo.deleteById(id);
  }

  @authenticate('jwt')
  @patch('/devices/{id}/attributes')
  async updateAttributesById(
    @param.path.string('id') id: string,
    @requestBody({ description: 'Device attributes' }) attributes: object,
  ): Promise<Device> {
    return this.deviceRepo.updateAttributes(id, attributes);
  }

  @authenticate('jwt')
  @del('/devices/{id}/attributes')
  async removeAttributesById(
    @param.path.string('id') id: string,
    @requestBody({ description: 'Array attributes field to delete' }) fields: Array<string>,
  ): Promise<Device> {
    return this.deviceRepo.deleteAttributes(id, fields);
  }
}
