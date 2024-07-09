import { redirect } from "@remix-run/node";
import { db } from "~/firebase.server";
import { getUserSession } from "~/session.server";

type DepositAmountProps = {
  request: Request;
  amount: number;
  date: string;
};

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
    data.push(doc.data() as DepositItem);
  }

  return data;
}

export async function depositAmount({
  request,
  amount,
  date,
}: DepositAmountProps) {
  const sessionUser = await getUserSession(request);

  if (!sessionUser) {
    redirect("/login");
    return;
  }

  const docRef = db.collection("deposits").doc();

  await docRef.create({ amount, date, uid: sessionUser.uid });

  return redirect("/");
}
