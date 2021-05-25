const str: string = 'Hi'
const bool: boolean = true
const numb: number = 11
let list: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2, 3]
let x: [string, number]
x = ['hello', 1]
let other: [any, any] = [1, 'hi']
let other2: Array<any> = [1, 'h1', 2]

enum CarTypes {
  Basic = 7,
  Comfort,
  Xl,
  Lux,
}

let basic = CarTypes.Basic // 7
let comfort = CarTypes[8] // "Comfort"

const enum StatuTypes {
  Active = 'active',
  Pending = 'active',
  InProgress = 'active',
  Done = 'active',
  Canceled = 'active',
}

const myStatus: any = StatuTypes.Active

const nevvar = (): never => {
  throw new Error('never or infinite')
}

let oneAnother: object | null = { a: 1 }

const createPass = (name: string = 'V', age?: number | string) =>
  `${name}${age}`

const createStills = (name: string, ...skills: Array<string>): string =>
  `${name} and skills${skills.join(' ')}`

// ======OBJECTS=======

//any
let user: any = {
  name: 'YHWH',
  age: Infinity,
}

let user2: { name: string; age: number } = {
  name: 'YHWH',
  age: Infinity,
} // you can't add new prop whithout describe him in type

// type for obj structure
type Person = {
  name: string
  age: number
  nickName?: string // optional
}

let god: Person = {
  name: 'Adonay',
  age: Infinity,
  nickName: 'god',
}
let god2: Person = {
  name: 'Adonay',
  age: Infinity,
  nickName: 'god',
}

// ======CLASS=======

class UserTest {
  public name: string
  protected password: string = '123'
  private phone: string
  readonly email: string

  constructor(name: string, password: string, phone: string, email: string) {
    this.name = name
    this.password = password
    this.phone = phone
    this.email = email
  }
}

// якщо модификатор в параметрі він створює свойство

class UserTestMini {
  constructor(
    public name: string,
    protected password: string = '123',
    private phone: string,
    readonly email: string
  ) {}
}

class UserTestGetSet {
  private age: number = 29
  constructor(public name: string) {}

  setAge(age: number) {
    this.age = age
  }

  set myAge(age: number) {
    // myAge потомучто нельзя age
    this.age = age
  }
}

// static

class UserTestStatic {
  static secret: number = 123
  constructor(public name: string) {}
  getPass(): string {
    return `${UserTestStatic.secret}`
  }
}

// ABSTRACT CLASS

// від нього наслідуються класи, сам не є конструетором

abstract class UserAbstract {
  constructor(public name: string) {}
  greet(): void {
    console.log(this.name)
  }
  abstract getPass(): string // реалізація описується в потомку
}

// NAMESPACE

// File Utils.ts
namespace Utils {
  export const secret: string = '123'
}

// File Main.ts
/// <reference path="Utils.ts" /> // import namespase

const pass = Utils.secret
// краще просто через модуль ES6 в якому export const ...

// INTERFACE

interface UserInterface {
  name: string
  age: number
  [propName: string]: any //позволяет добавлять любые свойства
}

// Geneeric types

class Geneeric<T> {
  constructor(public age: T) {}
}

//DECORATOR

// Class decorator
const logClass = (constructor: Function) => {
  console.log(constructor)
}

// @logClass // применение декоратора
class UserClassDecorator {
  constructor(public name: string) {}
  public getPass(): string {
    return `${this.name}123`
  }
}

// Prop decorator
const logProp = (target: Object, propkey: string | symbol) => {
  console.log(propkey)
}

class UserPropDecorator {
  // @logProp
  secret: number

  constructor(public name: string, secret: number) {
    this.secret = secret
  }
  public getPass(): string {
    return `${this.name}123`
  }
}

// Method Decorator
const logMethod = (
  target: Object,
  propkey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  console.log(propkey)
}

class UserMethodDecorator {
  constructor(public name: string) {}

  // @logMethod
  public getPass(): string {
    return `${this.name}123`
  }
}

// GET SET DECORATOR

const logSet = (
  target: Object,
  propkey: string | symbol,
  descriptor: PropertyDescriptor
) => {
  console.log(propkey)
}

class UserGetSetDecorator {
  constructor(public name: string, public age: number) {}

  // @logSet
  set myAge(age: number) {
    this.age = age
  }
}
