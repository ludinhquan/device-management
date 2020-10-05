import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { DefaultCrudRepository, juggler } from '@loopback/repository';

import { Device, DeviceRelations, IAttributes } from '@/models';

export class DeviceRepository extends DefaultCrudRepository<
  Device,
  typeof Device.prototype.id,
  DeviceRelations
  > {
  constructor(@inject('datasources.mongodb') dataSource: juggler.DataSource) {
    super(Device, dataSource);
  }

  async updateAttributes(id: string, newAttributes: object): Promise<Device> {
    const device = await this.findById(id);
    if (!device) {
      throw new HttpErrors.NotFound();
    }
    const attributes = { ...device.attributes, ...newAttributes };
    await this.updateById(id, { attributes });
    return Promise.resolve({ ...device, attributes } as Device)
  }

  async deleteAttributes(id: string, deleteFields: Array<string>): Promise<boolean> {
    const device = await this.findById(id);
    if (!device) {
      throw new HttpErrors.NotFound();
    }
    const attributes: IAttributes = {};
    const oldAttributes = device.attributes ?? {};
    Object.keys(oldAttributes)
      .forEach((key: string) => {
        if (!deleteFields.includes(key)) attributes[key] = oldAttributes[key]
      });

    await this.updateById(id, { attributes });
    return true;
  }
}

