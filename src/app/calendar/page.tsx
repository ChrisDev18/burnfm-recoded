import GoogleCalendar from "@/components/GoogleCalendar";

export default function CalendarPage() {
  return (
      <div className="flex flex-col w-full font-sans p-4 sm:p-8">
        <GoogleCalendar className={"grow w-full border-1 border-purple/75"} />
      </div>
  )
}