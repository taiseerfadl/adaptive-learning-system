import type { Meta, StoryObj } from "@storybook/react";
import { ModuleBuilder } from "../../components/instructor/module-builder";

const meta: Meta<typeof ModuleBuilder> = {
  title: "INSTRUCTOR/ModuleBuilder",
  component: ModuleBuilder,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModuleBuilder>;

export const Default: Story = {
  args: {},
};
