"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import type {
  SelectParams,
  DateStateWithoutOpen,
  CheckState,
} from "@/data/select";

export default function SelectMonth({
  selectParams,
  onDataChange,
}: {
  selectParams: SelectParams;
  onDataChange: (data: any) => void;
}) {
  function generateInitStates(selectParams: SelectParams) {
    const dateStates: DateStateWithoutOpen = {};
    const checkStates: CheckState = {};

    selectParams.date?.forEach((item) => {
      dateStates[item.title] = {};
      item.options.forEach((subitem) => {
        dateStates[item.title][subitem] = { selected: undefined };
      });
    });
    selectParams.check?.forEach((item) => {
      checkStates[item.title] = {};
      item.options.forEach((subitem) => {
        checkStates[item.title][subitem] = true;
      });
    });

    return { dateStates, checkStates };
  }

  const initStates = generateInitStates(selectParams);

  const [dateStates, setDateStates] = React.useState<DateStateWithoutOpen>(
    initStates.dateStates
  );
  const [checkStates, setCheckboxStates] = React.useState<CheckState>(
    initStates.checkStates
  );

  const handleDateSelect = (
    title: string,
    option: string,
    date: Date | undefined
  ) => {
    setDateStates((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        [option]: {
          ...prev[title][option],
          selected: date,
        },
      },
    }));
  };

  // handleDateSelect(item.title, subitem, date);

  const handleCheckboxChange = (
    groupTitle: string,
    option: string,
    checked: boolean
  ) => {
    setCheckboxStates((prev) => ({
      ...prev,
      [groupTitle]: {
        ...prev[groupTitle],
        [option]: checked,
      },
    }));
  };

  React.useEffect(() => {
    onDataChange({ dateStates, checkStates });
  }, [dateStates, checkStates]);

  return (
    <div className="rounded-xl border bg-background shadow-sm divide-y">
      {selectParams.date?.map((item, idx) => (
        <div key={idx} className="flex gap-6 p-5 items-center">
          <div className="w-24 text-sm font-semibold text-muted-foreground pt-1">
            {item.title}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-4 flex-1">
            {item.options.map((subitem, subidx) => (
              <div className="flex items-center gap-2" key={subidx}>
                <Label htmlFor={`date-${idx}-${subidx}`} className="text-sm">
                  {subitem}
                </Label>
                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectParams.check.map((item, idx) => (
        <div key={idx} className="flex gap-6 p-5 items-center">
          <div className="w-24 text-sm font-semibold text-muted-foreground pt-1">
            {item.title}
          </div>
          <div className="flex flex-wrap gap-x-12 flex-1">
            {item.options.map((subitem, subidx) => (
              <div className="flex items-center gap-2" key={subidx}>
                <Checkbox
                  id={`check-${idx}-${subidx}`}
                  checked={checkStates[item.title][subitem]}
                  onCheckedChange={(e: boolean) =>
                    handleCheckboxChange(item.title, subitem, e)
                  }
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600"
                />
                <Label
                  htmlFor={`check-${idx}-${subidx}`}
                  className="text-sm leading-none"
                >
                  {subitem}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
