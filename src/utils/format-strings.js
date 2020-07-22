export const templateParser = (string, vars) => {
  if (!string) return '';
  if (!vars) return string;
  return string.replace(/{{(\w+)}}/ig, (full, match) => vars[match]);
};
