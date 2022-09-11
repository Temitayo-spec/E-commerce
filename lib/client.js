import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
    
export const client = sanityClient({
  projectId: "s7znmxgk",
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const imageBuilder = imageUrlBuilder(client);

export const urlFor = (source) => imageBuilder.image(source);