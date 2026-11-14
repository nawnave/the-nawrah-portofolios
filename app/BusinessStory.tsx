
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const question = 'WHAT MAKES A STRATEGY WORK?';

const perspective =
  "Great strategies don't end with ideas. They begin with understanding, take shape through decisions, and create value through execution. My ambition is to connect analytical thinking with practical action, helping transform complex business challenges into clear, impactful solutions.";

export default function BusinessStory() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.set('.business-question', {
        autoAlpha: 1,
      });

      gsap.set('.business-question-word', {
        opacity: 0.12,
        y: 18,
      });

      gsap.set('.business-perspective', {
        autoAlpha: 0,
        y: 35,
      });

      gsap.set('.business-perspective-word', {
        opacity: 0.12,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.business-story',
          start: 'top top',
          end: '+=2400',
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Question appears word by word
      tl.to('.business-question-word', {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.18,
        ease: 'none',
      });

      // Hold question
      tl.to({}, { duration: 0.45 });

      // Question disappears
      tl.to('.business-question', {
        autoAlpha: 0,
        y: -35,
        duration: 0.5,
      });

      // Perspective appears
      tl.to('.business-perspective', {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
      });

      // Perspective words reveal
      tl.to('.business-perspective-word', {
        opacity: 1,
        duration: 0.18,
        stagger: 0.055,
        ease: 'none',
      });

      // Hold perspective
      tl.to({}, { duration: 0.7 });

      // Perspective exits
      tl.to('.business-perspective', {
        autoAlpha: 0,
        y: -30,
        duration: 0.4,
      });

      gsap.fromTo(
        '.business-explore-content',
        { autoAlpha: 0, y: 45 },
        {
          autoAlpha: 1,
          y: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: '.business-explore',
            start: 'top 85%',
            end: 'top 40%',
            scrub: 0.5,
          },
        }
      );
    }, element);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="business-story-root">
      <section className="business-story">
        <div className="business-question">
          <p className="business-label">THE QUESTION</p>

          <h2 className="business-display">
            {question.split(' ').map((word, i) => (
              <span className="business-question-word" key={i}>
                {word}{' '}
              </span>
            ))}
          </h2>
        </div>

        <div className="business-perspective">
          <p className="business-label">MY PERSPECTIVE</p>

          <p className="business-display business-vision">
            {perspective.split(' ').map((word, i) => (
              <span className="business-perspective-word" key={i}>
                {word}{' '}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="business-explore">
        <div className="business-explore-content">
          <p className="business-label">BEYOND STRATEGY</p>

          <h2 className="business-display">
            EXPLORE MY WORK
          </h2>
        </div>
      </section>
    </div>
  );
}
