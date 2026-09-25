const menu=document.querySelector('.menu-toggle');const nav=document.getElementById('site-nav');if(menu&&nav){menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open')}));}

// Illustrative pre-revenue investment scenarios. Values are USD millions unless noted.
(()=>{
 const model=document.getElementById('scenario-model');if(!model)return;
 const ids=['users','arpu','multiple','gates','dilution'];
 const input=Object.fromEntries(ids.map(k=>[k,document.getElementById(k+'-input')]));
 const out=Object.fromEntries([...ids,'revenue','value','stake','bridge'].map(k=>[k,document.getElementById(k+'-output')]));
 const valuationBars=document.getElementById('valuation-bars'), exitBars=document.getElementById('exit-bars');
 const presets={early:[5.4,1.75,10,0,0],base:[22.75,1.75,20,1,0],pipeline:[65,1.75,20,3,0],stretch:[571.4,1.75,20,3,0]};
 const money=m=>m>=1000?'USD '+(m/1000).toFixed(3).replace(/\.?0+$/,'')+'bn':'USD '+m.toFixed(2).replace(/\.?0+$/,'')+'m';
 const number=n=>Number(n.toFixed(2)).toLocaleString('en-GB',{maximumFractionDigits:2});
 const bar=(label,value,max,suffix)=>'<div class="bar-item"><div class="bar-label"><span>'+label+'</span><strong>'+suffix+'</strong></div><div class="bar-track"><span style="width:'+Math.min(100,100*value/max)+'%"></span></div></div>';
 const render=()=>{
  const [users,arpu,multiple,gates,dilution]=ids.map(k=>Number(input[k].value));
  const earnback=[0,2,4,5][gates], stake=(15-earnback)*(1-dilution/100);
  const revenue=users*arpu, value=revenue*multiple, requiredUsers=20000/(arpu*multiple), requiredArpu=users?20000/(users*multiple):null;
  out.users.textContent=number(users)+'m';out.arpu.textContent='USD '+arpu.toFixed(2);out.multiple.textContent=multiple+'×';out.gates.textContent=gates+' of 3';out.dilution.textContent=dilution+'%';
  out.revenue.textContent=money(revenue);out.value.textContent=money(value);out.stake.textContent=number(stake)+'%';
  const max=Math.max(20000,value);
  valuationBars.innerHTML=bar('Selected model',value,max,money(value))+bar('Exit ambition',20000,max,'USD 20bn');
  const exits=[100,1000,5000,20000],maxProceeds=20000*stake/100;
  exitBars.innerHTML=exits.map(exitValue=>{const proceeds=exitValue*stake/100;return bar(money(exitValue)+' exit',proceeds,maxProceeds,money(proceeds)+' · '+number(proceeds/30)+'×');}).join('');
  out.bridge.textContent='At '+number(users)+'m paying active users and '+multiple+'× revenue, a USD 20bn equity value needs '+(requiredArpu===null?'a positive user base':'USD '+number(requiredArpu)+' retained revenue per user per year')+'. At USD '+arpu.toFixed(2)+' per user, it needs '+number(requiredUsers)+'m paying active users. These are mathematical thresholds, not a forecast.';
  model.querySelectorAll('[data-preset]').forEach(b=>{b.classList.toggle('selected',ids.every((k,i)=>Number(input[k].value)===presets[b.dataset.preset][i]));});
 };
 ids.forEach(k=>input[k].addEventListener('input',render));
 model.querySelectorAll('[data-preset]').forEach(b=>b.addEventListener('click',()=>{ids.forEach((k,i)=>input[k].value=presets[b.dataset.preset][i]);render();}));
 render();
})();
