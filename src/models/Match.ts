import mongoose, { Schema, Document } from 'mongoose';

export interface IMatch extends Omit<UMatch, 'id'>, Document {
  unity_id: string;
}

const Match: Schema = new Schema(
  {
    unity_id: { type: String, required: true, unique: true },
    sportType: { type: String, required: true },
    startTime: { type: String, required: true },
    league: { type: String, required: false },
    host: { type: String, required: false },
    guest: { type: String, required: false },
    competition: { type: String, required: false },
    playerOne: { type: String, required: false },
    playerTwo: { type: String, required: false },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IMatch>('matches', Match);
