import type { CorpId } from './corps'

export type Employer = {
  corp: CorpId
  location: string
  period: string
  /** Most recent first. */
  roles: readonly string[]
  highlights: readonly string[]
}

export type Project = {
  /** Also names the emblem at `/assets/art/projects/{id}.webp`. */
  id: string
  customer: CorpId
  title: string
  domain: string
  period?: string
  role?: string
  context: string
  highlights: readonly string[]
  stack: readonly string[]
  team?: string
}

export type Metric = {
  value: string
  label: string
  detail: string
}

export type RecordGroup = {
  title: string
  items: readonly string[]
}

export const EMPLOYERS: readonly Employer[] = [
  {
    corp: 'arasaka',
    location: 'Wrocław, Poland',
    period: 'Jan 2018 — Present',
    roles: ['Lead Software Engineer', 'Senior Software Engineer'],
    highlights: [
      'Promoted to Development Team Lead in Feb 2022 on a global investment platform.',
      'Passed the Lead .NET (L4) assessment; certified technical interviewer.',
    ],
  },
  {
    corp: 'militech',
    location: 'Wrocław, Poland',
    period: 'Jan 2017 — Dec 2017',
    roles: ['Senior Software Developer'],
    highlights: [
      'Senior engineer and team lead on banking reporting and trading systems.',
    ],
  },
  {
    corp: 'arasaka',
    location: 'Vinnytsia, Ukraine',
    period: 'Jul 2014 — Jan 2017',
    roles: ['Senior Software Engineer · Key Developer'],
    highlights: [
      'Built microservices for a loans and payments platform with 85%+ test coverage.',
    ],
  },
]

export const PROJECTS: readonly Project[] = [
  {
    id: 'investment-platform',
    customer: 'nightCorp',
    title: 'Limited Partners platform',
    domain: 'Global investment · asset management',
    period: 'Nov 2020 — Present',
    role: 'Full-stack Engineer → Development Team Lead (Feb 2022)',
    context:
      'A cloud-native platform giving Limited Partners secure access to financial data, documents and reporting. Over six years it grew from a single web portal into a family of independent applications — Documents, Investor Opportunities and Data Rooms portals — plus an internal platform for finance and operations, including a document posting service and controlled data distribution.',
    highlights: [
      'Led the transformation from a .NET monolith to microservices, then to serverless on AWS.',
      'Designed and implemented 50+ Lambda functions and the distributed backend services around them.',
      'Designed the Data Rooms architecture for secure document sharing.',
      'Migrated the backend from .NET to Node.js / TypeScript and the database from MSSQL to PostgreSQL, including the data-migration strategy.',
      'Cut response times by up to 40% and infrastructure cost by about 30%; kept unit-test coverage above 80%.',
      'Introduced AI-assisted SDLC practices with Claude, Cursor and GitHub Copilot across the team.',
    ],
    stack: [
      'AWS Lambda',
      'API Gateway',
      'DynamoDB',
      'SQS',
      'S3',
      'Node.js',
      'TypeScript',
      '.NET',
      'React',
      'PostgreSQL',
    ],
    team: '~10 · backend, frontend, QA, DevOps',
  },
  {
    id: 'website-builder',
    customer: 'kangTao',
    title: 'Enterprise website builder',
    domain: 'Banking · digital publishing',
    period: 'Aug 2020 — Nov 2020',
    role: 'Frontend Developer · Key Developer',
    context:
      'An enterprise-grade drag-and-drop website builder inside the bank’s infrastructure, built on Adobe Experience Manager, letting global publishers create and manage content-driven sites.',
    highlights: [
      'Built a library of reusable React and Redux components, improving consistency and delivery speed.',
      'Established a scalable SCSS styling system following BEM.',
      'Introduced Jest unit testing to raise frontend reliability.',
      'Took part in architecture discussions and cross-team collaboration.',
    ],
    stack: ['React', 'Redux', 'Jest', 'SCSS', 'Java', 'AEM'],
  },
  {
    id: 'call-tracking',
    customer: 'ziggurat',
    title: 'Call tracking & reporting',
    domain: 'Property advertising · analytics',
    period: 'Jun 2019 — Jun 2020',
    role: 'Development Team Leader · Key Developer',
    context:
      'Call analytics for property advertisements: answered, missed and voicemail-redirected calls reported back to advertisers, with the platform integrated into an external call-tracking vendor.',
    highlights: [
      'Designed the architecture for the proof of concept and the MVP delivery plan.',
      'Led a team of ~9 engineers and coordinated cross-team work.',
      'Fully refactored the reporting engine and built new call-data reports.',
      'Added a REST service to manage, establish and retrieve phone-call data, and reworked the ad-creation flow.',
      'Delivered data-migration tools and improved legacy maintainability.',
    ],
    stack: [
      'ASP.NET MVC 5',
      '.NET Core',
      'Web API',
      'WCF',
      'WPF',
      'React',
      'Sass',
      'MSSQL',
    ],
    team: '~9 engineers',
  },
  {
    id: 'accounts-web',
    customer: 'zetatech',
    title: 'Accounts management portal',
    domain: 'Property data · rental management',
    period: 'Jul 2018 — Feb 2019',
    role: 'Key Developer · Solution Architect',
    context:
      'An Angular single-page app hosted in ASP.NET Core, where the backend acts as a secure proxy to internal services so certificates never reach external users. The architecture follows CQRS.',
    highlights: [
      'Contributed to every service in the system.',
      'Owned the user-permission system over a legacy schema that could not change — modelled with DDD, a ubiquitous language and aggregate roots.',
      'Worked directly with client engineering leadership on design and negotiation.',
      'Delivered the project on schedule.',
    ],
    stack: ['ASP.NET Core 2.1', 'Angular 6+', 'TypeScript', 'CQRS', 'DDD', 'AS/400'],
  },
  {
    id: 'accounts-automation',
    customer: 'zetatech',
    title: 'Automated accounts service',
    domain: 'Property data · back office',
    period: 'Apr 2018 — Jul 2018',
    context:
      'An ASP.NET Core microservice for creating and editing customer accounts. Complex business transactions run as Sagas over a Rebus message bus instead of two-phase commit, and a Facade with Command objects talks to legacy AS/400 databases.',
    highlights: [
      'Built key features: event handlers, services and the legacy-integration layer.',
      'Met a 90%+ unit-test coverage requirement with unit and integration suites.',
      'Analysed and documented legacy code, including UML for algorithms and processes.',
      'Ran demos and code reviews.',
    ],
    stack: ['ASP.NET Core 2.1', 'Entity Framework', 'Rebus', 'xUnit', 'Moq', 'Serilog'],
  },
  {
    id: 'reporting-engine',
    customer: 'kangTao',
    title: 'Banking reporting engine',
    domain: 'Banking · reporting & notifications',
    period: '2017',
    role: 'Senior Software Engineer · Team Lead',
    context:
      'A large, secure reporting platform of 40+ interconnected services, aggregating and processing financial data from multiple internal banking systems for business and analytics teams.',
    highlights: [
      'Led development and support of reporting components and services.',
      'Designed reporting workflows on Microsoft Workflow Foundation.',
      'Built data-processing and report-generation pipelines across internal systems.',
      'Delivered reports over FTP/FTPS, SharePoint, email and file shares.',
      'Raised reliability of legacy components through refactoring and tests.',
    ],
    stack: ['C#', 'VB.NET', 'ASP.NET Web API 2', 'OData', 'WCF', 'NUnit'],
  },
  {
    id: 'fx-trading',
    customer: 'kangTao',
    title: 'FX trading desktop',
    domain: 'Banking · global currency markets',
    period: '2017',
    role: 'Software Developer',
    context:
      'A desktop application for traders to create, edit and review trades on the global currency market, with layered security and separate clients for Singapore, the USA, Europe and Switzerland.',
    highlights: [
      'Rewrote legacy code, fixed defects and shipped new features in a 3-developer team.',
      'Joined design discussions and helped resolve hard technical issues.',
      'Worked with customer support and took part in customer negotiations.',
    ],
    stack: ['C#', 'VB.NET', '.NET Framework'],
    team: '3 developers',
  },
  {
    id: 'learning-suite',
    customer: 'arasaka',
    title: 'Learning suite',
    domain: 'Education · internal platform',
    role: 'Performance expert',
    context:
      'An ecosystem of standalone but integrated apps covering the company’s learning function: an education marketplace, training management, programme and mentoring workflows, and language assessment.',
    highlights: [
      'Optimised a critical section of the application as a performance expert.',
      'Increased database-layer throughput and cut load times for filtered pages.',
      'Refactored data access from Unit of Work / Repository to the Specification pattern.',
    ],
    stack: ['ASP.NET MVC', 'C#', 'Entity Framework', 'React', 'Sass'],
  },
  {
    id: 'assessment',
    customer: 'arasaka',
    title: 'Assessment management',
    domain: 'Education · internal platform',
    context:
      'A web system for running the company’s assessment process: requests, expert committees, interview sessions and feedback, with access levels by role and position.',
    highlights: [
      'Migrated synchronisation from static API calls to Apache Kafka streams.',
      'Enabled fault-tolerant, durable publish/subscribe processing of records as they occur.',
    ],
    stack: ['.NET', 'C#', 'Apache Kafka'],
    team: '13 · dev, QA, frontend, coordination',
  },
  {
    id: 'payments',
    customer: 'petrochem',
    title: 'Loans & payments platform',
    domain: 'Fintech · loans and payments',
    period: 'Jul 2014 — Jan 2017',
    role: 'Backend Developer',
    context:
      'Payment-platform microservices on ASP.NET Web API with internal Node.js services for statistics and aggregation, and an AngularJS front end. Built with distributed remote teams alongside finance and risk departments.',
    highlights: [
      'Built new microservices secured with a customised IdentityServer3 and OAuth.',
      'Kept unit-test coverage at 85% minimum, above 90% on some services, with TDD, ATDD and DDD.',
      'Set up environments, wrote technical documentation and supported customer negotiations.',
    ],
    stack: [
      'ASP.NET Web API',
      'Node.js',
      'Express',
      'AngularJS',
      'MySQL',
      'NHibernate',
      'xUnit',
    ],
    team: '10 developers',
  },
]

export const IMPACT_HEADLINE = '99.9%+ availability · up to 40% faster · ~30% lower cost'

export const IMPACT_INTRO =
  'Measured outcomes from leading the modernization of a global investment platform — a legacy .NET Framework monolith taken to microservices and then to a serverless AWS architecture on Node.js and TypeScript.'

export const IMPACT: readonly Metric[] = [
  {
    value: '99.9%+',
    label: 'Availability',
    detail: 'Blue-green deployments and data replication.',
  },
  {
    value: '−40%',
    label: 'Response time',
    detail: 'From ~800 ms to ~300 ms through caching and CQRS.',
  },
  {
    value: '~30%',
    label: 'Lower infra cost',
    detail: 'Moving always-on compute to serverless.',
  },
  {
    value: '50+',
    label: 'Lambda functions',
    detail: 'Designed and shipped across distributed services.',
  },
  {
    value: '80%+',
    label: 'Test coverage',
    detail: 'Unit-test bar held through every migration.',
  },
  {
    value: '~10',
    label: 'Engineers led',
    detail: 'Backend, frontend, QA and DevOps in one team.',
  },
]

export const IMPACT_RECORD: readonly RecordGroup[] = [
  {
    title: 'Architecture & modernization',
    items: [
      'Grew a single web portal into a platform of independent, purpose-built applications over six years.',
      'Migrated MSSQL to PostgreSQL and the backend from .NET to Node.js / TypeScript, including the data-migration strategy.',
      'Designed the Data Rooms architecture for secure document sharing.',
    ],
  },
  {
    title: 'AI-native delivery',
    items: [
      'Introduced AI-assisted SDLC practices — Claude, Cursor, GitHub Copilot — improving delivery speed, code quality and productivity.',
      'Recognised internally as an AI Advocate.',
    ],
  },
  {
    title: 'Leadership & quality',
    items: [
      'Leading engineering teams since 2017; development team lead on the investment platform since Feb 2022.',
      'Certified technical interviewer; passed the Lead .NET (L4) and Senior .NET (L3) assessments.',
      'Held 85–90%+ unit-test coverage on regulated fintech and banking systems.',
    ],
  },
]
