import { cn } from "../../lib/cn";
import React, { PropsWithChildren, useState } from "react";
import { View, Text } from "react-native";

type TItemTab = {
  key: string;
  label: string;
};

export type TRenderInfoItem = {
  item: TItemTab;
  activeTab?: string;
  onPressCB?: (key: string) => void;
};

interface TabsProps {
  items: TItemTab[];
  className?: string;
  children: React.ReactNode;
  renderItem: ({
    item,
    activeTab,
    onPressCB,
  }: TRenderInfoItem) => React.ReactNode;
}

type TTabsContext = {
  activeKey: string;
};

const TabsContext = React.createContext<TTabsContext | undefined>(undefined);

const useTabsContext = () => {
  const context = React.useContext(TabsContext);
  if (!context) {
    throw new Error("useTabsContext must be used within a TabsProvider");
  }
  return context;
};

const Tabs = ({ items, className, children, renderItem }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(items[0].key);
  const contextValue = React.useMemo(
    () => ({ activeKey: activeTab }),
    [activeTab]
  );

  const onPressCB = (key: string) => {
    setActiveTab(key);
  };

  return (
    <TabsContext.Provider value={contextValue}>
      <View className={cn("flex-1 bg-white", className)}>
        {/* Tabs */}
        <View className="flex-row justify-around bg-gray-200 py-3 px-3">
          {items.map((tab) => renderItem({ item: tab, activeTab, onPressCB }))}
        </View>

        {/* Tab Content */}
        <View className="flex-1 ">{children}</View>
      </View>
    </TabsContext.Provider>
  );
};

interface TabsContentProps extends PropsWithChildren<{}> {
  tabKey: string;
  className?: string;
}

const TabsContent = ({ tabKey, className, ...rest }: TabsContentProps) => {
  const { activeKey } = useTabsContext();

  return (
    <View
      className={cn(className, {
        hidden: tabKey !== activeKey,
      })}
      {...rest}
    />
  );
};

export default Tabs;
export { TabsContent };
