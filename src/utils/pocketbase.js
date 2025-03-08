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
  const res = await pb.collection(COLLECTION_NADU_DATA).create(
    {
      "details": naduDetails,
      "case_number": naduCaseNumber,
    }
  );
  return res;
}

export async function updateNaduData(naduId, naduDetails) {
  await pb.collection(COLLECTION_NADU_DATA).update(
    naduId,
    {
      "details": naduDetails,
    }
  );
}

export async function newNaduDate(naduCaseNumber, naduDate, ownerId) {
  const res = await pb.collection(COLLECTION_NADU_DATES).create(
    {
      "owner_id": ownerId,
      "case_number": naduCaseNumber,
      "date": naduDate,
    }
  );
  return res;
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
      sort: "-created"
    }
  );
  return fromDb;
}

function filterStr_NaduDatesToday() {
  const now = new Date();
  const startOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 0, 0, 0));
  const endOfToday = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  const startOfTodayStr = startOfToday.toISOString().split('T')[0];
  const endOfTodayStr = endOfToday.toISOString().split('T')[0];
  const filterStr = `date >= '${startOfTodayStr}' && date < '${endOfTodayStr}'`
  return filterStr;
}

function filterStr_NaduDatesTomorrow() {
  const now = new Date();
  const startOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  const endOfTomorrow = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 2, 0, 0, 0));
  const startOfTomorrowStr = startOfTomorrow.toISOString().split('T')[0];
  const endOfTomorrowStr = endOfTomorrow.toISOString().split('T')[0];
  const filterStr = `date >= '${startOfTomorrowStr}' && date < '${endOfTomorrowStr}'`
  return filterStr;
}

export async function getNaduDatesToday() {
  const fromDb = await pb.collection(COLLECTION_NADU_DATES).getFullList({
    filter: `date >= @todayStart && date <= @todayEnd`,
    sort: '+case_number'
  });
  return fromDb;
}

export async function getNaduDatesTodayExpanded() {
  const filterStr = filterStr_NaduDatesToday();
  console.log(filterStr)
  const fromDb = await pb.collection(COLLECTION_NADU_DATES).getFullList({
    filter: filterStr,
    sort: '+case_number'
  });
  console.log(fromDb)
  if (fromDb) {
    for (const naduDate of fromDb) {
      const naduData = await getNaduData(naduDate.case_number);
      naduDate.expanded = naduData;
    }
  }
  return fromDb;
}

export async function getNaduDatesTomorrow() {
  const filterStr = filterStr_NaduDatesTomorrow();
  const fromDb = await pb.collection(COLLECTION_NADU_DATES).getFullList({
    filter: filterStr,
    sort: '+case_number',
  });
  return fromDb;
}

export async function getNaduDatesTomorrowExpanded() {
  const filterStr = filterStr_NaduDatesTomorrow();
  console.log(filterStr)
  const fromDb = await pb.collection(COLLECTION_NADU_DATES).getFullList({
    filter: filterStr,
    sort: '+case_number',
  });
  console.log(fromDb)
  if (fromDb) {
    for (const naduDate of fromDb) {
      const naduData = await getNaduData(naduDate.case_number);
      naduDate.expanded = naduData;
    }
  }
  return fromDb;
}
