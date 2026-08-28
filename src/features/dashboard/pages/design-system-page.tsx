import React, { useState } from 'react';
import { Palette, Layers, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CustomSelect } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup } from '@/components/ui/radio-group';
import { DatePicker } from '@/components/ui/date-picker';
import { Dropzone } from '@/components/ui/dropzone';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ConfirmDialog } from '@/components/ui/confirm-dialog';
import { AreaChart } from '@/components/ui/chart/area-chart';
import { DonutChart } from '@/components/ui/chart/donut-chart';
import { useToast } from '@/components/ui/toast';
import { SEOHead } from '@/components/common/seo-head';

export const DesignSystemPage: React.FC = () => {
  const toast = useToast();
  const [inputText, setInputText] = useState('');
  const [selectVal, setSelectVal] = useState('option-1');
  const [switchVal, setSwitchVal] = useState(true);
  const [radioVal, setRadioVal] = useState('opt-a');
  const [dateVal, setDateVal] = useState('2026-08-28');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const sampleChartData = [
    { label: 'Mon', series1: 240, series2: 180 },
    { label: 'Tue', series1: 380, series2: 290 },
    { label: 'Wed', series1: 520, series2: 410 },
    { label: 'Thu', series1: 490, series2: 440 },
    { label: 'Fri', series1: 680, series2: 590 },
  ];

  const sampleDonutData = [
    { name: 'Active Users', value: 4500, color: '#3b82f6' },
    { name: 'Pending Approvals', value: 1200, color: '#f59e0b' },
    { name: 'Archived', value: 650, color: '#64748b' },
  ];

  return (
    <div className="w-full space-y-8">
      <SEOHead title="Design System Playground" description="Interactive catalog of all ForgeUI design tokens and components" />

      {/* Header Banner */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Layers className="h-6 w-6 text-primary" /> Design System & Component Showcase
          </h1>
          <p className="text-sm text-muted-foreground">Interactive playground demonstrating all UI primitives and design tokens</p>
        </div>
        <Badge variant="info" className="text-xs px-3 py-1">
          <Palette className="h-3.5 w-3.5 mr-1" />
          Live Token Playground
        </Badge>
      </div>

      {/* SECTION 1: Buttons & Actions */}
      <Card>
        <CardHeader>
          <CardTitle>1. Buttons & Action Trigger Variants</CardTitle>
          <CardDescription>Primary, secondary, outline, danger, ghost, and loading states</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={() => toast.success('Primary action triggered!')}>
              Primary Button
            </Button>
            <Button variant="secondary" onClick={() => toast.info('Secondary button clicked')}>
              Secondary Button
            </Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="danger" leftIcon={<Trash2 className="h-4 w-4" />} onClick={() => setIsConfirmOpen(true)}>
              Danger Delete
            </Button>
            <Button variant="primary" isLoading={true}>
              Loading State
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* SECTION 2: Form Inputs & Validations */}
      <Card>
        <CardHeader>
          <CardTitle>2. Form Inputs, Validation & Custom Selects</CardTitle>
          <CardDescription>Required indicator asterisks (*), red border error states, and dropzones</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Input
              label="Standard Input Field"
              required={true}
              placeholder="Enter text..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              helperText="This field is required for submission"
            />

            <Input
              label="Validation Error State"
              required={true}
              error="Invalid email address format"
              value="invalid-email-format"
              onChange={() => {}}
            />

            <CustomSelect
              label="Custom Select Dropdown"
              required={true}
              value={selectVal}
              onChange={(val) => setSelectVal(String(val))}
              options={[
                { label: 'Option 1 - Enterprise Tier', value: 'option-1' },
                { label: 'Option 2 - Professional Tier', value: 'option-2' },
                { label: 'Option 3 - Developer Starter', value: 'option-3' },
              ]}
            />
          </div>

          <div className="space-y-4">
            <DatePicker
              label="Date Picker Component"
              required={true}
              value={dateVal}
              onChange={setDateVal}
            />

            <div className="flex items-center justify-between p-3 border border-border rounded-md bg-muted/30">
              <div>
                <label className="text-xs font-semibold text-foreground">Toggle Switch Component</label>
                <p className="text-[11px] text-muted-foreground">Enable or disable system notifications</p>
              </div>
              <Switch checked={switchVal} onChange={setSwitchVal} />
            </div>

            <RadioGroup
              label="Radio Group Selection"
              value={radioVal}
              onChange={setRadioVal}
              options={[
                { title: 'Option A (Recommended)', value: 'opt-a', description: 'Fastest response time' },
                { title: 'Option B (Standard)', value: 'opt-b', description: 'Normal response SLA' },
              ]}
            />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 3: File Upload Dropzone */}
      <Card>
        <CardHeader>
          <CardTitle>3. Drag & Drop File Upload</CardTitle>
          <CardDescription>File upload dropzone with size validation and preview</CardDescription>
        </CardHeader>
        <CardContent>
          <Dropzone
            onFileSelect={(file) => {
              if (file) toast.success(`Selected file: ${file.name}`);
            }}
            accept="image/*,.pdf"
            maxSizeMB={5}
          />
        </CardContent>
      </Card>

      {/* SECTION 4: Badges, Avatars & Statuses */}
      <Card>
        <CardHeader>
          <CardTitle>4. Badges, Avatars & Status Indicators</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="default">Default</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
          </div>

          <div className="flex items-center gap-4 pt-2">
            <Avatar name="Alex Rivera" size="sm" />
            <Avatar name="Sophia Chen" size="md" />
            <Avatar name="Marcus Vance" size="lg" />
          </div>
        </CardContent>
      </Card>

      {/* SECTION 5: SVG Charts & Sparklines */}
      <div className="grid gap-6 md:grid-cols-3">
        <AreaChart
          title="Interactive Area Chart"
          description="Bezier curve data trajectory"
          data={sampleChartData}
          series1Name="Series 1"
          series2Name="Series 2"
          className="md:col-span-2"
        />

        <DonutChart
          title="Donut Chart"
          description="Distribution summary"
          data={sampleDonutData}
          centerLabel="Total Users"
        />
      </div>

      {/* Confirm Dialog Modal */}
      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
          setIsConfirmOpen(false);
          toast.error('Item deleted from system.');
        }}
        title="Confirm Item Deletion"
        description="Are you sure you want to delete this resource? This action cannot be undone."
      />
    </div>
  );
};
