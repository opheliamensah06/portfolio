    const { useState, useEffect, useRef, useCallback } = React;
    const MotionReact = window.MotionReact || {};
    const MOTION_PROP_NAMES = new Set([
      'animate', 'exit', 'initial', 'layout', 'layoutId', 'transition',
      'variants', 'viewport', 'whileHover', 'whileInView', 'whileTap'
    ]);
    const createMotionFallback = () => new Proxy({}, {
      get: (_, tag) => React.forwardRef(function MotionFallback(props, ref) {
        const cleanProps = {};

        Object.entries(props).forEach(([key, value]) => {
          if (!MOTION_PROP_NAMES.has(key)) cleanProps[key] = value;
        });

        return React.createElement(tag, { ...cleanProps, ref }, props.children);
      }),
    });
    const motion = MotionReact.motion || createMotionFallback();
    const AnimatePresence = MotionReact.AnimatePresence || React.Fragment;
    const useReducedMotion = MotionReact.useReducedMotion || (() => false);
    const APP_MOTION_ENABLED = Boolean(MotionReact.motion);
    const APP_EASE = [0.22, 1, 0.36, 1];

    /* ============================================================
       DATA
    ============================================================ */

    const EXPERIENCE = [
      {
        role: 'Graduate Assistant — Assistant Program Coordinator',
        dept: 'Honors College',
        org:  'Bowling Green State University',
        loc:  'Bowling Green, OH',
        period: 'August 2024 – Present',
        bullets: [
          'Built academic engagement, belonging, and inclusion among 500+ Honors Learning Community students by coordinating large-scale events, experiential trips, and workshops.',
          'Promoted identity exploration and strengthened community connection by supervising Honors Students of Color and Honors Learning Community Fellows through program planning, mentorship, and dialogue-based initiatives.',
          'Enhanced co-curricular programming aligned with college learning outcomes by collaborating with faculty, professional staff, and student leaders.',
          'Strengthened Honors student success by advising undecided students on major and career pathways and leading a student team to produce an Honors Project advising video series.',
          'Planned and coordinated Senior Recognition graduation ceremony for approximately 90 students graduating with University Honors.',
          'Served as liaison between students and administration, providing individualized support and maintaining effective communication.',
        ],
      },
      {
        role: 'Academic Advisor',
        dept: 'Office of Academic Advising and Planning',
        org:  'Bowling Green State University',
        loc:  'Bowling Green, OH',
        period: 'August – December 2025',
        bullets: [
          'Strengthened student success and retention for 50+ students through proactive advising, course registration, and referrals to key campus resources.',
          'Led new-student onboarding and enrollment readiness by delivering advising support during campaigns and one-on-one enrollment appointments.',
          'Optimized advising operations by preparing materials, maintaining accurate student documentation, and contributing to daily office workflow.',
        ],
      },
      {
        role: 'Summer Conference Assistant',
        dept: 'Residence Life',
        org:  'Bowling Green State University',
        loc:  'Bowling Green, OH',
        period: 'May – August 2025',
        bullets: [
          'Improved guest experience by providing front-line service and clearly communicating Residence Life policies.',
          'Simplified conference operations for 3,000+ guests across 50+ schools and faith-based organizations by coordinating check-in/out and managing access control.',
          'Strengthened facility readiness across 8 residence halls, coordinating turnovers from summer housing to fall move-in.',
        ],
      },
      {
        role: 'Advising & Program Intern',
        dept: 'Student-Athlete Services',
        org:  'Bowling Green State University',
        loc:  'Bowling Green, OH',
        period: 'January – May 2025',
        bullets: [
          'Supported student-athlete success and NCAA compliance readiness by reinforcing compliance education and monitoring academic progress across multiple sports.',
          'Co-led planning and execution of the Ziggy Awards recognizing outstanding student-athletes for academic and athletic excellence.',
          'Advised diverse student-athlete population on course planning, academic progress, and accountability habits.',
        ],
      },
      {
        role: 'National Service — Administrative Assistant',
        dept: 'College of Distance Education',
        org:  'University of Cape Coast',
        loc:  'Cape Coast, Ghana — West Africa',
        period: 'August 2018 – August 2019',
        bullets: [
          'Upheld academic integrity by proctoring university examinations and ensuring adherence to institutional policies.',
          'Strengthened student support by liaising between the university, education centers, and students on policies and registration.',
          'Supported efficient office operations and dispatched official correspondence accurately.',
        ],
      },
      {
        role: 'Customer Service & Sales Intern',
        dept: '',
        org:  'Telecel Ghana (formerly Vodafone Ghana)',
        loc:  'Takoradi, Ghana — West Africa',
        period: 'August – September 2015 & 2016',
        bullets: [
          'Expanded Telecel Cash enrollment and regional membership by leading and coaching a team of sales executives.',
          'Enhanced customer satisfaction by delivering front-line support and resolving complaints professionally.',
          'Reviewed transaction activity of 300+ Telecel agents, flagging discrepancies and enforcing accountability standards.',
        ],
      },
    ];

    const PRESENTATIONS = [
      { title: 'Rethinking Health Insurance Policies for International Students through an Equity Lens', event: 'Ohio College Personnel Association (OCPA) Annual Conference', role: 'Presenter', date: 'February 2026' },
      { title: 'Navigating Uncertainty as International Students', event: 'ACPA Master\'s Student Conference', role: 'Panel Contributor', date: 'October 2025' },
      { title: 'Effective and Change-Oriented Survey Design', event: 'USC Race and Equity Center', role: 'Participant', date: 'September 2025' },
    ];

    const INVOLVEMENT = [
      { role: 'Ambassador', org: 'ACPA Graduate Students & New Professionals (GSNP)', date: 'February 2025' },
      { role: 'Attendee', org: 'ACPA Annual Convention — Long Beach, California', date: 'February 2025' },
      { role: 'Certificate', org: 'Leadership, Entrepreneurship and Career Development', date: 'August 2023' },
    ];

    const SKILLS = [
      'Safe Zone Training','Title IX & Mandatory Reporting','Anti-Bullying in Schools',
      'FERPA Training','ALICE Training','Navigate','PeopleSoft','Degree Audits (DARS)',
      'Canvas','StarRez','Microsoft Office Suite','Qualtrics','SharePoint',
    ];

    const PERSONAL_VALUES = [
      { name: 'Relationship & Community', icon: 'fa-hands-holding-heart', desc: 'An intentional practice dedicated to fostering connections that are mutually sustaining and deeply rooted in belonging — shaped by cultural roots that teach collective responsibility.' },
      { name: 'Integrity',               icon: 'fa-shield-halved',        desc: 'An unwavering commitment to principles — doing what is right when no one is watching, owning mistakes, crediting others, and honoring every commitment made.' },
      { name: 'Diversity',               icon: 'fa-people-group',         desc: 'Embracing culture, language, race, nationality, gender, and lived experience without reducing people to singular narratives — a stance of humility and genuine curiosity.' },
      { name: 'Autonomy',                icon: 'fa-compass',              desc: 'Self-governance and critical thinking, ensuring personal actions remain consistent with values and informed decisions — forged by the choice to pursue education abroad.' },
      { name: 'Faith',                   icon: 'fa-seedling',             desc: 'A profound way of living — embodying confidence and commitment to purpose amid uncertainty, built through seasons of intense adaptation and challenge.' },
    ];

    const PROFESSIONAL_VALUES = [
      { name: 'Service',             icon: 'fa-hand-holding-hand', desc: 'An ethic of care expressed through consistent, reliable presence — proactively removing barriers and connecting students to resources as a collaborative endeavor.' },
      { name: 'Collaboration',       icon: 'fa-handshake',         desc: 'A deliberate practice to build shared ownership around student needs — coordinating across offices to ensure students move through their journeys with clarity and confidence.' },
      { name: 'Equity & Fairness',   icon: 'fa-scale-balanced',    desc: 'Acknowledging that students begin from different starting points — designing support and advocating for policies that honor those diverse realities and remove institutional barriers.' },
      { name: 'Transparency',        icon: 'fa-eye',               desc: 'Proactive communication of policies, reasoning, and decisions — fostering open dialogue with students and colleagues to build environments of trust and informed agency.' },
      { name: 'Continuous Learning', icon: 'fa-book-open',         desc: 'Pursuing ongoing professional development, reflective practice, and assessment skills so advising work improves over time and remains responsive to evolving student needs.' },
    ];

    const COMPETENCIES = [
      {
        id: 'as', title: 'Advising & Supporting', abbr: 'AS', level: 'exemplary',
        summary: 'Documents advanced competency in advising through practicum experiences at the Office of Academic Advising & Planning, Student-Athlete Services, and the Honors College video profile project — demonstrating culturally responsive communication, theory-informed practice, crisis referral, and equitable advising philosophy.',
        activities: [
          { title: 'Fall Practicum — Office of Academic Advising & Planning (Fall 2025)', desc: 'Advised and supported a caseload of 29 undecided Bachelor of Science students through major exploration, academic planning, and registration guidance. Conducted one-on-one appointments, drop-in advising, and workshops. Identified students in academic distress and followed crisis referral protocols, connecting them to counseling, Dean of Students, and financial aid.' },
          { title: 'Spring Practicum — Student-Athlete Services (Spring 2025)', desc: 'Advised student-athletes navigating academic eligibility, NCAA compliance, and identity-related transitions. Applied Sanford\'s Challenge and Support Theory and Schlossberg\'s Transition Theory. Leveraged an international background to build strong connections with students navigating dual identities.' },
          { title: 'Honors College Video Profile Project', desc: 'Developed structured interview questions for a video initiative documenting Honors student experiences — designed to promote authentic student voice, recognize diverse paths through the Honors Program, and serve as an accessible virtual advising resource.' },
        ],
        artifacts: [
          { name: 'Advising Philosophy Statement', type: 'PDF' },
          { name: 'Fall Practicum Presentation (OAAP)', type: 'PPTX' },
          { name: 'Student-Athlete Practicum Presentation', type: 'PPTX' },
          { name: 'Honors Project Interview Questions', type: 'DOCX' },
        ],
      },
      {
        id: 'sji', title: 'Social Justice & Inclusion', abbr: 'SJI', level: 'exemplary',
        summary: 'Demonstrates exemplary practice through a rigorous scholarly equity audit examining BGSU\'s mandatory health insurance policy, application of Critical Race Theory and institutional accountability frameworks, and public advocacy at the 2026 OCPA Annual Conference.',
        activities: [
          { title: 'Equity Audit — BGSU Health Insurance Policy (CSP 6035)', desc: 'Conducted a scholarly equity audit documenting how BGSU\'s mandatory automatic enrollment, vague waiver process, and fee payment structure disproportionately burden international students. Drew on McNair, Bensimon & Malcom-Piqueux (2020), Victor Ray (2023), and Valencia (2012, 2019). Proposed concrete recommendations including insurance literacy education, waiver reform, international student representation on policy bodies, and a peer health navigator program.' },
          { title: 'OCPA Conference Presentation — February 2026', desc: 'Presented findings on health equity and international student experiences at the Ohio College Personnel Association Annual Conference — contributing to statewide professional discourse on dismantling structural inequities, and offering consultation to student affairs professionals on strategies to dismantle systems of oppression in institutional policy.' },
        ],
        artifacts: [
          { name: 'Final Equity Audit Document', type: 'DOCX' },
          { name: 'OCPA Conference Presentation Slides', type: 'PPTX' },
        ],
      },
      {
        id: 'lead', title: 'Leadership', abbr: 'LEAD', level: 'exemplary',
        summary: 'Demonstrates advanced leadership through institutionalizing mentoring systems, building feedback cultures, developing a sustained co-curricular curriculum, and leading student travel experiences across the country.',
        activities: [
          { title: 'HSOC Event Planning Form — Mentoring Instrument', desc: 'Developed a comprehensive planning tool to mentor Honors Students of Color leaders through every phase of event management — from articulating learning outcomes and building procurement budgets to designing publicity strategies, coordinating logistics, and completing post-event reflection. An institutionalized mentoring structure embedded into programming practice.' },
          { title: 'Community Meals Co-Curricular Series', desc: 'Coordinated a sustained programming curriculum covering financial literacy, mental health and wellness, time management, post-graduation financial planning, CV writing, LinkedIn development, and interview preparation. Collaborated with external partners including PNC Bank and the Kuhlin Hub. Built feedback mechanisms directly into each program design.' },
        ],
        artifacts: [
          { name: 'Community Meal Financial Literacy Planning Doc', type: 'DOCX' },
          { name: 'March Community Meal Email Template', type: 'DOCX' },
          { name: 'HSOC Event Planning Form', type: 'DOCX' },
        ],
      },
      {
        id: 'aer', title: 'Assessment, Evaluation & Research', abbr: 'AER', level: 'proficient',
        summary: 'Proficient in designing sustainable data collection systems, applying quantitative and qualitative research methods, and using evidence to inform student affairs practice and eliminate redundant programming.',
        activities: [
          { title: 'Statistics & Research Methods Coursework (EDFI 6410)', desc: 'Developed skills in descriptive and inferential statistics, hypothesis testing, and interpreting statistical results in published research. Applied qualitative, quantitative, and mixed-methods research design frameworks across course assignments.' },
          { title: 'Assessment Systems — Qualtrics, MS Forms, SharePoint', desc: 'Designed and implemented pre/post-event feedback systems, mid-semester check-ins, and a "pulse check" end-of-semester reflection tool to evaluate program quality and capture student interest. Used resulting data to eliminate redundant programming and make data-informed resource allocation decisions.' },
        ],
        artifacts: [],
      },
      {
        id: 'pef', title: 'Personal & Ethical Foundations', abbr: 'PEF', level: 'proficient',
        summary: 'Developed proficiency in managing competing professional and personal priorities, applying ethical judgment in ambiguous situations, and maintaining congruence between personal values and professional practice.',
        activities: [
          { title: 'Balancing Multiple Graduate Roles', desc: 'Intentionally structured time across graduate assistantship, practicum placements, coursework, and personal life — developing capacity to identify sources of dissonance, seek appropriate support, and build sustainable habits that maintain both wellbeing and professional commitments.' },
          { title: 'Ethical Practice with Confidential Student Information', desc: 'Handled confidential student data and navigated follow-up communication requiring sound ethical judgment. Drew on both personal values and ACPA/NASPA professional standards to navigate tensions between institutional procedures and ethical instincts — developing a mission statement through PCA writing that reflects this integration.' },
        ],
        artifacts: [],
      },
      {
        id: 'sld', title: 'Student Learning & Development', abbr: 'SLD', level: 'proficient',
        summary: 'Enhanced proficiency in creating intentional learning experiences, designing outcomes-aligned programs, and applying student development theory to practice within the Honors College and through CSP coursework.',
        activities: [
          { title: 'Learning Goals for Honors College Events & Trips', desc: 'Developed specific learning goals for trips, events, and programs — considering educational outcomes from museums, travel, and co-curricular activities. Collected pre-trip reflections and post-activity assessments tied explicitly to stated goals, using student feedback to continuously improve programming alignment with student needs.' },
          { title: 'CSP 6040 — Curricular Approach to Student Affairs', desc: 'Explored alignment of learning outcomes with institutional mission, strategic priorities, and core values. Evolved from participation in programming to critically analyzing the purpose and developmental intention behind programs, bridging theory to practice through real Honors College contexts.' },
        ],
        artifacts: [],
      },
      {
        id: 'vph', title: 'Values, Philosophy & History', abbr: 'VPH', level: 'foundational',
        summary: 'Built foundational understanding of the philosophical, historical, and value frameworks underpinning the student affairs profession through policy analysis and functional area research.',
        activities: [
          { title: 'Historical Timeline — FERPA Act & Obama College Scorecard', desc: 'Created a historical timeline examining major policy developments shaping the student-institutional relationship.' },
          { title: 'Counseling Services Functional Area Research — CSP 6010', desc: 'Researched counseling services as a foundational functional area, examining its historical roots, philosophical grounding, and place in the broader student affairs profession.' },
        ],
        artifacts: [],
      },
      {
        id: 'lpg', title: 'Law, Policy & Governance', abbr: 'LPG', level: 'foundational',
        summary: 'Gained foundational understanding of governance structures, institutional policies, and legal expectations shaping student affairs practice through coursework and applied experience.',
        activities: [
          { title: 'CSP 6040 — Governance & Institutional Structures', desc: 'Built foundational knowledge of how higher education institutions are shaped by governance, policy, mission, and organizational structures — identifying stakeholders and policymakers who influence institutional priorities.' },
          { title: 'Honors LC Travel Guidelines & Compliance Documentation', desc: 'Provided travel guidelines, medical/liability forms, and conduct-related travel information — developing understanding of how institutional policy shapes student participation, safety, accountability, and conduct.' },
        ],
        artifacts: [],
      },
      {
        id: 'ohr', title: 'Organizational & Human Resource', abbr: 'OHR', level: 'foundational',
        summary: 'Developed foundational knowledge in ethical hiring practices, organizational budget management, and human resource decision-making through committee work and program planning.',
        activities: [
          { title: 'Staff Search Committee — Honors LC & School of Media', desc: 'Served on a search committee conducting phone interviews and reviewing candidates against a structured rubric, collaborating across offices to reach an equitable hiring decision.' },
          { title: 'Scholarship Review Board & Budget Management', desc: 'Participated in the Honors LC scholarship review board and constructed event budgets — soliciting vendor quotes across food, logistics, transportation, hotels, and conference materials to maintain fiscal discipline.' },
        ],
        artifacts: [],
      },
    ];

    const ARTIFACTS = [
      { id:1,  name:'Advising Philosophy Statement',             comp:'Advising & Supporting',       abbr:'AS',   level:'exemplary', desc:'A personal advising philosophy rooted in equity-mindedness, culturally responsive practice, relational trust, and student empowerment.', type:'PDF' },
      { id:2,  name:'Fall Practicum Presentation (OAAP)',        comp:'Advising & Supporting',       abbr:'AS',   level:'exemplary', desc:'Slide presentation from the Fall 2025 practicum at the Office of Academic Advising and Planning showcasing caseload advising work.', type:'PPTX' },
      { id:3,  name:'Student-Athlete Practicum Presentation',    comp:'Advising & Supporting',       abbr:'AS',   level:'exemplary', desc:'PowerPoint documenting Spring 2025 practicum at Student-Athlete Services — goal assessment, professional competencies, and supervisor reflections.', type:'PPTX' },
      { id:4,  name:'Honors Project Interview Questions',        comp:'Advising & Supporting',       abbr:'AS',   level:'exemplary', desc:'Structured interview question template for the Honors Project video profile initiative, facilitating meaningful student self-reflection.', type:'DOCX' },
      { id:5,  name:'Final Equity Audit Document',               comp:'Social Justice & Inclusion',  abbr:'SJI',  level:'exemplary', desc:'Scholarly equity audit examining BGSU\'s mandatory health insurance policy and its disproportionate impact on international students.', type:'DOCX' },
      { id:6,  name:'OCPA Conference Presentation Slides',       comp:'Social Justice & Inclusion',  abbr:'SJI',  level:'exemplary', desc:'Presentation slides from the February 2026 OCPA Annual Conference on rethinking health insurance equity for international students.', type:'PPTX' },
      { id:7,  name:'Community Meal Financial Literacy Doc',     comp:'Leadership',                  abbr:'LEAD', level:'exemplary', desc:'Comprehensive event planning document for the March 2026 Community Meal including a gallery walk activity on financial decision-making.', type:'DOCX' },
      { id:8,  name:'March Community Meal Email Template',       comp:'Leadership',                  abbr:'LEAD', level:'exemplary', desc:'Student outreach email template created for the March 2026 Community Meal financial literacy program.', type:'DOCX' },
      { id:9,  name:'HSOC Event Planning Form',                  comp:'Leadership',                  abbr:'LEAD', level:'exemplary', desc:'Comprehensive mentoring tool developed to guide Honors Students of Color leaders through every phase of event management.', type:'DOCX' },
      { id:10, name:'Capstone Research Presentation',            comp:'Research',                    abbr:'RES',  level:'exemplary', desc:'Capstone graduate research presentation synthesizing findings on equity, access, and student success in higher education — presented as part of M.Ed. program completion at BGSU.', type:'PPTX', file:'/assets/docs/1 Ophelia Ivy Mensah Capstone.pptx', featured:true },
    ];

    const LEVEL_STYLES = {
      exemplary:    { badge: 'bg-accent text-onaccent',             pill: 'bg-accent/10 text-accent border border-accent/30' },
      proficient:   { badge: 'bg-secondary text-onaccent',          pill: 'bg-secondary/10 text-secondary border border-secondary/30' },
      foundational: { badge: 'border border-line-strong text-accent bg-transparent', pill: 'bg-soft text-secondary' },
    };

    const IMAGE_LIBRARY = {
      chicagoPortrait: {
        src: '/assets/images/CHICAGO.Jpeg',
        alt: 'Ophelia Ivy Mensah smiling in front of Cloud Gate in Chicago.',
        caption: 'Chicago experiential learning trip',
      },
      chicagoGroup: {
        src: '/assets/images/CHICAGO 1.jpeg',
        alt: 'Ophelia with a student group visiting Cloud Gate in Chicago.',
        caption: 'Travel-based community building',
      },
      honorsLounge: {
        src: '/assets/images/IMG_6832.JPG',
        alt: 'Students gathered in a campus lounge during an Honors community event.',
        caption: 'Honors Learning Community programming',
      },
      bgsuMascot: {
        src: '/assets/images/IMG_7415.JPEG',
        alt: 'Ophelia Ivy Mensah posing with the BGSU mascot and a colleague.',
        caption: 'Campus pride and student engagement',
      },
      marsDiversity: {
        src: '/assets/images/IMG_7610.JPG',
        alt: 'A diverse student affairs group standing together in front of a presentation screen.',
        caption: 'Student affairs leadership and collaboration',
      },
      museumPeers: {
        src: '/assets/images/IMG_6897.jpg',
        alt: 'Ophelia with peers seated in front of museum exhibits during a learning experience.',
        caption: 'Informal learning and reflection',
      },
      museumSelfie: {
        src: '/assets/images/IMG_2565.JPG',
        alt: 'Ophelia with peers inside a museum during an educational visit.',
        caption: 'Experiential learning off campus',
      },
      stadiumTrip: {
        src: '/assets/images/img_0293-converted.jpg',
        alt: 'A large BGSU group photo at a stadium during a student trip.',
        caption: 'Large-scale student trip coordination',
      },
      ocpaBackdropSolo: {
        src: '/assets/images/img_2425-converted.jpg',
        alt: 'Ophelia standing in front of an ACPA conference backdrop.',
        caption: 'Professional conference participation',
      },
      ocpaBackdropGroup: {
        src: '/assets/images/img_2424-converted.jpg',
        alt: 'Ophelia with colleagues in front of an ACPA conference backdrop.',
        caption: 'Professional network and collaboration',
      },
      honorsDiscussion: {
        src: '/assets/images/img_1113-converted.jpg',
        alt: 'Students listening during a discussion-based community event in an Honors lounge.',
        caption: 'Dialogue-centered student engagement',
      },
      ocpaPresentation: {
        src: '/assets/images/img_5595-2png-converted.jpg',
        alt: 'Ophelia standing near a projected OCPA presentation slide.',
        caption: 'Conference presentation on equity',
      },
    };

    const HERO_SUPPORT_IMAGES = ['ocpaPresentation', 'honorsLounge', 'stadiumTrip'];

    const GALLERY_SECTIONS = [
      {
        id:'events',
        label:'Events & Programs',
        icon:'fa-calendar-star',
        intro:'Programs designed to build belonging, curiosity, and meaningful student connection.',
        photoIds:['honorsLounge', 'honorsDiscussion', 'marsDiversity'],
      },
      {
        id:'professional',
        label:'Professional Development',
        icon:'fa-briefcase',
        intro:'Moments from conferences, presentations, and collaborative learning across the profession.',
        photoIds:['ocpaBackdropSolo', 'ocpaBackdropGroup', 'ocpaPresentation'],
      },
      {
        id:'campus',
        label:'Campus Life',
        icon:'fa-building-columns',
        intro:'Snapshots of student life, peer connection, and the everyday work of building community.',
        photoIds:['bgsuMascot', 'museumPeers', 'museumSelfie'],
      },
      {
        id:'conferences',
        label:'Conferences & Travel',
        icon:'fa-globe',
        intro:'Experiential trips and professional travel that widened perspective and deepened practice.',
        photoIds:['chicagoPortrait', 'chicagoGroup', 'stadiumTrip'],
      },
    ];

    const COMPETENCY_PHOTOS = {
      as: ['honorsLounge', 'honorsDiscussion'],
      sji: ['ocpaPresentation', 'ocpaBackdropSolo'],
      lead: ['stadiumTrip', 'marsDiversity'],
      aer: ['honorsDiscussion'],
      pef: ['museumPeers'],
      sld: ['museumSelfie', 'honorsLounge'],
      vph: ['museumSelfie'],
      lpg: ['ocpaBackdropGroup'],
      ohr: ['bgsuMascot'],
    };

    /* ============================================================
       HOOKS
    ============================================================ */

    function usePathRouter() {
      const PAGE_TO_PATH = {
        home: '/',
        about: '/about',
        resume: '/resume',
        competencies: '/competencies',
        artifacts: '/artifacts',
        gallery: '/gallery',
        contact: '/contact',
      };

      const PATH_TO_PAGE = Object.fromEntries(
        Object.entries(PAGE_TO_PATH).map(([pageName, path]) => [path, pageName])
      );

      const getPageFromLocation = () => {
        const normalizedPath = window.location.pathname.replace(/\/+$/, '') || '/';
        return PATH_TO_PAGE[normalizedPath] || 'home';
      };

      const [page, setPage] = useState(getPageFromLocation);

      useEffect(() => {
        const onPopState = () => setPage(getPageFromLocation());
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
      }, []);

      const navigate = useCallback(nextPage => {
        const nextPath = PAGE_TO_PATH[nextPage] || '/';
        if (window.location.pathname !== nextPath) {
          window.history.pushState({}, '', nextPath);
        }
        setPage(nextPage in PAGE_TO_PATH ? nextPage : 'home');
      }, []);

      return { page, navigate };
    }

    function useTheme() {
      const getInitialTheme = () => {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };
      const [theme, setTheme] = useState(getInitialTheme);
      useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
      }, [theme]);
      return [theme, () => setTheme(v => v === 'dark' ? 'light' : 'dark')];
    }

    function PageTransition({ page, children }) {
      const prefersReducedMotion = useReducedMotion();

      if (!APP_MOTION_ENABLED || prefersReducedMotion) {
        return <div key={page}>{children}</div>;
      }

      return (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.42, ease: APP_EASE }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      );
    }

    function Reveal({ as = 'div', children, className, delay = 0, amount = 0.2, ...rest }) {
      const prefersReducedMotion = useReducedMotion();

      if (!APP_MOTION_ENABLED || prefersReducedMotion) {
        return React.createElement(as, { ...rest, ...(className ? { className } : {}) }, children);
      }

      const Component = motion[as] || motion.div;

      return (
        <Component
          {...rest}
          className={className}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount }}
          transition={{ duration: 0.5, delay, ease: APP_EASE }}
        >
          {children}
        </Component>
      );
    }

    function LiftOnHover({ as = 'div', children, className, ...rest }) {
      const prefersReducedMotion = useReducedMotion();

      if (!APP_MOTION_ENABLED || prefersReducedMotion) {
        return React.createElement(as, { ...rest, ...(className ? { className } : {}) }, children);
      }

      const Component = motion[as] || motion.div;

      return (
        <Component
          {...rest}
          className={className}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          {children}
        </Component>
      );
    }

    /* ============================================================
       SHARED COMPONENTS
    ============================================================ */

    function SkipLink() {
      return <a href="#main" className="skip-link">Skip to main content</a>;
    }

    function Badge({ level }) {
      return (
        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-bold tracking-wider uppercase ${LEVEL_STYLES[level].badge}`}>
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </span>
      );
    }

    function Navbar({ page, navigate, theme, toggleTheme }) {
      const [open, setOpen] = useState(false);
      const btnRef = useRef(null);

      const LINKS = [
        { id:'home', label:'Home' }, { id:'about', label:'About Me' },
        { id:'resume', label:'Resume' }, { id:'competencies', label:'Competencies' },
        { id:'artifacts', label:'Artifacts' }, { id:'gallery', label:'Gallery' },
        { id:'contact', label:'Contact' },
      ];

      useEffect(() => {
        if (!open) return;
        const esc = e => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus(); }};
        document.addEventListener('keydown', esc);
        return () => document.removeEventListener('keydown', esc);
      }, [open]);

      const go = id => { navigate(id); setOpen(false); window.scrollTo(0,0); };

      return (
        <header className="sticky top-0 z-50 bg-page/92 backdrop-blur-xl border-b border-line shadow-sm shadow-ink/5">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              <button onClick={() => go('home')}
                className="font-serif text-base md:text-lg font-bold text-primary hover:text-accent transition-colors"
                aria-label="Ophelia Ivy Mensah — return to home">
                Ophelia Ivy Mensah
              </button>

              <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5">
                {LINKS.map(l => (
                  <button key={l.id} onClick={() => go(l.id)}
                    aria-current={page === l.id ? 'page' : undefined}
                    className={`text-sm font-medium transition-colors py-1 ${page === l.id ? 'text-accent border-b-2 border-accent' : 'text-secondary hover:text-accent'}`}>
                    {l.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-1">
                <button onClick={toggleTheme} aria-pressed={theme === 'dark'}
                  aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-soft transition-colors text-secondary hover:text-accent" title={theme === 'dark' ? 'Light mode' : 'Dark mode'}>
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} text-sm`} aria-hidden="true"></i>
                  <span className="sr-only">{theme === 'dark' ? 'Dark mode on. Switch to light mode.' : 'Light mode on. Switch to dark mode.'}</span>
                </button>

                <button ref={btnRef} onClick={() => setOpen(!open)}
                  aria-expanded={open} aria-controls="mobile-nav"
                  aria-label={open ? 'Close navigation' : 'Open navigation'}
                  className="md:hidden w-9 h-9 flex items-center justify-center rounded-full hover:bg-soft transition-colors text-primary">
                  <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-sm`} aria-hidden="true"></i>
                </button>
              </div>
            </div>
          </div>

          {open && (
            <nav id="mobile-nav" aria-label="Mobile navigation"
              className="md:hidden border-t border-line bg-page px-4 py-3 space-y-0.5">
              {LINKS.map(l => (
                <button key={l.id} onClick={() => go(l.id)}
                  aria-current={page === l.id ? 'page' : undefined}
                  className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${page === l.id ? 'bg-soft text-accent font-semibold' : 'text-secondary hover:bg-soft/70 hover:text-accent'}`}>
                  {l.label}
                </button>
              ))}
            </nav>
          )}
        </header>
      );
    }

    function Footer({ navigate }) {
      const go = p => { navigate(p); window.scrollTo(0,0); };
      return (
        <footer className="bg-ink text-onaccent/75 mt-24" role="contentinfo">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-serif text-xl font-bold text-onaccent mb-2">Ophelia Ivy Mensah</p>
              <p className="text-sm leading-relaxed text-onaccent/55">Graduate Student Affairs Professional<br/>BGSU · College of Student Personnel</p>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[.18em] uppercase text-tertiary mb-4">Pages</p>
              <ul className="space-y-2" role="list">
                {['home','about','resume','competencies','artifacts','gallery','contact'].map(p => (
                  <li key={p}><button onClick={() => go(p)} className="text-sm text-onaccent/55 hover:text-onaccent transition-colors capitalize">{p}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold tracking-[.18em] uppercase text-tertiary mb-4">Contact</p>
              <ul className="space-y-2 text-sm" role="list">
                <li><a href="mailto:ophelim@bgsu.edu" className="text-onaccent/55 hover:text-onaccent transition-colors flex items-center gap-2"><i className="fa-solid fa-envelope text-xs" aria-hidden="true"></i>ophelim@bgsu.edu</a></li>
                <li className="flex items-center gap-2 text-onaccent/55"><i className="fa-solid fa-location-dot text-xs" aria-hidden="true"></i>Bowling Green, OH</li>
                <li><a href="https://www.linkedin.com/in/opheliaivymensah-" target="_blank" rel="noopener noreferrer" className="text-onaccent/55 hover:text-onaccent transition-colors flex items-center gap-2" aria-label="LinkedIn profile (opens in new tab)"><i className="fa-brands fa-linkedin text-xs" aria-hidden="true"></i>LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-onaccent/10 py-5 text-center text-xs text-onaccent/35">
            © 2026 Ophelia Ivy Mensah · Student Affairs Portfolio · Bowling Green State University
          </div>
        </footer>
      );
    }

    function SectionHeading({ eyebrow, title, subtitle, center }) {
      return (
        <div className={`mb-12 ${center ? 'text-center' : ''}`}>
          {eyebrow && <p className="text-xs font-bold tracking-[.22em] uppercase text-tertiary mb-3">{eyebrow}</p>}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">{title}</h1>
          {subtitle && <p className={`mt-4 text-secondary text-lg leading-relaxed ${center ? 'mx-auto' : ''} max-w-2xl`}>{subtitle}</p>}
        </div>
      );
    }

    function Accordion({ id, label, level, children, defaultOpen = false }) {
      const [open, setOpen] = useState(defaultOpen);
      return (
        <article className="border border-line rounded-xl overflow-hidden bg-surface shadow-sm shadow-ink/5 hover:shadow-md transition-shadow">
          <button id={`btn-${id}`} aria-expanded={open} aria-controls={`panel-${id}`}
            onClick={() => setOpen(v => !v)}
            className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-soft/70 transition-colors group gap-3">
            <div className="flex items-center gap-3 flex-wrap min-w-0">
              <Badge level={level} />
              <span className="font-serif text-lg font-semibold text-primary group-hover:text-accent transition-colors">{label}</span>
            </div>
            <i className={`fa-solid fa-chevron-down text-tertiary transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`} aria-hidden="true"></i>
          </button>
          <div id={`panel-${id}`} role="region" aria-labelledby={`btn-${id}`} className={`acc-panel ${open ? 'open' : 'closed'}`}>
            <div className="px-6 pb-6 pt-1">{children}</div>
          </div>
        </article>
      );
    }

    function PortfolioImage({ image, className = '', imgClassName = '', caption, priority = false }) {
      if (!image) return null;
      return (
        <figure className={`portfolio-media-frame ${className}`}>
          <img
            src={image.src}
            alt={image.alt}
            className={`block w-full h-full object-cover ${imgClassName}`}
            loading={priority ? 'eager' : 'lazy'}
          />
          {caption && <figcaption className="portfolio-caption">{caption}</figcaption>}
        </figure>
      );
    }

    function InlinePhotoCard({ imageId, eyebrow, title }) {
      const image = IMAGE_LIBRARY[imageId];
      return (
        <article className="rounded-[1.5rem] bg-surface/90 backdrop-blur-sm border border-line/80 shadow-[0_24px_60px_rgba(61,46,38,0.12)] overflow-hidden">
          <PortfolioImage image={image} className="aspect-[4/3]" />
          <div className="px-4 py-4">
            <p className="text-[11px] font-bold tracking-[.2em] uppercase text-tertiary mb-2">{eyebrow}</p>
            <h3 className="font-serif text-lg font-semibold text-primary">{title}</h3>
            <p className="text-sm text-secondary mt-1">{image.caption}</p>
          </div>
        </article>
      );
    }

    /* ── File Viewer Modal ── */
    function FileViewer({ artifact, onClose }) {
      const closeOnEsc = useCallback(e => { if (e.key === 'Escape') onClose(); }, [onClose]);
      useEffect(() => {
        document.addEventListener('keydown', closeOnEsc);
        document.body.style.overflow = 'hidden';
        return () => {
          document.removeEventListener('keydown', closeOnEsc);
          document.body.style.overflow = '';
        };
      }, [closeOnEsc]);

      const viewerUrl = React.useMemo(() => {
        if (!artifact.file) return null;
        if (artifact.type === 'PDF') return artifact.file;
        const assetUrl = artifact.file.startsWith('/')
          ? `${window.location.origin}${artifact.file}`
          : `${window.location.href.replace(/\/[^/]*(\?.*)?$/, '/')}${artifact.file}`;
        const encoded = encodeURIComponent(assetUrl);
        if (artifact.type === 'PPTX') return `https://view.officeapps.live.com/op/embed.aspx?src=${encoded}`;
        if (artifact.type === 'DOCX') return `https://docs.google.com/viewer?url=${encoded}&embedded=true`;
        return null;
      }, [artifact]);

      const fileIcon = artifact.type === 'PDF' ? 'fa-file-pdf' : artifact.type === 'PPTX' ? 'fa-file-powerpoint' : 'fa-file-word';

      return (
        <div
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
          role="dialog" aria-modal="true" aria-label={`Preview: ${artifact.name}`}
          onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
          <div className="bg-surface rounded-2xl w-full max-w-5xl flex flex-col shadow-2xl border border-line"
            style={{ height: '88vh' }}>
            {/* Header */}
            <div className="flex items-center gap-3 px-6 py-4 border-b border-line shrink-0">
              <i className={`fa-solid ${fileIcon} text-accent text-lg`} aria-hidden="true"></i>
              <h2 className="font-serif font-bold text-primary text-lg flex-1 truncate">{artifact.name}</h2>
              <span className="text-xs font-bold text-tertiary uppercase tracking-wider shrink-0">{artifact.type}</span>
              <button onClick={onClose}
                className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-soft transition-colors text-secondary hover:text-accent ml-2 shrink-0"
                aria-label="Close preview">
                <i className="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            {/* Viewer */}
            <div className="flex-1 overflow-hidden rounded-b-2xl">
              {viewerUrl ? (
                <iframe
                  src={viewerUrl}
                  className="w-full h-full border-0"
                  title={`Preview of ${artifact.name}`}
                  allowFullScreen />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-tertiary gap-4 py-16">
                  <i className="fa-solid fa-clock text-5xl opacity-30" aria-hidden="true"></i>
                  <p className="font-serif text-xl text-secondary">Preview coming soon</p>
                  <p className="text-sm text-tertiary text-center max-w-sm leading-relaxed">This artifact file will be available for preview before final submission.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    /* ============================================================
       APP ROOT
    ============================================================ */
    function App() {
      const { page, navigate } = usePathRouter();
      const [theme, toggleTheme] = useTheme();

      // Scroll to top + shift focus to main on page change
      useEffect(() => {
        window.scrollTo({ top:0, behavior:'auto' });
        document.getElementById('main')?.focus({ preventScroll:true });
      }, [page]);

      const PAGES = {
        home:         <HomePage navigate={navigate} />,
        about:        <AboutPage />,
        resume:       <ResumePage />,
        competencies: <CompetenciesPage navigate={navigate} />,
        artifacts:    <ArtifactsPage />,
        gallery:      <GalleryPage />,
        contact:      <ContactPage />,
      };

      return (
        <div className="min-h-screen flex flex-col bg-page text-primary transition-colors duration-300">
          <SkipLink />
          <Navbar page={page} navigate={navigate} theme={theme} toggleTheme={toggleTheme} />
          <main id="main" tabIndex={-1} className="flex-1 outline-none">
            <PageTransition page={page}>
              {PAGES[page] || PAGES.home}
            </PageTransition>
          </main>
          <Footer navigate={navigate} />
        </div>
      );
    }

    const mountApp = () => {
      ReactDOM.createRoot(document.getElementById('root')).render(<App />);
    };

    if (APP_MOTION_ENABLED) {
      mountApp();
    } else {
      window.addEventListener('motionready', mountApp, { once: true });
      window.setTimeout(() => {
        if (!document.getElementById('root')?.hasChildNodes()) mountApp();
      }, 1200);
    }
