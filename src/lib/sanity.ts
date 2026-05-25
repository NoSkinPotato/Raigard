import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: "gt8i5a8o",
  dataset: "production",
  useCdn: true,
  apiVersion: "2026-05-24",
});