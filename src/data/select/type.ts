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

type DateStateWithoutOpen = {
  [K in keyof DateState]: {
    [O in keyof DateState[K]]: Omit<DateState[K][O], "open">;
  };
};

interface CheckState {
  [key: string]: {
    [option: string]: boolean;
  };
}

interface Selected {
  dateStates: DateStateWithoutOpen;
  checkStates: CheckState;
}

export type { SelectParams, DateState, CheckState, DateStateWithoutOpen, Selected };
