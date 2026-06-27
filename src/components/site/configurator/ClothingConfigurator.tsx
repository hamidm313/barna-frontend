'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { clothingApi } from '@/lib/api/clothing';
import { ethnicGroupsApi } from '@/lib/api/ethnicGroups';
import { queryKeys } from '@/lib/queryKeys';
import { useTranslation } from '@/lib/i18n';
import type { MannequinGender, MannequinSize, ClothingComponentType, Clothing, EthnicGroup } from '@/types';
import MannequinSVG from './MannequinSVG';

const SIZES: MannequinSize[] = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const LAYER_ORDER: ClothingComponentType[] = ['headwear', 'top', 'bottom', 'belt', 'outerwear', 'footwear', 'accessory'];

type LayerColors = Partial<Record<ClothingComponentType, string>>;

export default function ClothingConfigurator() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();

  const [gender, setGender] = useState<MannequinGender>('female');
  const [size, setSize] = useState<MannequinSize>('M');
  const [selectedClothingId, setSelectedClothingId] = useState<string>(searchParams?.get('clothing') || '');
  const [selectedEthnic, setSelectedEthnic] = useState<string>(searchParams?.get('ethnic') || '');
  const [activeLayer, setActiveLayer] = useState<ClothingComponentType | null>(null);
  const [colors, setColors] = useState<LayerColors>({});
  const [hiddenLayers, setHiddenLayers] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState(false);

  // Fetch clothing list (filtered by ethnic if selected)
  const { data: clothingData } = useQuery({
    queryKey: queryKeys.clothing.list({ ethnic_group: selectedEthnic || undefined, limit: 50 }),
    queryFn: () => clothingApi.list({ ethnic_group: selectedEthnic || undefined, limit: 50 }),
  });

  // Fetch ethnic groups
  const { data: groups } = useQuery({
    queryKey: queryKeys.ethnicGroups.list(),
    queryFn: () => ethnicGroupsApi.list(),
  });

  // When a specific clothing is pre-loaded via URL, fetch its details
  const { data: preloadedClothing } = useQuery({
    queryKey: queryKeys.clothing.detail(selectedClothingId),
    queryFn: () => clothingApi.getOne(selectedClothingId),
    enabled: !!selectedClothingId,
  });

  // Pick the currently selected clothing from the list (or preloaded)
  const selectedClothing: Clothing | undefined = preloadedClothing ||
    clothingData?.data?.find((c: Clothing) => String(c.id) === selectedClothingId);

  const components = selectedClothing?.components || [];

  // When clothing changes, load its default colors
  useEffect(() => {
    if (selectedClothing?.components) {
      const defaults: LayerColors = {};
      selectedClothing.components.forEach(comp => {
        if (comp.default_color) defaults[comp.type] = comp.default_color;
      });
      setColors(defaults);
      setHiddenLayers(new Set());
      setActiveLayer(null);
    }
  }, [selectedClothing?.id]);

  const setLayerColor = (layer: ClothingComponentType, hex: string) => {
    setColors(prev => ({ ...prev, [layer]: hex }));
  };

  const toggleLayer = (layer: string) => {
    setHiddenLayers(prev => {
      const next = new Set(prev);
      next.has(layer) ? next.delete(layer) : next.add(layer);
      return next;
    });
  };

  const reset = () => {
    if (selectedClothing?.components) {
      const defaults: LayerColors = {};
      selectedClothing.components.forEach(comp => {
        if (comp.default_color) defaults[comp.type] = comp.default_color;
      });
      setColors(defaults);
    } else {
      setColors({});
    }
    setHiddenLayers(new Set());
    setActiveLayer(null);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const componentLabel = (type: ClothingComponentType): string => {
    const map: Record<ClothingComponentType, string> = {
      headwear: t('configurator.headwear'),
      top: t('configurator.top'),
      bottom: t('configurator.bottom'),
      belt: t('configurator.belt'),
      outerwear: t('configurator.outerwear'),
      footwear: t('configurator.footwear'),
      accessory: t('configurator.accessory'),
    };
    return map[type] || type;
  };

  // Sort components by canonical layer order
  const sortedComponents = [...components].sort(
    (a, b) => LAYER_ORDER.indexOf(a.type) - LAYER_ORDER.indexOf(b.type)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="section-title">{t('configurator.title')}</h1>
        <p className="section-subtitle">{t('configurator.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-8">
        {/* ── LEFT PANEL: Controls ── */}
        <div className="space-y-5">
          {/* Gender selector */}
          <div className="bg-white rounded-barna p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-barna-dark mb-3">{t('configurator.selectMannequin')}</h3>
            <div className="flex gap-2">
              {(['female', 'male', 'child'] as MannequinGender[]).map(g => (
                <button
                  key={g}
                  onClick={() => { setGender(g); reset(); }}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    gender === g
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-barna-cream text-barna-gray hover:bg-primary-50'
                  }`}
                >
                  {g === 'female' ? '👩 ' : g === 'male' ? '👨 ' : '👧 '}
                  {t(`configurator.${g}`)}
                </button>
              ))}
            </div>
          </div>

          {/* Size selector */}
          <div className="bg-white rounded-barna p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-barna-dark mb-3">{t('configurator.size')}</h3>
            <div className="flex flex-wrap gap-2">
              {SIZES.map(s => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    size === s
                      ? 'bg-barna-dark text-white'
                      : 'bg-barna-cream text-barna-gray hover:bg-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Ethnic group filter */}
          <div className="bg-white rounded-barna p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-barna-dark mb-3">{t('configurator.selectEthnic')}</h3>
            <select
              className="input-field w-full text-sm"
              value={selectedEthnic}
              onChange={e => { setSelectedEthnic(e.target.value); setSelectedClothingId(''); }}
            >
              <option value="">{t('configurator.allGroups')}</option>
              {groups?.map((g: EthnicGroup) => (
                <option key={g.slug} value={g.slug}>{g.display_name}</option>
              ))}
            </select>
          </div>

          {/* Clothing selector */}
          <div className="bg-white rounded-barna p-4 shadow-sm">
            <h3 className="text-sm font-semibold text-barna-dark mb-3">{t('configurator.selectClothing')}</h3>
            <select
              className="input-field w-full text-sm"
              value={selectedClothingId}
              onChange={e => setSelectedClothingId(e.target.value)}
            >
              <option value="">— {t('configurator.selectClothing')} —</option>
              {clothingData?.data?.map((c: Clothing) => (
                <option key={c.id} value={String(c.id)}>{c.display_name}</option>
              ))}
            </select>
          </div>

          {/* Component controls */}
          {selectedClothing && (
            <div className="bg-white rounded-barna p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-barna-dark mb-3">{t('configurator.components')}</h3>
              {sortedComponents.length === 0 ? (
                <p className="text-xs text-barna-gray">{t('configurator.noComponents')}</p>
              ) : (
                <div className="space-y-3">
                  {sortedComponents.map(comp => {
                    const isActive = activeLayer === comp.type;
                    const isHidden = hiddenLayers.has(comp.type);
                    return (
                      <div key={comp.type}>
                        <div className="flex items-center justify-between mb-1.5">
                          <button
                            onClick={() => setActiveLayer(isActive ? null : comp.type)}
                            className={`text-xs font-medium flex items-center gap-1.5 transition-colors ${
                              isActive ? 'text-primary-600' : 'text-barna-dark hover:text-primary-600'
                            }`}
                          >
                            <span className={`w-2 h-2 rounded-full`}
                              style={{ background: colors[comp.type] || '#e5e7eb' }} />
                            {comp.display_name}
                            {comp.is_optional && <span className="text-barna-gray/60 font-normal">(اختیاری)</span>}
                          </button>
                          <button
                            onClick={() => toggleLayer(comp.type)}
                            className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                              isHidden
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-primary-50 text-primary-600'
                            }`}
                            title={t('configurator.toggle')}
                          >
                            {isHidden ? '👁️‍🗨️' : '👁️'}
                          </button>
                        </div>

                        {/* Color swatches — always visible when layer active */}
                        {isActive && (
                          <div className="flex flex-wrap gap-1.5 ps-3.5 pb-1">
                            {comp.color_options.map(opt => (
                              <button
                                key={opt.hex}
                                onClick={() => setLayerColor(comp.type, opt.hex)}
                                title={opt.name}
                                className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                                  colors[comp.type] === opt.hex
                                    ? 'border-primary-500 scale-110 shadow-md'
                                    : 'border-white shadow-sm'
                                }`}
                                style={{ background: opt.hex }}
                              />
                            ))}
                            {/* Custom color picker */}
                            <label title={t('configurator.customColor')} className="w-7 h-7 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-primary-400 overflow-hidden">
                              <input
                                type="color"
                                className="opacity-0 absolute w-px h-px"
                                value={colors[comp.type] || '#C9A84C'}
                                onChange={e => setLayerColor(comp.type, e.target.value)}
                              />
                              <span className="text-xs">✏️</span>
                            </label>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-2">
            <button onClick={reset} className="btn-outline flex-1 text-sm py-2">
              🔄 {t('configurator.reset')}
            </button>
            <button onClick={handleSave} className={`flex-1 text-sm py-2 rounded-barna font-medium transition-all ${saved ? 'bg-green-500 text-white' : 'btn-primary'}`}>
              {saved ? '✅ ذخیره شد' : `💾 ${t('configurator.saveOutfit')}`}
            </button>
          </div>
        </div>

        {/* ── RIGHT PANEL: Mannequin ── */}
        <div className="flex flex-col items-center">
          <div className="bg-gradient-to-b from-barna-cream to-white rounded-2xl shadow-sm w-full max-w-sm mx-auto aspect-[3/5] relative overflow-hidden border border-gray-100">
            {/* Size badge */}
            <div className="absolute top-3 start-3 bg-barna-dark/80 text-white text-xs px-2.5 py-1 rounded-full z-10">
              {size}
            </div>
            {/* Gender badge */}
            <div className="absolute top-3 end-3 bg-primary-600/90 text-white text-xs px-2.5 py-1 rounded-full z-10">
              {t(`configurator.${gender}`)}
            </div>
            {/* Mannequin */}
            <div className="w-full h-full flex items-start justify-center pt-4 pb-4 px-6">
              <MannequinSVG
                gender={gender}
                size={size}
                colors={colors}
                activeLayer={activeLayer}
                hiddenLayers={hiddenLayers}
              />
            </div>
          </div>

          {/* Hint */}
          <p className="text-xs text-barna-gray mt-3 text-center max-w-xs">
            💡 {t('configurator.hint')}
          </p>

          {/* Selected clothing info */}
          {selectedClothing && (
            <div className="mt-4 bg-white rounded-barna p-4 shadow-sm w-full max-w-sm text-sm">
              <p className="font-semibold text-barna-dark">{selectedClothing.display_name}</p>
              {selectedClothing.ethnic_group_display_name && (
                <p className="text-primary-600 text-xs mt-0.5">{selectedClothing.ethnic_group_display_name}</p>
              )}
              <div className="flex flex-wrap gap-1.5 mt-2">
                {colors && Object.entries(colors).map(([layer, hex]) => (
                  hex && (
                    <span key={layer} className="flex items-center gap-1 text-xs text-barna-gray">
                      <span className="w-3 h-3 rounded-full inline-block" style={{ background: hex }} />
                      {componentLabel(layer as ClothingComponentType)}
                    </span>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
