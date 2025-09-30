"use client";

import * as Accordion from "@radix-ui/react-accordion";
import {LucideChevronRight} from "lucide-react";
import { ReactNode } from "react";

function QuestionHeader({ children }: { children: ReactNode }) {
  return (
      <h3 className="text-xl font-semibold -mx-2 px-2 mb-4 pb-2 border-b-2 border-purple text-alt-purple">
        {children}
      </h3>
  )
}

export default function FaqPage() {
  return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-12 py-16 font-sans">
        <h1 className="text-3xl font-bold mb-18 text-center text-foreground">
          Frequently Asked Questions
        </h1>

        <Accordion.Root type="single" collapsible className="w-full space-y-3">
          {/* Radio Section */}
          <Accordion.Item value="radio" className="border border-alt-purple/30 bg-white dark:bg-tertiary">
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
                I’m interested in Radio...
                <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 py-6 space-y-8 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: What radio opportunities are there?
                </QuestionHeader>
                <p>We offer two ways to do radio:</p>
                <ul className="list-disc pl-6">
                  <li>Hosting your own weekly show (alone or with friends).</li>
                  <li>Joining one of our radio show teams to help host a weekly show in a group.</li>
                </ul>
                <p>If you are unsure of a good show idea or feel less confident, we suggest trying out a radio show team. It’s a great way to meet people in the society and gain experience on air.</p>
                <p>We also usually offer taster sessions at the beginning of the year (similar to the Give-It-A-Go fair). Check our Instagram account (<strong>@burn_fm</strong>) and shared calendar to check when these are.</p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I apply?
                </QuestionHeader>
                <p className="opacity-75 italic">The following is the same for whatever you apply for</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-2">At the start of each semester we open up applications for each division of Burn. These applications are usually open for one or two weeks.</li>
                  <li className="pl-2">Once released, the link (and its deadlines) can usually be found on our Instagram (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.</li>
                  <li className="pl-2">Once your application has been approved, you will receive an email from the Head of Programming. We will send out the timetable so you can see when your new show or chosen team show is.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: What do I need to do after I've been accepted?
                </QuestionHeader>

                <p>You first need to make sure you have purchased a membership. This will be checked when you come to host your show for the first time, and if you are part of a team show, it's needed to add you to the team's WhatsApp group chat.</p>
                <p>You also need to book a slot for our media training. This will only take around 15 minutes and just lets you know all the important rules and guidance for being on air as well as how to use the equipment.</p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How does running a show work?
                </QuestionHeader>

                <p>Once you have bought your membership and done training, you can come in to do your show!</p>
                <p>Often you may need to prepare music playlists for your show. Arrive at the studio around 30 minutes before to get that prepared on our secondary "Selly Studio" computer.</p>
                <p>Once the previous person has wrapped up their show, you can go in to get ready. Ideally there will be a couple songs playing to bridge the gap, but don't worry if there's silence before your show.</p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How does joining a team show work?
                </QuestionHeader>

                <p>Once you have bought your membership, you can be added to the team's group chat. And once you have done training, you can come in to help out on the team's show!</p>
                <p className="opacity-75 italic">To be completed</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Podcasting Section */}
          <Accordion.Item value="podcasting" className="border border-alt-purple/30 bg-white dark:bg-tertiary">
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
                I’m interested in Podcasting...
                <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 py-4 space-y-8 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I apply?
                </QuestionHeader>
                <p className="opacity-75 italic">The following is the same for whatever you apply for</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-2">At the start of each semester we open up applications for each division of Burn. These applications are usually open for one or two weeks.</li>
                  <li className="pl-2">Once released, the link (and its deadlines) can usually be found on our Instagram (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.</li>
                  <li className="pl-2">Once your application has been approved, you will receive an email from the Head of Podcasting.</li>
                </ol>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: What do I need to do after I've been accepted?
                </QuestionHeader>
                <p>To begin your podcast, you will need to have purchased a membership from our Guild of Students society page. This will be checked when you come to your assigned timeslot for the first time.</p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How does running a podcast work?
                </QuestionHeader>
                <p>Running a podcast is really fun and flexible! You don’t have to record every week if you don’t want to, and, as long as it fits the Guild guidelines, you can talk about what you want.</p>
                <p>Once your show is approved, you will be contacted by the Head of Podcasting to arrange a time for a short training session. There will also be a group chat or a spreadsheet to help coordinate recording times for different podcasts.</p>
                <p>Once you’ve recorded your podcast in our studio, you’ll send it to the head of podcasting who will then check it over and post it on Spotify and Apple Podcasts.</p>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Voice Recording Section */}
          <Accordion.Item value="voice-recording" className="border border-alt-purple/30 bg-white dark:bg-tertiary">
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
                I’m interested in Voice Recording / Audio Editing...
                <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pt-4 pb-6 space-y-8 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <p>As time has gone by, we’ve noticed an increased interest in the actual act of recording spoken audio and editing it. This year, we are hoping to provide more options to make exploring this passion easier for you.</p>
              <div>
                <QuestionHeader>
                  Q: What recording/editing opportunities are there?
                </QuestionHeader>
                <ul className="list-disc pl-6">
                  <li>We are aiming to provide time slotted access to the recording studio for people who don't want to do a podcast or radio show.</li>
                  <li>You can also contribute to other shows and podcasts by producing stingers or bumpers.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I apply?
                </QuestionHeader>
                <p className="opacity-75 italic">The following is the same for whatever you apply for</p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-2">At the start of each semester we open up applications for each division of Burn. These applications are usually open for one or two weeks.</li>
                  <li className="pl-2">Once released, the link (and its deadlines) can usually be found on our Instagram (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.</li>
                  <li className="pl-2">Once your application has been approved, you will receive an email from the Head of Podcasting. We will send out the timetable so you can see when your timeslot is.</li>
                </ol>
              </div>
            </Accordion.Content>
          </Accordion.Item>

          {/* Socials and Events */}
          <Accordion.Item value="socials" className="border border-alt-purple/30 bg-white dark:bg-tertiary">
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
                What socials and events does Burn FM do?
                <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pt-4 pb-6 space-y-4 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <p>Burn FM isn’t just about broadcasting - we love a good party too! Throughout the year we aim to host a range of socials and big events, including:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li><strong>Burn Live</strong> – A night of live music (usually at The Indie Lounge) in aid of charity, featuring performances from local groups.</li>
                <li><strong>Pub Quizzes</strong> – A more relaxed evening to chat and meet other Burn members - and test your trivia!</li>
                <li><strong>Pub Crawls</strong> – A fun night out to meet other Burn members and have fun hopping between different spots.</li>
                <li><strong>Media Ball</strong> – A joint ball organised between fellow media societies like Guild TV and Redbrick newspaper.</li>
                <li><strong>Burn Awards Ceremony</strong> – Our end-of-year celebration where we recognise outstanding shows, presenters, and contributors.</li>
              </ul>
              <p>We also run taster sessions at the beginning of the year, where you can come and see the studio, try the hardware/software, and meet other members. Keep an eye on our Instagram (<strong>@burn_fm</strong>) and shared calendar for dates.</p>
            </Accordion.Content>
          </Accordion.Item>

          {/* AGMs and EGMs */}
          <Accordion.Item value="meetings" className="border border-alt-purple/30 bg-white dark:bg-tertiary">
            <Accordion.Header>
              <Accordion.Trigger className="group w-full flex items-center justify-between px-6 py-3 text-left text-xl font-semibold text-foreground/90 focus-visible:outline-none hover:bg-tertiary-hover active:bg-tertiary-active transition-colors">
                How can I run for committee? (AGMs & EGMs)
                <LucideChevronRight className="transition-transform duration-200 ease-in-out group-data-[state=open]:rotate-90 text-foreground/70" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="px-6 pt-4 pb-6 space-y-4 text-foreground/80 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <p>
                We announce AGMs (Annual General Meetings) and EGMs (Extraordinary General Meetings) on our
                Instagram (<span className="font-semibold">@burn_fm</span>) and on the WhatsApp.
              </p>

              <p>
                To stand for a position, you simply need to be a paid member and be present at the meeting.
                Decide which role you’d like to run for and be ready to give a short speech (around 30 seconds to
                1 minute) about why you’d be a good fit.
              </p>

              <p>
                All members present at the meeting will vote after each person has done their speech.
              </p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion.Root>
      </div>
  );
}