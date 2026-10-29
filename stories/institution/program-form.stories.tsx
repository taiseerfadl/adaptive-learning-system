import type { Meta, StoryObj } from "@storybook/react";
import { ProgramForm } from "../../components/institution/program-form";

const meta: Meta<typeof ProgramForm> = {
  title: "INSTITUTION/ProgramForm",
  component: ProgramForm,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ProgramForm>;

export const Default: Story = {
  args: {},
};
