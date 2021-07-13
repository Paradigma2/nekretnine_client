import { Realty } from './realty.model';
import { User } from './user.model';
export class Offer {
  id: number;
  accepted!: boolean;
  user: User;
  realty: Realty;
  from: string;
  to: string;
}
