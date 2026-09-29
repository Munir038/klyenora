import React from 'react';
import { WorkflowScreen } from '../../components/common';
const SettingsScreen: React.FC = () => (
  <WorkflowScreen title="Settings" subtitle="Manage your studio and preferences."
    sections={[{ title: 'Studio', items: ['Studio profile', 'Packages & templates', 'Team members'] }, { title: 'App', items: ['Notifications', 'Backup & export', 'Help & support'] }]} />
);
export default SettingsScreen;
