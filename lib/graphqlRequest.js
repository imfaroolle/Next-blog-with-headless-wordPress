export async function graphqlRequest(query) {
  const url = "http://localhost:8080/barbar/graphql";
  const headers = { "content-type": "application/json" };
  const res = await fetch(url, {
    headers,
    method: "POST",
    body: JSON.stringify(query),
  });

  const resJson = await res.json();
  return resJson;
}
