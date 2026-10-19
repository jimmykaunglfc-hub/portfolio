'use client';

import { useId } from 'react';

/** Scouse, the product maker: a visor-wearing builder with a blueprint and precision pencil. */
export default function ScouseMascot({ size = 56, className = '' }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`scouse-mascot ${className}`} width={size} height={size} viewBox="0 0 112 112" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-shell`} x1="28" y1="20" x2="82" y2="91" gradientUnits="userSpaceOnUse"><stop stopColor="#D7EFFF" /><stop offset=".5" stopColor="#82B2EE" /><stop offset="1" stopColor="#4670C5" /></linearGradient>
      <linearGradient id={`${id}-visor`} x1="32" y1="29" x2="82" y2="57" gradientUnits="userSpaceOnUse"><stop stopColor="#203B62" /><stop offset="1" stopColor="#0A1C35" /></linearGradient>
      <linearGradient id={`${id}-suit`} x1="38" y1="63" x2="76" y2="97" gradientUnits="userSpaceOnUse"><stop stopColor="#436FAF" /><stop offset="1" stopColor="#1E3862" /></linearGradient>
      <linearGradient id={`${id}-plan`} x1="17" y1="68" x2="45" y2="93" gradientUnits="userSpaceOnUse"><stop stopColor="#B7E6F7" /><stop offset="1" stopColor="#729EDC" /></linearGradient>
    </defs>
    <ellipse cx="56" cy="104" rx="32" ry="4" fill="#102343" opacity=".23" />
    <path d="M41 89v11h13V88m8 0v12h13V86" fill="#37577F" stroke="#9CBCE2" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M39 99h16v5H36v-2l3-3Zm23 0h14l5 3v2H62v-5Z" fill="#A6C6E8" stroke="#DAECFF" strokeWidth="1" strokeLinejoin="round" />
    <rect x="34" y="61" width="46" height="32" rx="12" fill={`url(#${id}-suit)`} stroke="#96B9EB" strokeWidth="1.5" />
    <path d="M43 65v23m26-23v23" stroke="#97BBEA" strokeWidth="3" opacity=".8" />
    <rect x="44" y="72" width="25" height="18" rx="5" fill="#172E50" stroke="#6E99D4" />
    <path d="m52 79 5-3 5 3v6l-5 3-5-3v-6Zm0 0 5 3 5-3m-5 3v6" stroke="#A5DDEB" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M36 66c-9 0-14 7-14 16l9 2 10-12" fill="#729CDA" stroke="#B5D1EF" strokeWidth="1.4" strokeLinecap="round" />
    <g className="scouse-mascot__tool">
      <path d="M78 66c8-1 12 4 12 11l-8 3-7-8" fill="#729CDA" stroke="#B5D1EF" strokeWidth="1.4" />
      <g transform="rotate(20 92 58)"><rect x="88" y="38" width="7" height="36" rx="2" fill="#E6B078" stroke="#FFDCAB" strokeWidth="1" /><path d="m88 74 3.5 9 3.5-9" fill="#E8DBBC" /><path d="m90 80 1.5 3 1.5-3" fill="#293A53" /><path d="M88 46h7" stroke="#8D6247" strokeWidth="2" /></g>
      <rect x="82" y="71" width="11" height="9" rx="4" fill="#C6DFF5" stroke="#E9F4FF" />
    </g>
    <g transform="rotate(-12 28 82)">
      <rect x="12" y="64" width="30" height="31" rx="3" fill={`url(#${id}-plan)`} stroke="#E0F5FF" strokeWidth="1.4" />
      <path d="M17 70h20M17 75h8m-8 4h8m-8 10h20M28 75h9v9h-9z" stroke="#365C91" strokeWidth="1.1" strokeLinecap="round" />
      <path d="m30 80 2 2 4-5" stroke="#245077" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 64v31m14-31v31" stroke="#CFEAFB" opacity=".3" />
    </g>
    <rect x="22" y="27" width="7" height="23" rx="3.5" fill="#406797" stroke="#9CC4F4" />
    <rect x="83" y="27" width="7" height="23" rx="3.5" fill="#406797" stroke="#9CC4F4" />
    <rect x="26" y="15" width="60" height="47" rx="17" fill={`url(#${id}-shell)`} stroke="#D5E9FF" strokeWidth="1.8" />
    <rect x="32" y="27" width="48" height="27" rx="11" fill={`url(#${id}-visor)`} stroke="#C1DBF8" strokeWidth="1.2" />
    <path d="M36 32c10-3 27-3 39 0" stroke="#6594BA" strokeWidth="1.2" strokeLinecap="round" opacity=".6" />
    <g className="scouse-mascot__eyes" fill="#9CE9F0"><rect x="42" y="36" width="6" height="9" rx="3" /><rect x="64" y="36" width="6" height="9" rx="3" /></g>
    <path d="M51 46c3 3 7 3 10 0" stroke="#ACD8EE" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M37 19h38" stroke="#F1F8FF" strokeWidth="2" strokeLinecap="round" />
    <rect x="49" y="10" width="15" height="11" rx="4" fill="#355D93" stroke="#A4C8F5" />
    <path d="m53 15 3 3 5-5" stroke="#B6E7E9" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M89 16v8m-4-4h8M18 52v6m-3-3h6" stroke="#B7DFF7" strokeWidth="1.5" strokeLinecap="round" />
  </svg>;
}
