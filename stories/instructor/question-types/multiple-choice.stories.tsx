import type { Meta, StoryObj } from "@storybook/react";
import { MultipleChoice } from "../../../components/instructor/question-types/multiple-choice";

const meta: Meta<typeof MultipleChoice> = {
  title: "INSTRUCTOR\QUESTION-TYPES/MultipleChoice",
  component: MultipleChoice,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof MultipleChoice>;

export const Default: Story = {
  args: {},
};
