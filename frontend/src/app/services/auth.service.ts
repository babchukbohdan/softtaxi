import { generateVerifyCode } from './../../assets/utils';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user;
  // private token: string;

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
    console.log('%cSet user in service', 'color: #2ECC71', user);
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
    console.log('%clogin', 'color: #2E86C1');

    try {
      const res = await fetch(`${environment.apiUrl}user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response = await res.json();
      // console.log('response in login service', response);

      if (response.user) {
        this.setCurrentUser(response.user);
        localStorage.setItem('token', response.user.token);
      }
      // console.log('%cresponse', 'color: #2ECC71', response);
      return response;
    } catch (error) {}
  }
  async register(body) {
    console.log('register');
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
      console.log('response', response);

      if (message) {
        return { message, status, verifyCode };
      }
      // console.log('sestUser', user);
      this.setCurrentUser({ ...user, token });
      localStorage.setItem('token', token);
      console.log('%cuser', 'color: #2ECC71', user);

      return response;
    } catch (error) {
      console.log(error);
    }
  }
  async registerDriver(body) {
    console.log('register Driver');
    try {
      const res = await fetch(`${environment.apiUrl}user/registration/driver`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response = await res.json();
      console.log('response in register DRiver', response);

      const { user, message, status, verifyCode } = response;
      if (message) {
        return { message, status, verifyCode };
      }
      // const { user, token } = response;
      // console.log('user', user);
      this.setCurrentUser(user);
      localStorage.setItem('token', user.token);
      // console.log('%cuser', 'color: #2ECC71', user);

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  // TODO
  // async resisterAsDriver(userBody, driverBody) {
  //   const { user } = await this.register(userBody);
  //   const driver = await this.createDriver(driverBody);
  //   this.setCurrentUser(user);
  //   console.log('user in resisterAsDriver', user);
  //   console.log('driver in resisterAsDriver', driver);
  // }

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
    console.log('updated user', user);

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

    console.log('driver res in update', driverInfo);

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
    localStorage.removeItem('token');
  }
}
