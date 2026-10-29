import type { Meta, StoryObj } from "@storybook/react";
import { DepartmentPerformanceChart } from "../../components/institution/department-performance-chart";

const meta: Meta<typeof DepartmentPerformanceChart> = {
  title: "INSTITUTION/DepartmentPerformanceChart",
  component: DepartmentPerformanceChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DepartmentPerformanceChart>;

export const Default: Story = {
  args: {},
};
