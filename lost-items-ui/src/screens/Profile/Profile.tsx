import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import FoundItFeed from "../../components/FoundItFeed/FoundItFeed";
import { ProfileDetails } from "../../components/ProfileDetails/ProfileDetails";
import { State, useSearchFilter } from "../../utils/SearchFilterProvider";
import { useInfiniteQueryCustom } from "../../utils/useInfiniteQueryCustom";
import { ItemType } from "../../typing/item";
import { useAuth } from "../../utils/AuthProvider";

export function Profile() {
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
  const result = useInfiniteQueryCustom(state, currentUser.accessToken);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ProfileDetails setState={setState} state={state} />
      <FoundItFeed result={result} />
    </SafeAreaView>
  );
}
