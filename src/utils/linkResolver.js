// In src/prismic-configuration.js
export const linkResolver = doc => {
  if (doc.type === "contact") {
    return `/contact`;
  }
  if (doc.type === "work") {
    return `/work`;
  }
  if (doc.type === "skills") {
    return `/skills`;
  }
  if (doc.type === "about") {
    return `/about`;
  }
  if (doc.type === "landing_page") {
    return `/`;
  }
  // Backup for all other types
  return "/";
};
