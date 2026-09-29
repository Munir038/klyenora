import React from 'react';
import { WorkflowScreen } from '../../components/common';
const EventsScreen: React.FC = () => (
  <WorkflowScreen title="Wedding Events" subtitle="All shoot events for this booking." actionLabel="+ Add Event"
    sections={[{ title: 'February 2027', items: ['02 Feb · Pre-wedding · Lodhi Garden · 07:00 AM', '15 Feb · Mehendi · Bride residence · 04:00 PM', '17 Feb · Wedding · Leela Palace · 06:00 PM'] }]} />
);
export default EventsScreen;
