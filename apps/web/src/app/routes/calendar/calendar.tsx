/** @format */

import Calendar from "@/features/calendar/calendar";

export function CalendarPage() {
  const events = [
    {
      start: new Date("2025-05-21T10:00:00"),
      end: new Date("2025-05-21T11:00:00"),
      title: "MRI Registration",
    },
    {
      start: new Date("2025-05-20T11:00:00"),
      end: new Date("2025-05-20T13:00:00"),
      title: "ENT Appointment",
    },
  ];
  return (
    <div className="flex h-full w-full flex-col">
      <Calendar events={events} />
    </div>
  );
}
