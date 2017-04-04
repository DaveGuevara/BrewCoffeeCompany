export interface IEarn {
  $key: string;
  points: string;
}

export class Earn implements IEarn {

  constructor(
    public $key: string,
    public points: string) {}
}
