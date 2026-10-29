import type { Meta, StoryObj } from "@storybook/react";
import { ProgramCard } from "../../components/institution/program-card";

const meta: Meta<typeof ProgramCard> = {
  title: "INSTITUTION/ProgramCard",
  component: ProgramCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgramCard>;

export const Default: Story = {
  args: {},
};
