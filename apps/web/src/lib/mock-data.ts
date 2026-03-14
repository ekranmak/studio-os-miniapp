export const dashboardMetrics = [
  { label: 'Активные проекты', value: '18', hint: '+4 за неделю' },
  { label: 'MRR', value: '1.84M RUB', hint: 'Платежи и ретейнеры' },
  { label: 'Новые заявки', value: '27', hint: '9 требуют ответа AI' },
  { label: 'Задачи сегодня', value: '41', hint: '12 просрочено' },
];

export const leads = [
  {
    id: 'LD-1024',
    name: 'Ирина Соколова',
    company: 'B2B Academy',
    channel: 'Telegram Ads',
    budget: '420 000 RUB',
    summary: 'Лендинг + CRM интеграция + контентный блог.',
    status: 'hot',
  },
  {
    id: 'LD-1025',
    name: 'Алексей Воронцов',
    company: 'North Build',
    channel: 'Website form',
    budget: '1 200 000 RUB',
    summary: 'Корпоративный сайт с калькулятором и личным кабинетом.',
    status: 'qualified',
  },
  {
    id: 'LD-1026',
    name: 'Мария Белова',
    company: 'Bloom Clinic',
    channel: 'Referral',
    budget: '680 000 RUB',
    summary: 'Медицинский сайт с онлайн записью и SEO блоком.',
    status: 'new',
  },
];

export const projects = [
  { id: 'PR-77', name: 'North Build Platform', client: 'North Build', price: '1 200 000 RUB', stage: 'Development', progress: 62 },
  { id: 'PR-74', name: 'Bloom Clinic Website', client: 'Bloom Clinic', price: '680 000 RUB', stage: 'Contract', progress: 28 },
  { id: 'PR-69', name: 'B2B Academy Funnel', client: 'B2B Academy', price: '420 000 RUB', stage: 'Testing', progress: 84 },
];

export const tasks = [
  { id: 'TS-441', title: 'Подготовить финальный scope', owner: 'AI Planner', deadline: 'Сегодня, 18:00', status: 'in-review' },
  { id: 'TS-442', title: 'Согласовать договор подряда', owner: 'Юрист', deadline: 'Завтра, 12:00', status: 'blocked' },
  { id: 'TS-443', title: 'Сгенерировать ТЗ v2', owner: 'Technical Spec Agent', deadline: 'Сегодня, 16:30', status: 'done' },
];

export const documents = [
  { id: 'DOC-19', type: 'Contract', name: 'Договор подряда №19', format: 'DOCX / PDF', status: 'ready' },
  { id: 'DOC-20', type: 'Act', name: 'Акт выполненных работ March', format: 'DOCX / PDF', status: 'draft' },
  { id: 'DOC-21', type: 'TZ', name: 'Техническое задание Bloom Clinic', format: 'DOCX / PDF', status: 'ai-generated' },
];

export const aiAgents = [
  'Lead Intelligence Agent',
  'Technical Specification Agent',
  'Contract Agent',
  'Project Planner Agent',
  'Finance & Estimation Agent',
];
