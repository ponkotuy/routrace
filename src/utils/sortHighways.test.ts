import { describe, it, expect } from 'vitest';
import { parseRef, compareRef } from './sortHighways';
import { Highway } from '@/types';

const createHighway = (refDisplay: string): Highway => ({
  id: refDisplay || 'no-ref',
  refDisplay,
  name: `テスト路線 ${refDisplay}`,
  nameEn: `Test Highway ${refDisplay}`,
  group: 'テストグループ',
});

describe('parseRef', () => {
  it('数字のみのrefをパースできる', () => {
    expect(parseRef('1')).toEqual({ prefix: '', num: 1, suffix: '' });
    expect(parseRef('19')).toEqual({ prefix: '', num: 19, suffix: '' });
  });

  it('プレフィックス付きのrefをパースできる', () => {
    expect(parseRef('E1')).toEqual({ prefix: 'E', num: 1, suffix: '' });
    expect(parseRef('C1')).toEqual({ prefix: 'C', num: 1, suffix: '' });
    expect(parseRef('E19')).toEqual({ prefix: 'E', num: 19, suffix: '' });
  });

  it('サフィックス付きのrefをパースできる', () => {
    expect(parseRef('E1A')).toEqual({ prefix: 'E', num: 1, suffix: 'A' });
    expect(parseRef('1A')).toEqual({ prefix: '', num: 1, suffix: 'A' });
  });

  it('空のrefをパースできる', () => {
    expect(parseRef('')).toEqual({ prefix: '', num: Infinity, suffix: '' });
  });
});

describe('compareRef', () => {
  it('数字の小さい順にソートする（E1 < E2 < E19）', () => {
    const highways = [
      createHighway('E19'),
      createHighway('E2'),
      createHighway('E1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['E1', 'E2', 'E19']);
  });

  it('サフィックスなしを優先する（E1 < E1A）', () => {
    const highways = [
      createHighway('E1A'),
      createHighway('E1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['E1', 'E1A']);
  });

  it('プレフィックスなしを優先する（1 < C1）', () => {
    const highways = [
      createHighway('C1'),
      createHighway('1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['1', 'C1']);
  });

  it('refなしは最後に来る', () => {
    const highways = [
      createHighway(''),
      createHighway('1'),
      createHighway('C1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['1', 'C1', '']);
  });

  it('複合的なソート: 1 < 2 < C1 < C2 < (無印)', () => {
    const highways = [
      createHighway(''),
      createHighway('C2'),
      createHighway('1'),
      createHighway('C1'),
      createHighway('2'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['1', '2', 'C1', 'C2', '']);
  });

  it('複合的なソート: E1 < E1A < E2 < E19 < (無印)', () => {
    const highways = [
      createHighway(''),
      createHighway('E19'),
      createHighway('E1A'),
      createHighway('E2'),
      createHighway('E1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['E1', 'E1A', 'E2', 'E19', '']);
  });

  it('プレフィックスの辞書順（C < E）', () => {
    const highways = [
      createHighway('E1'),
      createHighway('C1'),
    ];
    highways.sort(compareRef);
    expect(highways.map(h => h.refDisplay)).toEqual(['C1', 'E1']);
  });
});
