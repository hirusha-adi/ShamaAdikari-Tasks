import PocketBase from "pocketbase";

const url = "https://shama-db.h3ck.cc";
const COLLECTION_USERS = "users";
const COLLECTION_NADU_DATA = "nadu_data";
const COLLECTION_NADU_DATES = "nadu_dates";

export const pb = new PocketBase(url);

// in development mode
// MAYBE:uncomment on production
pb.autoCancellation(false);

export const isUserLoggedIn = pb.authStore.isValid;
export const user = pb.authStore;

export async function login(email, password) {
  if (!email || !password) {
    return null;
  }
  await pb.collection(COLLECTION_USERS).authWithPassword(email.trim(), password);
  window.location.reload();
}

export async function logout() {
  pb.authStore.clear();
  window.location.href = "/";
}

export async function newNaduData(naduCaseNumber, naduDetails) {
  await pb.collection(COLLECTION_NADU_DATA).create(
    {
      "details": naduDetails,
      "case_number": naduCaseNumber,
    }
  );
}

export async function updateNaduData(naduId, naduDetails) {
  await pb.collection(COLLECTION_NADU_DATA).update(
    naduId,
    {
      "details": naduDetails,
    }
  );
}

export async function newNaduDate(naduCaseNumber, naduDate) {
  await pb.collection(COLLECTION_NADU_DATES).create(
    {
      "case_number": naduCaseNumber,
      "date": naduDate,
    }
  );
}

export async function getSelectNaduCaseNumbers() {
  const fromDb = await pb.collection(COLLECTION_NADU_DATA).getFullList({ fields: "case_number", sort: "-created" });

  const formattedData = fromDb.map(item => ({
    value: item.case_number,
    label: item.case_number
  }));

  return formattedData;
}

export async function getNaduData(caseNumber) {
  const fromDb = await pb.collection(COLLECTION_NADU_DATA).getFirstListItem(`case_number="${caseNumber}"`);
  return fromDb;
}

export async function getNaduDatesFromCaseNumber(caseNumber) {
  const fromDb = await pb.collection(COLLECTION_NADU_DATES).getFullList(
    {
      filter: `case_number="${caseNumber}"`,
    }
  );
  return fromDb;
}
