import type { Meta, StoryObj } from "@storybook/react";
import { DifficultyDistribution } from "../../components/analytics/difficulty-distribution";

const meta: Meta<typeof DifficultyDistribution> = {
  title: "ANALYTICS/DifficultyDistribution",
  component: DifficultyDistribution,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DifficultyDistribution>;

export const Default: Story = {
  args: {},
};
