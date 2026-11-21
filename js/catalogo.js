(async function(){
 const grade=document.getElementById('gradeVeiculos');
 const botoes=document.querySelectorAll('[data-filtro]');
 let carros=[], filtro='todos';
 const money=v=>Number(v).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
 function render(){
  grade.replaceChildren();
  const lista=carros.filter(v=>v.status==='disponivel'&&(filtro==='todos'||v.categoria===filtro));
  if(!lista.length){const p=document.createElement('p');p.className='col-12';p.textContent='Nenhum veículo disponível nesta categoria.';grade.append(p);return;}
  for(const v of lista){
   const col=document.createElement('div');col.className='col-md-4 col-sm-6 vehicle_item';
   const card=document.createElement('div');card.className='vehicle_card';
   const img=document.createElement('img');img.src=v.imagem||'/images/logo.png';img.alt=v.nome;img.loading='lazy';
   const tag=document.createElement('span');tag.className='vehicle_tag';tag.textContent=v.categoria;
   const info=document.createElement('div');info.className='vehicle_info';
   const h=document.createElement('h3');h.textContent=v.nome;
   const p=document.createElement('p');p.textContent=v.descricao;
   const specs=document.createElement('p');specs.className='vehicle_specs';specs.textContent=`${v.ano} • ${Number(v.km).toLocaleString('pt-BR')} km`;
   const footer=document.createElement('div');footer.className='vehicle_footer';
   const price=document.createElement('span');price.className='vehicle_price';price.textContent=money(v.preco);
   const link=document.createElement('a');link.href='https://wa.me/5519999556088?text='+encodeURIComponent('Olá! Tenho interesse no '+v.nome);link.target='_blank';link.rel='noopener';link.textContent='Tenho Interesse';
   footer.append(price,link);info.append(h,p,specs,footer);card.append(img,tag,info);col.append(card);grade.append(col);
  }
 }
 botoes.forEach(b=>b.addEventListener('click',()=>{filtro=b.dataset.filtro;botoes.forEach(x=>x.classList.toggle('active',x===b));render()}));
 try{const r=await fetch('/api/veiculos');if(!r.ok)throw Error();carros=await r.json();render()}catch(e){grade.textContent='Não foi possível carregar os veículos. Abra o site pelo servidor.'}
})();