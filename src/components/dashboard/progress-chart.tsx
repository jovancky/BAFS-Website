'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { ChartTooltip, ChartTooltipContent, ChartContainer } from '@/components/ui/chart';

const chartData = [
  { month: 'January', progress: 186 },
  { month: 'February', progress: 305 },
  { month: 'March', progress: 237 },
  { month: 'April', progress: 273 },
  { month: 'May', progress: 209 },
  { month: 'June', progress: 214 },
];

const chartConfig = {
  progress: {
    label: 'Progress',
    color: 'hsl(var(--primary))',
  },
};

export default function ProgressChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="progress" fill="var(--color-progress)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
