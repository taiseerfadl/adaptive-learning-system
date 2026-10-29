import type { Meta, StoryObj } from "@storybook/react";
import { ReportPreview } from "../../components/institution/report-preview";

const meta: Meta<typeof ReportPreview> = {
  title: "INSTITUTION/ReportPreview",
  component: ReportPreview,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReportPreview>;

export const Default: Story = {
  args: {},
};
