import type { Meta, StoryObj } from "@storybook/react";
import { RecentCourses } from "../../components/student/recent-courses";

const meta: Meta<typeof RecentCourses> = {
  title: "STUDENT/RecentCourses",
  component: RecentCourses,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RecentCourses>;

export const Default: Story = {
  args: {},
};
