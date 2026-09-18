export function t(
  content: Record<string, string>,
  key: string,
  vars?: Record<string, string | number>,
) {
  let value = content[key] ?? key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replaceAll(`{${k}}`, String(v));
    }
  }
  return value;
}
