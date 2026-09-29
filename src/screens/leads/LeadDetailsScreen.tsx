import React from 'react';
import { WorkflowScreen } from '../../components/common';

const LeadDetailsScreen: React.FC = () => (
  <WorkflowScreen title="Rahul & Priya" subtitle="Wedding · 17 Feb 2027 · Gurgaon" actionLabel="Convert to Booking"
    metrics={[{ label: 'Budget', value: '₹1.20L' }, { label: 'Status', value: 'Quote sent' }]}
    sections={[{ title: 'Next action', items: ['Follow up tomorrow · 10:00 AM', 'WhatsApp reminder', 'Call client'] }, { title: 'Activity', items: ['Today · Quotation sent', 'Yesterday · Lead created'] }]} />
);
export default LeadDetailsScreen;
