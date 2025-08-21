interface SelectParams {
  date?: {
    title: string;
    options: {
      起始日期: string[];
      结束日期: string[];
    };
  }[];
  check: { title: string; options: string[] }[];
}

interface DateState {
  [key: string]: {
    起始日期: {
      open: boolean;
      selected: string;
    };
    结束日期: {
      open: boolean;
      selected: string;
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

export type {
  SelectParams,
  DateState,
  CheckState,
  DateStateWithoutOpen,
  Selected,
};
