export type StackGroup = {
  area: string
  items: readonly string[]
}

export const PROFILE = {
  name: 'Serhii Voznyi',
  firstName: 'Serhii',
  lastName: 'Voznyi',
  handle: 'SERHII-VOZNYI#1991',
  role: 'Lead Software Engineer',
  title: 'Claude-native Solution Architect · AWS, Azure, .NET',
  location: 'Wrocław, Poland',
  experience: '12+ years',
  summary:
    'Claude-native solution architect. I design cloud platforms on AWS and Azure — and the AI-assisted engineering systems that build them — backed by 12+ years of architecture in fintech and banking.',
  about:
    'I treat AI as part of the architecture, not a plug-in. On a global investment platform I introduced AI-assisted delivery across the team — Claude, Cursor and GitHub Copilot — with shared conventions and human code review, improving delivery speed, code quality and engineering productivity. That work rests on a long cloud record: taking a legacy .NET monolith to microservices and then to serverless AWS, with 99.9%+ availability, up to 40% faster responses and about 30% lower infrastructure cost.',
  careerSummary:
    'Engineer, team leader and solution architect across fintech, banking and enterprise — designing and delivering scalable cloud-native systems on .NET, Node.js, AWS and Azure.',
  values:
    'I am motivated by professional growth, meaningful work and a healthy work environment. I value honesty, respect and recognition, and bring long-term commitment when these are present.',
  focus: [
    'Claude-native engineering: agent roles, project rules, skills and review loops built into the SDLC',
    'AI-assisted delivery at team scale with Claude, Cursor and GitHub Copilot',
    'Solution architecture for distributed, event-driven and serverless systems on AWS and Azure',
    'Legacy modernization — monolith to microservices to serverless — and leading the teams that do it',
  ],
  stack: ['Claude', 'C#', '.NET', 'TypeScript', 'AWS', 'Azure'],
  stackGroups: [
    {
      area: 'AI engineering',
      items: [
        'Claude',
        'Claude Code',
        'Cursor',
        'GitHub Copilot',
        'Agentic workflows',
        'Context engineering',
      ],
    },
    { area: 'Languages', items: ['C#', 'TypeScript', 'JavaScript', 'VB.NET'] },
    { area: '.NET', items: ['.NET 5–10', 'ASP.NET Core', 'Web API', 'Entity Framework'] },
    {
      area: 'AWS · 6+ years',
      items: [
        'Lambda',
        'API Gateway',
        'DynamoDB',
        'S3',
        'SQS / SNS',
        'Aurora / RDS',
        'Fargate',
        'CloudWatch',
      ],
    },
    {
      area: 'Azure · 3+ years',
      items: ['AKS', 'Container Apps', 'Service Bus', 'Cosmos DB', 'Azure SQL'],
    },
    { area: 'Front end', items: ['React', 'Angular', 'Node.js', 'Sass', 'Mantine'] },
    { area: 'Data', items: ['SQL Server', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis'] },
    { area: 'Practices', items: ['CQRS', 'Saga', 'DDD', 'TDD / BDD', 'Scrum / Kanban'] },
  ] satisfies readonly StackGroup[],
  glance: [
    { label: 'Focus', value: 'AI-native delivery' },
    { label: 'Toolchain', value: 'Claude · Cursor' },
    { label: 'Cloud', value: 'AWS · Azure' },
    { label: 'In the field', value: '12+ years' },
  ],
  education: {
    degree: "Master's degree",
    field: 'Software for Automated Systems · Information Technology and Programming',
    school: 'Vinnytsia National Technical University',
    note: 'Average 97.5 — honours degree',
  },
  languages: [
    { name: 'Ukrainian', level: 'Native' },
    { name: 'Russian', level: 'C2' },
    { name: 'English', level: 'B2+' },
    { name: 'Polish', level: 'B1' },
  ],
  credentials: [
    'Certified Technical Interviewer',
    'Lead .NET (L4) assessment passed',
    'Senior .NET (L3) assessment passed',
    'AI Advocate · AI-assisted SDLC',
  ],
  talkAbout: [
    'Solution architecture',
    'AI-native engineering',
    'Claude & agents',
    'AWS · Azure',
    'Engineering leadership',
  ],
  topics:
    'Glad to exchange views on solution architecture, Claude-native engineering, cloud platforms on AWS and Azure, and engineering leadership.',
  availability: {
    status: 'Not actively looking · open to discuss',
    statement:
      'I am fully committed to my current role and not actively seeking new opportunities.',
    invitation:
      'That said, I am always glad to hear about meaningful work. If you have a proposal — a solution architecture challenge, an AI adoption initiative or a senior engineering leadership role — send a short outline of the context and we can discuss it.',
  },
  links: {
    linkedIn: 'https://www.linkedin.com/in/serhii-voznyi/',
    gitHub: 'https://github.com/SerhiiVoznyi',
    email: 'mailto:serhiivoznyi@gmail.com',
  },
} as const
