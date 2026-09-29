import React from 'react';
import { WorkflowScreen } from '../../components/common';

const DashboardScreen: React.FC = () => (
  <WorkflowScreen title="Good morning, Rahul" subtitle="Here is what needs attention today."
    metrics={[{ label: 'Expected', value: '₹2.45L' }, { label: 'Received', value: '₹1.65L' }, { label: 'Pending', value: '₹80K' }]}
    sections={[{ title: 'Today', items: ['₹35,000 overdue · Aman & Riya', 'Follow up quotation · Rahul & Neha', 'Shoot today · Priya & Karan · 4:00 PM'] }, { title: 'Upcoming shoots', items: ['27 Sep · Wedding', '30 Sep · Pre-wedding', '04 Oct · Engagement'] }]} />
);

export default DashboardScreen;
