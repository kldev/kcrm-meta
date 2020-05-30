import Axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from 'constant/Url';
import { LoginRequest, LoginResponse } from 'api/model';

const LoginPath = 'api/login';

class AuthApi {
  private api: AxiosInstance;

  constructor(private baseUrl: string) {
    this.api = Axios.create({
      baseURL: `${baseUrl}`,
      headers: {},
      // / handle api status when used
      validateStatus: (status) => {
        return true;
      },

      timeout: 5 * 1000,
    });
  }

  /**
   * Call /api/auth/login
   * Return axios promise response
   * @param req
   */
  public login(req: LoginRequest) {
    return this.api.post<LoginResponse>(LoginPath, req);
  }
}

export default new AuthApi(API_BASE_URL);
