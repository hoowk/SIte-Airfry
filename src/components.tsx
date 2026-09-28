import { Heart, Home, BookOpen, Menu, Search, ChevronRight, Clock3, Thermometer, Users, ArrowLeft, CircleCheck, Star, Mic, ShoppingBag } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { ReactNode } from 'react'
import type { Recipe } from './domain/recipes'
import type { Product } from './domain/products'
import { useVoiceSearch } from './hooks/useVoiceSearch'
import { imageSrc, getCategoryFallback, productImageSrc } from './config/images'

export function SearchBar({ value, onChange, onSearch, placeholder = 'Busque uma receita...' }: { value: string; onChange: (value: string) => void; onSearch?: () => void; placeholder?: string }) {
  const voice = useVoiceSearch(onChange, onSearch)
  return <div className="search"><button className="search-submit" aria-label="Buscar" onClick={onSearch}><Search size={18}/></button><input value={value} onChange={event => onChange(event.target.value)} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); onSearch?.() } }} placeholder={placeholder} aria-label={placeholder}/><button className={voice.state === 'listening' ? 'voice active' : 'voice'} aria-label={voice.message} title={voice.message} onClick={() => voice.state === 'listening' ? voice.stop() : voice.start()} disabled={!voice.supported}><Mic size={17}/></button>{voice.state !== 'idle' && <span className="sr-only" role="status">{voice.message}</span>}</div>
}

export function DesktopHeader({ value, onChange, active, onNavigate, showSearch = true }: { value: string; onChange: (value: string) => void; active: string; onNavigate: (page: string) => void; showSearch?: boolean }) {
  return (
    <header className="desktop-header">
      <button className="desktop-brand" onClick={() => onNavigate('home')}>
        <span><ShoppingBag size={19}/></span>
        <b>Minha Airfryer</b>
      </button>
      {showSearch ? (
        <SearchBar value={value} onChange={onChange} onSearch={() => onNavigate('recipes')}/>
      ) : (
        <div className="header-search-placeholder" />
      )}
      <nav>
        {[['home', 'Início'], ['recipes', 'Receitas'], ['ingredients', 'Ingredientes'], ['products', 'Produtos'], ['favorites', 'Favoritos']].map(([page, label]) => (
          <button key={page} className={active === page ? 'active' : ''} onClick={() => onNavigate(page)}>{label}</button>
        ))}
      </nav>
    </header>
  )
}

export function HeroBanner({
  onProducts: _onProducts,
  onNavigate: _onNavigate,
  query,
  setQuery,
  onSearch,
}: {
  onProducts?: () => void
  onNavigate: (page: string) => void
  query?: string
  setQuery?: (value: string) => void
  onSearch?: () => void
}) {
  return (
    <section className="home-hero composed-banner">
      <img src="/banner (2).png" alt="Minha Airfryer" loading="eager" />
      {setQuery && (
        <div className="hero-search-overlay">
          <SearchBar
            value={query || ''}
            onChange={setQuery}
            onSearch={onSearch}
            placeholder="Qual receita você quer preparar na Airfryer hoje?"
          />
        </div>
      )}
    </section>
  )
}

export function Photo({
  src,
  alt,
  category,
  subcategory,
  className = '',
  loading = 'lazy'
}: {
  src: string
  alt: string
  category?: string
  subcategory?: string
  className?: string
  loading?: 'lazy' | 'eager'
}) {
  return (
    <img
      className={className}
      src={imageSrc(src, category, subcategory)}
      alt={alt}
      loading={loading}
      onError={event => { event.currentTarget.src = getCategoryFallback(category, subcategory) }}
    />
  )
}

export function RecipeCard({ recipe, favorite, onFavorite, onOpen }: { recipe: Recipe; favorite: boolean; onFavorite: () => void; onOpen: () => void }) {
  const displayTitle = recipe.name || recipe.title || 'Receita'
  const ratingValue = recipe.rating ?? 4.8

  return (
    <article className="recipe-card" onClick={onOpen}>
      <div className="recipe-image">
        <Photo src={recipe.image} alt={displayTitle} category={recipe.category} subcategory={recipe.subcategory}/>
        <button aria-label="Favoritar" onClick={event => { event.stopPropagation(); onFavorite() }} className={favorite ? 'heart active' : 'heart'}>
          <Heart size={17} fill={favorite ? 'currentColor' : 'none'}/>
        </button>
      </div>
      <div className="recipe-copy">
        <h3>{displayTitle}</h3>
        <p><Clock3 size={14}/> {recipe.airfryerTimeMinutes} min <span>•</span> <Star size={13} fill="currentColor"/> {ratingValue.toFixed(1)}</p>
      </div>
    </article>
  )
}

export function IngredientCard({ name, image, selected, onClick }: { name: string; image: string; selected: boolean; onClick: () => void }) {
  return <button className={`ingredient ${selected ? 'chosen' : ''}`} onClick={onClick}><Photo src={image} alt={name}/><b>{name}</b>{selected && <CircleCheck aria-hidden="true"/>}</button>
}

export function ActionCard({ icon: Icon, title, text, tone, onClick }: { icon: LucideIcon; title: string; text: string; tone: string; onClick: () => void }) {
  return <button className={`action-card ${tone}`} onClick={onClick}><span className="action-icon"><Icon size={21}/></span><strong>{title}</strong><small>{text}</small><ChevronRight className="action-arrow" size={17}/></button>
}

export function BottomNavigation({ active, onNavigate }: { active: string; onNavigate: (page: string) => void }) {
  const items = [{ id: 'home', label: 'Início', icon: Home }, { id: 'recipes', label: 'Receitas', icon: BookOpen }, { id: 'favorites', label: 'Favoritos', icon: Heart }, { id: 'more', label: 'Mais', icon: Menu }]
  return <nav className="bottom-nav">{items.map(({ id, label, icon: Icon }) => <button className={active === id ? 'selected' : ''} key={id} onClick={() => onNavigate(id)}><Icon size={21} fill={active === id && id === 'favorites' ? 'currentColor' : 'none'}/><span>{label}</span></button>)}</nav>
}

export const Back = ({ onClick }: { onClick: () => void }) => <button className="back" onClick={onClick} aria-label="Voltar"><ArrowLeft size={21}/></button>
export const PageHeader = ({ title, onBack }: { title: string; onBack?: () => void }) => <header className="page-header">{onBack ? <Back onClick={onBack}/> : <div/>}<h1>{title}</h1><div/></header>
export const Meta = ({ recipe, servings = recipe.servings }: { recipe: Recipe; servings?: number }) => <div className="meta"><span><Clock3 size={16}/>{recipe.airfryerTimeMinutes} min</span><span><Thermometer size={16}/>{recipe.temperatureCelsius}°C</span><span><Users size={16}/>{servings} porções</span></div>

export function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <article className="product-card" onClick={onOpen}>
      <div className="product-art">
        <img
          src={productImageSrc(product.slug, product.image)}
          alt={product.name}
          loading="lazy"
          onError={event => { event.currentTarget.src = '/assets/placeholder-product.svg' }}
        />
        <span><ShoppingBag size={18}/></span>
      </div>
      <div>
        <small>{product.category}</small>
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        {product.priceText && (
          <div className="product-card-pricing">
            <strong className="product-price">{product.priceText}</strong>
            {product.store && <span className="product-store"> na {product.store}</span>}
          </div>
        )}
        <button onClick={event => { event.stopPropagation(); onOpen() }}>Ver produto <ChevronRight size={14}/></button>
      </div>
    </article>
  )
}

export const LoadingState = ({ text = 'Carregando...' }: { text?: string }) => <div className="state"><span className="spinner"/><p>{text}</p></div>
export const ErrorState = ({ message = 'Não foi possível carregar esta tela.' }: { message?: string }) => <div className="state error"><p>{message}</p></div>
export const EmptyState = ({ title, text, action }: { title: string; text: string; action?: ReactNode }) => <div className="state"><CircleCheck size={30}/><h3>{title}</h3><p>{text}</p>{action}</div>

