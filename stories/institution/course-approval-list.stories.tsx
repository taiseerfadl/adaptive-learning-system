import type { Meta, StoryObj } from "@storybook/react";
import { CourseApprovalList } from "../../components/institution/course-approval-list";

const meta: Meta<typeof CourseApprovalList> = {
  title: "INSTITUTION/CourseApprovalList",
  component: CourseApprovalList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CourseApprovalList>;

export const Default: Story = {
  args: {},
};
