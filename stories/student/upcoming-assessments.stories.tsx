import type { Meta, StoryObj } from "@storybook/react";
import { UpcomingAssessments } from "../../components/student/upcoming-assessments";

const meta: Meta<typeof UpcomingAssessments> = {
  title: "STUDENT/UpcomingAssessments",
  component: UpcomingAssessments,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof UpcomingAssessments>;

export const Default: Story = {
  args: {},
};
