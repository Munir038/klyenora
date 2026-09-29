import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SPACING } from '../../constants/dimensions';
import { Button } from './Button';
import { Card } from './Card';
import { Screen } from './Screen';
import { Text } from './Text';
import { FONT_FAMILY } from '@/constants';
import { ms } from '@/utils';

interface WorkflowSection {
  title: string;
  items: string[];
}

interface WorkflowScreenProps {
  title: string;
  subtitle: string;
  actionLabel?: string;
  metrics?: Array<{ label: string; value: string }>;
  sections: WorkflowSection[];
}

export const WorkflowScreen: React.FC<WorkflowScreenProps> = ({
  title,
  subtitle,
  actionLabel,
  metrics = [],
  sections,
}) => (
  <Screen scrollable>
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text variant="bodySmall" style={styles.subtitle}>{subtitle}</Text>
      {actionLabel ? <Button title={actionLabel} onPress={() => undefined} /> : null}
      {metrics.length ? (
        <View style={styles.metrics}>
          {metrics.map(metric => (
            <Card key={metric.label} style={styles.metric} elevated={false}>
              <Text variant="caption" color="#667085">{metric.label}</Text>
              <Text variant="h4">{metric.value}</Text>
            </Card>
          ))}
        </View>
      ) : null}
      {sections.map(section => (
        <View key={section.title} style={styles.section}>
          <Text variant="overline">{section.title}</Text>
          {section.items.map(item => (
            <Card key={item} style={styles.item} elevated={false}>
              <Text variant="bodySmall">{item}</Text>
            </Card>
          ))}
        </View>
      ))}
    </View>
  </Screen>
);

const styles = StyleSheet.create({
  title: { fontFamily: FONT_FAMILY.semiBold, fontSize: ms(18) },
  content: { gap: SPACING.lg, paddingBottom: SPACING.massive },
  subtitle: { marginTop: -SPACING.sm, color: '#667085', fontFamily: FONT_FAMILY.medium },
  metrics: { flexDirection: 'row', gap: SPACING.sm },
  metric: { flex: 1, gap: SPACING.xs },
  section: { gap: SPACING.sm },
  item: { paddingVertical: SPACING.md },
});
