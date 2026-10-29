import type { Meta, StoryObj } from "@storybook/react";
import { StudentTable } from "../../components/instructor/student-table";

const meta: Meta<typeof StudentTable> = {
  title: "INSTRUCTOR/StudentTable",
  component: StudentTable,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudentTable>;

export const Default: Story = {
  args: {},
};
