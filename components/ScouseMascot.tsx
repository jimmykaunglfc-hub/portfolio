'use client';

import { useId } from 'react';

/** Scouse: a streamlined product companion with a friendly digital visor. */
export default function ScouseMascot({ size = 56, className = '', animated = false }: { size?: number; className?: string; animated?: boolean }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`scouse-mascot ${animated ? 'scouse-mascot--animated' : ''} ${className}`} width={size} height={size} viewBox="0 0 112 112" fill="none" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={`${id}-shell`} x1="28" y1="16" x2="86" y2="68" gradientUnits="userSpaceOnUse"><stop stopColor="#F2FAFF" /><stop offset=".38" stopColor="#C1DCF9" /><stop offset=".72" stopColor="#729DDD" /><stop offset="1" stopColor="#4268B0" /></linearGradient>
      <linearGradient id={`${id}-visor`} x1="32" y1="29" x2="82" y2="57" gradientUnits="userSpaceOnUse"><stop stopColor="#203B62" /><stop offset="1" stopColor="#0A1C35" /></linearGradient>
      <linearGradient id={`${id}-suit`} x1="38" y1="63" x2="76" y2="97" gradientUnits="userSpaceOnUse"><stop stopColor="#AECFF1" /><stop offset=".45" stopColor="#507CB6" /><stop offset="1" stopColor="#243F70" /></linearGradient>
      <radialGradient id={`${id}-core`}><stop stopColor="#E5FFFF" /><stop offset=".45" stopColor="#80E4ED" /><stop offset="1" stopColor="#5A99ED" /></radialGradient>
    </defs>
    <g className="scouse-mascot__float">
    <path d="M41 89v11h13V88m8 0v12h13V86" fill="#37577F" stroke="#9CBCE2" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M39 99h16v5H36v-2l3-3Zm23 0h14l5 3v2H62v-5Z" fill="#A6C6E8" stroke="#DAECFF" strokeWidth="1" strokeLinejoin="round" />
    <rect x="34" y="61" width="46" height="32" rx="12" fill={`url(#${id}-suit)`} stroke="#96B9EB" strokeWidth="1.5" />
    <path d="M42 65c8 4 21 4 29 0" stroke="#D8ECFF" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="57" cy="80" r="9" fill="#142D51" stroke="#96BFEF" strokeWidth="1.2" />
    <g className="scouse-mascot__core">
      <path d="m57 73 6 3.5v7L57 87l-6-3.5v-7L57 73Z" fill={`url(#${id}-core)`} />
      <path d="m51 76.5 6 3.5 6-3.5M57 80v7" stroke="#245078" strokeWidth="1" />
    </g>
    <g className="scouse-mascot__arm-left">
    <path d="M35 67c-7 1-10 7-10 15v5" stroke="#B5D1EF" strokeWidth="10" strokeLinecap="round" />
    <path d="M35 67c-7 1-10 7-10 15v5" stroke="#638BC5" strokeWidth="7" strokeLinecap="round" />
    <rect x="20" y="82" width="11" height="12" rx="5" fill="#C6DFF5" stroke="#E9F4FF" strokeWidth="1.2" />
    </g>
    <g className="scouse-mascot__arm-right">
    <path d="M79 67c7 1 10 7 10 15v5" stroke="#B5D1EF" strokeWidth="10" strokeLinecap="round" />
    <path d="M79 67c7 1 10 7 10 15v5" stroke="#638BC5" strokeWidth="7" strokeLinecap="round" />
    <rect x="83" y="82" width="11" height="12" rx="5" fill="#C6DFF5" stroke="#E9F4FF" strokeWidth="1.2" />
    <path d="M87 87h3" stroke="#729DD1" strokeWidth="1" strokeLinecap="round" />
    </g>
    <g className="scouse-mascot__head">
    <rect x="22" y="27" width="7" height="23" rx="3.5" fill="#406797" stroke="#9CC4F4" />
    <rect x="83" y="27" width="7" height="23" rx="3.5" fill="#406797" stroke="#9CC4F4" />
    <rect x="26" y="15" width="60" height="47" rx="17" fill={`url(#${id}-shell)`} stroke="#D5E9FF" strokeWidth="1.8" />
    <rect x="32" y="27" width="48" height="27" rx="11" fill={`url(#${id}-visor)`} stroke="#C1DBF8" strokeWidth="1.2" />
    <path d="M36 32c10-3 27-3 39 0" stroke="#91C9EA" strokeWidth="1.2" strokeLinecap="round" opacity=".65" />
    <path d="M37 35v8" stroke="#C3EBFF" strokeWidth="1.5" strokeLinecap="round" opacity=".25" />
    <g className="scouse-mascot__eyes" fill="#9CE9F0"><rect x="42" y="36" width="6" height="9" rx="3" /><rect x="64" y="36" width="6" height="9" rx="3" /></g>
    <path d="M51 46c3 3 7 3 10 0" stroke="#ACD8EE" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M37 19h38" stroke="#F1F8FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M56 15V9" stroke="#9EBFEB" strokeWidth="2" strokeLinecap="round" />
    <rect x="51" y="5" width="10" height="5" rx="2.5" fill={`url(#${id}-core)`} stroke="#DDF9FF" strokeWidth="1" />
    </g>
    </g>
  </svg>;
}
