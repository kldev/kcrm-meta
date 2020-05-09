import BaseSecureApi from './BaseSecureApi';
import { CommonQuery, ContactRecord } from './model';

const ContactQueryPath = 'api/contact/query';

class ContactApi extends BaseSecureApi {
  // eslint-disable-next-line  @typescript-eslint/no-useless-constructor
  constructor(baseUrl: string, token: string) {
    super(baseUrl, token);
  }

  /**
   * Call api/contact/query
   * Return axios promise response
   * @param req
   */
  public query(req: CommonQuery) {
    return this.api.post<ContactRecord[]>(ContactQueryPath, req);
  }
}

export default ContactApi;
