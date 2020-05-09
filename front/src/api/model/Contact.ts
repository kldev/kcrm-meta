import { BaseId } from './Base';

export interface ContactPhone {
  phone: string;
  primary: number;
}

export interface ContactRecord extends BaseId {
  name: string;
  surname: string;
  email: string;
  country: string;
}
