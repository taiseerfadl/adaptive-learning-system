import type { Meta, StoryObj } from "@storybook/react";
import { Ordering } from "../../../components/instructor/question-types/ordering";

const meta: Meta<typeof Ordering> = {
  title: "INSTRUCTOR\QUESTION-TYPES/Ordering",
  component: Ordering,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Ordering>;

export const Default: Story = {
  args: {},
};
