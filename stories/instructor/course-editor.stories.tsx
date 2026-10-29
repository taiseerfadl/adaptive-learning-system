import type { Meta, StoryObj } from "@storybook/react";
import { CourseEditor } from "../../components/instructor/course-editor";

const meta: Meta<typeof CourseEditor> = {
  title: "INSTRUCTOR/CourseEditor",
  component: CourseEditor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseEditor>;

export const Default: Story = {
  args: {},
};
