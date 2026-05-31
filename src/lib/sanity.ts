import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "gt8i5a8o",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-05-24",
});

export async function getProduct(id: string) {
  const query = `
    *[_type == "product" && _id == $id][0]
  `;

  return await client.fetch(query, { id });
}