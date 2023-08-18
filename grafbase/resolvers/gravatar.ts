const defaultOptions = {
  size: 80,
  defaultImage: "",
  rating: "g",
  secure: true,
};

export default async function GravatarResolver({ email }, options) {
  const encoder = new TextEncoder();
  const data = encoder.encode(email);
  const hashBuffer = await crypto.subtle.digest("MD5", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  const mergedOptions = { ...defaultOptions, ...options };
  const protocol = mergedOptions.secure ? "https://" : "http://";

  return `${protocol}www.gravatar.com/avatar/${hashHex}?s=${
    mergedOptions.size
  }&d=${encodeURIComponent(mergedOptions.defaultImage)}&r=${
    mergedOptions.rating
  }`;
}
