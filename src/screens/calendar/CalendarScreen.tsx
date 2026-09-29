import React from 'react';
import { WorkflowScreen } from '../../components/common';
const CalendarScreen: React.FC = () => (
  <WorkflowScreen title="Calendar" subtitle="September 2026" actionLabel="+ Add event"
    sections={[{ title: '26 September', items: ['10:00 · Follow up · Rahul', '14:30 · Payment due · Aman', '18:00 · Pre-wedding shoot · Riya'] }, { title: 'This week', items: ['27 Sep · Wedding · Priya & Karan', '30 Sep · Pre-wedding · Aman & Neha'] }]} />
);
export default CalendarScreen;
