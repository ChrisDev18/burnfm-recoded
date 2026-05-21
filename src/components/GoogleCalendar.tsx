import {twMerge} from "tailwind-merge";

export default function GoogleCalendar({ className }: { className?: string }) {
  return (
      <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=2&ctz=Europe%2FLondon&mode=AGENDA&hl=en_GB&title=Burn%20FM%20Calendar&showPrint=0&showCalendars=0&showTitle=0&src=NzUzZjQwNzdjOTZhMWIwNGE5YzUzNTNhMTkxMTgzMTEyMjIwNDMwYjJjYmVmOTliOTFjMmZjZDY4NTEzM2VjOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%238e24aa"
          className={twMerge(`w-full min-h-[600px] grow`, className)}>
      </iframe>
  )
}