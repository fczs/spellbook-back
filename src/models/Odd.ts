import mongoose, { Schema, Document } from 'mongoose';

export interface IOdd extends Omit<UOdd, 'id'>, Document {
  oddId: number;
}

const Odd: Schema = new Schema(
  {
    oddId: { type: String, unique: true, index: true },
    source: { type: String },
    matchId: { type: String },
    eventId: { type: String },
    oddType: { type: String },
    oddFormat: { type: String },
    lbType: { type: String },
    timeType: { type: String },
    pivotValue: { type: Number },
    pivotBias: { type: String },
    pivotType: { type: String },
    isSwapped: { type: Boolean },
    rateOver: { type: Number },
    rateUnder: { type: Number },
    rateEqual: { type: Number },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IOdd>('odds', Odd);
