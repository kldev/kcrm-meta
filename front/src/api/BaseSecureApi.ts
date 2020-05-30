import Axios, { AxiosInstance } from 'axios';

abstract class BaseSecureApi {
  protected api: AxiosInstance;

  constructor(private baseUrl: string, private token: string) {
    this.api = Axios.create({
      baseURL: `${baseUrl}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // / handle api status when used
      validateStatus: () => {
        return true;
      },
    });
  }
}
export default BaseSecureApi;
