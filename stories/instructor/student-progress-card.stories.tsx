import type { Meta, StoryObj } from "@storybook/react";
import { StudentProgressCard } from "../../components/instructor/student-progress-card";

const meta: Meta<typeof StudentProgressCard> = {
  title: "INSTRUCTOR/StudentProgressCard",
  component: StudentProgressCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StudentProgressCard>;

export const Default: Story = {
  args: {},
};
