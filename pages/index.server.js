/**
 * 🐔 "This file holds the app's home page. This is where we'll fetch data for
 *     each RSS feed and display it on the page."
 *
 * 🐔 "I have a confession to make. We can't *really* show off React Server
 *     Components' full potential here since React itself is still missing some
 *     necessary features. Caching is the problem. Caching is always the
 *     problem.
 *
 *    "Theoretically, we could have fetched the RSS feed items in a React
 *     component and used the fancy looking <Suspense> rather than in Next.js's
 *     `getServerSideProps()`, but alas, React Server Components aren't ready
 *     for that yet. So we'll make do with 'classic' Next.js instead."
 */

import * as savedDB from "../lib/savedDB";
import { fetchRSSFeedItems } from "../lib/fetchRSSFeedItems";
import Layout from "../components/Layout.server.js";
import Feed from "../components/Feed.server.js";

/**
 * The app's home page. It lists items from all of the configured RSS feeds.
 *
 * Note: This component only renders on the server since its filename ends with
 * `.server.js`. Its JavaScript will not be sent to the browser.
 */
export default function IndexPage({ items = [], saved = [] }) {
  return (
    <Layout activeRoute="/">
      <Feed items={items} saved={saved} />
    </Layout>
  );
}

/**
 * A server-only function that fetches the page's data. It should fetch all RSS
 * feed items and a list of saved items.
 *
 * Data should be returned as `items` and `saved` props to be used in the
 * page's component above.
 */
export const getServerSideProps = async () => {
  // 🐔 "This is where you'll load the RSS feed items. If only we had a
  //     `fetchRSSFeedItems()` function somewhere..."
  const items = await fetchRSSFeedItems();

  const saved = await savedDB.loadAll();

  return {
    props: {
      items,
      saved,
    },
  };
};
