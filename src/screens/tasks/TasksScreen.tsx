import React from 'react';
import { WorkflowScreen } from '../../components/common';
const TasksScreen: React.FC = () => (
  <WorkflowScreen title="Tasks & Reminders" subtitle="Keep every wedding moving." actionLabel="+ Add Task"
    sections={[{ title: 'Today', items: ['Follow up Rahul', 'Send quotation Neha', 'Confirm venue Aman', 'Collect ₹25K from Rohit'] }, { title: 'Tomorrow', items: ['Pre-wedding shoot', 'Call second photographer'] }]} />
);
export default TasksScreen;
