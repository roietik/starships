export interface IResponseObject<TObject> {
  message: string;
  result: {
    properties: TObject;
    description: string;
    _id: string;
    uid: string;
    __v: number;
  };
}

export interface IResponseCollection {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string | null;
  next: string | null;
  results: IItem[];
}

export interface IItem {
  uid: string;
  name: string;
  url: string;
}

export interface IPerson {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  created: string;
  edited: string;
  homeworld: string;
  url: string;
}

export interface IStarship {
  name: string;
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  crew: string;
  passengers: string;
  max_atmosphering_speed: string;
  hyperdrive_rating: number;
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  pilots: string[];
  created: string;
  edited: string;
  url: string;
}

export type TEndpoint = 'people'
  | 'starships';