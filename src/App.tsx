import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Camera, Check, ChevronLeft, ChevronRight, CircleCheck, Clock3, Cog, Heart, HelpCircle, History, Images, Leaf, ListChecks, Menu, Minus, Plus, Repeat2, Share2, ShoppingBag, ShoppingBasket, SlidersHorizontal, Sparkles, Star, Thermometer, Timer, Upload, Users, Utensils } from 'lucide-react'
import { ActionCard, BottomNavigation, DesktopHeader, EmptyState, HeroBanner, IngredientCard, Meta, PageHeader, Photo, ProductCard, RecipeCard, SearchBar } from './components'
import { ingredients, recipes } from './data'
import { getFeaturedRecipes, getQuickRecipes, getLightRecipes } from './data/recipes'
import { ShoppingListService, type ShoppingItem } from './services/shoppingListService'
import type { Recipe, RecipeStep } from './domain/recipes'
import type { Product } from './domain/products'
import { InMemoryRecipeRepository } from './repositories/InMemoryRecipeRepository'
import { InMemoryProductRepository } from './repositories/InMemoryProductRepository'
import { ProductRecommendationService } from './services/ProductRecommendationService'
import { MockAIProvider } from './providers/MockAIProvider'
import { BackendAIProvider } from './providers/BackendAIProvider'

type Page = 'home'|'recipes'|'favorites'|'more'|'identify'|'ingredients'|'ingredient-results'|'result'|'detail'|'adapt'|'cook'|'products'|'product-detail'|'history'|'shopping'|'photos'|'tips'|'settings'|'help'|'premium'
type Filter = { category: string; maxTime: string; difficulty: string; ingredient: string }
const repository = new InMemoryRecipeRepository(recipes); const productRepository = new InMemoryProductRepository(); const recommendations = new ProductRecommendationService(productRepository); const mockAI = new MockAIProvider(); const aiProvider = new BackendAIProvider()
const readSaved = <T,>(key: string, fallback: T): T => { try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) as T : fallback } catch { return fallback } }
const quantity = (value: number|null, unit: string, multiplier: number) => value === null ? (unit === 'a gosto' ? 'A gosto' : 'Quanto baste') : `${Math.round(value * multiplier * 10) / 10} ${unit}`

export default function App() {
  const [page, setPage] = useState<Page>('home'), [query, setQuery] = useState(''), [favorites, setFavorites] = useState<string[]>(() => readSaved('airfryer-favorites', [])), [selectedIngredients, setSelectedIngredients] = useState<string[]>(() => readSaved('airfryer-ingredients', []))
  const [selected, setSelected] = useState<Recipe>(recipes[1]), [selectedProduct, setSelectedProduct] = useState<Product>(productRepository.getAll()[0]), [uploaded, setUploaded] = useState(false), [imagePreview, setImagePreview] = useState(''), [imageFile, setImageFile] = useState<File|null>(null), [notice, setNotice] = useState(''), [cookStep, setCookStep] = useState(0), [cookSeconds, setCookSeconds] = useState(0)
  const [isSearchingRecipe, setIsSearchingRecipe] = useState(false), [searchStatus, setSearchStatus] = useState(''), [searchError, setSearchError] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 280)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => localStorage.setItem('airfryer-favorites', JSON.stringify(favorites)), [favorites]); useEffect(() => localStorage.setItem('airfryer-ingredients', JSON.stringify(selectedIngredients)), [selectedIngredients])
  useEffect(() => { const clean = query.trim(); if (!clean) return; const recent = readSaved<string[]>('airfryer-recent-searches', []); localStorage.setItem('airfryer-recent-searches', JSON.stringify([clean, ...recent.filter(item => item !== clean)].slice(0, 10))) }, [query])
  useEffect(() => { if (!imagePreview.startsWith('blob:')) return; return () => URL.revokeObjectURL(imagePreview) }, [imagePreview])
  useEffect(() => { if (!cookSeconds) return; const timer = window.setInterval(() => setCookSeconds(value => value <= 1 ? 0 : value - 1), 1000); return () => window.clearInterval(timer) }, [cookSeconds])
  const go = (next: string) => { setPage(next as Page); if (next === 'recipes') setSelectedCategory('Todos'); }
  const toggleFavorite = (id: string) => setFavorites(old => old.includes(id) ? old.filter(item => item !== id) : [...old, id])
  const open = (recipe: Recipe) => { setSelected(recipe); const history = readSaved<string[]>('airfryer-history', []); localStorage.setItem('airfryer-history', JSON.stringify([recipe.id, ...history.filter(id => id !== recipe.id)].slice(0, 20))); setPage('detail') }
  const handleQueryChange = (val: string) => { setQuery(val); setSearchError(''); if (val.trim() && page === 'home') setPage('recipes') }
  const handleSelectCategory = (cat: string) => { setSelectedCategory(cat); setQuery(''); setPage('recipes'); }
  const handleSearchRecipe = async (searchQuery: string) => {
    const clean = searchQuery.trim()
    if (!clean || isSearchingRecipe) return
    setIsSearchingRecipe(true)
    setSearchError('')
    setSearchStatus('Procurando a melhor receita para você...')
    try {
      const found = await aiProvider.findRecipe(clean, (msg) => setSearchStatus(msg))
      repository.add(found)
      open(found)
    } catch (error) {
      console.error('Falha ao procurar receita:', error)
      setSearchError('Não conseguimos encontrar essa receita agora. Tente novamente.')
    } finally {
      setIsSearchingRecipe(false)
      setSearchStatus('')
    }
  }
  const visible = useMemo(() => repository.searchAll(query), [query, repository.getAll().length])
  const matched = useMemo(() => repository.getAll().map(recipe => ({ recipe, missing: recipe.ingredients.filter(item => !selectedIngredients.includes(item.ingredientId || item.id)) })).filter(item => !selectedIngredients.length || item.missing.length < item.recipe.ingredients.length), [selectedIngredients])
  const shell = (content: ReactNode, nav = true) => (
    <main className="app-shell">
      <DesktopHeader
        value={query}
        onChange={handleQueryChange}
        active={['detail','adapt','cook','identify','ingredients','ingredient-results','result'].includes(page) ? 'home' : page}
        onNavigate={go}
        showSearch={page !== 'home' || isScrolled}
      />
      {content}
      {nav && <BottomNavigation active={['detail','adapt','cook','identify','ingredients','ingredient-results','result'].includes(page) ? 'home' : page} onNavigate={go}/>}
    </main>
  )
  const openProduct = (product: Product) => { setSelectedProduct(product); setPage('product-detail') }

  if (page === 'home') return shell(<Home query={query} setQuery={handleQueryChange} onNavigate={go} onOpen={open} onProduct={openProduct} favorites={favorites} toggleFavorite={toggleFavorite} onSelectCategory={handleSelectCategory}/>);
  if (page === 'recipes' || page === 'favorites') return shell(<RecipeList list={page === 'favorites' ? repository.getAll().filter(recipe => favorites.includes(recipe.id)) : visible} query={query} setQuery={handleQueryChange} onOpen={open} favorites={favorites} toggleFavorite={toggleFavorite} favoritePage={page === 'favorites'} onSearchRecipe={handleSearchRecipe} isSearchingRecipe={isSearchingRecipe} searchStatus={searchStatus} searchError={searchError} initialCategory={selectedCategory}/>);
  if (page === 'more') return shell(<More onNavigate={go}/>); if (page === 'products') return shell(<Products onBack={() => go('home')} onOpen={openProduct}/>); if (page === 'product-detail') return shell(<ProductDetail product={selectedProduct} onBack={() => go('products')}/>)
  if (page === 'identify') return shell(<Identify uploaded={uploaded} preview={imagePreview} imageFile={imageFile} onFile={file => { if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview); setImageFile(file); setImagePreview(URL.createObjectURL(file)); setUploaded(true) }} onBack={() => go('home')} onOpenRecipe={open} aiProvider={aiProvider} repository={repository}/>, false)
  if (page === 'result') return shell(<Identify uploaded={uploaded} preview={imagePreview} imageFile={imageFile} onFile={file => { if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview); setImageFile(file); setImagePreview(URL.createObjectURL(file)); setUploaded(true) }} onBack={() => go('home')} onOpenRecipe={open} aiProvider={aiProvider} repository={repository}/>, false); if (page === 'ingredients') return shell(<Ingredients selected={selectedIngredients} setSelected={setSelectedIngredients} onBack={() => go('home')} onShow={() => go('ingredient-results')}/>); if (page === 'ingredient-results') return shell(<IngredientResults matches={matched} selected={selectedIngredients} onBack={() => go('ingredients')} onOpen={open} onProduct={openProduct} favorites={favorites} toggleFavorite={toggleFavorite}/>); if (page === 'detail') return shell(<Detail recipe={selected} favorite={favorites.includes(selected.id)} onFavorite={() => toggleFavorite(selected.id)} onBack={() => go('home')} onStart={step => { setCookStep(step); go('cook') }} onCook={() => go('cook')}/> , false); if (page === 'cook') return shell(<CookMode recipe={selected} step={cookStep} seconds={cookSeconds} setSeconds={setCookSeconds} onStep={setCookStep} onExit={() => go('detail')}/>, false); if (page === 'adapt') return shell(<Adapt recipe={selected} onBack={() => go('home')}/> , false)
  if (page === 'shopping') return shell(<ShoppingList onBack={() => go('more')}/>); if (page === 'history') return shell(<HistoryScreen onBack={() => go('more')} onOpen={open}/>); if (page === 'photos') return shell(<SimpleScreen title="Minhas fotos analisadas" onBack={() => go('more')}><EmptyState title="Nenhuma foto analisada" text="As fotos que você escolher para análise aparecerão aqui quando esse recurso estiver conectado."/></SimpleScreen>); if (page === 'tips') return shell(<Tips onBack={() => go('more')}/>); if (page === 'settings') return shell(<SimpleScreen title="Configurações" onBack={() => go('more')}><div className="settings"><label><input type="checkbox" defaultChecked/> Lembretes de preparo</label><label><input type="checkbox" defaultChecked/> Mostrar recomendações</label><p>Suas preferências ficam neste dispositivo.</p></div></SimpleScreen>); if (page === 'help') return shell(<SimpleScreen title="Ajuda" onBack={() => go('more')}><EmptyState title="Como podemos ajudar?" text="Explore receitas, salve favoritas e use o modo cozinhar. Nenhum suporte externo está conectado."/></SimpleScreen>); return shell(<SimpleScreen title="Versão premium" onBack={() => go('more')}><div className="premium-page"><Sparkles size={36}/><h2>Mais sabor, menos esforço.</h2><p>Uma experiência premium futura, sem cobrança ou pagamento nesta versão local.</p></div></SimpleScreen>)
}

function Home({
  query,
  setQuery,
  onNavigate,
  onOpen,
  onProduct,
  favorites,
  toggleFavorite,
  onSelectCategory,
}: {
  query: string
  setQuery: (v: string) => void
  onNavigate: (p: string) => void
  onOpen: (r: Recipe) => void
  onProduct: (p: Product) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  onSelectCategory: (cat: string) => void
}) {
  const featured = getFeaturedRecipes(3)
  const quick = getQuickRecipes(3)
  const light = getLightRecipes(3)
  const products = productRepository.getAll().slice(0, 4)

  const categoryItems = [
    { label: 'Frango', icon: '🍗' },
    { label: 'Carnes', icon: '🥩' },
    { label: 'Peixes', icon: '🐟' },
    { label: 'Batatas', icon: '🍟' },
    { label: 'Salgados', icon: '🥟' },
    { label: 'Mais leves', icon: '🥗' },
    { label: 'Doces', icon: '🍰' },
    { label: 'Até 20 min', icon: '⏱️' },
  ]

  return (
    <>
      <HeroBanner
        query={query}
        setQuery={setQuery}
        onSearch={() => onNavigate('recipes')}
        onProducts={() => onNavigate('products')}
        onNavigate={onNavigate}
      />
      <div className="home-content">
        <section className="actions home-actions">
          <ActionCard icon={Camera} tone="pink" title="Enviar foto" text="Descubra uma receita" onClick={() => onNavigate('identify')}/>
          <ActionCard icon={Leaf} tone="green" title="Tenho ingredientes" text="Use o que você tem" onClick={() => onNavigate('ingredients')}/>
          <ActionCard icon={ShoppingBasket} tone="yellow" title="Explorar receitas" text="Escolha algo gostoso" onClick={() => onNavigate('recipes')}/>
          <ActionCard icon={Sparkles} tone="purple" title="Adaptar receita" text="Converta para Airfryer" onClick={() => onNavigate('adapt')}/>
        </section>

        {/* 4. Categorias compactas antes das receitas */}
        <section className="home-compact-categories">
          <div className="categories-heading">
            <p>NAVEGUE POR CATEGORIA</p>
            <h2>O que você quer comer hoje?</h2>
          </div>
          <div className="compact-category-chips">
            {categoryItems.map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                className="compact-category-btn"
                onClick={() => onSelectCategory(label)}
              >
                <span className="cat-icon" role="img" aria-label={label}>{icon}</span>
                <span>{label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* 1. Receitas em destaque: somente 3 */}
        <HomeSection eyebrow="PARA COMEÇAR" title="Receitas em destaque" action="Ver todas" onAction={() => onNavigate('recipes')}>
          <div className="recipe-row">
            {featured.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} onOpen={() => onOpen(recipe)}/>
            ))}
          </div>
        </HomeSection>

        {/* 2. Rápidas para hoje: somente 3 */}
        <HomeSection eyebrow="POUCO TEMPO, MUITO SABOR" title="Rápidas para hoje" action="Ver receitas" onAction={() => onSelectCategory('Até 20 min')}>
          <div className="recipe-row compact-row">
            {quick.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} onOpen={() => onOpen(recipe)}/>
            ))}
          </div>
        </HomeSection>

        {/* 3. Seção Mais leves: somente 3 */}
        <HomeSection eyebrow="EQUILÍBRIO E LEVEZA" title="Mais leves" action="Ver todas" onAction={() => onSelectCategory('Mais leves')}>
          <div className="recipe-row">
            {light.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} onOpen={() => onOpen(recipe)}/>
            ))}
          </div>
        </HomeSection>

        {/* 6. Produtos de afiliado: no máximo 4 */}
        <HomeSection eyebrow="SELEÇÃO DA CASA" title="Tudo para sua Airfryer" action="Ver produtos" onAction={() => onNavigate('products')}>
          <div className="product-row">
            {products.map(product => (
              <ProductCard key={product.id} product={product} onOpen={() => onProduct(product)}/>
            ))}
          </div>
        </HomeSection>
      </div>
    </>
  )
}

function HomeSection({ eyebrow, title, action, onAction, children }: { eyebrow:string; title:string; action:string; onAction:()=>void; children:ReactNode }) { return <section className="home-section"><div className="section-heading"><div><p className="section-eyebrow">{eyebrow}</p><h2>{title}</h2></div><button onClick={onAction}>{action} <ChevronRight size={15}/></button></div>{children}</section> }

function RecipeList({
  list,
  query,
  setQuery,
  onOpen,
  favorites,
  toggleFavorite,
  favoritePage = false,
  onSearchRecipe,
  isSearchingRecipe = false,
  searchStatus = '',
  searchError = '',
  initialCategory = 'Todos',
}: {
  list: Recipe[]
  query: string
  setQuery: (v: string) => void
  onOpen: (r: Recipe) => void
  favorites: string[]
  toggleFavorite: (id: string) => void
  favoritePage?: boolean
  onSearchRecipe?: (query: string) => void
  isSearchingRecipe?: boolean
  searchStatus?: string
  searchError?: string
  initialCategory?: string
}) {
  const [filter, setFilter] = useState(initialCategory)
  useEffect(() => {
    if (initialCategory) setFilter(initialCategory)
  }, [initialCategory])

  const [advanced, setAdvanced] = useState(false)
  const [filters, setFilters] = useState<Filter>({ category: 'Todos', maxTime: '', difficulty: '', ingredient: '' })

  const categoryChips = ['Todos', 'Frango', 'Carnes', 'Peixes', 'Batatas', 'Salgados', 'Mais leves', 'Doces', 'Até 20 min']

  const matchesCategory = (recipe: Recipe, cat: string) => {
    if (cat === 'Todos') return true
    if (cat === 'Frango') return recipe.tags.includes('frango') || recipe.title.toLowerCase().includes('frango') || recipe.ingredients.some(i => i.name.toLowerCase().includes('frango'))
    if (cat === 'Carnes') return recipe.category === 'Carnes' || recipe.tags.includes('carne')
    if (cat === 'Peixes') return recipe.category === 'Peixes' || recipe.tags.includes('peixe')
    if (cat === 'Batatas') return recipe.tags.includes('batata') || recipe.title.toLowerCase().includes('batata')
    if (cat === 'Salgados') return recipe.category === 'Salgados' || recipe.tags.includes('salgado') || recipe.tags.includes('pastel')
    if (cat === 'Mais leves') return recipe.tags.includes('saudável') || recipe.category === 'Saudáveis' || recipe.category === 'Legumes' || recipe.tags.includes('vegetariana')
    if (cat === 'Doces') return recipe.category === 'Sobremesas' || recipe.tags.includes('doce') || recipe.tags.includes('sobremesa')
    if (cat === 'Até 20 min') return recipe.airfryerTimeMinutes <= 20
    return true
  }

  const filtered = list.filter(recipe =>
    matchesCategory(recipe, filter) &&
    (!filters.category || filters.category === 'Todos' || recipe.category === filters.category) &&
    (!filters.maxTime || recipe.airfryerTimeMinutes <= Number(filters.maxTime)) &&
    (!filters.difficulty || recipe.difficulty === filters.difficulty) &&
    (!filters.ingredient || recipe.ingredients.some(item => item.name.toLowerCase().includes(filters.ingredient.toLowerCase())))
  )

  return (
    <>
      <PageHeader title={favoritePage ? 'Meus favoritos' : 'Todas as receitas'}/>
      <div className="page-body">
        <SearchBar value={query} onChange={setQuery}/>
        <div className="filter-line">
          <div className="chips">
            {categoryChips.map(item => (
              <button
                className={`chip ${filter === item ? 'active' : ''}`}
                key={item}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="filter-button" onClick={() => setAdvanced(true)}>
            <SlidersHorizontal size={17}/> Filtros
          </button>
        </div>
        <div className="recipe-grid">
          {filtered.length ? (
            filtered.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={() => toggleFavorite(recipe.id)} onOpen={() => onOpen(recipe)}/>
            ))
          ) : (
            <div className="state">
              <CircleCheck size={30}/>
              <h3>{query.trim() && !favoritePage ? 'Não encontramos essa receita na nossa biblioteca.' : 'Nenhuma receita encontrada'}</h3>
              <p>{query.trim() && !favoritePage ? 'Podemos buscar a melhor versão e os parâmetros de preparo para sua Airfryer.' : 'Tente outros filtros ou termos de busca.'}</p>
              {query.trim() && !favoritePage && (
                isSearchingRecipe ? (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                    <span className="spinner"/>
                    <strong style={{ color: '#e86120' }}>{searchStatus || 'Procurando a melhor receita para você...'}</strong>
                  </div>
                ) : (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    {searchError && <p style={{ color: '#dc2626', fontSize: 14 }}>{searchError}</p>}
                    <button className="primary" onClick={() => onSearchRecipe?.(query)}>
                      🔎 Procurar receita
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
      {advanced && <div className="modal-backdrop" onClick={() => setAdvanced(false)}><form className="filter-modal" onClick={event => event.stopPropagation()} onSubmit={event => { event.preventDefault(); setAdvanced(false) }}><h2>Filtros avançados</h2><label>Categoria<select value={filters.category} onChange={event => setFilters({...filters, category:event.target.value})}><option>Todos</option><option>Carnes</option><option>Acompanhamentos</option><option>Saudáveis</option></select></label><label>Tempo máximo<select value={filters.maxTime} onChange={event => setFilters({...filters, maxTime:event.target.value})}><option value="">Qualquer tempo</option><option value="20">20 minutos</option><option value="30">30 minutos</option></select></label><label>Dificuldade<select value={filters.difficulty} onChange={event => setFilters({...filters, difficulty:event.target.value})}><option value="">Qualquer</option><option>Fácil</option><option>Médio</option></select></label><label>Ingrediente<input value={filters.ingredient} onChange={event => setFilters({...filters, ingredient:event.target.value})} placeholder="Ex.: frango"/></label><div className="modal-actions"><button type="button" className="secondary" onClick={() => setFilters({category:'Todos',maxTime:'',difficulty:'',ingredient:''})}>Limpar</button><button className="primary">Aplicar</button></div></form></div>}
    </>
  )
}


function Ingredients({ selected, setSelected, onBack, onShow }: { selected:string[]; setSelected:(v:string[])=>void; onBack:()=>void; onShow:()=>void }) { const [search,setSearch]=useState(''); const [category,setCategory]=useState('Todos'); const categories=['Todos','Carnes','Peixes','Legumes','Laticínios','Temperos','Outros']; const list=ingredients.filter(item => (category==='Todos'||item.type===category)&&item.name.toLowerCase().includes(search.toLowerCase())); return <div className="flow-page"><PageHeader title="Ingredientes que tenho" onBack={onBack}/><div className="flow-copy"><p>Selecione o que você tem em casa.</p><SearchBar value={search} onChange={setSearch} placeholder="Buscar ingrediente..."/><div className="chips">{categories.map(item=><button className={`chip ${category===item?'active':''}`} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><div className="ingredient-grid">{list.map(item=><IngredientCard key={item.id} name={item.name} image={item.image} selected={selected.includes(item.id)} onClick={()=>setSelected(selected.includes(item.id)?selected.filter(id=>id!==item.id):[...selected,item.id])}/>)}</div><button className="primary sticky" onClick={onShow}>Ver receitas ({selected.length}) <ChevronRight/></button></div></div> }
function IngredientResults({ matches, selected, onBack, onOpen, onProduct, favorites, toggleFavorite }: { matches:{recipe:Recipe;missing:Recipe['ingredients']}[]; selected:string[]; onBack:()=>void; onOpen:(r:Recipe)=>void; onProduct:(p:Product)=>void; favorites:string[]; toggleFavorite:(id:string)=>void }) { const addMissing=(missing:Recipe['ingredients'])=>{const current=readSaved<string[]>('airfryer-shopping-list',[]); localStorage.setItem('airfryer-shopping-list',JSON.stringify([...new Set([...current,...missing.map(item=>item.name)])]));}; return <div className="flow-page"><PageHeader title="O que você pode fazer" onBack={onBack}/><div className="page-body"><p>Você selecionou {selected.length} ingrediente(s).</p><div className="recipe-grid">{matches.map(({recipe,missing})=><div key={recipe.id}><RecipeCard recipe={recipe} favorite={favorites.includes(recipe.id)} onFavorite={()=>toggleFavorite(recipe.id)} onOpen={()=>onOpen(recipe)}/><div className="match-missing">{missing.length?<><span>Falta: {missing.map(item=>item.name).join(', ')}</span><button onClick={()=>addMissing(missing)}>Adicionar à lista</button></>:<><Check size={15}/> Você tem tudo</>}</div><ProductRecommendations tags={recipe.tags} onOpen={onProduct}/></div>)}</div></div></div> }
function ProductRecommendations({ tags, onOpen }: { tags:string[]; onOpen:(p:Product)=>void }) { const list=recommendations.recommend(tags).slice(0,2); return list.length?<section className="product-recommendations"><h3>Pode ser útil</h3>{list.map(product=><button key={product.id} onClick={()=>onOpen(product)}><ShoppingBag size={15}/>{product.name}<span>Ver produto</span></button>)}</section>:null }
function Identify({ uploaded, preview, imageFile, onFile, onBack, onOpenRecipe, aiProvider, repository }: { uploaded:boolean; preview:string; imageFile:File|null; onFile:(file:File)=>void; onBack:()=>void; onOpenRecipe:(r:Recipe)=>void; aiProvider:BackendAIProvider; repository:InMemoryRecipeRepository }) {
  const [dishName, setDishName] = useState('')
  const [isAnalyzingVisual, setIsAnalyzingVisual] = useState(false)
  const [isSearchingBackend, setIsSearchingBackend] = useState(false)
  const [backendStatus, setBackendStatus] = useState('')
  const [notFoundInLibrary, setNotFoundInLibrary] = useState(false)
  const [visualSuggestion, setVisualSuggestion] = useState<{ dishName: string; confidencePhrase: string } | null>(null)
  const [statusError, setStatusError] = useState('')

  const handleLookup = (name: string) => {
    const clean = name.trim()
    if (!clean) return
    setStatusError('')
    const found = repository.searchAll(clean)
    if (found && found.length > 0) {
      onOpenRecipe(found[0])
      return
    }
    setNotFoundInLibrary(true)
  }

  const handleFetchFromBackend = async (name: string) => {
    const clean = name.trim()
    if (!clean || isSearchingBackend) return
    setIsSearchingBackend(true)
    setStatusError('')
    setBackendStatus('Buscando uma receita para você...')
    try {
      const recipe = await aiProvider.findRecipe(clean, (msg) => setBackendStatus(msg))
      repository.add(recipe)
      onOpenRecipe(recipe)
    } catch (error) {
      console.error('Falha ao buscar receita:', error)
      setStatusError('Não foi possível obter a receita no momento. Tente novamente.')
    } finally {
      setIsSearchingBackend(false)
      setBackendStatus('')
    }
  }

  const handleAnalyzeVisual = async () => {
    if (!imageFile && !preview) return
    setIsAnalyzingVisual(true)
    setStatusError('')
    setVisualSuggestion(null)
    setNotFoundInLibrary(false)
    try {
      const result = await aiProvider.identifyDishFromPhoto(imageFile || preview)
      if (result.dishName) {
        setVisualSuggestion(result)
      } else {
        setStatusError(result.confidencePhrase || 'Não conseguimos identificar o prato com clareza. Digite o nome do prato.')
      }
    } catch (error) {
      console.error('Falha na análise visual:', error)
      setStatusError('Não foi possível analisar a imagem no momento. Digite o nome do prato.')
    } finally {
      setIsAnalyzingVisual(false)
    }
  }

  return <div className="flow-page">
    <PageHeader title="Identificar prato pela foto" onBack={onBack}/>
    <div className="flow-copy">
      {uploaded ? (
        <div className="upload-preview">
          <Photo src={preview} alt="Foto do prato enviada"/>
          <span><Check size={16}/> Imagem pronta</span>
        </div>
      ) : (
        <div className="dropzone">
          <Camera size={42}/>
          <b>Envie uma foto</b>
          <small>Tire uma foto ou escolha da galeria</small>
        </div>
      )}

      <div className="upload-actions">
        <label className="secondary">
          <Camera size={18}/> Tirar foto
          <input type="file" accept="image/*" capture="environment" onChange={event => event.target.files?.[0] && onFile(event.target.files[0])}/>
        </label>
        <label className="secondary">
          <Images size={18}/> Galeria
          <input type="file" accept="image/*" onChange={event => event.target.files?.[0] && onFile(event.target.files[0])}/>
        </label>
      </div>

      {uploaded && (
        <div className="dish-query-box">
          {visualSuggestion ? (
            <div className="dish-identification-result">
              <h3>{visualSuggestion.confidencePhrase}</h3>
              <p>Encontramos este prato. É isso?</p>
              <div className="action-buttons-column">
                <button className="primary" onClick={() => handleLookup(visualSuggestion.dishName)}>
                  Sim, procurar receita
                </button>
                <button className="secondary" onClick={() => { setDishName(visualSuggestion.dishName); setVisualSuggestion(null); }}>
                  Não, escrever o nome
                </button>
              </div>
            </div>
          ) : (
            <>
              <h3>Você sabe qual é esse prato?</h3>
              <input
                value={dishName}
                onChange={e => { setDishName(e.target.value); setNotFoundInLibrary(false); }}
                onKeyDown={e => { if (e.key === 'Enter') handleLookup(dishName); }}
                placeholder="Ex.: frango empanado, lasanha, pastel de carne..."
              />

              {notFoundInLibrary ? (
                <div className="not-found-banner">
                  <p>Não encontramos essa receita na nossa biblioteca.</p>
                  {isSearchingBackend ? (
                    <div className="status-indicator">
                      <span className="spinner"/>
                      <strong>{backendStatus || 'Buscando uma receita para você...'}</strong>
                    </div>
                  ) : (
                    <button className="primary" onClick={() => handleFetchFromBackend(dishName)}>
                      🔎 Buscar receita
                    </button>
                  )}
                </div>
              ) : (
                <>
                  {isAnalyzingVisual ? (
                    <div className="status-indicator">
                      <span className="spinner"/>
                      <strong>Analisando a foto do prato...</strong>
                    </div>
                  ) : isSearchingBackend ? (
                    <div className="status-indicator">
                      <span className="spinner"/>
                      <strong>{backendStatus || 'Buscando uma receita para você...'}</strong>
                    </div>
                  ) : (
                    <div className="dish-action-group">
                      <button className="primary" disabled={!dishName.trim()} onClick={() => handleLookup(dishName)}>
                        🔎 Procurar receita
                      </button>
                      <span className="or-divider">ou</span>
                      <button type="button" className="secondary text-button" onClick={handleAnalyzeVisual}>
                        ✨ Não sei qual é o prato
                      </button>
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {statusError && <p style={{ color: '#dc2626', fontSize: 14, margin: '8px 0 0' }}>{statusError}</p>}
        </div>
      )}
    </div>
  </div>
}
function Detail({
  recipe,
  favorite,
  onFavorite,
  onBack,
  onStart,
  onCook,
}: {
  recipe: Recipe
  favorite: boolean
  onFavorite: () => void
  onBack: () => void
  onStart: (step: number) => void
  onCook: () => void
}) {
  const [servings, setServings] = useState(recipe.servings || 4)
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    recipe.ingredients.forEach(item => {
      initial[item.id || item.ingredientId || item.name] = true
    })
    return initial
  })
  const [addedToast, setAddedToast] = useState('')
  const [stepTimers, setStepTimers] = useState<Record<number, { seconds: number; running: boolean }>>({})

  const totalTimeMinutes = (recipe.prepTimeMinutes || recipe.preparationTimeMinutes || 0) +
    recipe.airfryerTimeMinutes +
    (recipe.marinadeTimeMinutes || 0)

  const temperature = recipe.temperatureC || recipe.temperatureCelsius || 200
  const recipeName = recipe.name || recipe.title || 'Receita'
  const ratingValue = recipe.rating ?? 4.8
  const reviewCount = recipe.reviewCount ?? 320
  const servingsMultiplier = recipe.servings ? servings / recipe.servings : 1

  // Timer interval for inline step timers
  useEffect(() => {
    const hasRunning = Object.values(stepTimers).some(t => t.running && t.seconds > 0)
    if (!hasRunning) return

    const interval = setInterval(() => {
      setStepTimers(prev => {
        let changed = false
        const updated: Record<number, { seconds: number; running: boolean }> = {}
        for (const [key, val] of Object.entries(prev)) {
          const k = Number(key)
          if (val.running && val.seconds > 0) {
            changed = true
            const nextSec = val.seconds - 1
            updated[k] = {
              seconds: nextSec,
              running: nextSec > 0
            }
          } else {
            updated[k] = val
          }
        }
        return changed ? updated : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [stepTimers])

  const toggleIngredientCheck = (id: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleAddIngredientsToShoppingList = () => {
    const selected = recipe.ingredients
      .filter(item => checkedIngredients[item.id || item.ingredientId || item.name])
      .map(item => ({
        ...item,
        scaledQuantity: item.quantity !== null ? Math.round(item.quantity * servingsMultiplier * 10) / 10 : null
      }))

    if (!selected.length) {
      setAddedToast('Selecione pelo menos um ingrediente.')
      setTimeout(() => setAddedToast(''), 3000)
      return
    }

    const { addedCount, mergedCount } = ShoppingListService.addIngredientsFromRecipe(selected, recipeName)
    const msg = mergedCount > 0
      ? `✓ ${selected.length} ingredientes processados (${addedCount} novos, ${mergedCount} somados à lista)!`
      : `✓ ${addedCount} ingredientes adicionados à lista de compras!`

    setAddedToast(msg)
    setTimeout(() => setAddedToast(''), 4000)
  }

  const handleAddAllToShoppingList = () => {
    const all = recipe.ingredients.map(item => ({
      ...item,
      scaledQuantity: item.quantity !== null ? Math.round(item.quantity * servingsMultiplier * 10) / 10 : null
    }))
    const { addedCount, mergedCount } = ShoppingListService.addIngredientsFromRecipe(all, recipeName)
    const msg = mergedCount > 0
      ? `✓ Todos os ingredientes adicionados (${mergedCount} somados a itens existentes)!`
      : `✓ ${addedCount} ingredientes adicionados à lista de compras!`
    setAddedToast(msg)
    setTimeout(() => setAddedToast(''), 4000)
  }

  const startStepTimer = (stepIndex: number, minutes: number) => {
    setStepTimers(prev => ({
      ...prev,
      [stepIndex]: {
        seconds: minutes * 60,
        running: true
      }
    }))
  }

  const togglePauseStepTimer = (stepIndex: number) => {
    setStepTimers(prev => {
      const cur = prev[stepIndex]
      if (!cur) return prev
      return {
        ...prev,
        [stepIndex]: { ...cur, running: !cur.running }
      }
    })
  }

  const resetStepTimer = (stepIndex: number, minutes: number) => {
    setStepTimers(prev => ({
      ...prev,
      [stepIndex]: {
        seconds: minutes * 60,
        running: false
      }
    }))
  }

  const share = async () => {
    const text = `${recipeName} na Airfryer`
    try {
      if (navigator.share) await navigator.share({ title: recipeName, text, url: location.href })
      else {
        await navigator.clipboard.writeText(location.href)
        setAddedToast('Link da receita copiado!')
        setTimeout(() => setAddedToast(''), 3000)
      }
    } catch {
      // cancelado
    }
  }

  const stepsList = recipe.steps || recipe.preparationSteps || []

  return (
    <div className="detail-page">
      <PageHeader title="Receita" onBack={onBack}/>

      {/* Imagem grande */}
      <Photo
        className="detail-image"
        src={recipe.image}
        alt={recipeName}
        category={recipe.category}
        subcategory={recipe.subcategory}
      />

      <div className="detail-tools">
        <button className="floating-heart" onClick={onFavorite} aria-label="Favoritar">
          <Heart fill={favorite ? 'currentColor' : 'none'}/>
        </button>
        <button className="floating-heart" onClick={share} aria-label="Compartilhar">
          <Share2/>
        </button>
      </div>

      <section className="detail-card">
        {/* Nome */}
        <h1>{recipeName}</h1>

        <div className="rating">
          <Star fill="currentColor"/> <b>{ratingValue.toFixed(1)}</b> ({reviewCount.toLocaleString('pt-BR')} avaliações)
        </div>

        {/* Descrição */}
        <p>{recipe.description}</p>

        {/* Informações rápidas em destaque */}
        <div className="recipe-metrics-grid">
          <div className="metric-box">
            <Clock3 size={20}/>
            <small>Tempo Total</small>
            <strong>{totalTimeMinutes} min</strong>
          </div>
          <div className="metric-box">
            <Timer size={20}/>
            <small>Air Fryer</small>
            <strong>{recipe.airfryerTimeMinutes} min</strong>
          </div>
          <div className="metric-box">
            <Thermometer size={20}/>
            <small>Temperatura</small>
            <strong>{temperature}°C</strong>
          </div>
          <div className="metric-box">
            <Users size={20}/>
            <small>Rendimento</small>
            <strong>{servings} {servings === 1 ? 'porção' : 'porções'}</strong>
          </div>
          <div className="metric-box">
            <Sparkles size={20}/>
            <small>Dificuldade</small>
            <strong>{recipe.difficulty}</strong>
          </div>
        </div>

        {/* Ajuste de porções */}
        <div className="servings-control">
          <span>Ajustar porções:</span>
          <button onClick={() => setServings(value => Math.max(1, value - 1))} aria-label="Diminuir porções"><Minus size={16}/></button>
          <b>{servings} {servings === 1 ? 'porção' : 'porções'}</b>
          <button onClick={() => setServings(value => value + 1)} aria-label="Aumentar porções"><Plus size={16}/></button>
        </div>

        {/* Botões de Ação Principais: Favoritar, Adicionar à lista de compras, Modo cozinhar */}
        <div className="recipe-quick-actions">
          <button
            type="button"
            className={`recipe-action-btn secondary ${favorite ? 'active' : ''}`}
            onClick={onFavorite}
          >
            <Heart size={18} fill={favorite ? 'currentColor' : 'none'}/>
            {favorite ? 'Salva nos favoritos' : 'Favoritar receita'}
          </button>

          <button
            type="button"
            className="recipe-action-btn secondary"
            onClick={handleAddAllToShoppingList}
          >
            <ShoppingBag size={18}/>
            Adicionar à lista de compras
          </button>

          <button
            type="button"
            className="recipe-action-btn primary"
            onClick={onCook}
          >
            Começar modo cozinhar <ChevronRight size={18}/>
          </button>
        </div>

        {addedToast && <div className="toast-notice">{addedToast}</div>}

        {/* 1. ANTES DE COMEÇAR */}
        {(recipe.beforeYouStart?.length || recipe.preheat?.required) && (
          <section className="before-start-section">
            <div className="recipe-subheading">
              <h2>Antes de começar</h2>
            </div>
            <div className="before-start-card">
              {recipe.preheat?.required && (
                <div className="preheat-highlight">
                  <Thermometer size={18}/>
                  <span>
                    Preaquecimento recomendado: <strong>{recipe.preheat.minutes} minutos a {recipe.preheat.temperatureC}°C</strong> antes de colocar os alimentos.
                  </span>
                </div>
              )}
              {recipe.beforeYouStart && recipe.beforeYouStart.length > 0 && (
                <ul className="before-start-list">
                  {recipe.beforeYouStart.map((item, idx) => (
                    <li key={idx}>
                      <span className="dot">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        )}

        {/* 2. INGREDIENTES com checkbox individual */}
        <section className="recipe-ingredients-section">
          <div className="recipe-subheading">
            <h2>Ingredientes</h2>
            <small>{recipe.ingredients.length} itens</small>
          </div>

          <div className="ingredients-checklist">
            {recipe.ingredients.map(item => {
              const itemId = item.id || item.ingredientId || item.name
              const isChecked = Boolean(checkedIngredients[itemId])
              const displayQty = quantity(item.quantity, item.unit, servingsMultiplier)

              return (
                <div
                  key={itemId}
                  className="ingredient-check-row"
                  onClick={() => toggleIngredientCheck(itemId)}
                >
                  <label className="ingredient-check-label" onClick={e => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleIngredientCheck(itemId)}
                    />
                    <div>
                      <strong className="ingredient-quantity">{displayQty}</strong>
                      <span className="ingredient-name">{item.name}</span>
                      {item.optional && <span className="ingredient-optional">(opcional)</span>}
                    </div>
                  </label>
                  {item.groceryCategory && (
                    <span className="ingredient-category-tag">{item.groceryCategory}</span>
                  )}
                </div>
              )
            })}
          </div>

          {/* Botão: "Adicionar ingredientes à lista" */}
          <div className="add-ingredients-action">
            <button
              type="button"
              className="recipe-action-btn primary"
              onClick={handleAddIngredientsToShoppingList}
            >
              <ShoppingBasket size={18}/>
              Adicionar ingredientes à lista
            </button>
          </div>
        </section>

        {/* 3. MODO DE PREPARO em etapas numeradas */}
        <section className="recipe-steps-section">
          <div className="recipe-subheading">
            <h2>Modo de preparo</h2>
            <small>{stepsList.length} passos</small>
          </div>

          <div className="recipe-steps-flow">
            {stepsList.map((step, index) => {
              const timer = stepTimers[index]
              const hasTimer = Boolean(step.timerMinutes && step.timerMinutes > 0)
              const formatTimer = timer ? `${String(Math.floor(timer.seconds / 60)).padStart(2, '0')}:${String(timer.seconds % 60).padStart(2, '0')}` : ''

              return (
                <article key={step.order || index} className="numbered-step-card">
                  <div className="step-num-badge">{step.order || index + 1}</div>
                  <div className="step-details">
                    <h4>{step.title || `Passo ${step.order || index + 1}`}</h4>
                    <p>{step.description || step.instruction}</p>

                    <div className="step-tags-line">
                      {(step.temperatureC || step.temperatureCelsius) && (
                        <span className="step-tag">
                          <Thermometer size={13}/> {step.temperatureC || step.temperatureCelsius}°C
                        </span>
                      )}
                      {step.timerMinutes && (
                        <span className="step-tag timer-tag">
                          <Clock3 size={13}/> {step.timerMinutes} minutos
                        </span>
                      )}
                      {step.action && (
                        <span className="step-tag">
                          {step.action}
                        </span>
                      )}
                    </div>

                    {step.warning && (
                      <div className="step-warning-box">
                        <HelpCircle size={15}/>
                        <span>{step.warning}</span>
                      </div>
                    )}

                    {/* Botão interativo: Iniciar Timer */}
                    {hasTimer && (
                      <div className="step-timer-action">
                        {timer && timer.seconds > 0 ? (
                          <div className="inline-timer-widget">
                            <span className="inline-timer-clock">{formatTimer}</span>
                            <button type="button" onClick={() => togglePauseStepTimer(index)}>
                              {timer.running ? 'Pausar' : 'Continuar'}
                            </button>
                            <button type="button" className="secondary-t" onClick={() => resetStepTimer(index, step.timerMinutes || 0)}>
                              Reiniciar
                            </button>
                          </div>
                        ) : timer && timer.seconds === 0 ? (
                          <div className="inline-timer-widget" style={{ background: '#15803d' }}>
                            <span>✓ Tempo concluído!</span>
                            <button type="button" onClick={() => resetStepTimer(index, step.timerMinutes || 0)}>
                              Reiniciar
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="step-timer-btn"
                            onClick={() => startStepTimer(index, step.timerMinutes || 0)}
                          >
                            <Timer size={16}/>
                            Iniciar timer ({step.timerMinutes} min)
                          </button>
                        )}
                      </div>
                    )}

                    <div style={{ marginTop: 8 }}>
                      <button
                        type="button"
                        style={{ color: '#e86120', fontSize: 13, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 }}
                        onClick={() => onStart(index)}
                      >
                        Abrir tela cheia neste passo <ChevronRight size={14}/>
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* 4. DICAS, SUBSTITUIÇÕES, VERSÃO MAIS LEVE */}
        <section className="recipe-extras-group">
          {/* Dica */}
          {recipe.tips && recipe.tips.length > 0 && (
            <div className="advice-box tips">
              <h4><Sparkles size={16}/> Dica de ouro</h4>
              <ul>
                {recipe.tips.map((tip, idx) => (
                  <li key={idx}>• {tip}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Substituições */}
          {recipe.substitutions && recipe.substitutions.length > 0 && (
            <div className="advice-box substitutions">
              <h4><Repeat2 size={16}/> Substituições</h4>
              <ul>
                {recipe.substitutions.map((sub, idx) => (
                  <li key={idx}>• {sub}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Versão Mais Leve */}
          {recipe.lighterVersion && (
            <div className="advice-box lighter">
              <h4><Leaf size={16}/> Versão mais leve</h4>
              {Array.isArray(recipe.lighterVersion) ? (
                <ul>
                  {recipe.lighterVersion.map((lv, idx) => (
                    <li key={idx}>• {lv}</li>
                  ))}
                </ul>
              ) : (
                <p>{recipe.lighterVersion}</p>
              )}
            </div>
          )}
        </section>
      </section>
    </div>
  )
}

function CookMode({
  recipe,
  step,
  seconds,
  setSeconds,
  onStep,
  onExit,
}: {
  recipe: Recipe
  step: number
  seconds: number
  setSeconds: (v: number) => void
  onStep: (v: number) => void
  onExit: () => void
}) {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const stepsList = recipe.steps || recipe.preparationSteps || []
  const current = stepsList[Math.min(step, stepsList.length - 1)]
  const minutes = current.timerMinutes || current.minutes

  const start = () => {
    if (minutes) {
      setSeconds(minutes * 60)
      setRunning(true)
      setDone(false)
    }
  }

  useEffect(() => {
    if (seconds !== 0 || !running) return
    setRunning(false)
    setDone(true)
    navigator.vibrate?.([200, 100, 200])
    try {
      const context = new AudioContext()
      const oscillator = context.createOscillator()
      oscillator.connect(context.destination)
      oscillator.frequency.value = 880
      oscillator.start()
      oscillator.stop(context.currentTime + 0.25)
    } catch {
      // audio may be blocked
    }
  }, [seconds, running])

  const format = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`

  return (
    <div className="cook-mode">
      <header className="cook-header">
        <button onClick={onExit} aria-label="Voltar"><ChevronLeft/></button>
        <span>Modo cozinhar</span>
        <span>{step + 1}/{stepsList.length}</span>
      </header>
      <div className="cook-progress">
        <i style={{ width: `${((step + 1) / stepsList.length) * 100}%` }}/>
      </div>
      <main>
        <small>PASSO {step + 1} DE {stepsList.length}</small>
        {current.title && <h2 style={{ fontSize: 22, color: '#ffc928', margin: '4px 0 12px' }}>{current.title}</h2>}
        <h1>{current.description || current.instruction}</h1>
        {current.warning && (
          <p className="cook-warning"><HelpCircle size={18}/>{current.warning}</p>
        )}
        <div className="cook-data">
          {(current.temperatureC || current.temperatureCelsius) && (
            <span><Thermometer/> {current.temperatureC || current.temperatureCelsius}°C</span>
          )}
          {minutes && (
            <span><Clock3/> {minutes} minutos</span>
          )}
        </div>
        {minutes && (
          <div className="timer-card">
            <Timer size={26}/>
            <strong>{seconds ? format : `${minutes}:00`}</strong>
            <button onClick={start}>{done ? 'Reiniciar' : seconds ? 'Timer em andamento' : 'Iniciar timer'}</button>
          </div>
        )}
        <div className="cook-actions">
          <button className="secondary" disabled={step === 0} onClick={() => onStep(step - 1)}>Anterior</button>
          <button className="primary" disabled={step === stepsList.length - 1} onClick={() => onStep(step + 1)}>Próximo passo <ChevronRight/></button>
        </div>
      </main>
    </div>
  )
}

function ShoppingList({ onBack }: { onBack: () => void }) {
  const [items, setItems] = useState<ShoppingItem[]>(() => ShoppingListService.getItems())
  const [inputName, setInputName] = useState('')

  const handleAddManual = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputName.trim()) return
    const updated = ShoppingListService.addManualItem(inputName)
    setItems(updated)
    setInputName('')
  }

  const handleToggle = (id: string) => {
    const updated = ShoppingListService.toggleDone(id)
    setItems(updated)
  }

  const handleRemove = (id: string) => {
    const updated = ShoppingListService.removeItem(id)
    setItems(updated)
  }

  const handleClearDone = () => {
    const updated = ShoppingListService.clearDone()
    setItems(updated)
  }

  // Agrupamento inteligente por groceryCategory
  const categories = useMemo(() => {
    const map = new Map<string, ShoppingItem[]>()
    items.forEach(item => {
      const cat = item.groceryCategory || 'Outros'
      if (!map.has(cat)) map.set(cat, [])
      map.get(cat)!.push(item)
    })
    return Array.from(map.entries())
  }, [items])

  const pendingCount = items.filter(i => !i.done).length

  return (
    <div className="flow-page">
      <PageHeader title="Lista de compras" onBack={onBack}/>
      <div className="page-body">
        <form className="add-item" onSubmit={handleAddManual}>
          <input
            value={inputName}
            onChange={e => setInputName(e.target.value)}
            placeholder="Adicionar item à lista (ex: 500g de farinha)..."
          />
          <button className="primary">Adicionar</button>
        </form>

        {items.length ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 13, color: '#777', fontWeight: 600 }}>
                {pendingCount} itens pendentes ({items.length} no total)
              </span>
              <button className="secondary" onClick={handleClearDone}>
                Limpar comprados
              </button>
            </div>

            {categories.map(([categoryName, catItems]) => (
              <div key={categoryName} className="shopping-grocery-category">
                <span className="shopping-cat-badge">{categoryName}</span>
                <ul className="shopping-items">
                  {catItems.map(item => (
                    <li key={item.id} className={item.done ? 'done' : ''}>
                      <label>
                        <input
                          type="checkbox"
                          checked={item.done}
                          onChange={() => handleToggle(item.id)}
                        />
                        <div>
                          <div>
                            {item.quantity !== null && (
                              <strong style={{ color: item.done ? '#999' : '#c84f18', marginRight: 6 }}>
                                {item.quantity} {item.unit}
                              </strong>
                            )}
                            <span style={{ fontWeight: item.done ? 'normal' : 600 }}>{item.name}</span>
                          </div>
                          {item.recipeSources && item.recipeSources.length > 0 && (
                            <div className="shopping-recipe-sources">
                              Receita: {item.recipeSources.join(', ')}
                            </div>
                          )}
                        </div>
                      </label>
                      <button onClick={() => handleRemove(item.id)}>Excluir</button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Sua lista está vazia"
            text="Ao navegar pelas receitas, clique em 'Adicionar ingredientes à lista' para montar sua lista automaticamente."
          />
        )}
      </div>
    </div>
  )
}
function Adapt({ recipe, onBack }: { recipe:Recipe; onBack:()=>void }) { return <div className="flow-page"><PageHeader title="Adaptar receita" onBack={onBack}/><div className="flow-copy adapt"><div className="adapt-icon"><Sparkles size={30}/></div><h2>Converta para sua Airfryer</h2><p>Formulário local preparado para uma futura integração. Nenhum resultado de IA é gerado.</p><label>Nome da receita<input defaultValue={recipe.name || recipe.title}/></label><label>Receita original<textarea placeholder="Cole ou escreva a receita aqui..."/></label><label className="secondary photo-input"><Upload size={18}/> Enviar foto<input type="file" accept="image/*"/></label><button className="primary" onClick={()=>window.alert('A adaptação ainda não está conectada a um backend.')}>Salvar rascunho <ChevronRight/></button></div></div> }
function More({ onNavigate }: { onNavigate:(p:string)=>void }) { const items:[string,string][]=[['favorites','Minhas receitas salvas'],['history','Histórico'],['shopping','Lista de compras'],['photos','Minhas fotos analisadas'],['adapt','Conversor de receitas'],['tips','Dicas e truques'],['settings','Configurações'],['help','Ajuda']]; return <><div className="more-header"><div className="brand dark"><span><Menu size={22}/></span><div><b>Minha Airfryer</b><small>Receitas práticas e saudáveis</small></div></div></div><div className="more-body"><button className="premium" onClick={()=>onNavigate('premium')}><div><small><Sparkles size={13}/> VERSÃO PREMIUM</small><h2>Mais sabor, menos esforço.</h2><p>Conheça os recursos futuros.</p></div><ChevronRight/></button>{items.map(([route,label])=><button className="more-item" key={route} onClick={()=>onNavigate(route)}><span><ChevronRight size={19}/></span>{label}<ChevronRight size={17}/></button>)}</div></> }
function Products({ onBack, onOpen }: { onBack:()=>void; onOpen:(p:Product)=>void }) { const [category,setCategory]=useState('Todas'); const categories=['Todas','Airfryer','Formas','Acessórios','Limpeza','Medição']; const list=productRepository.getAll().filter(product=>category==='Todas'||product.category===category); return <div className="flow-page"><PageHeader title="Produtos" onBack={onBack}/><div className="page-body"><p className="match-note">Acessórios para sua rotina.</p><div className="chips">{categories.map(item=><button className={`chip ${category===item?'active':''}`} key={item} onClick={()=>setCategory(item)}>{item}</button>)}</div><div className="product-grid">{list.map(product=><ProductCard key={product.id} product={product} onOpen={()=>onOpen(product)}/>)}</div></div></div> }
function ProductDetail({ product, onBack }: { product:Product; onBack:()=>void }) { return <div className="flow-page"><PageHeader title="Detalhe do produto" onBack={onBack}/><div className="page-body product-detail"><div className="product-art large"><ShoppingBasket size={64}/></div><small>{product.category}</small><h1>{product.name}</h1><p>{product.description}</p><h3>Características</h3><ul>{product.features.map(feature=><li key={feature}>{feature}</li>)}</ul>{product.affiliateUrl&&<a className="primary" href={product.affiliateUrl} target="_blank" rel="noreferrer">Ver disponibilidade</a>} {!product.affiliateUrl&&<p className="mock-banner">Disponibilidade e compra não estão conectadas.</p>}</div></div> }
function HistoryScreen({ onBack, onOpen }: { onBack:()=>void; onOpen:(r:Recipe)=>void }) { const ids=readSaved<string[]>('airfryer-history',[]); const list=ids.map(id=>recipes.find(recipe=>recipe.id===id)).filter((recipe):recipe is Recipe=>Boolean(recipe)); return <SimpleScreen title="Histórico" onBack={onBack}>{list.length?<div className="recipe-grid">{list.map(recipe=><RecipeCard key={recipe.id} recipe={recipe} favorite={false} onFavorite={()=>undefined} onOpen={()=>onOpen(recipe)}/>)}</div>:<EmptyState title="Histórico vazio" text="As receitas abertas por você aparecerão aqui."/>}</SimpleScreen> }
function Tips({ onBack }: { onBack:()=>void }) { return <SimpleScreen title="Dicas e truques" onBack={onBack}><ul className="tips-list"><li>Não sobreponha os alimentos para o ar circular.</li><li>Preaqueça quando a receita recomendar.</li><li>Use luvas e cuidado ao abrir o cesto quente.</li></ul></SimpleScreen> }
function SimpleScreen({ title, onBack, children }: { title:string; onBack:()=>void; children:ReactNode }) { return <div className="flow-page"><PageHeader title={title} onBack={onBack}/><div className="page-body">{children}</div></div> }
