import React from 'react';
import { WorkflowScreen } from '../../components/common';

const ClientListScreen: React.FC = () => (
  <WorkflowScreen title="Clients" subtitle="Confirmed and past customers." actionLabel="+ Add Client"
    sections={[{ title: 'Active', items: ['Rahul & Priya · Wedding · ₹1.20L', 'Aman & Neha · Wedding · ₹95K'] }, { title: 'Completed', items: ['Rohit & Simran · Pre-wedding · ₹35K'] }]} />
);
export default ClientListScreen;
