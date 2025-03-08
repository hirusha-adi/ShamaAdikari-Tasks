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

export async function newNadu(naduDetails, naduCaseNumber, naduDate) {
  await pb.collection(COLLECTION_NADU_DATA).create(
    {
      "details": naduDetails,
      "case_number": naduCaseNumber,
      "date": naduDate
    }
  );
}
