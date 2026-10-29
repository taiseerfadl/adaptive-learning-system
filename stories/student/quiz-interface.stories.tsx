import type { Meta, StoryObj } from "@storybook/react";
import { QuizInterface } from "../../components/student/quiz-interface";

const meta: Meta<typeof QuizInterface> = {
  title: "STUDENT/QuizInterface",
  component: QuizInterface,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuizInterface>;

export const Default: Story = {
  args: {},
};
