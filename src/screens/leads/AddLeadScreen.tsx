import React from 'react';
import { WorkflowScreen } from '../../components/common';

const AddLeadScreen: React.FC = () => (
  <WorkflowScreen title="Add Lead" subtitle="Create a lead in under 30 seconds." actionLabel="Save Lead"
    sections={[{ title: 'Client details', items: ['Client name', 'Phone number', 'Event type · Wedding', 'Event date · 17 Feb 2027'] }, { title: 'Lead details', items: ['Budget · ₹1,00,000', 'Source · Instagram', 'Follow up · Tomorrow', 'Notes'] }]} />
);
export default AddLeadScreen;
