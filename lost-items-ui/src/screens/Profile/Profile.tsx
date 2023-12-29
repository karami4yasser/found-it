import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import FoundItFeed from "../../components/FoundItFeed/FoundItFeed";
import { ProfileDetails } from "../../components/ProfileDetails/ProfileDetails";
import { State } from "../../utils/SearchFilterProvider";
import { getItemsInfiniteQuery } from "../../api/item/GetItemsInfiniteQuery";
import { ItemType } from "../../typing/item";
import { useAuth } from "../../utils/AuthProvider";
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TabRootStackParamList } from "../../TabNavigation/TabNavigation";


type ProfileProps = NativeStackScreenProps<TabRootStackParamList, 'Profile'>;

export function Profile({route} : ProfileProps) {
  const userId = route.params.userId;
  const currentUser = useAuth();
  const [state, setState] = useState<State>({
    type: ItemType.FOUND,
    text: null,
    category: null,
    dateLeft: null,
    dateRight: null,
    longitude: null,
    latitude: null,
    range: null,
    returned: null,
  });
  const result = getItemsInfiniteQuery(state, currentUser.accessToken, userId ? userId : null);

  if (userId) {
    return (<SafeAreaView style={{ flex: 1 }}>
      <ProfileDetails setState={setState} state={state} userId={userId} />
      <FoundItFeed result={result} />
    </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileDetails setState={setState} state={state} />
      <FoundItFeed result={result} />
    </SafeAreaView>
  );
}