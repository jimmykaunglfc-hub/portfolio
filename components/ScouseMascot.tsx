'use client';

import Image from 'next/image';
import type { CSSProperties } from 'react';

/** Scouse's 3D-rendered identity, shared by the launcher and chat portraits. */
export default function ScouseMascot({ size = 56, className = '', animated = false }: { size?: number; className?: string; animated?: boolean }) {
  const portrait = size <= 48;
  return <span
    className={`scouse-mascot ${animated ? 'scouse-mascot--animated' : ''} ${portrait ? 'scouse-mascot--portrait' : ''} ${className}`}
    style={{ '--scouse-size': `${size}px` } as CSSProperties}
    aria-hidden="true"
  >
    <span className="scouse-mascot__float">
      <Image
        src="/mascots/scouse-project-master.webp"
        alt=""
        width={640}
        height={640}
        sizes={`${portrait ? size * 3 : size}px`}
        loading={animated ? 'eager' : 'lazy'}
        draggable={false}
        className="scouse-mascot__render"
      />
    </span>
  </span>;
}
