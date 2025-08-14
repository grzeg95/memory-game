export function mergeClasses(classes: (string | boolean | undefined)[]) {
  return classes.filter(c => !!c).join(' ');
}
