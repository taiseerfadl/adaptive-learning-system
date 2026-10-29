import type { Meta, StoryObj } from "@storybook/react";
import { StudyPlan } from "../../components/student/study-plan";

const meta: Meta<typeof StudyPlan> = {
  title: "STUDENT/StudyPlan",
  component: StudyPlan,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudyPlan>;

export const Default: Story = {
  args: {},
};
