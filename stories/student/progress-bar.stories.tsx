import type { Meta, StoryObj } from "@storybook/react";
import { ProgressBar } from "../../components/student/progress-bar";

const meta: Meta<typeof ProgressBar> = {
  title: "STUDENT/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {},
};
