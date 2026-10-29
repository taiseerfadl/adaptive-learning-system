import type { Meta, StoryObj } from "@storybook/react";
import { GradeBook } from "../../components/instructor/grade-book";

const meta: Meta<typeof GradeBook> = {
  title: "INSTRUCTOR/GradeBook",
  component: GradeBook,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GradeBook>;

export const Default: Story = {
  args: {},
};
