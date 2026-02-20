module.exports = function (eleventyConfig) {
  // Passthrough copy — static assets stay in project root,
  // Eleventy copies them into _site at build time.
  eleventyConfig.addPassthroughCopy({ "images": "images" });
  eleventyConfig.addPassthroughCopy({ "logo": "logo" });
  eleventyConfig.addPassthroughCopy({ "favicon": "favicon" });
  eleventyConfig.addPassthroughCopy({ "pdfs": "pdfs" });
  eleventyConfig.addPassthroughCopy({ "styles.css": "styles.css" });
  eleventyConfig.addPassthroughCopy({ "styles.min.css": "styles.min.css" });
  eleventyConfig.addPassthroughCopy({ "script.js": "script.js" });
  eleventyConfig.addPassthroughCopy({ "script.min.js": "script.min.js" });

  // Copy Decap CMS admin files
  eleventyConfig.addPassthroughCopy("src/admin");

  // Stabilise file watching when project is in OneDrive (avoids charity walk articles
  // and other news items intermittently disappearing during dev server hot reload)
  eleventyConfig.setChokidarConfig({
    usePolling: true,
    interval: 500,
  });
  eleventyConfig.setWatchThrottleWaitTime(300);

  // Create a "news" collection sorted by date (newest first)
  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("src/news/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Custom date filter for display formatting
  eleventyConfig.addFilter("dateDisplay", function (date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  });

  eleventyConfig.addFilter("dateFull", function (date) {
    const d = new Date(date);
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    templateFormats: ["njk", "md", "html"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
