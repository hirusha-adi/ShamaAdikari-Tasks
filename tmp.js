const items = [
    {
        "case_number": "5658/FM",
        "collectionId": "pbc_3586508992",
        "collectionName": "nadu_dates",
        "created": "2025-03-10 02:06:34.042Z",
        "date": "2025-03-11 01:00:00.000Z",
        "expand": {
            "owner_id": {
                "case_number": "5658/FM",
                "collectionId": "pbc_404785348",
                "collectionName": "nadu_data",
                "created": "2025-03-10 02:06:33.431Z",
                "details": "fdghfrhffghgfhgfhfg",
                "id": "ty2xji3565c4301",
                "updated": "2025-03-10 02:06:33.431Z"
            }
        },
        "id": "1x4c5w2lmvwca02",
        "owner_id": "ty2xji3565c4301",
        "updated": "2025-03-10 02:06:34.042Z"
    },
    {
        "case_number": "6873/ODD",
        "collectionId": "pbc_3586508992",
        "collectionName": "nadu_dates",
        "created": "2025-03-10 03:13:58.737Z",
        "date": "2025-03-11 01:00:00.000Z",
        "expand": {
            "owner_id": {
                "case_number": "6873/ODD",
                "collectionId": "pbc_404785348",
                "collectionName": "nadu_data",
                "created": "2025-03-10 03:13:58.331Z",
                "details": "Hirusha",
                "id": "lr052nax8cseg80",
                "updated": "2025-03-10 03:13:58.331Z"
            }
        },
        "id": "y00909ijtdjgx7w",
        "owner_id": "lr052nax8cseg80",
        "updated": "2025-03-10 03:13:58.737Z"
    },
    {
        "case_number": "7625/FM",
        "collectionId": "pbc_3586508992",
        "collectionName": "nadu_dates",
        "created": "2025-03-10 04:27:11.455Z",
        "date": "2025-03-11 01:00:00.000Z",
        "expand": {
            "owner_id": {
                "case_number": "7625/FM",
                "collectionId": "pbc_404785348",
                "collectionName": "nadu_data",
                "created": "2025-03-10 04:27:11.056Z",
                "details": "ballsghballs",
                "id": "b25f1n9pa50z626",
                "updated": "2025-03-10 04:27:11.056Z"
            }
        },
        "id": "k4q7j55nl1vp39j",
        "owner_id": "b25f1n9pa50z626",
        "updated": "2025-03-10 04:27:11.455Z"
    }
]

const results = []
for (const item of items) {
    const tmp = {}
    tmp.naduData = item.expand.owner_id
    tmp.naduDate = [{ ...item, expand: undefined },]
    results.push({ naduData: item, naduDate: item })
}

console.log(JSON.stringify(results, null, 2))
