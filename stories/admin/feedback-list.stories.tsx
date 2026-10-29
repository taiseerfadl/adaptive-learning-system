import type { Meta, StoryObj } from "@storybook/react";
import { FeedbackList } from "../../components/admin/feedback-list";

const meta: Meta<typeof FeedbackList> = {
  title: "ADMIN/FeedbackList",
  component: FeedbackList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FeedbackList>;

export const Default: Story = {
  args: {},
};
