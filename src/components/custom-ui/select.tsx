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
    <div className="in-last:border-b-2">
      {/* date */}
      {selectParams.date?.map((item, idx) => (
        <div key={idx} className="flex gap-20 items-center p-3.5 border-t-2">
          <div className="w-18">{item.title}</div>
          <div className="flex gap-15">
            {item.options.map((subitem, subidx) => (
              <div className="flex gap-1" key={subidx}>
                <Label htmlFor={`date-${idx}`} className="px-1">
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
                      id={`date-${idx}`}
                      className="w-48 justify-between font-normal"
                    >
                      {dateStates[item.title][subitem]?.selected
                        ? dateStates[item.title][
                            subitem
                          ]?.selected?.toLocaleDateString()
                        : "Select date"}
                      <ChevronDownIcon />
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

      {/* checkbox */}
      {selectParams.check.map((item, idx) => (
        <div key={idx} className="flex gap-20 items-center p-3.5 border-t-2">
          <div className="w-18 justify-center">{item.title}</div>
          <div className="flex gap-15">
            {item.options.map((subitem, subidx) => (
              <div className="flex gap-1" key={subidx}>
                <Label htmlFor={subitem} className="px-1">
                  {subitem}
                </Label>
                <Checkbox
                  id={subitem}
                  checked={checkStates[item.title][subitem]}
                  onCheckedChange={(e: boolean) =>
                    handleCheckboxChange(item.title, subitem, e)
                  }
                  className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
