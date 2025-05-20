/** @format */

import { format, getDay, parse, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import {
  Calendar as BigCalendar,
  type CalendarProps,
  dateFnsLocalizer,
} from "react-big-calendar";

function Calendar(props: Omit<CalendarProps, "localizer">) {
  return (
    <BigCalendar
      {...props}
      localizer={localizer}
      style={{ height: "100%", width: "100%" }}
    />
  );
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: de,
});

export default Calendar;
