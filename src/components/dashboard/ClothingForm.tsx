'use client';

import { useState, useEffect } from 'react';
import { Grid, TextField, MenuItem, FormControlLabel, Switch, Box, Typography, Chip, Button, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getEthnicGroups } from '@/lib/api/ethnicGroups';
import { getTags } from '@/lib/api/tags';
import { Clothing, ClothingCategory, ClothingGender, ClothingCondition } from '@/types';

interface ClothingFormProps {
  initialData?: Partial<Clothing>;
  onSubmit: (data: Partial<Clothing>) => Promise<void>;
  loading?: boolean;
}

const categories: { v: ClothingCategory; l: string }[] = [
  { v: 'traditional', l: 'سنتی' },
  { v: 'modern', l: 'مدرن' },
  { v: 'fusion', l: 'تلفیقی' },
  { v: 'barna_design', l: 'طرح برنا' },
  { v: 'wardrobe', l: 'کمد لباس' },
];

const genders: { v: ClothingGender; l: string }[] = [
  { v: 'male', l: 'مردانه' },
  { v: 'female', l: 'زنانه' },
  { v: 'unisex', l: 'یونیسکس' },
  { v: 'child', l: 'بچگانه' },
];

const conditions: { v: ClothingCondition; l: string }[] = [
  { v: 'excellent', l: 'عالی' },
  { v: 'good', l: 'خوب' },
  { v: 'fair', l: 'متوسط' },
];

export default function ClothingForm({ initialData, onSubmit, loading }: ClothingFormProps) {
  const [form, setForm] = useState<Partial<Clothing>>(initialData || { gender: 'female', status: 'available', images: [] });
  const [imagesInput, setImagesInput] = useState((initialData?.images || []).join('\n'));

  useEffect(() => { if (initialData) { setForm(initialData); setImagesInput((initialData.images || []).join('\n')); } }, [initialData]);

  const { data: groups } = useQuery({ queryKey: ['ethnicGroups'], queryFn: () => getEthnicGroups({}) });
  const { data: tags } = useQuery({ queryKey: ['tags'], queryFn: () => getTags({}) });

  const set = (k: keyof Clothing, v: unknown) => setForm(prev => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...form, images: imagesInput.split('\n').map(u => u.trim()).filter(Boolean) });
  };

  const toggleTag = (tagName: string) => {
    const current = (form as Record<string, unknown>).tag_names as string[] || [];
    const next = current.includes(tagName) ? current.filter(t => t !== tagName) : [...current, tagName];
    setForm(prev => ({ ...prev, tag_names: next }));
  };

  const sx = { '& label': { fontFamily: 'Vazirmatn, sans-serif' }, '& input, & textarea, & .MuiSelect-select': { fontFamily: 'Vazirmatn, sans-serif' } };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}><TextField fullWidth required label="عنوان" value={form.display_name || ''} onChange={e => set('display_name', e.target.value)} sx={sx} /></Grid>
        <Grid item xs={12} md={6}>
          <TextField select fullWidth required label="گروه قومی" value={form.ethnic_group_id || ''} onChange={e => set('ethnic_group_id', Number(e.target.value))} sx={sx}>
            {(groups?.data || []).map((g: { id: number; display_name: string }) => <MenuItem key={g.id} value={g.id} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{g.display_name}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField select fullWidth required label="دسته‌بندی" value={form.category || ''} onChange={e => set('category', e.target.value as ClothingCategory)} sx={sx}>
            {categories.map(c => <MenuItem key={c.v} value={c.v} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{c.l}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField select fullWidth required label="جنسیت" value={form.gender || 'female'} onChange={e => set('gender', e.target.value as ClothingGender)} sx={sx}>
            {genders.map(g => <MenuItem key={g.v} value={g.v} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{g.l}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField select fullWidth label="وضعیت" value={form.status || 'available'} onChange={e => set('status', e.target.value)} sx={sx}>
            {[{ v: 'available', l: 'موجود' }, { v: 'rented', l: 'اجاره' }, { v: 'sold', l: 'فروخته شده' }, { v: 'reserved', l: 'رزرو' }].map(s => <MenuItem key={s.v} value={s.v} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{s.l}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={3}><TextField fullWidth label="سایز" value={form.size || ''} onChange={e => set('size', e.target.value)} sx={sx} /></Grid>
        <Grid item xs={12} md={3}><TextField fullWidth label="رنگ" value={form.color || ''} onChange={e => set('color', e.target.value)} sx={sx} /></Grid>
        <Grid item xs={12} md={3}><TextField fullWidth label="جنس پارچه" value={form.material || ''} onChange={e => set('material', e.target.value)} sx={sx} /></Grid>
        <Grid item xs={12} md={3}>
          <TextField select fullWidth label="وضعیت کالا" value={form.condition_status || ''} onChange={e => set('condition_status', e.target.value as ClothingCondition)} sx={sx}>
            {conditions.map(c => <MenuItem key={c.v} value={c.v} sx={{ fontFamily: 'Vazirmatn, sans-serif' }}>{c.l}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={4}><TextField fullWidth type="number" label="قیمت اجاره (روزانه)" value={form.rental_price_per_day || ''} onChange={e => set('rental_price_per_day', Number(e.target.value))} sx={sx} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth type="number" label="قیمت فروش" value={form.sale_price || ''} onChange={e => set('sale_price', Number(e.target.value))} sx={sx} /></Grid>
        <Grid item xs={12} md={4}><TextField fullWidth type="number" label="ودیعه" value={form.deposit_amount || ''} onChange={e => set('deposit_amount', Number(e.target.value))} sx={sx} /></Grid>
        <Grid item xs={12}><TextField fullWidth multiline rows={3} label="توضیحات" value={form.description || ''} onChange={e => set('description', e.target.value)} sx={sx} /></Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={4} label="لینک تصاویر (هر خط یک لینک)" value={imagesInput} onChange={e => setImagesInput(e.target.value)}
            helperText="هر لینک تصویر را در یک خط جداگانه وارد کنید" sx={sx} />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Vazirmatn, sans-serif', color: 'text.secondary' }}>برچسب‌ها:</Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {(tags?.data || []).map((tag: { id: number; display_name: string }) => {
              const selected = ((form as Record<string, unknown>).tag_names as string[] || []).includes(tag.display_name);
              return <Chip key={tag.id} label={tag.display_name} clickable onClick={() => toggleTag(tag.display_name)}
                sx={{ fontFamily: 'Vazirmatn, sans-serif', bgcolor: selected ? '#C9A84C' : undefined, color: selected ? 'white' : undefined }} />;
            })}
          </Box>
        </Grid>
        <Grid item xs={12}><FormControlLabel control={<Switch checked={Boolean(form.is_featured)} onChange={e => set('is_featured', e.target.checked)} />}
          label={<Typography sx={{ fontFamily: 'Vazirmatn, sans-serif', fontSize: '0.9rem' }}>ویژه (نمایش در صفحه اول)</Typography>} /></Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" size="large" disabled={loading} startIcon={loading ? <CircularProgress size={18} color="inherit" /> : null}
            sx={{ bgcolor: '#C9A84C', '&:hover': { bgcolor: '#B8960C' }, fontFamily: 'Vazirmatn, sans-serif', px: 4 }}>
            {loading ? 'در حال ذخیره...' : 'ذخیره'}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}