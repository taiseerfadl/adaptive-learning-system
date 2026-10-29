import type { Meta, StoryObj } from "@storybook/react";
import { PublishToggle } from "../../components/instructor/publish-toggle";

const meta: Meta<typeof PublishToggle> = {
  title: "INSTRUCTOR/PublishToggle",
  component: PublishToggle,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PublishToggle>;

export const Default: Story = {
  args: {},
};
