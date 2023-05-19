import { useLoaderData } from "@remix-run/react";
import type { LoaderArgs, LoaderFunction } from "@shopify/remix-oxygen";

export type LoaderData<T extends LoaderFunction> = Awaited<ReturnType<T>>

export function meta() {
    return [
      { title: 'Frostbite Boards' },
      { description: 'Conquer the chill.' },
    ];
}

export const loader = async ({ context }: LoaderArgs ) => { 
    return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
    const { collections } = useLoaderData<LoaderData<typeof loader>>();
    return <p>Frostbite Boards</p>;
}

const COLLECTIONS_QUERY = `#graphql
    query FeaturedCollections {
        collections(first: 3, query: "collection_type:smart") {
            nodes {
                id
                title
                handle
            }
        }
    }
`;