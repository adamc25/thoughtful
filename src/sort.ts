enum PackageType {
  REJECTED = 'REJECTED',
  SPECIAL = 'SPECIAL',
  STANDARD = 'STANDARD'
}

export function sort(width: number, height: number, length: number, mass: number): string {
  // Funny enough, NaN is considered a number type so specifically check we aren't given one of these fake numbers
  if (isNaN(width) || isNaN(height) || isNaN(length) || isNaN(mass)) {
    return PackageType.REJECTED;
  }
  // Sanity check. Any value of 0 for any of the arguments is nonsensical.
  if (width === 0 || height === 0 || length === 0 || mass === 0) {
    return PackageType.REJECTED;
  }
  const volume = width * height * length;
  const bulky = volume >= 1_000_000 || Math.max(width, height, length) >= 150;
  const heavy = mass >= 20;

  if (bulky && heavy) {
    return PackageType.REJECTED;
  }
  if (bulky || heavy) {
    return PackageType.SPECIAL;
  }
  return PackageType.STANDARD;
}

const examples = [
  { width: 0, height: 100, length: 100, mass: 10 },
  { width: NaN, height: 100, length: 100, mass: 10 },
  { width: 100, height: 100, length: 100, mass: 10 },
  { width: 200, height: 50, length: 50, mass: 10 },
  { width: 50, height: 50, length: 50, mass: 25 },
  { width: 200, height: 200, length: 200, mass: 25 },
  { width: 50, height: 50, length: 50, mass: 10 },
];

examples.forEach(pkg => {
  const result = sort(pkg.width, pkg.height, pkg.length, pkg.mass);
  console.log(`Package: ${JSON.stringify(pkg)} => ${result}`);
});