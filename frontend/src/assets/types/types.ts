export enum CarType {
  basic = 'basic',
  comfort = 'comfort',
  eco = 'eco',
  xl = 'xl',
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

export class Order {
  public customer_id = '';
  public driver_id = '';
  public created_date: Date = new Date();
  public last_update: Date = new Date();
  public destination_location = '';
  public passanger_location = '';
  public price = '';
  public car_type: CarType;
  public status = 'active';
  public description: '';

  constructor({ id, from, to, carType, price, description }) {
    this.customer_id = id;
    this.destination_location = to;
    this.passanger_location = from;
    this.price = price;
    this.car_type = carType;
    this.description = description;
  }
}
