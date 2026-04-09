import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";

dayjs.extend(relativeTime);

export interface ErrorResponseData {
  message: string | string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const transformError = (error: any): string => {
  if (error?.response?.data?.message) {
    const msg = error.response.data.message;
    return Array.isArray(msg) ? msg[0] : msg;
  }
  if (error?.response?.data?.error) {
    return error.response.data.error;
  }
  if (error?.message) {
    return error.message;
  }
  return "An error occurred";
};

export const formatAmount = (number: number): string => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};

export const formatAmountWithoutCurrency = (amount: number): string => {
  return amount?.toLocaleString("en-US", {});
};

export const formatTwoZerosToNumber = (amount: string) => {
  return parseInt(amount.split(".")[0] || "", 10);
};

export const formatCurrencyWithExtendedZeroes = (amount: string) => {
  return formatAmountWithoutCurrency(formatTwoZerosToNumber(amount));
};

export function formatAmountString(amountStr: string): string {
  if (typeof amountStr !== "string" || amountStr.trim() === "") {
    return "";
  }
  const cleanedStr = amountStr.replace(/[^0-9.-]+/g, "");
  const amountNum = parseFloat(cleanedStr);
  if (isNaN(amountNum)) {
    return amountStr;
  }
  const formatter = new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Format the number and return the result
  return formatter.format(amountNum);
}

export const getFormattedTimeAgoText = (date: string | undefined) => {
  if (!date) return "";
  return dayjs().to(dayjs(date));
};

export const getFormattedDate = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("DD MMM, YYYY");
};
export const getFormattedDateWithoutYear = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("dddd, DD MMM");
};
export const getFormattedDateWithoutYearShortDay = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("ddd, DD MMM");
};

export const getFormattedDayAlone = (date: Date | string) => {
  return dayjs(date ? date : new Date()).format("DD");
};

export const getFormattedDayMonthYear = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("YYYY-MM-DD");
};
export const getFormattedDayMonthYearSlash = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("YYYY/MM/DD");
};
export const getFormattedDayMonthYear2 = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("YYYY:MM:DD");
};

export const getFormattedHourMinSec = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("HH:mm:ss");
};

export const getFormattedHourMinAlone = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("HH:mm"); // 24:00
};
export const getFormattedHourMin = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("hh:mm a"); // 12:00 AM
};

export const getFormat24HoursTo12Hours = (date: string | null) => {
  if (!date) return "";
  const [hour, minute] = date.split(":");
  const hour12 = parseInt(hour, 10) % 12 || 12; // Convert to 12-hour format
  const ampm = parseInt(hour, 10) < 12 ? "AM" : "PM";
  return `${hour12}:${minute} ${ampm}`;
};

export const getFormattedDayMonthYearHourMinSec = (date: Date | null) => {
  if (!date) return "";
  return dayjs(date).format("D MMMM YYYY HH:mm a"); // 1 January 2021 12:00 AM
};

export const getAllSecondsInTime = (time: string) => {
  const [hours, minutes, seconds] = time.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

export const getStartOfWeek = (date: Date): Date => {
  const currentDate = new Date(date);
  const day = currentDate?.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  currentDate.setDate(currentDate.getDate() + diff);
  return currentDate;
};

export const getEndOfWeek = (startOfWeek: Date): Date => {
  const endOfWeek = new Date(startOfWeek);
  endOfWeek?.setDate(startOfWeek?.getDate() + 6);
  return endOfWeek;
};

export const isCurrentWeek = (startOfWeek: Date, endOfWeek: Date): boolean => {
  const currentStart = getStartOfWeek(new Date());
  const currentEnd = getEndOfWeek(currentStart);

  return (
    startOfWeek?.toDateString() === currentStart.toDateString() &&
    endOfWeek?.toDateString() === currentEnd.toDateString()
  );
};

export const formatElapsedTime = (seconds: number) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

//format is in string
export const getHoursAndMinute = (time: string) => {
  return time.split(":").slice(0, 2).join(":");
};

export function getNextDay(date: Date) {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return getFormattedDayMonthYear(nextDay);
}

export function getWeekDays(startDate: string, endDate: string) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const result = [];

  const ordinalSuffix = (day: number) => {
    if (day >= 11 && day <= 13) return `${day}`;
    return `${day}`;
  };

  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    result.push({
      day: d.toLocaleDateString("en-US", { weekday: "short" }), // "Mon"
      date: ordinalSuffix(d.getDate()), // "23rd"
      month: d.toLocaleDateString("en-US", { month: "short" }), // "Dec"
    });
  }

  return result;
}

export const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        resolve(reader.result); // includes the data:... prefix
      } else {
        reject("Failed to convert blob to base64");
      }
    };

    reader.onerror = reject;

    reader.readAsDataURL(blob);
  });
};

export function getHourFromTime(timeString: string) {
  if (!timeString || typeof timeString !== "string") {
    return null;
  }
  const hourPart = timeString.split(":")[0];
  const hour = parseInt(hourPart, 10);
  return isNaN(hour) ? null : hour;
}
