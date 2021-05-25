import { generateVerifyCode } from './../../assets/utils';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user;
  constructor() {
    const userFromLS = this.getUserFromLS();

    if (userFromLS) {
      this.setCurrentUser(userFromLS);
    }
  }
  isAuthenticated() {
    return Boolean(this.user?.token);
  }
  isDriver() {
    return Boolean(this.user?.driverInfo);
  }

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user) {
    this.user = user;

    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }

  getUserFromLS() {
    const userFromLS = localStorage.getItem('user');

    return JSON.parse(userFromLS);
  }

  async getDriver(id: string) {
    const res = await fetch(
      `${environment.apiUrl}driver?filter[user_id]=${id}`
    );

    const dr = await res.json();

    if (!dr.length) {
      return null;
    }
    return dr[0];
  }
  async getDriverById(id: string) {
    const res = await fetch(`${environment.apiUrl}driver?filter[id]=${id}`);

    const dr = await res.json();

    if (!dr.length) {
      return null;
    }
    return dr[0];
  }

  async getUser(id: string) {
    const res = await fetch(`${environment.apiUrl}user?filter[id]=${id}`);

    const user = await res.json();

    if (!user.length) {
      return null;
    }
    return user[0];
  }

  async getFullDriver(body) {
    const user = await this.login(body);

    if (user.message) {
      return user;
    }

    const driverInfo = await this.getDriver(user.user.id);
    if (!driverInfo) {
      return { message: `Driver with phone number ${body.phone} not found.` };
    }

    const driver = { driverInfo, token: user.token, ...user.user };
    this.setCurrentUser(driver);
    return driver;
  }

  async getUserByPhoneNumber(phone: string) {
    try {
      const res = await fetch(
        `${environment.apiUrl}user?filter[phone_number]=${phone}`
      );
      const user = await res.json();

      this.setCurrentUser(user[0]);
      return user[0];
    } catch (error) {}
  }

  async createDriver(body) {
    const res = await fetch(`${environment.apiUrl}driver`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const driver = await res.json();
    return driver;
  }

  async createUser(phone) {
    const res = await fetch(`${environment.apiUrl}user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        phone_number: phone,
        verify_code: generateVerifyCode(),
      }),
    });

    const user = await res.json();

    this.setCurrentUser(user);
    return user;
  }

  async login(body) {
    try {
      const res = await fetch(`${environment.apiUrl}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await res.json();

      if (response.user) {
        this.setCurrentUser(response.user);
      }
      return response;
    } catch (error) {}
  }
  async register(body) {
    try {
      const res = await fetch(`${environment.apiUrl}user/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      const { user, message, status, verifyCode, token } = response;

      if (message) {
        return { message, status, verifyCode };
      }
      this.setCurrentUser({ ...user, token });

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async registerDriver(body) {
    try {
      const res = await fetch(`${environment.apiUrl}user/registration/driver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();

      const { user, message, status, verifyCode } = response;
      if (message) {
        return { message, status, verifyCode };
      }
      this.setCurrentUser(user);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateUser({ id, name, phone, email }) {
    const body = {
      id,
      name,
      phone_number: phone,
      email,
    };
    const res = await fetch(`${environment.apiUrl}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const user = await res.json();

    const currentUser = this.getCurrentUser();
    this.setCurrentUser({
      ...currentUser,
      ...user,
    });

    return user;
  }

  async updateDriver({ id, carColor, carModel, carNumber, carType }) {
    const body = {
      id,
      car_color: carColor,
      car_model: carModel,
      car_number: carNumber,
      car_type: carType,
    };
    const res = await fetch(`${environment.apiUrl}driver`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const driverInfo = await res.json();

    this.setCurrentUser({
      ...this.user,
      driverInfo: {
        ...driverInfo,
      },
    });
    return driverInfo;
  }

  logout() {
    this.setCurrentUser(undefined);
    localStorage.removeItem('user');
  }
}
