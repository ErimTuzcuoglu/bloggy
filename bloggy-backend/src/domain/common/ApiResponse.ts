export default class ApiResponse<T> {
  constructor(data: T, message = '') {
    if (data !== undefined) {
      this.succeeded = true;
      this.data = data;
    } else {
      this.succeeded = false;
      this.data = null;
    }
    this.message = message;
  }
  succeeded: boolean;
  message: string;
  errors: Array<string> = [];
  data: T;
}
