// src/pages/DoctorDirectory.jsx
// ─────────────────────────────────────────────────────────────
// Doctor Directory — searchable, filterable list of all doctors.
// Uses the full-mode DoctorCard component.
//
// Features:
//  • Instant search (name + specialization)
//  • Specialization filter chips
//  • Available-only toggle
//  • Sort by rating / fee / experience
//  • Result count
//  • Skeleton loading state (simulated)
//  • Empty state with clear CTA
// ─────────────────────────────────────────────────────────────

import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { TopBar, PageWrapper } from '@/components/layout'
import { DoctorCard }          from '@/components/shared'
import { Badge, EmptyState }   from '@/components/ui'
import { Skeleton }            from '@/components/ui'
import doctorsData             from '@/data/doctors.json'

// All unique specializations from data
const ALL_SPECS = ['All', ...new Set(doctorsData.map((d) => d.specialization))]

const SORT_OPTIONS = [
  { value: 'rating',     label: 'Top Rated' },
  { value: 'fee_asc',   label: 'Fee: Low to High' },
  { value: 'fee_desc',  label: 'Fee: High to Low' },
  { value: 'experience',label: 'Most Experienced' },
]

const DoctorDirectory = () => {
  const navigate = useNavigate()
  const [query,        setQuery]       = useState('')
  const [activeSpec,   setActiveSpec]  = useState('All')
  const [availOnly,    setAvailOnly]   = useState(false)
  const [genderFilter, setGenderFilter]= useState('All')
  const [consultType,  setConsultType] = useState('All')
  const [sort,         setSort]        = useState('rating')
  const [showSort,     setShowSort]    = useState(false)
  const [isLoading,    setIsLoading]   = useState(true)

  useEffect(() => {
    // Simulate premium network loading
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    let list = [...doctorsData]

    // Search — name OR specialization
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialization.toLowerCase().includes(q) ||
          d.expertise?.some((e) => e.toLowerCase().includes(q))
      )
    }

    // Specialization chip filter
    if (activeSpec !== 'All') {
      list = list.filter((d) => d.specialization === activeSpec)
    }

    // Availability toggle
    if (availOnly) {
      list = list.filter((d) => d.available)
    }

    // Gender filter
    if (genderFilter !== 'All') {
      list = list.filter((d) => d.gender === genderFilter)
    }

    // Consult Type
    if (consultType !== 'All') {
      list = list.filter((d) => d.consultationTypes.includes(consultType))
    }

    // Sort
    switch (sort) {
      case 'rating':
        list.sort((a, b) => b.rating - a.rating)
        break
      case 'fee_asc':
        list.sort((a, b) => a.fee - b.fee)
        break
      case 'fee_desc':
        list.sort((a, b) => b.fee - a.fee)
        break
      case 'experience':
        list.sort((a, b) => b.experience - a.experience)
        break
      default:
        break
    }

    return list
  }, [query, activeSpec, availOnly, sort])

  const clearFilters = () => {
    setQuery('')
    setActiveSpec('All')
    setAvailOnly(false)
    setSort('rating')
    setGenderFilter('All')
    setConsultType('All')
  }

  const hasActiveFilters = query || activeSpec !== 'All' || availOnly || sort !== 'rating' || genderFilter !== 'All' || consultType !== 'All'

  return (
    <>
      <TopBar
        title="Find a Doctor"
        subtitle="Nabha & nearby region"
      />

      <PageWrapper noPadding noNavOffset={false} className="pt-14">

        {/* ── Search bar ───────────────────────────────────── */}
        <div className="sticky top-14 z-10 bg-white/85 backdrop-blur-lg border-b border-[var(--color-border)] px-4 py-3 shadow-sm">
          <div className="flex gap-2">
            {/* Search input */}
            <div className="flex-1 flex items-center gap-2 bg-[var(--color-surface-2)] rounded-xl px-3 py-2.5 border border-[var(--color-border)] focus-within:border-brand-400 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <Search size={16} className="text-[var(--color-muted)] shrink-0" />
              <input
                type="search"
                placeholder="Search doctors, specialization…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                id="doctor-search-input"
                className="flex-1 bg-transparent text-sm text-[var(--color-text)] placeholder:text-[var(--color-muted)] focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery('')} className="shrink-0">
                  <X size={14} className="text-[var(--color-muted)]" />
                </button>
              )}
            </div>

            {/* Sort button */}
            <div className="relative">
              <button
                id="sort-button"
                onClick={() => setShowSort((v) => !v)}
                className={[
                  'flex items-center gap-1.5 px-3 py-2.5 rounded-xl border text-sm font-semibold transition-all',
                  showSort
                    ? 'border-brand-400 bg-brand-50 text-brand-600'
                    : 'border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-soft)]',
                ].join(' ')}
              >
                <SlidersHorizontal size={15} />
                <ChevronDown size={13} className={`transition-transform ${showSort ? 'rotate-180' : ''}`} />
              </button>

              {showSort && (
                <div className="absolute right-0 top-12 w-48 bg-white rounded-2xl shadow-xl border border-[var(--color-border)] overflow-hidden z-20 animate-fade-in-up">
                  {SORT_OPTIONS.map(({ value, label }) => (
                    <button
                      key={value}
                      id={`sort-${value}`}
                      onClick={() => { setSort(value); setShowSort(false) }}
                      className={[
                        'w-full text-left px-4 py-3 text-sm transition-colors',
                        sort === value
                          ? 'bg-brand-50 text-brand-600 font-semibold'
                          : 'text-[var(--color-text)] hover:bg-slate-50',
                      ].join(' ')}
                    >
                      {sort === value && '✓ '}{label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Advanced Filters */}
          <div className="flex items-center gap-2 mt-2.5 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            <button
              id="available-only-toggle"
              onClick={() => setAvailOnly((v) => !v)}
              className={[
                'flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all',
                availOnly
                  ? 'bg-success-500 border-success-500 text-white'
                  : 'border-[var(--color-border)] text-[var(--color-text-soft)] bg-[var(--color-surface-2)]',
              ].join(' ')}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${availOnly ? 'bg-white' : 'bg-success-400'}`} />
              Available Now
            </button>
            
            <select
              value={genderFilter}
              onChange={(e) => setGenderFilter(e.target.value)}
              className="flex-shrink-0 px-2 py-1.5 rounded-lg text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-soft)] outline-none"
            >
              <option value="All">Any Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>

            <select
              value={consultType}
              onChange={(e) => setConsultType(e.target.value)}
              className="flex-shrink-0 px-2 py-1.5 rounded-lg text-xs font-semibold border border-[var(--color-border)] bg-[var(--color-surface-2)] text-[var(--color-text-soft)] outline-none"
            >
              <option value="All">Any Consult</option>
              <option value="video">Video Call</option>
              <option value="audio">Voice Call</option>
            </select>
          </div>

          <div className="flex items-center justify-between mt-2">
            {/* Result count */}
            <span className="text-xs text-[var(--color-muted)] font-medium">
              {filtered.length} doctor{filtered.length !== 1 ? 's' : ''} found
            </span>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-xs text-brand-600 font-semibold flex items-center gap-1 hover:text-brand-700"
              >
                <X size={11} />
                Clear Filters
              </button>
            )}
          </div>

          {/* Specialization chips */}
          <div
            className="flex gap-2 mt-2.5 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: 'none' }}
          >
            {ALL_SPECS.map((spec) => (
              <button
                key={spec}
                id={`spec-chip-${spec.replace(/\s/g, '-').toLowerCase()}`}
                onClick={() => setActiveSpec(spec)}
                className={[
                  'flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all whitespace-nowrap',
                  activeSpec === spec
                    ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                    : 'border-[var(--color-border)] text-[var(--color-text-soft)] bg-[var(--color-surface-2)] hover:border-brand-300',
                ].join(' ')}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* ── Doctor list ──────────────────────────────────── */}
        <div className="px-4 pt-4 pb-4 flex flex-col gap-4">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex gap-3 animate-pulse">
                 <Skeleton className="w-16 h-16 rounded-full shrink-0" />
                 <div className="flex-1 space-y-2 py-1">
                   <Skeleton className="w-3/4 h-4 rounded-md" />
                   <Skeleton className="w-1/2 h-3 rounded-md" />
                   <div className="flex gap-2 mt-4 pt-2">
                     <Skeleton className="w-full h-8 rounded-xl" />
                     <Skeleton className="w-full h-8 rounded-xl" />
                   </div>
                 </div>
              </div>
            ))
          ) : filtered.length === 0 ? (
            <EmptyState
              icon="search"
              title="No doctors found"
              description={`We couldn't find matches for "${query || activeSpec}". Want to check your symptoms with our AI instead?`}
              action={{ label: 'Ask AI Checker', onClick: () => navigate('/symptoms') }}
            />
          ) : (
            filtered.map((doc) => (
              <DoctorCard key={doc.id} doctor={doc} mode="full" />
            ))
          )}
        </div>
      </PageWrapper>
    </>
  )
}

export default DoctorDirectory
