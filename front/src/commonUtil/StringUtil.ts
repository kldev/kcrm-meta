export class StringUtil {
  public static isEmpty(value: string): boolean {
    if (!value) return true;
    if (value.trim().length === 0) return true;

    return false;
  }
}
