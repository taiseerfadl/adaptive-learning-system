import type { Meta, StoryObj } from "@storybook/react";
import { LiveSchedule } from "../../components/live/live-schedule";

const meta: Meta<typeof LiveSchedule> = {
  title: "LIVE/LiveSchedule",
  component: LiveSchedule,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LiveSchedule>;

export const Default: Story = {
  args: {},
};
