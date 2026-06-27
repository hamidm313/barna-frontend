'use client';
import React from 'react';
import type { MannequinGender, MannequinSize } from '@/types';

interface LayerColors {
  headwear?: string;
  top?: string;
  bottom?: string;
  belt?: string;
  outerwear?: string;
  footwear?: string;
  accessory?: string;
}

interface Props {
  gender: MannequinGender;
  size: MannequinSize;
  colors: LayerColors;
  activeLayer?: string | null;
  hiddenLayers?: Set<string>;
}

const SKIN = '#F5CBA7';
const HAIR_F = '#4a2c0a';
const HAIR_M = '#2c1a0a';

// Scale map: XS smallest → XXL largest body proportions
const SCALE: Record<MannequinSize, number> = { XS: 0.84, S: 0.92, M: 1, L: 1.06, XL: 1.12, XXL: 1.18 };

export default function MannequinSVG({ gender, size, colors, activeLayer, hiddenLayers = new Set() }: Props) {
  const sc = SCALE[size] || 1;
  const isFemale = gender === 'female';
  const isChild = gender === 'child';
  const childSc = isChild ? 0.78 : 1;
  const s = sc * childSc;

  const show = (layer: string) => !hiddenLayers.has(layer);
  const highlight = (layer: string) => activeLayer === layer ? 'drop-shadow(0 0 6px rgba(201,168,76,0.9))' : undefined;

  // All coordinates are in a 200×480 coordinate space, scaled by s
  const cx = 100; // horizontal center

  // Body proportions based on gender
  const shoulderW = isFemale ? 55 : 65;
  const waistW = isFemale ? 35 : 42;
  const hipW = isFemale ? 58 : 52;
  const bustY = 130;
  const waistY = 185;
  const hipY = 215;
  const kneeY = 310;
  const ankleY = 390;

  return (
    <svg
      viewBox={`0 0 200 480`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      style={{ transform: `scale(${s})`, transformOrigin: 'top center' }}
    >
      {/* ── FOOTWEAR ── */}
      {show('footwear') && (
        <g filter={highlight('footwear')} opacity={colors.footwear ? 1 : 0.3}>
          {/* Left shoe */}
          <ellipse cx={cx - 18} cy={ankleY + 22} rx={18} ry={9} fill={colors.footwear || '#7c5c3a'} />
          <rect x={cx - 34} y={ankleY + 14} width={30} height={14} rx={4} fill={colors.footwear || '#7c5c3a'} />
          {/* Right shoe */}
          <ellipse cx={cx + 18} cy={ankleY + 22} rx={18} ry={9} fill={colors.footwear || '#7c5c3a'} />
          <rect x={cx + 4} y={ankleY + 14} width={30} height={14} rx={4} fill={colors.footwear || '#7c5c3a'} />
          {/* Sole highlight */}
          <ellipse cx={cx - 18} cy={ankleY + 26} rx={17} ry={4} fill="rgba(0,0,0,0.15)" />
          <ellipse cx={cx + 18} cy={ankleY + 26} rx={17} ry={4} fill="rgba(0,0,0,0.15)" />
        </g>
      )}

      {/* ── LEGS / SKIN ── */}
      <g>
        {/* Left leg */}
        <rect x={cx - 28} y={hipY} width={22} height={ankleY - hipY} rx={8} fill={SKIN} />
        {/* Right leg */}
        <rect x={cx + 6} y={hipY} width={22} height={ankleY - hipY} rx={8} fill={SKIN} />
      </g>

      {/* ── BOTTOM (skirt or trousers) ── */}
      {show('bottom') && (
        <g filter={highlight('bottom')} opacity={colors.bottom ? 1 : 0.3}>
          {isFemale ? (
            // Skirt — flared
            <path
              d={`M ${cx - waistW} ${waistY}
                  Q ${cx - hipW - 12} ${waistY + 50} ${cx - hipW - 18} ${kneeY + 20}
                  Q ${cx} ${kneeY + 35} ${cx + hipW + 18} ${kneeY + 20}
                  Q ${cx + hipW + 12} ${waistY + 50} ${cx + waistW} ${waistY} Z`}
              fill={colors.bottom || '#C9A84C'}
              stroke="rgba(0,0,0,0.08)" strokeWidth="1"
            />
          ) : (
            // Trousers
            <>
              <rect x={cx - hipW} y={waistY} width={hipW - 4} height={ankleY - waistY} rx={6} fill={colors.bottom || '#1a1a1a'} />
              <rect x={cx + 4} y={waistY} width={hipW - 4} height={ankleY - waistY} rx={6} fill={colors.bottom || '#1a1a1a'} />
              <rect x={cx - hipW} y={waistY} width={hipW * 2} height={10} rx={2} fill="rgba(0,0,0,0.1)" />
            </>
          )}
        </g>
      )}

      {/* ── BELT ── */}
      {show('belt') && (
        <g filter={highlight('belt')} opacity={colors.belt ? 1 : 0.25}>
          <rect x={cx - waistW} y={waistY - 6} width={waistW * 2} height={12} rx={4} fill={colors.belt || '#C9A84C'} />
          <rect x={cx - 7} y={waistY - 8} width={14} height={16} rx={3} fill={colors.belt || '#C9A84C'} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        </g>
      )}

      {/* ── TORSO SKIN ── */}
      <g>
        {/* Neck */}
        <rect x={cx - 10} y={95} width={20} height={30} rx={6} fill={SKIN} />
        {/* Arms */}
        <rect x={cx - shoulderW - 12} y={bustY - 8} width={16} height={95} rx={8} fill={SKIN} />
        <rect x={cx + shoulderW - 4} y={bustY - 8} width={16} height={95} rx={8} fill={SKIN} />
        {/* Hands */}
        <ellipse cx={cx - shoulderW - 4} cy={bustY + 93} rx={9} ry={10} fill={SKIN} />
        <ellipse cx={cx + shoulderW + 4} cy={bustY + 93} rx={9} ry={10} fill={SKIN} />
      </g>

      {/* ── TOP / SHIRT ── */}
      {show('top') && (
        <g filter={highlight('top')} opacity={colors.top ? 1 : 0.3}>
          {/* Body */}
          <path
            d={`M ${cx - shoulderW} ${bustY}
                C ${cx - shoulderW} ${bustY} ${cx - waistW - 4} ${waistY - 8} ${cx - waistW} ${waistY}
                L ${cx + waistW} ${waistY}
                C ${cx + waistW + 4} ${waistY - 8} ${cx + shoulderW} ${bustY} ${cx + shoulderW} ${bustY} Z`}
            fill={colors.top || '#1a5276'}
            stroke="rgba(0,0,0,0.06)" strokeWidth="1"
          />
          {/* Sleeves */}
          <rect x={cx - shoulderW - 12} y={bustY - 8} width={16} height={70} rx={8} fill={colors.top || '#1a5276'} />
          <rect x={cx + shoulderW - 4} y={bustY - 8} width={16} height={70} rx={8} fill={colors.top || '#1a5276'} />
          {/* Collar V-neck */}
          <path d={`M ${cx - 14} ${bustY - 2} L ${cx} ${bustY + 24} L ${cx + 14} ${bustY - 2}`}
            fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          {/* Chest decorative line */}
          {isFemale && <path d={`M ${cx - 22} ${bustY + 12} Q ${cx} ${bustY + 24} ${cx + 22} ${bustY + 12}`}
            fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />}
        </g>
      )}

      {/* ── OUTERWEAR (overlay on top of top) ── */}
      {show('outerwear') && (
        <g filter={highlight('outerwear')} opacity={colors.outerwear ? 0.82 : 0.2}>
          {/* Open jacket — two lapels */}
          <path
            d={`M ${cx - shoulderW + 4} ${bustY - 4}
                L ${cx - 10} ${bustY + 20}
                L ${cx - 10} ${waistY}
                L ${cx - waistW - 6} ${waistY}
                C ${cx - waistW - 6} ${waistY - 8} ${cx - shoulderW + 4} ${bustY - 4} ${cx - shoulderW + 4} ${bustY - 4} Z`}
            fill={colors.outerwear || '#922b21'}
            stroke="rgba(0,0,0,0.08)" strokeWidth="1"
          />
          <path
            d={`M ${cx + shoulderW - 4} ${bustY - 4}
                L ${cx + 10} ${bustY + 20}
                L ${cx + 10} ${waistY}
                L ${cx + waistW + 6} ${waistY}
                C ${cx + waistW + 6} ${waistY - 8} ${cx + shoulderW - 4} ${bustY - 4} ${cx + shoulderW - 4} ${bustY - 4} Z`}
            fill={colors.outerwear || '#922b21'}
            stroke="rgba(0,0,0,0.08)" strokeWidth="1"
          />
          {/* Outer sleeves */}
          <rect x={cx - shoulderW - 14} y={bustY - 10} width={18} height={72} rx={8} fill={colors.outerwear || '#922b21'} />
          <rect x={cx + shoulderW - 4} y={bustY - 10} width={18} height={72} rx={8} fill={colors.outerwear || '#922b21'} />
        </g>
      )}

      {/* ── HEAD (skin + hair) ── */}
      <g>
        {/* Head */}
        <ellipse cx={cx} cy={68} rx={28} ry={32} fill={SKIN} />
        {/* Chin */}
        <ellipse cx={cx} cy={95} rx={14} ry={8} fill={SKIN} />
        {/* Eyes */}
        <ellipse cx={cx - 10} cy={64} rx={4} ry={4.5} fill="#1a1a1a" />
        <ellipse cx={cx + 10} cy={64} rx={4} ry={4.5} fill="#1a1a1a" />
        <ellipse cx={cx - 9} cy={63} rx={1.5} ry={1.5} fill="white" />
        <ellipse cx={cx + 11} cy={63} rx={1.5} ry={1.5} fill="white" />
        {/* Eyebrows */}
        <path d={`M ${cx - 14} 58 Q ${cx - 10} 55 ${cx - 6} 58`} fill="none" stroke="#4a2c0a" strokeWidth="1.8" strokeLinecap="round" />
        <path d={`M ${cx + 6} 58 Q ${cx + 10} 55 ${cx + 14} 58`} fill="none" stroke="#4a2c0a" strokeWidth="1.8" strokeLinecap="round" />
        {/* Nose */}
        <path d={`M ${cx} 68 Q ${cx + 3} 74 ${cx} 76`} fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />
        {/* Mouth */}
        <path d={`M ${cx - 8} 82 Q ${cx} ${isFemale ? 88 : 86} ${cx + 8} 82`}
          fill="none" stroke={isFemale ? '#c0605a' : '#a0522d'} strokeWidth="1.8" strokeLinecap="round" />
        {/* Hair */}
        {isFemale ? (
          // Long female hair
          <>
            <ellipse cx={cx} cy={46} rx={30} ry={18} fill={HAIR_F} />
            <rect x={cx - 30} y={44} width={8} height={55} rx={4} fill={HAIR_F} />
            <rect x={cx + 22} y={44} width={8} height={55} rx={4} fill={HAIR_F} />
            <ellipse cx={cx} cy={38} rx={28} ry={14} fill={HAIR_F} />
          </>
        ) : isChild ? (
          // Child — short hair
          <>
            <ellipse cx={cx} cy={46} rx={29} ry={16} fill={HAIR_M} />
            <ellipse cx={cx} cy={38} rx={26} ry={12} fill={HAIR_M} />
          </>
        ) : (
          // Male — short hair
          <>
            <ellipse cx={cx} cy={44} rx={29} ry={15} fill={HAIR_M} />
            <ellipse cx={cx} cy={37} rx={27} ry={12} fill={HAIR_M} />
          </>
        )}
      </g>

      {/* ── HEADWEAR ── */}
      {show('headwear') && (
        <g filter={highlight('headwear')} opacity={colors.headwear ? 1 : 0.3}>
          {isFemale ? (
            // Scarf / crown
            <>
              <ellipse cx={cx} cy={40} rx={33} ry={18} fill={colors.headwear || '#C9A84C'} />
              <rect x={cx - 33} y={40} width={12} height={60} rx={6} fill={colors.headwear || '#C9A84C'} />
              <rect x={cx + 21} y={40} width={12} height={60} rx={6} fill={colors.headwear || '#C9A84C'} />
              {/* Decorative band */}
              <ellipse cx={cx} cy={54} rx={27} ry={6} fill="rgba(255,255,255,0.18)" />
            </>
          ) : (
            // Hat / cap
            <>
              <ellipse cx={cx} cy={42} rx={31} ry={14} fill={colors.headwear || '#7c5c3a'} />
              <rect x={cx - 20} y={32} width={40} height={16} rx={6} fill={colors.headwear || '#7c5c3a'} />
              <ellipse cx={cx} cy={32} rx={20} ry={8} fill={colors.headwear || '#7c5c3a'} />
            </>
          )}
        </g>
      )}

      {/* ── ACCESSORY (necklace) ── */}
      {show('accessory') && (
        <g filter={highlight('accessory')} opacity={colors.accessory ? 1 : 0.3}>
          <path
            d={`M ${cx - 14} ${bustY - 2} Q ${cx} ${bustY + 14} ${cx + 14} ${bustY - 2}`}
            fill="none" stroke={colors.accessory || '#C9A84C'} strokeWidth="3" strokeLinecap="round"
          />
          {/* Pendant */}
          <circle cx={cx} cy={bustY + 14} r={4} fill={colors.accessory || '#C9A84C'} />
          <circle cx={cx} cy={bustY + 14} r={2} fill="rgba(255,255,255,0.5)" />
        </g>
      )}
    </svg>
  );
}
