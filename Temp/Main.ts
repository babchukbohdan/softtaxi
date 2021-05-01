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

// interface Date {
//   day: number
//   month: number
//   year: number
// }

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
  private id: number
  private name: string
  private phoneNumber: string
  private email: string
  private password: string
  private rating: number
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
