import type { Meta, StoryObj } from "@storybook/react";
import { QuestionBuilder } from "../../components/instructor/question-builder";

const meta: Meta<typeof QuestionBuilder> = {
  title: "INSTRUCTOR/QuestionBuilder",
  component: QuestionBuilder,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionBuilder>;

export const Default: Story = {
  args: {},
};
