import type { Meta, StoryObj } from "@storybook/react";
import { LearningPath } from "../../components/student/learning-path";

const meta: Meta<typeof LearningPath> = {
  title: "STUDENT/LearningPath",
  component: LearningPath,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LearningPath>;

export const Default: Story = {
  args: {},
};
