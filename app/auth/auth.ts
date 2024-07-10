import { redirect } from "@remix-run/node";
import { db } from "~/firebase.server";
import { requireUserSession } from "~/session.server";

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
  await requireUserSession(request);

  const docSnapshot = await db.collection("users").doc(uid).get();

  if (!docSnapshot.exists) {
    return null;
  } else {
    const user = docSnapshot.data();
    return user;
  }
}

export async function registerUser({ request, user }: RegisterUserProps) {
  const { username, uid } = user;

  const docRef = db.collection("users").doc(uid);
  await docRef.set({ username });

  return getUserById({ request, uid });
}

export async function updateProfile({
  request,
  user,
}: {
  request: Request;
  user: {
    username: string;
  };
}) {
  const sessionUser = await requireUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const { username } = user;

  const docRef = db.collection("users").doc(sessionUser?.uid);
  await docRef.update({ username });

  return redirect("/profile");
}
