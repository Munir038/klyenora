import React from 'react';
import { WorkflowScreen } from '../../components/common';
const WhatsAppActionsScreen: React.FC = () => (
  <WorkflowScreen title="WhatsApp Actions" subtitle="Review a message, then send it in WhatsApp."
    sections={[{ title: 'Payment reminder', items: ['Rahul owes ₹50,000 for the wedding booking due 10 Feb.'] }, { title: 'Follow-ups', items: ['Send quotation follow-up', 'Request album selection', 'Ask for Google review'] }]} />
);
export default WhatsAppActionsScreen;
