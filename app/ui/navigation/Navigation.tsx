import { Link } from "@remix-run/react";
import { Stack } from "../Stack";

export function Navigation() {
  return (
    <Stack direction="horizontal" spacing={16}>
      <Link to="/">Home</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/logout">Logout</Link>
    </Stack>
  );
}
