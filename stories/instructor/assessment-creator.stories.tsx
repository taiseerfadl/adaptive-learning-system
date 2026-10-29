import type { Meta, StoryObj } from "@storybook/react";
import { AssessmentCreator } from "../../components/instructor/assessment-creator";

const meta: Meta<typeof AssessmentCreator> = {
  title: "INSTRUCTOR/AssessmentCreator",
  component: AssessmentCreator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AssessmentCreator>;

export const Default: Story = {
  args: {},
};
