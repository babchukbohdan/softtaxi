export enum CarType {
  basic,
  comfort,
  xl,
  lux,
  green,
}
export enum StatusType {
  Postponed,
  Active,
  Accepted,
  WaitingForCustomer,
  InProgress,
  Done,
  Canceled,
}

export interface Request {
  customerId: string;
  driverId: string;
  createdDate: Date;
  lastUpdate: Date;
  destinationLocation: string;
  passangerLocation: string;
  price: number;
  carType: string;
  status: StatusType;
  description: string;
}
