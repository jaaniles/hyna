import { useNavigation } from "@remix-run/react";

export function PendingNavigation() {
  const navigation = useNavigation();
  return navigation.state === "loading" ? <p>Loading...</p> : null;
}
