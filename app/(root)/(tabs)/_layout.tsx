import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';
import { useUserStore } from "@/store/userStore";


export default function TabsLayout() {
  
  const isAdmin = useUserStore((state)=> state.isAdmin)
  
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" />
      </NativeTabs.Trigger>
      
      <NativeTabs.Trigger name="search">
        <Icon sf="magnifyingglass"  />
        <Label>search</Label>
      </NativeTabs.Trigger>
      
      {/* create PropertY */}
      
        {isAdmin && (
        <NativeTabs.Trigger name="create">
          <Icon sf="plus.circle.fill" />
          <Label>Add Property</Label>
        </NativeTabs.Trigger>
      )}

       <NativeTabs.Trigger name="profile">
        <Icon sf="person.fill"  />
        <Label>Profile</Label>
      </NativeTabs.Trigger>

       <NativeTabs.Trigger name="saved">
        <Icon sf="heart.fill"  />
        <Label>Saved</Label>
      </NativeTabs.Trigger>

   </NativeTabs>
  );
}

