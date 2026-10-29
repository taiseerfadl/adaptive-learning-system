import type { Meta, StoryObj } from "@storybook/react";
import { CourseCreator } from "../../components/instructor/course-creator";

const meta: Meta<typeof CourseCreator> = {
  title: "INSTRUCTOR/CourseCreator",
  component: CourseCreator,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseCreator>;

export const Default: Story = {
  args: {},
};
