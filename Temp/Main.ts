enum CarType {
  Basic,
  Comfort,
  Xl,
  Lux,
  Green,
}
enum StatusType {
  Postponed,
  Active,
  Accepted,
  WaitingForCustomer,
  InProgress,
  Done,
  Canceled,
}

enum ServiceType {
  Ride,
  Delivery,
  SoberDriver,
}

interface Location {
  street: string
  house: number
  flat: number
}

interface Request {
  customerId: string
  driverId: string
  createdDate: Date
  lastUpdate: Date
  destinationLocation: Location
  passangerLocation: Location
  price: number
  carType: CarType
  status: StatusType
  description: string
  // isPublished: boolean
}

class User {
  public id: number
  public name: string
  private password: string
  private email: string
  public phoneNumber: string
  public rating: number
}

class Driver extends User {
  private isAvaliable: boolean
  private carType: CarType
  private currentRequest: string
  takeRequest() {}
  changeCarModel() {}
}

class Customer extends User {
  requestsId: Array<string>
  makeRequest() {}
  cancelRequest() {}
}
class RequestsList extends User {
  requests: Array<Request>
  add() {}
  remove() {}
  update() {}
}
