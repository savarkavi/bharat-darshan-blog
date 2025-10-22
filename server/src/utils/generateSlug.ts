export const generateSlug = (title: string): string => {
  return (
    title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .trim() +
    "-" +
    Date.now()
  );
};
