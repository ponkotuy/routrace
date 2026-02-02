import { Highway, NationalRoute } from '@/types';

interface ParsedRef {
  prefix: string;
  num: number;
  suffix: string;
}

export function parseRef(refDisplay: string): ParsedRef {
  if (!refDisplay) {
    return { prefix: '', num: Infinity, suffix: '' };
  }
  const match = refDisplay.match(/^([A-Za-z]*)(\d+)(.*)$/);
  if (match) {
    return { prefix: match[1], num: parseInt(match[2], 10), suffix: match[3] };
  }
  return { prefix: '', num: Infinity, suffix: refDisplay };
}

export function compareRef(a: Highway, b: Highway): number {
  const parsedA = parseRef(a.refDisplay);
  const parsedB = parseRef(b.refDisplay);

  // refなしは最後
  const hasRefA = parsedA.num !== Infinity ? 0 : 1;
  const hasRefB = parsedB.num !== Infinity ? 0 : 1;
  if (hasRefA !== hasRefB) {
    return hasRefA - hasRefB;
  }

  // プレフィックスなしを優先（1 → C1）
  const hasPrefixA = parsedA.prefix !== '' ? 1 : 0;
  const hasPrefixB = parsedB.prefix !== '' ? 1 : 0;
  if (hasPrefixA !== hasPrefixB) {
    return hasPrefixA - hasPrefixB;
  }

  // プレフィックスが同じカテゴリなら辞書順（C → E）
  if (parsedA.prefix !== parsedB.prefix) {
    return parsedA.prefix.localeCompare(parsedB.prefix);
  }

  // 数字の小さい順
  if (parsedA.num !== parsedB.num) {
    return parsedA.num - parsedB.num;
  }

  // サフィックスなしを優先（E1 → E1A）
  if (parsedA.suffix === '' && parsedB.suffix !== '') return -1;
  if (parsedA.suffix !== '' && parsedB.suffix === '') return 1;

  return parsedA.suffix.localeCompare(parsedB.suffix);
}

export function compareNationalRouteRef(a: NationalRoute, b: NationalRoute): number {
  const numA = parseInt(a.ref, 10) || Infinity;
  const numB = parseInt(b.ref, 10) || Infinity;
  return numA - numB;
}
