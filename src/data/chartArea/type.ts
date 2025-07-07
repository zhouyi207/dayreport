export type ChartAreaInteractiveParams = {
  title: string;
  description: string;
  data: {
    date: string;
    [key: string]: number | string;
  }[];
  chartConfig: {
    [key: string]: {
      label: string;
    };
  };
};
