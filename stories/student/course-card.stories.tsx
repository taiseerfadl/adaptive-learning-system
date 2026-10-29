import type { Meta, StoryObj } from "@storybook/react";
import { CourseCard } from "../../components/student/course-card";

const meta: Meta<typeof CourseCard> = {
  title: "STUDENT/CourseCard",
  component: CourseCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseCard>;

export const Default: Story = {
  args: {},
};
