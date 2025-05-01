import { makeAutoObservable } from "mobx";

export interface FilterOptions {
  turbo?: boolean;
  xray?: boolean;
  reverse?: boolean;
}

export class FilterWidgetManager {
  private _turbo: boolean = false;
  private _xray: boolean = false;
  private _reverse: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  get turbo(): boolean {
    return this._turbo;
  }

  get xray(): boolean {
    return this._xray;
  }

  get reverse(): boolean {
    return this._reverse;
  }

  setTurbo(value: boolean) {
    this._turbo = value;
  }

  setXray(value: boolean) {
    this._xray = value;
  }

  setReverse(value: boolean) {
    this._reverse = value;
  }

  get selectedOptions(): string[] {
    const options: string[] = [];
    if (this._turbo) options.push("turbo");
    if (this._xray) options.push("xray");
    if (this._reverse) options.push("reverse");
    return options;
  }
}

// Create a singleton instance
export const filterWidgetManager = new FilterWidgetManager();
