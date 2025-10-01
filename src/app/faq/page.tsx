"use client";

import {AccordionRoot, AccordionContent, AccordionItem} from "@/components/Accordion";
import {ReactNode} from "react";

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

        <AccordionRoot>
          {/* Radio Section */}
          <AccordionItem value="radio" header="I’m interested in Radio...">
            <AccordionContent className="space-y-8">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: What radio opportunities are there?
                </QuestionHeader>
                <p>We offer two ways to do radio:</p>
                <ul className="list-disc pl-6">
                  <li>Hosting your own weekly show (alone or with friends).</li>
                  <li>Joining one of our team shows to host a weekly show in a group.</li>
                </ul>
                <p>
                  If you are unsure of a good show idea or feel less confident, the team shows are a great way to get
                  to know more people in the society, as well as an opportunity to get more comfortable live on air in
                  a no pressure environment.
                </p>
                <p>
                  We have four team shows: Sport, Arts, Music and News. So whatever you’re interested in, we've got something for you.
                </p>
                {/*<p>*/}
                {/*  We also usually offer taster sessions at the beginning of the year (similar to the Give-It-A-Go fair).*/}
                {/*  Check our Instagram account (<strong>@burn_fm</strong>) and shared calendar to check when these are.*/}
                {/*</p>*/}
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I apply to host my own show?
                </QuestionHeader>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-2">
                    At the start of each semester we open up applications new shows.
                    These applications are usually open for one or two weeks.
                  </li>
                  <li className="pl-2">
                    Once released, the link (and its deadlines) can usually be found on our Instagram
                    (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.
                  </li>
                  <li className="pl-2">
                    Once your application has been approved, you will receive an email from the Head of Programming.
                    We will send out the timetable so you can see when your new show is.
                  </li>
                  <li className="pl-2">
                    You'll be asked to book a slot on our media training. This will only take around 15 minutes and just
                    lets you know all the important rules and guidance for being on air as well as how to use the equipment.
                  </li>
                  <li className="pl-2">
                    Finally, make sure you have bought a membership. This will be checked when you come to host your show
                    for the first time.
                  </li>
                </ol>
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
                  Q: How do I join a team show?
                </QuestionHeader>

                <p>
                  Simply request to join the WhatsApp group chat for the team show that interests you via our WhatsApp
                  community, and an admin will let you in.
                </p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: What happens once I've joined a team show?
                </QuestionHeader>
                <p>
                  Once you're on the group chat for a team show, you can join the weekly discussions prior to each show
                  about what will be covered and who can attend. Typically the head and deputy head of those shows
                  are there every week so there is always people to chat too!
                </p>
                <p>
                  You can also follow each team's Instagram page to keep updated with the latest things happening to do
                  with that show: @burnfmmusic @burn_arts @burnfmnews @burnfm_sport
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Podcasting Section */}
          <AccordionItem value="podcasting" header="I’m interested in Podcasting...">
            <AccordionContent className="space-y-8">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I apply?
                </QuestionHeader>
                <ol className="list-decimal pl-6 space-y-2">
                  <li className="pl-2">
                    At the start of each semester we open up applications. For podcasting,
                    the applications have no deadline, remaining open throughout the term.
                  </li>
                  <li className="pl-2">Once released, the link can usually be found on our Instagram (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.</li>
                  <li className="pl-2">Once your application has been approved, you will receive an email from the Head of Podcasting.</li>
                  <li className="pl-2">
                    To begin your podcast, you will need to have purchased a membership from our Guild of Students society page. This will be checked when you come to your assigned timeslot for the first time.
                  </li>
                </ol>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How does running a podcast work?
                </QuestionHeader>
                <p>Running a podcast is really fun and flexible! You don’t have to record every week if you don’t want to, and, as long as it fits the Guild guidelines, you can talk about what you want.</p>
                <p>Once your show is approved, you will be contacted by the Head of Podcasting to arrange a time for a short training session. There will also be a group chat or a spreadsheet to help coordinate recording times for different podcasts.</p>
                <p>Once you’ve recorded your podcast in our studio, you’ll send it to the head of podcasting who will then check it over and post it on Spotify and Apple Podcasts.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Voice Recording Section */}
          <AccordionItem value="voice-recording" header="I’m interested in Voice Recording / Audio Editing...">
            <AccordionContent className="space-y-8">
              <p>
                As time has gone by, we’ve noticed an increased interest in the actual act of recording spoken audio
                and editing it. This year, we are hoping to provide more options to make exploring this passion easier
                for you.
              </p>

              <div>
                <QuestionHeader>
                  Q: What recording/editing opportunities are there?
                </QuestionHeader>
                <ul className="list-disc pl-6">
                  <li>
                    We are aiming to provide time slotted access to the recording studio for people who don't want to
                    do a podcast or radio show.
                  </li>
                  <li>
                    You can also contribute to other shows and podcasts by producing stingers or bumpers.
                  </li>
                </ul>
              </div>

              {/*<div className="space-y-2">*/}
              {/*  <QuestionHeader>*/}
              {/*    Q: How do I apply?*/}
              {/*  </QuestionHeader>*/}
              {/*  <p className="opacity-75 italic">The following is the same for whatever you apply for</p>*/}
              {/*  <ol className="list-decimal pl-6 space-y-2">*/}
              {/*    <li className="pl-2">*/}
              {/*      At the start of each semester we open up applications for each division of Burn.*/}
              {/*      These applications are usually open for one or two weeks.*/}
              {/*    </li>*/}
              {/*    <li className="pl-2">*/}
              {/*      Once released, the link (and its deadlines) can usually be found on our Instagram*/}
              {/*      (<strong>@burn_fm</strong>) and on emails sent out to members and those who registered interest.*/}
              {/*    </li>*/}
              {/*    <li className="pl-2">*/}
              {/*      Once your application has been approved, you will receive an email from the Head of Podcasting.*/}
              {/*      We will send out the timetable so you can see when your timeslot is.*/}
              {/*    </li>*/}
              {/*  </ol>*/}
              {/*</div>*/}
            </AccordionContent>
          </AccordionItem>

          {/* Socials and Events */}
          <AccordionItem value="socials" header="What socials and events does Burn FM do?">
            <AccordionContent className="space-y-4 pt-2">
              <p>
                Burn FM isn’t just about broadcasting - we love a good party too! Throughout the year we aim to host a
                range of socials and big events, including:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>
                  <strong>Burn Live</strong> – A night of live music (usually at The Indie Lounge) in aid of charity,
                  featuring performances from local groups.
                </li>
                <li>
                  <strong>Pub Quizzes</strong> – A more relaxed evening to chat and meet other Burn members - and test
                  your trivia!
                </li>
                <li>
                  <strong>Pub Crawls</strong> – A fun night out to meet other Burn members and have fun hopping between
                  different spots.
                </li>
                <li>
                  <strong>Media Ball</strong> – A joint ball organised between fellow media societies like Guild TV and
                  Redbrick newspaper.
                </li>
                <li>
                  <strong>Burn Awards Ceremony</strong> – Our end-of-year celebration where we recognise outstanding
                  shows, presenters, and contributors.
                </li>
              </ul>
              <p>
                We also run taster sessions at the beginning of the year, where you can come and see the studio, try
                the hardware/software, and meet other members. Keep an eye on our Instagram (<strong>@burn_fm</strong>)
                and shared calendar for dates.
              </p>
            </AccordionContent>
          </AccordionItem>

          {/* AGMs and EGMs */}
          <AccordionItem value="meetings" header="How can I run for committee? (AGMs & EGMs)">
            <AccordionContent className="space-y-4 pt-2">
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
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>
      </div>
  );
}