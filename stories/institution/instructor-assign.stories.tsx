import type { Meta, StoryObj } from "@storybook/react";
import { InstructorAssign } from "../../components/institution/instructor-assign";

const meta: Meta<typeof InstructorAssign> = {
  title: "INSTITUTION/InstructorAssign",
  component: InstructorAssign,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstructorAssign>;

export const Default: Story = {
  args: {},
};
