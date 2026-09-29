import React from 'react';
import { WorkflowScreen } from '../../components/common';

const LeadPipelineScreen: React.FC = () => (
  <WorkflowScreen title="Leads" subtitle="Capture every enquiry and follow up on time." actionLabel="+ Add Lead"
    metrics={[{ label: 'New', value: '12' }, { label: 'Follow-up', value: '6' }, { label: 'Booked', value: '8' }]}
    sections={[{ title: 'Follow-up today', items: ['Rahul & Priya · Wedding · ₹1.20L', 'Aman & Neha · Quote sent · ₹85K'] }, { title: 'Recently booked', items: ['Rohit & Simran · Wedding · ₹1.40L'] }]} />
);
export default LeadPipelineScreen;
