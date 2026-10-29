import type { Meta, StoryObj } from "@storybook/react";
import { RetentionChart } from "../../components/institution/retention-chart";

const meta: Meta<typeof RetentionChart> = {
  title: "INSTITUTION/RetentionChart",
  component: RetentionChart,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof RetentionChart>;

export const Default: Story = {
  args: {},
};
