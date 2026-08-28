import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart } from '@/components/ui/chart';
import { MultiSelect } from '@/components/ui/multi-select';
import { DatePicker } from '@/components/ui/date-picker';
import { FileUpload } from '@/components/ui/file-upload';

export const DashboardCharts: React.FC = () => {
  const sampleChartData = [
    { label: 'Jan', value: 320 },
    { label: 'Feb', value: 450 },
    { label: 'Mar', value: 290 },
    { label: 'Apr', value: 610 },
    { label: 'May', value: 840 },
    { label: 'Jun', value: 920 },
  ];

  const skillOptions = [
    { value: 'react', label: 'React 19' },
    { value: 'vite', label: 'Vite 6' },
    { value: 'tailwind', label: 'Tailwind CSS v4' },
    { value: 'typescript', label: 'TypeScript 5' },
    { value: 'query', label: 'TanStack Query v5' },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <BarChart
        title="Monthly User Registrations"
        description="Total new user signups for H1 2026"
        data={sampleChartData}
      />

      <Card>
        <CardHeader>
          <CardTitle>Enterprise Form Controls</CardTitle>
          <CardDescription>Multi-select, Date Picker, and File Upload components</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <MultiSelect
            label="Selected Tech Stack"
            options={skillOptions}
            value={['react', 'tailwind']}
          />
          <DatePicker label="Project Start Date" defaultValue="2026-08-28" />
          <FileUpload label="Upload Project Attachments" maxSizeMB={5} accept="image/*,.pdf" />
        </CardContent>
      </Card>
    </div>
  );
};
