export interface Prefectures {
  prefCode: number;
  prefName: string;
}

export interface PopulationPerYear {
  boundaryYear: number;
  data: Array<object>;
}
