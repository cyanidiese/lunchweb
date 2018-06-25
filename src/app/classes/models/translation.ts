export class Translation {

  en: string;
  ua: string;
  ru: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
