import Match from '../models/Match';
import { error } from '../utils/Utils';

const matchInsert = (match: UMatch): void => {
  new Match(match).save().catch(error);
};

export { matchInsert };
