const abortController = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 30000);

class Rest {
  static #requestConfig = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    signal: abortController.signal
  };

  static async custom(reqParams) {
    const req = await fetch({ ...this.#requestConfig, ...reqParams });
    clearTimeout(timeoutId);
    return req;
  }

  static get = async (reqParams) => Rest.custom({ ...reqParams, method: 'get' });
  static post = async (reqParams) => Rest.custom({ ...reqParams, method: 'post' });
  static put = async (reqParams) => Rest.custom({ ...reqParams, method: 'put' });
  static delete = async (reqParams) => Rest.custom({ ...reqParams, method: 'delete' });

  static setToken(token) {
    const config = JSON.parse(JSON.stringify(this.#requestConfig));
    this.#requestConfig = { ...config, headers: { ...config.headers, 'Authorization': `Bearer ${token}` } }
  }

  static removeToken() {
    const config = JSON.parse(JSON.stringify(this.#requestConfig));
    delete config.headers['Authorization']
    this.#requestConfig = config;
  }
}

export default Rest;