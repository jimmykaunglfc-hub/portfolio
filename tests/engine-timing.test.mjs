import { test } from 'node:test';
import assert from 'node:assert/strict';
import { advanceEngineTime } from '../lib/engine-timing.ts';

test('a RAF timestamp earlier than the initial draw cannot select stage -1', () => {
  const elapsed = advanceEngineTime(0, 1000, 1015);
  assert.equal(elapsed, 0);
  assert.equal(Math.floor((elapsed % 18) / 6), 0);
});
test('normal frames advance the animation', () => {
  assert.equal(advanceEngineTime(2, 1032, 1000), 2.032);
});
test('a long interruption cannot jump the animation forward', () => {
  assert.equal(advanceEngineTime(2, 11000, 1000), 2.08);
});
test('repeated resume timestamps always preserve a valid stage', () => {
  let elapsed = 0;
  for (let index = 0; index < 2000; index++) {
    elapsed = advanceEngineTime(elapsed, index % 7 ? 1033 : 990, 1000);
    assert.ok([0, 1, 2].includes(Math.floor((elapsed % 18) / 6)));
  }
});
