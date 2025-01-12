import { View } from 'react-native';
import type { Meta, StoryObj } from '@storybook/react';
import { MySecondButton } from './SecondButton';

const meta = {
  title: 'MySecondButton',
  component: MySecondButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    text: 'Hello world',
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, alignItems: 'flex-start' }}>
        <Story />
      </View>
    ),
  ],
} satisfies Meta<typeof MySecondButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const AnotherExample: Story = {
  args: {
    text: 'Another example',
  },
};
