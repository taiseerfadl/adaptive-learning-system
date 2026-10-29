import type { Meta, StoryObj } from "@storybook/react";
import { AchievementBadge } from "../../components/student/achievement-badge";

const meta: Meta<typeof AchievementBadge> = {
  title: "STUDENT/AchievementBadge",
  component: AchievementBadge,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AchievementBadge>;

export const Default: Story = {
  args: {},
};
