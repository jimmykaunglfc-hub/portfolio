const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Execute the actual client effect against deterministic viewport/animation APIs.
const compiled = ts.transpileModule(readFileSync(require.resolve('../components/PageExperience.tsx'), 'utf8'), {
  compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;

function setup({ top = 1000, height = 200, reduced = false, pathname = '/' } = {}) {
  const raf = new Map(), listeners = new Map(), events = new Map(), animations = [];
  let nextFrame = 0, effect, mediaChange, cleanup;
  class Node {}
  const element = Object.assign(new Node(), {
    offsetTop: top, offsetHeight: height, offsetParent: null,
    contains: (node) => node === element,
    animate: (frames, options) => {
      const animation = { frames, options, cancelled: false, cancel() { this.cancelled = true; }, finish() { this.onfinish?.(); } };
      animations.push(animation);
      return animation;
    },
  });
  const container = {
    querySelectorAll: () => [element], contains: () => true,
    addEventListener: (type, callback) => events.set(type, callback),
    removeEventListener: (type) => events.delete(type),
  };
  const media = { matches: reduced, addEventListener: (_, callback) => { mediaChange = callback; }, removeEventListener() {} };
  const window = {
    scrollY: 0, innerHeight: 800, location: { hash: '' }, matchMedia: () => media,
    addEventListener: (type, callback) => listeners.set(type, callback),
    removeEventListener: (type) => listeners.delete(type),
  };
  class Observer { observe() {} disconnect() {} }
  const module = { exports: {} };
  vm.runInNewContext(compiled, {
    module, exports: module.exports, Node, window,
    document: { fonts: { ready: Promise.resolve() } },
    MutationObserver: Observer, ResizeObserver: Observer,
    requestAnimationFrame: (callback) => { raf.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame: (id) => raf.delete(id),
    require: (name) => {
      if (name === 'react') return { useRef: () => ({ current: container }), useEffect: (callback) => { effect = callback; } };
      if (name === 'next/navigation') return { usePathname: () => pathname };
      if (name === 'react/jsx-runtime') return { jsx: () => null, jsxs: () => null };
      throw new Error(`Unexpected dependency ${name}`);
    },
  });
  module.exports.default({ children: null });
  cleanup = effect();
  function flush() { while (raf.size) { const batch = [...raf.values()]; raf.clear(); batch.forEach((callback) => callback()); } }
  flush();
  return {
    animations, element, listeners,
    scroll(y) { window.scrollY = y; listeners.get('scroll')?.(); flush(); },
    focus() { events.get('focusin')?.({ target: element }); },
    reduce(value) { media.matches = value; mediaChange?.(); flush(); },
    cleanup() { cleanup?.(); },
  };
}

test('below-fold content reveals without requiring a click, then releases its effects', () => {
  const page = setup();
  assert.equal(page.animations.length, 0);
  page.scroll(400);
  const reveal = page.animations[0];
  assert.ok(reveal.frames[0].transform.includes('88px'));
  assert.equal(reveal.frames[1].opacity, 1);
  assert.ok(reveal.frames.every((frame) => !('filter' in frame)));
  reveal.finish();
  assert.equal(reveal.cancelled, true);
  page.scroll(500);
  assert.equal(page.animations.length, 1, 'no replay while reading');
  page.cleanup();
});

test('scrolling past and back up replays the reveal from above', () => {
  const page = setup();
  page.scroll(400);
  page.scroll(1300);
  page.scroll(1100);
  assert.equal(page.animations.length, 2);
  assert.ok(page.animations[1].frames[0].transform.includes('-48px'));
  page.cleanup();
});

test('contact at maximum scroll completes even when it cannot reach viewport center', () => {
  const page = setup({ top: 1800, height: 500 });
  page.scroll(1500); // document height 2300 minus viewport 800
  assert.equal(page.animations.length, 1);
  page.animations[0].finish();
  assert.equal(page.animations[0].cancelled, true);
  page.cleanup();
});

test('keyboard focus finishes an active reveal immediately', () => {
  const page = setup({ top: 400 });
  page.focus();
  assert.equal(page.animations[0].cancelled, true);
  page.cleanup();
});

test('reduced motion has no reveals, including preference changes during animation', () => {
  const quiet = setup({ top: 400, reduced: true });
  assert.equal(quiet.animations.length, 0);
  quiet.cleanup();
  const page = setup({ top: 400 });
  page.reduce(true);
  assert.equal(page.animations[0].cancelled, true);
  assert.equal(page.animations.length, 1);
  page.cleanup();
});

test('gameplay and private routes are untouched; cleanup removes scroll listeners', () => {
  for (const pathname of ['/admin', '/studio/editor', '/games/biometric-override']) {
    const page = setup({ top: 400, pathname });
    assert.equal(page.animations.length, 0);
    assert.equal(page.listeners.size, 0);
  }
  const page = setup({ top: 400 });
  page.cleanup();
  assert.equal(page.listeners.size, 0);
  assert.equal(page.animations[0].cancelled, true);
});
