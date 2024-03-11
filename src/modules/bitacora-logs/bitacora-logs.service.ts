import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BitacoraLog, BitacoraLogDocument } from './model/bitacoraLog.schema';

@Injectable()
export class BitacoraLogsService {
  constructor(
    @InjectModel(BitacoraLog.name)
    private bitacoraModel: Model<BitacoraLogDocument>,
  ) {}

  async saveLog(bitacoraLog: BitacoraLog): Promise<BitacoraLog> {
    const saveLog = new this.bitacoraModel(bitacoraLog);
    return await saveLog.save();
  }

  async getAll(): Promise<BitacoraLog[]> {
    const data = await this.bitacoraModel.find().exec();
    console.log('getALl: ', data);
    return data;
  }
}
