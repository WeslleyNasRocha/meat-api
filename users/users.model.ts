import { resolve } from 'url';

const users = [
  { id: '1', name: 'Peter Parker', email: 'peter@parker.com' },
  { id: '2', name: 'Bruce Wayne', email: 'bruce@wayne.com' }
];

export class User {
  static findAll(): Promise<any[]> {
    return Promise.resolve(users);
  }
  static findById(id: String): Promise<any> {
    return new Promise(resolve => {
      const filt = users.filter(user => user.id === id);
      let user = undefined;
      if (filt.length > 0) {
        user = filt[0];
      }
      return resolve(user);
    });
  }
}
