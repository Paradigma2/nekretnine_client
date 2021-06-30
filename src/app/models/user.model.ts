import { Agency } from './agency.model';
export class User {
  id: number;
  username: string;
  email: string;
  country: string;
  city: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  status: string;
  profilePicture: string;
  agency: Agency;
}
