import type { Meta, StoryObj } from "@storybook/react";
import { InstructorSidebar } from "../../components/instructor/instructor-sidebar";

const meta: Meta<typeof InstructorSidebar> = {
  title: "INSTRUCTOR/InstructorSidebar",
  component: InstructorSidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InstructorSidebar>;

export const Default: Story = {
  args: {},
};
