"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SelectParams, DateState, CheckState } from "@/data/select";

export function Select({
  selectParams,
  onDataChange,
}: {
  selectParams: SelectParams;
  onDataChange: (data: any) => void;
}) {
  function generateInitStates(selectParams: SelectParams) {
    const dateStates: DateState = {};
    const checkStates: CheckState = {};

    selectParams.date?.forEach((item) => {
      dateStates[item.title] = {};
      item.options.forEach((subitem) => {
        dateStates[item.title][subitem] = { open: false, selected: undefined };
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

  const [dateStates, setDateStates] = React.useState<DateState>(
    initStates.dateStates
  );
  const [checkStates, setCheckboxStates] = React.useState<CheckState>(
    initStates.checkStates
  );

  const handleDateOpenChange = (
    title: string,
    option: string,
    open: boolean
  ) => {
    setDateStates((prev) => ({
      ...prev,
      [title]: {
        ...prev[title],
        [option]: {
          ...prev[title][option],
          open: open,
        },
      },
    }));
  };

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
          open: false,
        },
      },
    }));
  };

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
                <Popover
                  open={dateStates[item.title][subitem]?.open ?? false}
                  onOpenChange={(open) =>
                    handleDateOpenChange(item.title, subitem, open)
                  }
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id={`date-${idx}-${subidx}`}
                      className="w-40 justify-between font-normal text-sm"
                    >
                      {dateStates[item.title][subitem]?.selected
                        ? dateStates[item.title][
                            subitem
                          ]?.selected?.toLocaleDateString()
                        : "选择日期"}
                      <ChevronDownIcon className="ml-2 size-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="single"
                      selected={
                        dateStates[item.title][subitem]?.selected ?? undefined
                      }
                      captionLayout="dropdown"
                      onSelect={(date) => {
                        handleDateSelect(item.title, subitem, date);
                        handleDateOpenChange(item.title, subitem, false);
                      }}
                    />
                  </PopoverContent>
                </Popover>
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
