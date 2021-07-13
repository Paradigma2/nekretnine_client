// import { Photo } from './photo.model';

export class Realty {
  id: number;
  description: string;
  address: string;
  city: string;
  county: string;
  level: string;
  size: number;
  price: number;
  roomCount: string;
  realtyType: string;
  purpose: string;
  status: string;
  ownerType: string;
  owner: object; // User or Agency
  promoted: boolean;
  photo: string;
  viewCount: number;
  createdAt: Date;
}
