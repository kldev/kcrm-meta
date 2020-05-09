import BaseSecureApi from './BaseSecureApi';
import { CommonQuery, CountryRecord } from './model';

const ContactQueryPath = 'api/country';

class ContactApi extends BaseSecureApi {
  // eslint-disable-next-line  @typescript-eslint/no-useless-constructor
  constructor(baseUrl: string, token: string) {
    super(baseUrl, token);
  }

  /**
   * Call api/country
   * Return axios promise response
   * @param req
   */
  public query(req: CommonQuery) {
    return this.api.post<CountryRecord[]>(ContactQueryPath, req);
  }
}

export default ContactApi;
