const config = window.STORE_CONFIG || {};
const filters = [...document.querySelectorAll('[data-filter]')];
const products = [...document.querySelectorAll('[data-category]')];
filters.forEach(button => button.addEventListener('click', () => {
  let count = 0;
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  products.forEach(product => {
    product.hidden = button.dataset.filter !== 'todos' && product.dataset.category !== button.dataset.filter;
    if (!product.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} ${count === 1 ? 'sugestão de produto' : 'sugestões de produtos'} • seleção ilustrativa, consulte a disponibilidade na loja.`;
}));
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }
menuButton.addEventListener('click', () => {
  const open = navigation.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
const instagram = String(config.instagram || '').replace(/^@/, '').trim();
if (/^[a-zA-Z0-9._]+$/.test(instagram)) document.querySelectorAll('[data-instagram]').forEach(link => { link.href = `https://www.instagram.com/${instagram}/`; });
const whatsapp = String(config.whatsapp || '').replace(/\D/g, '');
if (/^55\d{10,11}$/.test(whatsapp)) {
  const link = document.querySelector('#whatsapp-link');
  link.href = `https://wa.me/${whatsapp}?text=${encodeURIComponent('Olá! Vim pelo site do Baruerisacolao e gostaria de informações sobre os produtos.')}`;
  link.hidden = false;
  document.querySelector('#whatsapp-pending').hidden = true;
}
if (config.address) {
  document.querySelectorAll('.info-row p')[0].textContent = config.address;
  const link = document.querySelector('#maps-link');
  link.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.address)}`;
  link.hidden = false;
  document.querySelector('.visit-card .small-note').hidden = true;
}
if (config.hours) document.querySelectorAll('.info-row p')[1].textContent = config.hours;
if (config.address && config.hours) document.querySelector('.pending').hidden = true;
if (config.demo === false) document.querySelector('.demo').hidden = true;
document.querySelector('#year').textContent = new Date().getFullYear();

const nutritionSource='https://nepa.unicamp.br/wp-content/uploads/sites/27/2023/10/taco_4_edicao_ampliada_e_revisada.pdf';
const foods=[
{name:'Banana-prata',category:'frutas',emoji:'🍌',ref:'Banana, prata, crua',kcal:98,carbs:26,protein:1.3,fiber:2,copy:'Vai bem no café da manhã, na vitamina e no bolo.'},
{name:'Tomate',category:'legumes',emoji:'🍅',ref:'Tomate, salada',kcal:21,carbs:5.1,protein:.8,fiber:2.3,copy:'Cor e sabor para saladas, sanduíches e novas combinações.'},
{name:'Morango',category:'frutas',emoji:'🍓',ref:'Morango, cru',kcal:30,carbs:6.8,protein:.9,fiber:1.7,copy:'Experimente com iogurte, na vitamina ou em uma sobremesa.'},
{name:'Alface crespa',category:'verduras',emoji:'🥬',ref:'Alface, crespa, crua',kcal:11,carbs:1.7,protein:1.3,fiber:1.8,copy:'Uma base verde para combinar com tomate e montar sua salada.'}
];
const cards=[...document.querySelectorAll('.product')];
foods.forEach((f,i)=>{f.image=cards[i].querySelector('img').src;const d=document.createElement('div');d.className='product-actions';d.innerHTML=`<button class="nutrient-button" data-nutrient="${i}">Ver nutrientes ↗</button><button data-save="${i}">+ Lista</button>`;cards[i].append(d);});
let shopping=[];const storageKey='baruerisacolao-list-v1';
try{const data=JSON.parse(localStorage.getItem(storageKey)||'[]');if(Array.isArray(data))shopping=data.filter((v,i,a)=>v&&Number.isInteger(v.id)&&foods[v.id]&&a.findIndex(x=>x&&x.id===v.id)===i).map(v=>({id:v.id,checked:!!v.checked}));}catch{}
let toastTimer;function toast(text){const el=document.querySelector('#toast');el.textContent=text;el.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.hidden=true,2600);}
const recipes=[
{name:'Vitamina de banana com morango',time:'5 MIN · 1 PORÇÃO',image:2,foods:[0,2],ingredients:['1 banana-prata','5 morangos','200 ml de leite ou bebida vegetal'],steps:['Lave os morangos e retire as folhas.','Descasque a banana e corte em pedaços.','Bata no liquidificador e sirva.'],note:'Contém leite quando feito com leite de vaca. Confira os ingredientes da bebida vegetal.'},
{name:'Salada colorida do dia a dia',time:'10 MIN · 2 PORÇÕES',image:3,foods:[1,3],ingredients:['4 folhas de alface crespa','2 tomates','1 colher de sopa de azeite','Limão e sal a gosto'],steps:['Lave em água corrente. Para consumo cru, higienize com produto próprio para alimentos, seguindo o rótulo e suas instruções de enxágue.','Seque as folhas e corte os tomates.','Misture e tempere na hora de servir.'],note:'Ajuste os temperos ao seu gosto.'},
{name:'Panquequinha de banana',time:'15 MIN · 1 PORÇÃO',image:0,foods:[0],ingredients:['1 banana-prata madura','1 ovo','2 colheres de sopa de aveia','Um pouco de óleo para untar'],steps:['Amasse a banana e misture com o ovo e a aveia.','Unte a frigideira e aqueça em fogo baixo.','Doure pequenas porções dos dois lados, até o centro estar cozido e firme.'],note:'Contém ovo. Aveia pode conter glúten; confira o rótulo.'}
];
document.querySelector('#recipes-rail').innerHTML=recipes.map((r,i)=>`<button class="recipe-card" data-recipe="${i}"><img src="${foods[r.image].image}" alt="Ingrediente da receita: ${foods[r.image].name}" loading="lazy"><div><span>${r.time}</span><h3>${r.name}</h3><p>Ver ingredientes e preparo ↗</p></div></button>`).join('');
const detailDialog=document.querySelector('#detail-dialog'),listDialog=document.querySelector('#list-dialog');let returnFocus;
function openDialog(dialog){returnFocus=document.activeElement;if(!dialog.open)dialog.showModal();}
[detailDialog,listDialog].forEach(d=>{d.querySelector('[data-close-dialog]').addEventListener('click',()=>d.close());d.addEventListener('close',()=>{if(returnFocus&&returnFocus.isConnected)returnFocus.focus();});d.addEventListener('click',e=>{const r=d.getBoundingClientRect();if(e.target===d&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))d.close();});});
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(shopping));}catch{}updateList();}
function addFoods(ids){let n=0;ids.forEach(id=>{if(!shopping.some(x=>x.id===id)){shopping.push({id,checked:false});n++;}});persist();toast(n?'Produtos adicionados à lista.':'Esses produtos já estão na lista.');}
function updateList(){document.querySelector('#list-count').textContent=shopping.length;document.querySelectorAll('[data-save]').forEach(b=>{const saved=shopping.some(x=>x.id===Number(b.dataset.save));b.textContent=saved?'✓ Na lista':'+ Lista';b.classList.toggle('saved',saved);b.setAttribute('aria-pressed',String(saved));b.setAttribute('aria-label',`${saved?'Remover':'Adicionar'} ${foods[b.dataset.save].name} ${saved?'da':'à'} lista`);});renderList();}
function listText(){return 'Minha lista — Sacolão Barueri\n'+shopping.map(x=>`${x.checked?'✓':'•'} ${foods[x.id].name}`).join('\n')+'\nOlá! Gostaria de consultar a disponibilidade e os preços desses produtos.';}
function renderList(){const area=document.querySelector('#list-items');area.replaceChildren();if(!shopping.length){const p=document.createElement('p');p.className='empty-search';p.textContent='Escolha seus favoritos: toque em “+ Lista” em um produto para começar.';area.append(p);}shopping.forEach(item=>{const row=document.createElement('div');row.className='list-row';const label=document.createElement('label'),check=document.createElement('input'),name=document.createElement('span');check.type='checkbox';check.checked=item.checked;check.addEventListener('change',()=>{item.checked=check.checked;persist();});name.textContent=foods[item.id].name;label.append(check,name);const remove=document.createElement('button');remove.textContent='Remover';remove.setAttribute('aria-label',`Remover ${foods[item.id].name}`);remove.addEventListener('click',()=>{shopping=shopping.filter(x=>x.id!==item.id);persist();});row.append(label,remove);area.append(row);});document.querySelector('#copy-list').disabled=!shopping.length;document.querySelector('#clear-list').disabled=!shopping.length;const send=document.querySelector('#send-list');send.hidden=!shopping.length;send.href='https://wa.me/'+config.whatsapp+'?text='+encodeURIComponent(listText());}
document.querySelector('#clear-list').addEventListener('click',()=>{shopping=[];persist();document.querySelector('#list-message').textContent='Lista limpa. Você pode adicionar os produtos novamente.';});
document.querySelector('#copy-list').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(listText());document.querySelector('#list-message').textContent='Lista copiada. Cole onde preferir!';}catch{document.querySelector('#list-message').textContent=listText();}});
function showFood(index){const f=foods[index];document.querySelector('#detail-content').innerHTML=`<div class="detail-heading"><img src="${f.image}" alt="${f.name}"><div><p class="eyebrow">CONHEÇA O ALIMENTO</p><h2 id="detail-title">${f.name}</h2></div></div><p class="detail-description">${f.copy}</p><div class="portion-control"><label for="portion">Escolha a porção <strong><output id="portion-output">100</output> g</strong></label><input id="portion" type="range" min="50" max="300" step="25" value="100"></div><div class="nutrient-grid">${[['kcal','Energia'],['carbs','Carboidratos'],['protein','Proteínas'],['fiber','Fibras alimentares']].map(([key,title])=>`<div><small>${title}</small><strong id="value-${key}"></strong></div>`).join('')}</div><p class="nutrient-source">Referência: ${f.ref}. Valores médios por 100 g de parte comestível, proporcionais ao peso escolhido; variam conforme o alimento e o preparo.<br><a href="${nutritionSource}" target="_blank" rel="noopener noreferrer">Fonte: TACO, 4ª edição — NEPA/Unicamp (2011) ↗</a></p><button class="button dialog-action" id="detail-add">Adicionar à minha lista +</button>`;
const range=document.querySelector('#portion');const format=new Intl.NumberFormat('pt-BR',{maximumFractionDigits:1});function values(){const g=Number(range.value);document.querySelector('#portion-output').textContent=g;['kcal','carbs','protein','fiber'].forEach(k=>document.querySelector('#value-'+k).textContent=format.format(f[k]*g/100)+' '+(k==='kcal'?'kcal':'g'));}range.addEventListener('input',values);values();document.querySelector('#detail-add').addEventListener('click',()=>addFoods([index]));openDialog(detailDialog);}
function showRecipe(index){const r=recipes[index];document.querySelector('#detail-content').innerHTML=`<div class="recipe-details"><p class="eyebrow">NA COZINHA · ${r.time}</p><h2 id="detail-title">${r.name}</h2><h3>Separe os ingredientes</h3><ul>${r.ingredients.map(x=>`<li>${x}</li>`).join('')}</ul><h3>Hora de preparar</h3><ol>${r.steps.map(x=>`<li>${x}</li>`).join('')}</ol><p class="small-note">${r.note}</p><button class="button dialog-action" id="recipe-add">Adicionar os produtos do hortifruti à lista +</button><p class="small-note">Outros ingredientes da receita não entram automaticamente na lista.</p></div>`;document.querySelector('#recipe-add').addEventListener('click',()=>addFoods(r.foods));openDialog(detailDialog);}
document.addEventListener('click',e=>{const n=e.target.closest('[data-nutrient]');if(n)showFood(Number(n.dataset.nutrient));const s=e.target.closest('[data-save]');if(s){const id=Number(s.dataset.save);if(shopping.some(x=>x.id===id)){shopping=shopping.filter(x=>x.id!==id);persist();toast('Produto removido.');}else addFoods([id]);}const r=e.target.closest('[data-recipe]');if(r)showRecipe(Number(r.dataset.recipe));if(e.target.closest('[data-list-open]')){document.querySelector('#list-message').textContent='';openDialog(listDialog);}const c=e.target.closest('[data-rail]');if(c){const rail=document.getElementById(c.dataset.rail);rail.scrollBy({left:rail.clientWidth*.8*Number(c.dataset.direction),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}});
const normalize=text=>text.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();let chosenFilter='todos';const search=document.querySelector('#product-search');
function applyCatalog(){const q=normalize(search.value.trim());let count=0;cards.forEach((card,i)=>{card.hidden=!(chosenFilter==='todos'||foods[i].category===chosenFilter)||!normalize(foods[i].name).includes(q);if(!card.hidden)count++;});document.querySelector('#filter-status').textContent=count?`${count} produtos para explorar • consulte a disponibilidade na loja.`:'Nenhum produto encontrado. Tente outra palavra ou selecione Tudo por aqui.';document.querySelector('.product-grid').scrollLeft=0;}
search.addEventListener('input',applyCatalog);document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{chosenFilter=b.dataset.filter;applyCatalog();}));
let discoveryFood=0;document.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{discoveryFood=Number(b.dataset.color);const f=foods[discoveryFood];document.querySelector('#discovery-title').textContent=f.name;document.querySelector('#discovery-copy').textContent=f.copy;document.querySelector('#discovery-emoji').textContent=f.emoji;document.querySelector('.discovery-card').style.background=discoveryFood===0?'#f2e4b9':discoveryFood===1?'#f1d4c5':'#e3ebd2';document.querySelectorAll('[data-color]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});}));document.querySelector('#discovery-button').addEventListener('click',()=>showFood(discoveryFood));
const heroSlides=[{title:'Mais frescor.<br>Mais cor.<br><em>Mais vida.</em>',text:'Da sua lista de compras à receita de família. Frutas, legumes e verduras para deixar o dia a dia mais gostoso.',image:document.querySelector('.hero-photo').src,alt:'Bancas de hortaliças, imagem ilustrativa'},{title:'Da feira<br>à cozinha.<br><em>Com sabor.</em>',text:'Uma receita nova, uma combinação diferente. Encontre inspiração para aproveitar suas escolhas.',image:foods[2].image,alt:'Morangos, imagem ilustrativa'},{title:'Seu prato.<br>Suas cores.<br><em>Descubra.</em>',text:'Explore os alimentos, conheça seus nutrientes e monte sua lista de compras.',image:foods[3].image,alt:'Salada de folhas, imagem ilustrativa'}];
document.querySelectorAll('[data-hero]').forEach(b=>b.addEventListener('click',()=>{const slide=heroSlides[b.dataset.hero];document.querySelector('h1').innerHTML=slide.title;document.querySelector('.intro').textContent=slide.text;const img=document.querySelector('.hero-photo');img.src=slide.image;img.alt=slide.alt;document.querySelectorAll('[data-hero]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',String(x===b));});}));
updateList();applyCatalog();

