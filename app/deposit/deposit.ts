import { redirect } from "@remix-run/node";
import { db } from "~/firebase.server";
import { requireUserSession } from "~/session.server";

export type DepositItem = {
  depositId: string;
  amount: number;
  date: string;
};

export async function getDeposits(request: Request) {
  const sessionUser = await requireUserSession(request);

  if (!sessionUser || !sessionUser?.uid) {
    return [];
  }

  const docSnapshot = await db
    .collection("deposits")
    .orderBy("date", "desc")
    .where("uid", "==", sessionUser.uid)
    .get();

  const data: DepositItem[] = [];

  if (docSnapshot.empty) {
    return [];
  }

  for (const doc of docSnapshot.docs) {
    data.push({
      depositId: doc.id,
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
  requireUserSession(request);

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
  const sessionUser = await requireUserSession(request);

  if (!sessionUser) {
    return redirect("/login");
  }

  const docRef = db.collection("deposits").doc();
  await docRef.create({ amount, date, uid: sessionUser.uid });

  return true;
  //return redirect("/");
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
  requireUserSession(request);

  await db.collection("deposits").doc(depositId).update({ amount, date });
}

export async function deleteDeposit({
  request,
  depositId,
}: {
  request: Request;
  depositId: string;
}) {
  requireUserSession(request);

  await db.collection("deposits").doc(depositId).delete();
}
