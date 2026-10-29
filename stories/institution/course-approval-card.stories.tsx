import type { Meta, StoryObj } from "@storybook/react";
import { CourseApprovalCard } from "../../components/institution/course-approval-card";

const meta: Meta<typeof CourseApprovalCard> = {
  title: "INSTITUTION/CourseApprovalCard",
  component: CourseApprovalCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseApprovalCard>;

export const Default: Story = {
  args: {},
};
