export function createAppointmentDateTime(dateString: any, timeString: any) {
    // Parse the input date string (assumed format: "dd-mm-yyyy")
    const [year, month, day] = dateString.split("-");
    const parsedDate = new Date(`${year}-${month}-${day}`);

    // Parse the input time string (assumed format: "hh:mm")
    const [hours, minutes] = timeString.split(":");
    parsedDate.setUTCHours(hours);
    parsedDate.setUTCMinutes(minutes);

    // Format the date-time string in UTC
    const formattedDateTime = parsedDate.toISOString().replace("Z", "");

    return formattedDateTime;
}
// export function reverseAppointmentDateTime(formattedDateTime: string) {
//     // Parse the formatted date-time string
//     const parsedDate = new Date(formattedDateTime);

//     // Extract year, month, and day
//     const year = parsedDate.getFullYear();
//     const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
//     const day = parsedDate.getDate().toString().padStart(2, "0");

//     // Extract hours and minutes in UTC
//     const hours = parsedDate.getUTCHours().toString().padStart(2, "0");
//     const minutes = parsedDate.getUTCMinutes().toString().padStart(2, "0");

//     // Create an object with date and time properties
//     const reversedDateTime = {
//         date: `${year}-${month}-${day}`,
//         time: `${hours}:${minutes}`,
//     };

//     return reversedDateTime;
// }
export function reverseAppointmentDateTime(formattedDateTime: string) {
    // Parse the formatted date-time string
    const parsedDate = new Date(formattedDateTime);

    // Extract year, month, and day
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, "0");
    const day = parsedDate.getDate().toString().padStart(2, "0");

    // Extract local hours and minutes
    const hours = parsedDate.getHours().toString().padStart(2, "0");
    const minutes = parsedDate.getMinutes().toString().padStart(2, "0");

    // Create an object with date and time properties
    const reversedDateTime = {
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`,
    };

    return reversedDateTime;
}
