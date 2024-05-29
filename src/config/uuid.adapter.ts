import { v4 } from 'uuid';

export class UUIDAdapter {

  public static generateUUID() {
    return v4();
  }
}