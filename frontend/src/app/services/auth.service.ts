import { environment } from 'src/environments/environment';

export class AuthService {
  private user;

  getCurrentUser() {
    return this.user;
  }

  setCurrentUser(user) {
    this.user = user;
    console.log('%cuser', 'color: #2ECC71', user);
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

  async createUser(phone) {
    const res = await fetch(`${environment.apiUrl}user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone_number: phone }),
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

      if (response.user) {
        this.setCurrentUser(response.user);
        localStorage.setItem('token', response.token);
      }
      return response;
      console.log('%cresponse', 'color: #2ECC71', response);
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
      const { user, token } = response;
      console.log('sestUser', user);
      this.setCurrentUser(user);
      localStorage.setItem('token', token);
      console.log('%cresponse', 'color: #2ECC71', response);

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
    return await res.json();
  }

  logout() {
    this.setCurrentUser(undefined);
    localStorage.removeItem('token');
  }
}
