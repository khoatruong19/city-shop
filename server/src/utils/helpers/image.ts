import { prop } from '@typegoose/typegoose';

export class Image {
  @prop({
    type: String,
    required: true,
  })
  public_id: string;

  @prop({
    type: String,
    required: true,
  })
  url: string;
}
