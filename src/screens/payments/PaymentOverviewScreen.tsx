import React from 'react';
import { WorkflowScreen } from '../../components/common';
const PaymentOverviewScreen: React.FC = () => (
  <WorkflowScreen title="Payments" subtitle="Track only what is due and received." actionLabel="+ Record Payment"
    metrics={[{ label: 'Pending', value: '₹2.80L' }, { label: 'Overdue', value: '₹55K' }]}
    sections={[{ title: 'Overdue', items: ['Rahul & Priya · ₹30,000 · Due 20 Sep'] }, { title: 'Upcoming', items: ['Aman & Neha · ₹40,000 · Due 30 Sep', 'Rohit & Simran · ₹25,000 · Due 04 Oct'] }]} />
);
export default PaymentOverviewScreen;
