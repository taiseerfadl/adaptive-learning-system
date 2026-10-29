import type { Meta, StoryObj } from "@storybook/react";
import { TrueFalse } from "../../../components/instructor/question-types/true-false";

const meta: Meta<typeof TrueFalse> = {
  title: "INSTRUCTOR\QUESTION-TYPES/TrueFalse",
  component: TrueFalse,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TrueFalse>;

export const Default: Story = {
  args: {},
};
