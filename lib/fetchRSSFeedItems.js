// 🐔 "Hey, check out the `fetchRSSFeedItems()` function below. I left a message
//     for you. *flutters away*"

import { feedURLs } from "../config";
import dayjs from "dayjs";
import Parser from "rss-parser";

const parser = new Parser();

/**
 * Converts an RSS feed item into a simpler object.
 */
const buildItem = ({ item, feed }) => {
  return {
    guid: item.guid || item.link,
    title: item.title,
    link: item.link,
    pubDate: item.pubDate,
    comments: item.comments || null,
    feedTitle: feed.title,
    feedURL: feed.link,
  };
};

/**
 * Fetches RSS feed items from URLs configured in `config.js`'s `feedURLs`
 * export. Each RSS feed item is reshaped to better suit the app and reduce
 * in-app network payload sizes.
 *
 * Items are sorted by publication date.
 */
export const fetchRSSFeedItems = async () => {
  // 🐔 "You'll need to write this function. If you're looking for an RSS
  //     fetcher and parser package, `rss-parser` is a good one.
  //
  //    "This function should fetch the RSS content from the URL, convert all
  //     of its items into simpler objects using the `buildItem()` function
  //     from above, and return the array.
  //
  //    "Oh and don't forget, you'll probably also want to sort the array of
  //    items by publication date, too. The `dayjs` package is good at date
  //    stuff."

  return (
    await Promise.all(feedURLs.map(async (url) => await parser.parseURL(url)))
  )
    .map((feed) => feed.items.map((item) => buildItem({ item, feed })))
    .flat()
    .sort((a, b) => (dayjs(a.pubDate).isBefore(dayjs(b.pubDate)) ? 1 : -1));
};
