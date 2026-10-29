import type { Meta, StoryObj } from "@storybook/react";
import { Matching } from "../../../components/instructor/question-types/matching";

const meta: Meta<typeof Matching> = {
  title: "INSTRUCTOR\QUESTION-TYPES/Matching",
  component: Matching,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Matching>;

export const Default: Story = {
  args: {},
};
