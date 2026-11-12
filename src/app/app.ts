import { afterNextRender, Component, DestroyRef, inject, signal } from '@angular/core';
import { DatePipe, DOCUMENT, NgOptimizedImage, NgTemplateOutlet } from '@angular/common';
import { ThemeService } from '../services/theme.service';
import Lenis from 'lenis';

interface Project {
  id: string;
  title: string;
  category: string;
  description: readonly string[];
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
}

interface Experience {
  companyName: string;
  companyDescription: string;
  startDate: Date;
  endDate: Date | 'present';
  position: string;
  location: string;
  industry: string;
  roleDescription: string;
  website?: string;
}

@Component({
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
  imports: [DatePipe, NgOptimizedImage, NgTemplateOutlet],
})
export class App {
  readonly currentYear = new Date().getFullYear();
  readonly menuOpen = signal(false);
  readonly themeService = inject(ThemeService);
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  readonly projects: readonly Project[] = [
    {
      id: 'resumecrafts',
      title: 'ResumeCrafts',
      category: 'Web Development, AI Integration',
      description: [
        'An AI-powered career platform that helps job seekers create and improve their resumes, generate tailored cover letters, and keep track of job applications.',
        'The application brings these workflows together with a Kanban board, giving users a clear view of their job search.',
        'Built with Angular, Firebase, and OpenAI APIs.',
      ],
      image: 'images/ResumeCraft.png',
      imageAlt: 'ResumeCrafts career platform interface',
      imageWidth: 2454,
      imageHeight: 1292,
    },
    {
      id: 'quiz-game',
      title: 'Interactive Quiz Platform',
      category: 'Full-Stack Development',
      description: [
        'A multiplayer trivia application that brings players together for interactive quiz sessions.',
        'Host-controlled sessions, real-time gameplay, and scoring keep the experience organized for both hosts and players.',
        'Designed with a reusable architecture to support different quiz topics.',
      ],
      image: 'images/QuizGame.png',
      imageAlt: 'Interactive multiplayer quiz platform interface',
      imageWidth: 1640,
      imageHeight: 750,
    },
  ];
  readonly experiences: Experience[] = [
    {
      companyName: 'Freelance | Self-Employed',
      companyDescription: 'Independent web application development',
      startDate: new Date(2025, 5, 1),
      endDate: 'present',
      position: 'Full-Stack Developer',
      location: 'Kazakhstan',
      industry: 'Software Development',
      roleDescription: [
        'Designing and developing modern, scalable web applications, with a focus on clean architecture, intuitive user experiences, and reliable backend systems. Working across the full development lifecycle, from initial concept and UI/UX design to API development, database integration, and application functionality.',
        'Mock API Platform — A developer-focused tool for creating mock REST API endpoints, generating structured test data, and simplifying frontend development and API testing.',
        'Shop Inventory Management System — A full-stack inventory solution featuring product and category management, stock tracking, and RESTful APIs, built with Angular, ASP.NET Core, Entity Framework Core, and PostgreSQL.',
        'Interactive Quiz Platform — A multiplayer trivia application featuring host-controlled sessions, real-time gameplay, scoring, and a reusable architecture supporting different quiz topics.',
        'ResumeCrafts — An AI-powered career platform for creating and improving resumes, generating tailored cover letters, and tracking job applications, integrating Angular, Firebase, and OpenAI APIs.',
        'Strong emphasis on maintainable code, reusable components, state management with NgRx, RESTful API design, and database architecture. Continuously exploring new technologies and development practices to deliver efficient, functional, and visually engaging digital products.',
      ].join(' - '),
    },
    {
      companyName: 'Senior Star',
      companyDescription: 'Digital IT School',
      startDate: new Date(2024, 4, 1),
      endDate: new Date(2025, 3, 1),
      position: 'Frontend Developer',
      location: 'Astana, Kazakhstan',
      industry: 'Education',
      roleDescription: "Frontend Developer focused on delivering a performant, user-centered educational platform for programming students. - Implemented a dynamic student card system with tagging, and commenting to streamline content management and increase user engagement. - Optimized search by 10% using debouncing and NgRx caching. - Built and integrated an educational materials module to centralize course resources and improve discoverability by 15%. - Connected and hardened frontend-backend interactions with robust API integration and error handling for reliable data flow. - Collaborated with designers and backend engineers to implement Angular best practices, component-driven architecture, and unit tests."
    }
  ]

  constructor() {
    afterNextRender(() => {
      const browser = this.document.defaultView;
      if (!browser?.matchMedia) return;

      const reducedMotion = browser.matchMedia('(prefers-reduced-motion: reduce)');
      let lenis: Lenis | undefined;

      const updateScrolling = () => {
        lenis?.destroy();
        lenis = reducedMotion.matches
          ? undefined
          : new Lenis({ autoRaf: true, anchors: true });
      };

      updateScrolling();
      reducedMotion.addEventListener('change', updateScrolling);
      this.destroyRef.onDestroy(() => {
        reducedMotion.removeEventListener('change', updateScrolling);
        lenis?.destroy();
      });
    });
  }
}
