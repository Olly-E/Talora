"use client";

import React from "react";
import { getEndOfWeek, getFormattedDayMonthYear, getStartOfWeek } from "../utils/utils";

export const useDateHook = () => {
  const [selectDate, setSelectDate] = React.useState<Date>(new Date());
  const [weekInterval, setWeekInterval] = React.useState<{
    startOfWeek: Date;
    endOfWeek: Date;
  }>(() => {
    const start = getStartOfWeek(new Date());
    return { startOfWeek: start, endOfWeek: getEndOfWeek(start) };
  });

  const weekDateArray = () => {
    const start = new Date(weekInterval.startOfWeek);
    const end = new Date(weekInterval.endOfWeek);
    const dates: string[] = [];
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      dates.push(getFormattedDayMonthYear(new Date(d)));
    }
    return dates;
  };


  const handleIncreaseDate = () => {
    setSelectDate((prevDate) => {
      const nextDate = new Date(prevDate);
      nextDate.setDate(nextDate.getDate() + 1);
      return nextDate;
    });
  };

  const handleDecreaseDate = () => {
    setSelectDate((prevDate) => {
      const prevDateCopy = new Date(prevDate);
      prevDateCopy.setDate(prevDateCopy.getDate() - 1);
      return prevDateCopy;
    });
  };

  const handleIncreaseWeek = () => {
    setWeekInterval((prev) => {
      const nextStartOfWeek = new Date(prev.startOfWeek);
      nextStartOfWeek.setDate(prev.startOfWeek.getDate() + 7);
      return {
        startOfWeek: nextStartOfWeek,
        endOfWeek: getEndOfWeek(nextStartOfWeek),
      };
    });
  };

  const handleDecreaseWeek = () => {
    setWeekInterval((prev) => {
      const previousStartOfWeek = new Date(prev.startOfWeek);
      previousStartOfWeek.setDate(prev.startOfWeek.getDate() - 7);
      return {
        startOfWeek: previousStartOfWeek,
        endOfWeek: getEndOfWeek(previousStartOfWeek),
      };
    });
  };

  const handleGoToThisWeek = () => {
    setWeekInterval(() => {
      const startOfWeek = getStartOfWeek(new Date());
      return {
        startOfWeek,
        endOfWeek: getEndOfWeek(startOfWeek),
      };
    });
  };

  const handleGotoToday = () => {
    setSelectDate(new Date());
  };

  return {
    weekDateArray,
    selectDate,
    setSelectDate,
    weekInterval,
    setWeekInterval,
    handleIncreaseDate,
    handleDecreaseDate,
    handleIncreaseWeek,
    handleDecreaseWeek,
    handleGoToThisWeek,
    handleGotoToday,
  };
};
