import type { Meta, StoryObj } from "@storybook/react";
import { SkillRadarChart } from "../../components/analytics/skill-radar-chart";

const meta: Meta<typeof SkillRadarChart> = {
  title: "ANALYTICS/SkillRadarChart",
  component: SkillRadarChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SkillRadarChart>;

export const Default: Story = {
  args: {},
};
