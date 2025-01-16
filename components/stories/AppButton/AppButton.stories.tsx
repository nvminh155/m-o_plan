import { View } from "react-native";
import type { Meta, StoryObj } from "@storybook/react";
import AppButton from "./AppButton";

const meta = {
  title: "AppButton",
  component: AppButton,
  argTypes: {
    onPress: { action: "pressed the button" },
  },
  args: {
    text: "Hello w11orld",
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: "flex-start" }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof AppButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AnotherExample: Story = {
  args: {
    text: "Another example",
  },
};
