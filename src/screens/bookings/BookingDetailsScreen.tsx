import React from 'react';
import { WorkflowScreen } from '../../components/common';
const BookingDetailsScreen: React.FC = () => (
  <WorkflowScreen title="Rahul & Priya" subtitle="Premium Wedding · 17 February 2027"
    metrics={[{ label: 'Received', value: '₹30K' }, { label: 'Pending', value: '₹90K' }]}
    sections={[{ title: 'Events', items: ['Pre-wedding · 02 Feb', 'Mehendi · 15 Feb', 'Haldi · 16 Feb', 'Wedding · 17 Feb', 'Reception · 18 Feb'] }, { title: 'Project', items: ['7 tasks remaining', '2 payments upcoming', '4 notes'] }]} />
);
export default BookingDetailsScreen;
