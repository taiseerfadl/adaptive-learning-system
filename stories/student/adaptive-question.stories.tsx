import type { Meta, StoryObj } from "@storybook/react";
import { AdaptiveQuestion } from "../../components/student/adaptive-question";

const meta: Meta<typeof AdaptiveQuestion> = {
  title: "STUDENT/AdaptiveQuestion",
  component: AdaptiveQuestion,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AdaptiveQuestion>;

export const Default: Story = {
  args: {},
};
