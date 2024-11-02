declare global {
  interface IPrefecture {
    prefCode: number;
    prefName: string;
  }

  interface IPopulation {
    year: number;
    value: number;
    rate: number;
  }

  interface IPopulationData {
    label: string;
    data: Array<IPopulation>;
  }

  interface IPopulationPerYear {
    boundaryYear: number;
    data: Array<IPopulationData>;
  }
}

export {};
