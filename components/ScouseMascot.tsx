'use client';

import { useId } from 'react';

/** Scouse: a sapphire bird with a coral scarf, drawn to stay legible at avatar size. */
export default function ScouseMascot({ size = 56, className = '' }: { size?: number; className?: string }) {
  const id = useId().replace(/:/g, '');
  return <svg className={`scouse-mascot ${className}`} width={size} height={size} viewBox="0 0 96 96" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-body`} x1="24" y1="17" x2="72" y2="83" gradientUnits="userSpaceOnUse"><stop stopColor="#91D8F2" /><stop offset=".5" stopColor="#669BF0" /><stop offset="1" stopColor="#3D60BB" /></linearGradient>
      <linearGradient id={`${id}-wing`} x1="52" y1="56" x2="81" y2="74" gradientUnits="userSpaceOnUse"><stop stopColor="#537FD1" /><stop offset="1" stopColor="#284684" /></linearGradient>
    </defs>
    <ellipse cx="48" cy="86" rx="24" ry="4" fill="#182B54" opacity=".2" />
    <path d="M29 68 18 73l14 3" fill="#4067AC" stroke="#2D4F92" strokeWidth="2" strokeLinejoin="round" />
    <path d="M37 79v6m18-6v6m-21 1h9m9 0h9" stroke="#EAA58B" strokeWidth="3" strokeLinecap="round" />
    <path d="M25 45c0-20 9-29 25-29 18 0 26 13 26 32v14c0 15-10 22-26 22-15 0-25-10-25-24V45Z" fill={`url(#${id}-body)`} stroke="#A8CBF5" strokeWidth="1.4" />
    <path d="M44 18c-4-8-1-12 2-12l7 12m0-1c1-7 6-9 9-7l-3 10" fill="#80B6F0" stroke="#ACD4FA" strokeWidth="1.2" strokeLinecap="round" />
    <path d="M31 40c0-10 8-15 19-15s19 6 19 16c0 12-8 20-19 20S31 52 31 40Z" fill="#EDF7FF" />
    <g className="scouse-mascot__eyes" fill="#183253"><ellipse cx="42" cy="40" rx="3" ry="4" /><ellipse cx="59" cy="40" rx="3" ry="4" /><circle cx="43" cy="38.5" r=".9" fill="white" /><circle cx="60" cy="38.5" r=".9" fill="white" /></g>
    <path d="m46 48 5 5 6-5-6-3-5 3Z" fill="#D89574" stroke="#BD7C5E" strokeWidth="1" strokeLinejoin="round" />
    <ellipse cx="35" cy="47" rx="4" ry="2" fill="#B7D7EF" /><ellipse cx="65" cy="47" rx="4" ry="2" fill="#B7D7EF" />
    <path d="M28 59c10 6 29 7 45-2l1 8c-14 9-34 7-46 1v-7Z" fill="#DC8F80" stroke="#F4B5A2" strokeWidth="1" />
    <path d="m59 67 4 15 8-4-6-13" fill="#D47F72" stroke="#F0A99B" strokeWidth="1" strokeLinejoin="round" />
    <path className="scouse-mascot__wing" d="M65 58c10 0 19 8 17 15-2 5-14-1-20-8" fill={`url(#${id}-wing)`} stroke="#A6C4F1" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M34 72c3 4 7 6 13 6" stroke="#A4C5F6" strokeWidth="2" strokeLinecap="round" opacity=".8" />
  </svg>;
}
