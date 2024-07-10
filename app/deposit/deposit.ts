import { redirect } from "@remix-run/node";
import { db } from "~/firebase.server";
import { getUserSession } from "~/session.server";

export type DepositItem = {
  uid: string;
  amount: number;
  date: string;
};

export async function getDeposits(request: Request) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  const docSnapshot = await db
    .collection("deposits")
    .where("uid", "==", sessionUser.uid)
    .get();

  const data: DepositItem[] = [];

  for (const doc of docSnapshot.docs) {
    data.push({
      uid: doc.id,
      amount: doc.data().amount,
      date: doc.data().date,
    });
  }

  return data;
}

export async function getDepositById({
  request,
  depositId,
}: {
  request: Request;
  depositId: string;
}) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  const docSnapshot = await db.collection("deposits").doc(depositId).get();

  if (!docSnapshot.exists) {
    return null;
  }

  const amount = docSnapshot.data()?.amount;
  const date = docSnapshot.data()?.date;

  return {
    depositId: docSnapshot.id,
    amount,
    date,
  };
}

export async function createDeposit({
  request,
  amount,
  date,
}: {
  request: Request;
  amount: number;
  date: string;
}) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  const docRef = db.collection("deposits").doc();

  await docRef.create({ amount, date, uid: sessionUser.uid });

  return redirect("/");
}

export async function updateDeposit({
  request,
  amount,
  date,
  depositId,
}: {
  request: Request;
  amount: number;
  date: string;
  depositId: string;
}) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  await db.collection("deposits").doc(depositId).update({ amount, date });

  return redirect("/");
}

export async function deleteDeposit({
  request,
  depositId,
}: {
  request: Request;
  depositId: string;
}) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  await db.collection("deposits").doc(depositId).delete();

  return redirect("/");
}
