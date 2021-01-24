import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Omit<UMatch, 'id'>, Document {
  matchId: string;
}

const Match: Schema = new Schema(
  {
    matchId: { type: String, unique: true, index: true },
    sportType: { type: String },
    startTime: { type: Number },
    league: { type: String },
    host: { type: String },
    guest: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IMatch>('matches', Match);
