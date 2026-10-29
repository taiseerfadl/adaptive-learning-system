import type { Meta, StoryObj } from "@storybook/react";
import { LearningVelocityChart } from "../../components/analytics/learning-velocity-chart";

const meta: Meta<typeof LearningVelocityChart> = {
  title: "ANALYTICS/LearningVelocityChart",
  component: LearningVelocityChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LearningVelocityChart>;

export const Default: Story = {
  args: {},
};
