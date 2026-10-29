import type { Meta, StoryObj } from "@storybook/react";
import { FillBlank } from "../../../components/instructor/question-types/fill-blank";

const meta: Meta<typeof FillBlank> = {
  title: "INSTRUCTOR\QUESTION-TYPES/FillBlank",
  component: FillBlank,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FillBlank>;

export const Default: Story = {
  args: {},
};
