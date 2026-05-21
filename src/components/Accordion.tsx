import {ReactNode} from "react";
import * as Accordion from "@radix-ui/react-accordion";
import {LucideChevronRight} from "lucide-react";
import {twMerge} from "tailwind-merge";

export function AccordionRoot({ children }: { children: ReactNode }) {
  return (
      <Accordion.Root type="single" collapsible className="w-full space-y-3">
        { children }
      </Accordion.Root>
  )
}

export function AccordionItem({value, header, children }: { value: string, header: string, children: ReactNode }) {
  return (
      <Accordion.Item value={value} className="border border-alt-purple/30 bg-white dark:bg-tertiary">
        <Accordion.Header>
          <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
            { header }
            <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
          </Accordion.Trigger>
        </Accordion.Header>

        { children }
      </Accordion.Item>
  )
}

export function AccordionContent({children, className}: { children: ReactNode, className?: string }) {
  return (
      <Accordion.Content className={twMerge("px-6 pb-6 pt-4 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp", className)}>
        { children }
      </Accordion.Content>
  )
}