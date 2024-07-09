import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import * as stylex from "@stylexjs/stylex";

export const meta: MetaFunction = () => {
  return [
    { title: "Siasto" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div {...stylex.props(styles.root)}>
      <h1>Entry</h1>

      <Link to="/profile">Profile</Link>
      <Link to="/login">Login</Link>
      <Link to="/logout">Logout</Link>
    </div>
  );
}

const styles = stylex.create({
  root: {
    background: "hotpink",

    display: "flex",
    justifyContent: "center",
  },
});
