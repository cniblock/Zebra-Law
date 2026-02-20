const baseUrl = "https://www.zebra.law";

module.exports = {
  layout: "article.njk",
  permalink: "news/{{ page.fileSlug }}.html",
  tags: ["news"],
  eleventyComputed: {
    canonical: (data) => baseUrl + data.page.url,
    ogUrl: (data) => baseUrl + data.page.url,
    twitterUrl: (data) => baseUrl + data.page.url,
    twitterImage: (data) => data.ogImage || baseUrl + "/images/OG_image.png",
  },
};
