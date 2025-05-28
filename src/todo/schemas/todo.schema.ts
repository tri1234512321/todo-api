import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TodoDocument = Todo & Document;

@Schema({ timestamps: true })
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop()
  content: string;

  @Prop({ default: false })
  status: boolean;

  @Prop()
  dateTime: Date;

  createdAt?: Date;
  updatedAt?: Date;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
