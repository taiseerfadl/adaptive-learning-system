import type { Meta, StoryObj } from "@storybook/react";
import { StudentSidebar } from "../../components/student/student-sidebar";

const meta: Meta<typeof StudentSidebar> = {
  title: "STUDENT/StudentSidebar",
  component: StudentSidebar,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudentSidebar>;

export const Default: Story = {
  args: {},
};
