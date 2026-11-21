(()=>{
 const $=id=>document.getElementById(id),form=$('form-veiculo'),msg=$('mensagem');let lista=[];
 const fields=['nome','descricao','categoria','ano','km','preco','status','imagem'];
 function aviso(t){msg.textContent=t}
 async function api(url,options){const r=await fetch(url,options);let d=await r.json().catch(()=>({}));if(!r.ok)throw Error(d.erro||'Falha no servidor');return d}
 const req=(method,body)=>({method,headers:{'Content-Type':'application/json'},credentials:'same-origin',body:JSON.stringify(body)});
 function novo(){form.reset();$('veiculo-id').value='';$('v-imagem').value='';$('preview').hidden=true;form.hidden=false;form.scrollIntoView({behavior:'smooth',block:'start'});aviso('Novo cadastro')}
 function editar(v){form.hidden=false; $('veiculo-id').value=v.id;fields.forEach(k=>{$('v-'+k).value=v[k]??''});$('v-foto').value='';$('preview').hidden=!v.imagem;if(v.imagem)$('preview').src=v.imagem;form.scrollIntoView({behavior:'smooth',block:'start'});aviso('Editando: '+v.nome)}
 async function carregar(){lista=await api('/api/veiculos');$('total-veiculos').textContent=lista.length;$('total-disponiveis').textContent=lista.filter(v=>v.status==='disponivel').length;$('total-vendidos').textContent=lista.filter(v=>v.status==='vendido').length;
  const area=$('lista-veiculos');area.replaceChildren();for(const v of lista){const linha=document.createElement('div');linha.className='linha-veiculo';const img=document.createElement('img');img.src=v.imagem||'/images/logo.png';img.alt='';const dados=document.createElement('div');dados.className='dados';const title=document.createElement('strong');title.textContent=v.nome;const info=document.createElement('div');info.textContent=`${v.status==='vendido'?'Vendido':'Disponível'} • ${Number(v.preco).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}`;dados.append(title,info);const edit=document.createElement('button');edit.textContent='Editar';edit.onclick=()=>editar(v);const del=document.createElement('button');del.textContent='Excluir';del.onclick=async()=>{if(!confirm('Excluir '+v.nome+'?'))return;try{await api('/api/admin/veiculos/'+v.id,req('DELETE',{}));aviso('Veículo excluído.');await carregar()}catch(e){aviso(e.message)}};linha.append(img,dados,edit,del);area.append(linha)}
 }
 $('novo-veiculo').onclick=novo;$('cancelar-veiculo').onclick=()=>{form.hidden=true;aviso('')};
 form.addEventListener('submit',async e=>{e.preventDefault();const button=$('salvar-veiculo');button.disabled=true;aviso('Salvando...');try{
  let imagem=$('v-imagem').value;const file=$('v-foto').files[0];
  if(file){if(file.size>4*1024*1024)throw Error('A foto deve ter até 4 MB.');if(!['image/jpeg','image/png','image/webp'].includes(file.type))throw Error('Formato de foto inválido.');const data=await new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(reader.result);reader.onerror=reject;reader.readAsDataURL(file)});const up=await api('/api/admin/foto',req('POST',{imagem:data}));imagem=up.url}
  const v={nome:$('v-nome').value.trim(),descricao:$('v-descricao').value.trim(),categoria:$('v-categoria').value,ano:$('v-ano').value.trim(),km:Number($('v-km').value),preco:Number($('v-preco').value),status:$('v-status').value,imagem};
  const id=$('veiculo-id').value;await api(id?'/api/admin/veiculos/'+id:'/api/admin/veiculos',req(id?'PUT':'POST',v));form.hidden=true;aviso('Veículo salvo com sucesso!');await carregar();
 }catch(err){aviso(err.message)}finally{button.disabled=false}});
 carregar().catch(e=>aviso('Erro ao carregar veículos: '+e.message));
})();