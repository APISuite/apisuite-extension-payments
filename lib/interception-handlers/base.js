class Base {
  constructor({ interceptor, payload, userEmail }) {
    this.interceptor = interceptor;
    this.payload = payload;
    this.userEmail = userEmail;
  }
}

module.exports = Base;
