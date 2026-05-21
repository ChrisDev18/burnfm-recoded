"use client";

import {AccordionRoot, AccordionContent, AccordionItem} from "@/components/Accordion";
import {ReactNode} from "react";
import Link from "next/link";

function QuestionHeader({ children }: { children: ReactNode }) {
  return (
      <h3 className="text-xl font-semibold -mx-2 px-2 mb-4 pb-2 border-b-2 border-purple text-alt-purple">
        {children}
      </h3>
  )
}

export default function FaqPage() {
  return (
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-12 py-16 font-sans space-y-8">
        <h1 className="text-3xl font-bold mb-18 text-center text-foreground">
          Frequently Asked Questions
        </h1>

        <AccordionRoot>
          {/* Radio Section */}
          <AccordionItem value="radio" header="Hosting a Show">
            <AccordionContent className="space-y-8">
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
                    (<a href={"http://www.instagram.com/burn_fm"}
                        className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                    @burn_fm</a>) and on emails sent out to members and those who registered interest.
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
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="team-shows" header="Taking part in a Team Show">
            <AccordionContent className="space-y-8">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: What are Team Shows?
                </QuestionHeader>

                <p>
                  Team Shows let anyone in Burn to take part in a chill, collaborative show on air. They're led by the
                  head and deputy heads of Music, News, Arts, and Sport.
                </p>

                <p>
                  Anyone can join a team show, and you can come one week and not the next; it's up to you!
                </p>

                <p>
                  To hear what usually happens on air for each
                  show, the best thing to do is listen to a previous episode from the team show you are interested
                  in. <Link href={"/shows?filter=committee"}
                            className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                  Find the team shows here</Link>.
                </p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: How do I take part in a team show?
                </QuestionHeader>

                <p>
                  Taking part on a Team Show is as simple as showing up at the studio an hour before they go on air.
                </p>

                <p>
                  We suggest you request to join the team's group chat on the Burn FM WhatsApp community.
                </p>

                <p>
                  You can also message the respective Instagram account for the show you want to join:
                </p>

                <p><a href={"http://www.instagram.com/burnfmmusic"}
                      className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>@burnfmmusic</a> | <a href={"http://www.instagram.com/burnfmsports"}
                                                                                                               className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>@burnfmsports</a> | <a href={"http://www.instagram.com/burnfmnews"}
                                                                                                                className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>@burnfmnews</a> | <a href={"http://www.instagram.com/burnfmarts"}
                                                                                                              className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>@burnfmarts</a></p>
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
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Podcasting Section */}
          <AccordionItem value="podcasting" header="Running a Podcast">
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
                  <li className="pl-2">Once released, the link can usually be found on our Instagram (<a href={"http://www.instagram.com/burn_fm"}
                                                                                                         className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                    @burn_fm</a>) and on emails sent out to members and those who registered interest.</li>
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
                <p>Make sure to follow the Burn Podcasts instagram (<a href={"http://www.instagram.com/burnfmpodcasts"}
                                                                       className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                  @burnfmpodcasts</a>) and join the Podcasts group chat on the Burn FM WhatsApp Community.</p>
                <p>Once you’ve recorded your podcast in our studio, you’ll send it to the head of podcasting who will then check it over and post it on Spotify and Apple Podcasts.</p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/*/!* Voice Recording Section *!/*/}
          {/*<AccordionItem value="voice-recording" header="I’m interested in Voice Recording / Audio Editing...">*/}
          {/*  <AccordionContent className="space-y-8">*/}
          {/*    <p>*/}
          {/*      As time has gone by, we’ve noticed an increased interest in the actual act of recording spoken audio*/}
          {/*      and editing it. This year, we are hoping to provide more options to make exploring this passion easier*/}
          {/*      for you.*/}
          {/*    </p>*/}

          {/*    <div>*/}
          {/*      <QuestionHeader>*/}
          {/*        Q: What recording/editing opportunities are there?*/}
          {/*      </QuestionHeader>*/}
          {/*      <ul className="list-disc pl-6">*/}
          {/*        <li>*/}
          {/*          We are aiming to provide time slotted access to the recording studio for people who don't want to*/}
          {/*          do a podcast or radio show.*/}
          {/*        </li>*/}
          {/*        <li>*/}
          {/*          You can also contribute to other shows and podcasts by producing stingers or bumpers.*/}
          {/*        </li>*/}
          {/*      </ul>*/}
          {/*    </div>*/}
          {/*  </AccordionContent>*/}
          {/*</AccordionItem>*/}

          {/* Socials and Events */}
          <AccordionItem value="socials" header="Socials and Events">
            <AccordionContent className="space-y-8 pt-2">
              <div className="space-y-2">
                <QuestionHeader>
                  Q: What socials and events does Burn FM do?
                </QuestionHeader>

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
                  the hardware/software, and meet other members. Keep an eye on our Instagram (<a href={"http://www.instagram.com/burn_fm"}
                                                                                                  className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                  @burn_fm</a>)
                  and shared calendar for dates.
                </p>
              </div>

              <div className="space-y-2">
                <QuestionHeader>
                  Q: When's the next social?
                </QuestionHeader>

                <p>
                  We post all our coming up socials on our Instagram (<a href={"http://www.instagram.com/burn_fm"}
                                                                         className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                  @burn_fm</a>), and make an announcement on our WhatsApp Community.
                </p>

                <p>
                  You can also find all planned events on our <Link href={"/calendar"}
                                                                    className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
                  Burn Calendar</Link>.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </AccordionRoot>

        <div className="px-6 space-y-2">
          <QuestionHeader>
            Q: What can I do at Burn FM?
          </QuestionHeader>
          <p>Burn FM gives you the chance to:</p>
          <ul className="list-disc pl-6">
            <li>Host your own weekly show (alone or with friends).</li>
            <li>Join one (or more) of our team shows to host a weekly show in a group.</li>
            <li>Run your own podcast alone or with friends.</li>
          </ul>
          <p>
            If you are unsure of a good show idea or feel less confident, the team shows are a great way to get
            to know more people in the society, as well as an opportunity to get more comfortable live on air in
            a no pressure environment.
          </p>
          <p>
            We have four team shows: Sport, Arts, Music and News. So whatever you’re interested in, we've got something for you.
          </p>
        </div>

        <div className="px-6 space-y-2">
          <QuestionHeader>
            Q: How do I join the WhatsApp Community?
          </QuestionHeader>

          <p>The QR code to join is on the wall in the studio! Simply scan it with your phone and join the community.</p>

          <p>To prevent bots and external people from posting spam, we can't post the link to join on the website or our socials.</p>
        </div>

        <div className="mx-6 space-y-4 pt-2">
          <QuestionHeader>
            Q: How can I run for committee? (AGMs & EGMs)
          </QuestionHeader>
          <p>
            We announce AGMs (Annual General Meetings) and EGMs (Extraordinary General Meetings) on our
            Instagram (<a href={"http://www.instagram.com/burn_fm"}
                          className={`text-alt-purple transition-colors border-b-2 focus-visible:outline-2 
                        focus-visible:outline-alt-purple focus-visible:outline-offset-4
                        hover:text-alt-purple hover:border-alt-purple hover:border-b-4`}>
            @burn_fm</a>) and on the WhatsApp.
          </p>

          <p>
            To stand for a position, you simply need to be a paid member and be present at the meeting.
            Decide which role you’d like to run for and be ready to give a short speech (around 30 seconds to
            1 minute) about why you’d be a good fit.
          </p>

          <p>
            All members present at the meeting will vote after each person has done their speech.
          </p>
        </div>
      </div>
  );
}