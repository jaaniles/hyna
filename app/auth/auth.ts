import { redirect } from "@remix-run/node";
import { db } from "~/firebase.server";
import { getUserSession } from "~/session.server";

type RegisterUserProps = {
  request: Request;
  user: {
    uid: string;
    username: string;
  };
};

type GetUserProps = {
  request: Request;
  uid: string;
};

export async function getUserById({ request, uid }: GetUserProps) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
  }

  const docSnapshot = await db.collection("users").doc(uid).get();

  if (!docSnapshot.exists) {
    throw Error("User not found");
  } else {
    const user = docSnapshot.data();
    return user;
  }
}

export async function registerUser({ request, user }: RegisterUserProps) {
  const sessionUser = await getUserSession(request);

  const { username, uid } = user;

  if (!sessionUser) {
    redirect("/login");
  }

  const docRef = db.collection("users").doc(uid);
  await docRef.set({ username });

  return getUserById({ request, uid });
}
