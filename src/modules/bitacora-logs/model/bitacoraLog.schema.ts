import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BitacoraLogDocument = HydratedDocument<BitacoraLog>;

@Schema({ timestamps: true, collection: 'bitacora_logs' })
export class BitacoraLog {
  @Prop({ required: true })
  date: string;

  @Prop({ required: true })
  status: number;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, type: Object })
  details: JSON;
}

export const BitacoraLogSchema = SchemaFactory.createForClass(BitacoraLog);
