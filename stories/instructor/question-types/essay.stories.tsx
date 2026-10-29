import type { Meta, StoryObj } from "@storybook/react";
import { Essay } from "../../../components/instructor/question-types/essay";

const meta: Meta<typeof Essay> = {
  title: "INSTRUCTOR\QUESTION-TYPES/Essay",
  component: Essay,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Essay>;

export const Default: Story = {
  args: {},
};
