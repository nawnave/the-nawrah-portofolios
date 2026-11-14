
'use client';

import { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const YEAR = 'Portofolio 2026';
const NAME = 'Nawrah Qanita Irfan';

const SKILLS = [
  {
    label: 'Business Strategy',
    position: 'upper-left',
    side: 'left',
  },
  {
    label: 'Brand Growth',
    position: 'upper-right',
    side: 'right',
  },
  {
    label: 'Event Marketing',
    position: 'lower-left',
    side: 'left',
  },
  {
    label: 'Consumer Insights',
    position: 'lower-right',
    side: 'right',
  },
] as const;

type BubbleProps = {
  side: 'left' | 'right';
  className?: string;
  children: ReactNode;
  style?: CSSProperties;
};

function Bubble({
  side,
  className = '',
  children,
  style,
}: BubbleProps) {
  return (
    <div
      className={`bubble bubble-${side} ${className}`}
      style={style}
    >
      <div className="bubble-surface">
        <div className="bubble-blue-layer" />
      </div>

      <span className="bubble-tail">
        <span className="bubble-tail-blue" />
      </span>

      <div className="bubble-content">
        {children}
      </div>
    </div>
  );
}

function TypingDots({
  className = '',
}: {
  className?: string;
}) {
  return (
    <span
      className={`typing-dots ${className}`}
      aria-hidden="true"
    >
      <i />
      <i />
      <i />
    </span>
  );
}

export default function Home() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = root.current;
    if (!node) return;

    let scrollTimeline: gsap.core.Timeline | null = null;

    const ctx = gsap.context(() => {
      const yearElement =
        node.querySelector<HTMLElement>('.opening-year');

      const nameElement =
        node.querySelector<HTMLElement>('.opening-name');

      if (!yearElement || !nameElement) return;

      yearElement.textContent = '';
      nameElement.textContent = '';

      const nameCounter = { value: 0 };

      // INITIAL STATES
      gsap.set('.opening-bubble', {
        autoAlpha: 0,
        scale: 0.88,
        width: 110,
        height: 62,
      });

      gsap.set('.opening-copy', {
        autoAlpha: 0,
      });

      gsap.set('.opening-year', {
        opacity: 0,
        y: 8,
      });

      gsap.set('.opening-dots', {
        autoAlpha: 1,
      });

      gsap.set(
        '.opening-bubble .bubble-blue-layer, .opening-bubble .bubble-tail-blue',
        { opacity: 0 }
      );

      gsap.set('.zoom-circle', {
        autoAlpha: 0,
        scale: 0,
        transformOrigin: '50% 50%',
      });

      gsap.set('.gradient-scene', {
        autoAlpha: 1,
      });

      gsap.set('.gradient-center', {
        autoAlpha: 0,
        y: 18,
      });

      gsap.set('.skill-bubble', {
        autoAlpha: 0,
        scale: 0.92,
        width: 78,
      });

      gsap.set('.skill-text', {
        autoAlpha: 0,
      });

      gsap.set(
        '.skill-bubble .bubble-blue-layer, .skill-bubble .bubble-tail-blue',
        { opacity: 0 }
      );

      gsap.set('.scroll-hint', {
        autoAlpha: 0,
      });

      gsap.set('.intro-statement', {
        autoAlpha: 0,
        yPercent: -50,
      });

      // OPENING TIMELINE

const timeline = gsap.timeline({
  defaults: {
    ease: 'power2.inOut',
  },
});
      // SHOW PASTEL GRADIENT IMMEDIATELY
timeline.set('.opening-scene', {
  display: 'none',
});

timeline.set('.gradient-scene', {
  autoAlpha: 1,
});

// HOLD EMPTY GRADIENT BEFORE TEXT
timeline.to({}, {
  duration: 0.6,
});

      // 7. CENTERED NAME
      // NAME AND PORTFOLIO FADE IN
timeline.to('.gradient-center', {
  autoAlpha: 1,
  y: 0,
  duration: 1.2,
  ease: 'power2.out',
});

      // 8. FOUR SKILL BUBBLES
      SKILLS.forEach((skill) => {
        const selector = `.skill-${skill.position}`;

        const textElement =
          node.querySelector<HTMLElement>(
            `${selector} .skill-text`
          );

        if (!textElement) return;

        textElement.textContent = '';

        const counter = { value: 0 };

        timeline.to(selector, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power2.out',
        });

        timeline.to(
          `${selector} .skill-dots i`,
          {
            y: -4,
            duration: 0.15,
            stagger: 0.08,
            repeat: 2,
            yoyo: true,
          }
        );

        timeline.to(selector, {
          width: 'var(--bubble-width)',
          duration: 0.45,
          ease: 'power3.inOut',
        });

        timeline.to(
          `${selector} .skill-dots`,
          {
            autoAlpha: 0,
            duration: 0.15,
          },
          '<'
        );

        timeline.set(
          `${selector} .skill-text`,
          { autoAlpha: 1 }
        );

        timeline.to(counter, {
          value: skill.label.length,
          duration: 0.6,
          ease: 'none',
          snap: { value: 1 },
          onUpdate: () => {
            textElement.textContent =
              skill.label.slice(0, counter.value);
          },
        });

        timeline.call(() => {
          const bubble = node.querySelector(
            `.float-${skill.position}`
          );

          bubble?.classList.add('is-floating');
        });

        timeline.to(
          `${selector} .bubble-blue-layer, ${selector} .bubble-tail-blue`,
          {
            opacity: 1,
            duration: 0.45,
          }
        );
      });

      timeline.to('.scroll-hint', {
        autoAlpha: 1,
        duration: 0.5,
      });

     // SCROLL STORYTELLING — INDEPENDENT FROM BUBBLE ANIMATION
scrollTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.intro-hero',
    start: 'top top',
    end: '+=4200',
    scrub: 0.3,
    pin: true,
    invalidateOnRefresh: true,
  },
});

        // NAME AND BUBBLES FADE OUT TOGETHER
      scrollTimeline.fromTo(
  '.gradient-center-scroll',
  {
    autoAlpha: 1,
    y: 0,
  },
  {
    autoAlpha: 0,
    y: -75,
    duration: 0.4,
    ease: 'power2.inOut',
    immediateRender: false,
  },
  0
);

        scrollTimeline.fromTo(
          '.skill-float',
          {
            autoAlpha: 1,
            y: 0,
          },
          {
            autoAlpha: 0,
            y: -35,
            duration: 0.4,
            stagger: 0.04,
            ease: 'power2.inOut',
            immediateRender: false,
          },
          0
        );

        scrollTimeline.fromTo(
          '.scroll-hint',
          {
            autoAlpha: 1,
          },
          {
            autoAlpha: 0,
            duration: 0.25,
            immediateRender: false,
          },
          0
        );

        // LEFT STATEMENT ENTERS
        scrollTimeline.fromTo(
          '.statement-left',
          {
            autoAlpha: 0,
            x: -90,
            yPercent: -50,
          },
          {
            autoAlpha: 1,
            x: 0,
            yPercent: -50,
            duration: 0.45,
            ease: 'power2.out',
            immediateRender: false,
          }
        );

        // LEFT STATEMENT EXITS
        scrollTimeline.to('.statement-left', {
          autoAlpha: 0,
          x: -35,
          duration: 0.4,
          ease: 'power2.inOut',
        });

        // RIGHT STATEMENT ENTERS
        scrollTimeline.fromTo(
          '.statement-right',
          {
            autoAlpha: 0,
            x: 90,
            yPercent: -50,
          },
          {
            autoAlpha: 1,
            x: 0,
            yPercent: -50,
            duration: 0.45,
            ease: 'power2.out',
            immediateRender: false,
          }
        );

        // RIGHT STATEMENT EXITS
        scrollTimeline.to('.statement-right', {
          autoAlpha: 0,
          x: 35,
          duration: 0.4,
          ease: 'power2.inOut',
        });

// QUESTION APPEARS DIRECTLY AFTER RIGHT STATEMENT
scrollTimeline.set('.intro-question', {
  autoAlpha: 1,
});

scrollTimeline.fromTo(
  '.intro-question-word',
  { opacity: 0.08, y: 20 },
  {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.3,
    ease: 'none',
    immediateRender: false,
  }
);

// Short hold
scrollTimeline.to({}, { duration: 0.15 });

// QUESTION FADES OUT
scrollTimeline.to('.intro-question', {
  autoAlpha: 0,
  y: -25,
  duration: 0.3,
});

/* MY PERSPECTIVE — WORD BY WORD FADE IN */

// Show the container, but keep every word invisible
scrollTimeline.set('.intro-perspective', {
  autoAlpha: 1,
});

scrollTimeline.fromTo(
  '.intro-perspective-word',
  {
    autoAlpha: 0,
    y: 14,
  },
  {
    autoAlpha: 1,
    y: 0,
    duration: 0.4,
    stagger: 0.12,
    ease: 'none',
    immediateRender: false,
  }
);

// Short hold at the end
scrollTimeline.to({}, { duration: 0.3 });// MY PERSPECTIVE FADES OUT FIRST
scrollTimeline.to('.intro-perspective', {
  autoAlpha: 0,
  y: -35,
  duration: 0.5,
  ease: 'power2.inOut',
});

// EMPTY GRADIENT BETWEEN SCENES
scrollTimeline.to({}, { duration: 0.15 });
// ========================================
// EXPLORE MY WORK — SCROLL ANIMATION
// ========================================

// Notification enters with a spring bounce
scrollTimeline.fromTo(
  '.work-notification',
  {
    autoAlpha: 0,
    y: 100,
    scale: 0.65,
  },
  {
    autoAlpha: 1,
    y: 0,
    scale: 1,
    duration: 0.85,
    ease: 'back.out(2.2)',
    immediateRender: false,
  }
);

// Counters fade in one after another
scrollTimeline.fromTo(
  '.work-stat',
  {
    autoAlpha: 0,
    y: 45,
  },
  {
    autoAlpha: 1,
    y: 0,
    duration: 0.5,
    stagger: 0.12,
    ease: 'power2.out',
    immediateRender: false,
  },
  '<0.15'
);

// Divider lines appear
scrollTimeline.fromTo(
  '.work-stat-divider',
  {
    autoAlpha: 0,
    scaleY: 0,
  },
  {
    autoAlpha: 1,
    scaleY: 1,
    duration: 0.35,
    stagger: 0.12,
    immediateRender: false,
  },
  '<'
);

// Numbers count from zero as user scrolls
const workCounters = gsap.utils.toArray<HTMLElement>(
  '.work-stat-number'
);

workCounters.forEach((element) => {
  const target = Number(element.dataset.target || 0);
  const counter = { value: 0 };

  scrollTimeline!.to(
    counter,
    {
      value: target,
      duration: 0.8,
      ease: 'none',
      onUpdate: () => {
        element.textContent =
          `${Math.round(counter.value)}+`;
      },
    },
    '<'
  );
});

// Keep scene visible briefly
scrollTimeline.to({}, { duration: 0.5 });

// Fade out on continued downward scroll
scrollTimeline.to('.work-intro', {
  autoAlpha: 0,
  y: -45,
  duration: 0.5,
  ease: 'power2.inOut',
});
        ScrollTrigger.refresh();

    }, node);

    return () => {
      scrollTimeline?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root}>

      <section className="intro-hero">
        {/* OPENING SCENE */}
        <div className="opening-scene">
          <div className="zoom-circle" />

          <Bubble
            side="right"
            className="opening-bubble"
          >
            <TypingDots className="opening-dots" />

            <div className="opening-copy">
              <div className="opening-year" />
              <h1 className="opening-name" />
            </div>
          </Bubble>
        </div>

        {/* GRADIENT SCENE */}
<div className="gradient-scene">

  <div className="gradient-center-scroll">
    <div className="gradient-center">
      <div className="gradient-year">
        {YEAR}
      </div>

      <h2 className="gradient-name">
        {NAME}
      </h2>
    </div>
  </div>

          {/* LEFT STATEMENT */}
          <div className="intro-statement statement-left">
            Building strategies that connect brands,
            communities, and growth.
          </div>

          {/* RIGHT STATEMENT */}
          <div className="intro-statement statement-right">
            Connecting data, people, and ideas to turn
            strategic thinking into measurable impact.
          </div>

{/* QUESTION — SAME SCENE */}
<div className="intro-story intro-question">
  <p className="intro-story-label">
    "The question is..."
  </p>

  <h2 className="intro-story-heading">
    {'"What Makes A Strategy Work?"'
      .split(' ')
      .map((word, index) => (
        <span className="intro-question-word" key={index}>
          {word}{' '}
        </span>
      ))}
  </h2>
</div>

{/* PERSPECTIVE — SAME SCENE */}
<div className="intro-story intro-perspective">
  <p className="intro-story-label">
    My perspective
  </p>

  <p className="intro-story-heading intro-perspective-text">
    {"Great strategies don't end with ideas. They begin with understanding, take shape through decisions, and create value through execution. My ambition is to connect analytical thinking with practical action, helping transform complex business challenges into clear, impactful solutions."
      .split(' ')
      .map((word, index) => (
        <span className="intro-perspective-word" key={index}>
          {word}{' '}
        </span>
      ))}
  </p>
</div>
{/* EXPLORE MY WORK — NOTIFICATION + COUNTERS */}
<div className="work-intro">

  <a
    href="#selected-work"
    className="work-notification"
    aria-label="Explore my work"
  >
    <span className="work-notification-icon">
      <span className="work-notification-dot" />
    </span>

    <span className="work-notification-text">
      Explore my work!
    </span>
  </a>

  <div className="work-stats">

    <div className="work-stat">
      <span className="work-stat-number" data-target="120">
        0+
      </span>
      <span className="work-stat-label">
        Total Projects
      </span>
    </div>

    <span className="work-stat-divider" />

    <div className="work-stat">
      <span className="work-stat-number" data-target="70">
        0+
      </span>
      <span className="work-stat-label">
        Community Initiatives
      </span>
    </div>

    <span className="work-stat-divider" />

    <div className="work-stat">
      <span className="work-stat-number" data-target="30">
        0+
      </span>
      <span className="work-stat-label">
        Collaborations
      </span>
    </div>

  </div>
</div>
          {/* FOUR SKILL BUBBLES */}
          {SKILLS.map((skill) => {
            const width = Math.max(
              220,
              skill.label.length * 12 + 85
            );

            return (
              <div
                key={skill.position}
                className={`skill-float float-${skill.position}`}
              >
                <Bubble
                  side={skill.side}
                  className={`skill-bubble skill-${skill.position}`}
                  style={
                    {
                      '--bubble-width': `${width}px`,
                    } as CSSProperties
                  }
                >
                  <TypingDots className="skill-dots" />
                  <span className="skill-text" />
                </Bubble>
              </div>
            );
          })}

          {/* SCROLL HINT */}
          <div className="scroll-hint">
            SCROLL TO EXPLORE
            <span aria-hidden="true">↓</span>
          </div>
        </div>
      </section>
    </main>
  );
}
