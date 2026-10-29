import type { Meta, StoryObj } from "@storybook/react";
import { CourseList } from "../../components/student/course-list";

const meta: Meta<typeof CourseList> = {
  title: "STUDENT/CourseList",
  component: CourseList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseList>;

export const Default: Story = {
  args: {},
};
