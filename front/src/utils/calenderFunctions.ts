// import moment from "moment";
import { DateTime } from "luxon";

export const getDayNumber = (day: string): number => {
    // switch (day) {
    //     case "lundi":
    //         return 1;
    //     case "mardi":
    //         return 2;
    //     case "mercredi":
    //         return 3;
    //     case "jeudi":
    //         return 4;
    //     case "vendredi":
    //         return 5;
    //     case "samedi":
    //         return 6;
    //     default:
    //         return 0;
    // }

    const dateTime = DateTime.fromISO(day);
    const dayNumber = dateTime.weekday - 1;
    return dayNumber;
};
export function topPosition(day: any, rowHeigth: number) {
    const dt = DateTime.fromISO(day);
    const hour = dt.hour;
    const minute = dt.minute;
    return rowHeigth * hour + (rowHeigth * minute) / 60;
}
export function changeOpacity(color: string, opacity: number): string {
    const rgbaValue = `rgba(${parseInt(color.slice(-6, -4), 16)}, ${parseInt(
        color.slice(-4, -2),
        16
    )}, ${parseInt(color.slice(-2), 16)}, ${opacity})`;
    return rgbaValue;
}

// export const getCurrentWeekDays = (date: Date) => {
//     // console.log("getCurrentWeekDays => ", date);

//     const currentDate = moment(date);
//     const startOfWeek = currentDate.startOf("isoWeek");
//     const weekDaysVar: string[] = [];
//     for (let i = 0; i < 7; i++) {
//         const day = startOfWeek.clone().add(i, "days");
//         const formattedDate = day.format("YYYY-MM-DD");
//         weekDaysVar.push(formattedDate);
//     }
//     const weekNumberVar = currentDate.week();
//     return { weekDaysVar, weekNumberVar };
// };
export const getCurrentWeekDays = (step: number) => {
    // const currentDate = new Date(date);
    // const startOfWeek = new Date(date);
    // let diff = currentDate.getDay();
    // diff = diff === 0 ? 6 : diff - 1;

    // startOfWeek.setDate(currentDate.getDate() - diff);
    // const weekDaysVar: string[] = [];
    // for (let i = 0; i < 7; i++) {
    //     const day = new Date(startOfWeek);
    //     day.setDate(startOfWeek.getDate() + i);
    //     const formattedDate = day.toISOString().split("T")[0];
    //     weekDaysVar.push(formattedDate);
    // }

    // const weekNumberVar = Math.floor((currentDate.getDate() - diff + 10) / 7);
    //---------------
    // console.log("day = ", DateTime.now().weekday);
    const dt = DateTime.fromObject({
        weekYear: DateTime.now().year,
        weekNumber: DateTime.now().weekNumber,
    });
    const dateFromStr = dt.startOf("week");
    let startDate = dateFromStr.plus({ weeks: step });
    const days = Array.from({ length: 7 }, (_, index) => {
        let today = startDate.plus({ days: index }).setLocale("fr");
        return {
            weekDay: today.toLocaleString({ weekday: "long" }),
            day: today.day,
        };
    });
    // console.log(days);
    return days;
    // const targetWeekStart = DateTime.local().set({ year:2024, week: weekNumber, weekday: 1 });

    // const days = Array.from({ length: 7 }, (_, index) =>
    //   targetWeekStart.plus({ days: index }).toFormat('MMMM dd, yyyy')
    // );
    // console.log(" days = ", days);

    // return { weekDaysVar: days, weekNumberVar: targetWeek };
    //---------------------

    // return { weekDaysVar, weekNumberVar };
};

// export const formatWeekDay = (
//     inputDate: string
// ): { capitalizedDayName: string; dayOfMonth: string } => {
//     const date = moment(inputDate);
//     const dayName = date.format("dddd"); // Get the full day name (e.g., "Monday")
//     const dayOfMonth = date.format("D"); // Get the day of the month without leading zeros (e.g., "13")

//     // Capitalize the day name
//     const capitalizedDayName =
//         dayName.charAt(0).toUpperCase() + dayName.slice(1);

//     return { capitalizedDayName, dayOfMonth };
// };
export const capitalize = (inputDate: string) => {
    return inputDate.charAt(0).toUpperCase() + inputDate.slice(1);
};

// export const getCalenderWeekSwitcher = (day:any) => {
//     const firstDate = moment()
//         .isoWeek(weekNumber)
//         .startOf("isoWeek")
//         .format("D MMM");

//     const lastDate = moment()
//         .isoWeek(weekNumber)
//         .endOf("isoWeek")
//         .format("D MMM YYYY");
//     return `${firstDate} - ${lastDate}`;
// };
export const getCalenderWeekSwitcher = (day: Date): string => {
    const currentDate = new Date(day);

    // Get the first day of the week (Monday) for the given date
    const firstDayOfWeek = new Date(currentDate);
    const diff = currentDate.getDay() - 1; // Calculate the difference to Monday
    firstDayOfWeek.setDate(currentDate.getDate() - diff);

    // Get the last day of the week (Sunday) for the given date
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    // Format the dates
    const options: Intl.DateTimeFormatOptions = {
        day: "numeric",
        month: "short",
    };
    const firstDate = firstDayOfWeek.toLocaleDateString("en-US", options);
    const lastDate = lastDayOfWeek.toLocaleDateString("en-US", options);

    return `${firstDate} - ${lastDate}`;
};

export function getWeekDates(date: Date) {
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay() + 1);

    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    return { firstDate: firstDayOfWeek, lastDate: lastDayOfWeek };
}

export function getFirstAndLastDayOfWeek(date: any) {
    // Get the start of the week (Monday) for the given date
    const startOfWeek = DateTime.fromJSDate(date).startOf("week");

    // Get the end of the week (Sunday) for the given date
    const endOfWeek = DateTime.fromJSDate(date).endOf("week");

    return {
        firstDayOfWeek: startOfWeek.toFormat("yyyy-MM-dd"),
        lastDayOfWeek: endOfWeek.toFormat("yyyy-MM-dd"),
    };
}
