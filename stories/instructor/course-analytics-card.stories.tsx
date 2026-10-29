import type { Meta, StoryObj } from "@storybook/react";
import { CourseAnalyticsCard } from "../../components/instructor/course-analytics-card";

const meta: Meta<typeof CourseAnalyticsCard> = {
  title: "INSTRUCTOR/CourseAnalyticsCard",
  component: CourseAnalyticsCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseAnalyticsCard>;

export const Default: Story = {
  args: {},
};
