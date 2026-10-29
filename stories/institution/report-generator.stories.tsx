import type { Meta, StoryObj } from "@storybook/react";
import { ReportGenerator } from "../../components/institution/report-generator";

const meta: Meta<typeof ReportGenerator> = {
  title: "INSTITUTION/ReportGenerator",
  component: ReportGenerator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReportGenerator>;

export const Default: Story = {
  args: {},
};
