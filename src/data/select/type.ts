interface SelectParams {
  date?: { title: string; options: string[] }[];
  check: { title: string; options: string[] }[];
}

interface DateState {
  [key: string]: {
    [option: string]: {
      open: boolean;
      selected: Date | undefined;
    };
  };
}

interface CheckState {
  [key: string]: {
    [option: string]: boolean;
  };
}

export type { SelectParams, DateState, CheckState };
