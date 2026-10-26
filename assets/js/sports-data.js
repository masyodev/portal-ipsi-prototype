/* Read-only presentation adapter. Identity, participation, results and snapshot remain separate. */
(() => {
 'use strict';
 const S=window.IPSI_SPORTS_DATA,D=window.IPSI_DEMO;
 const find=(list,id)=>list.find(x=>x.id===id);
 const divisions=[...S.tandingClasses,...S.jurusEvents];
 const division=id=>find(divisions,id);
 const members=p=>p.team_id?find(S.teams,p.team_id).member_ids:[p.athlete_id];
 const entries=id=>S.participations.filter(p=>members(p).includes(id));
 const context=p=>{const c=division(p.division_id),age=find(S.ageGroups,c.age_group_id);return `${age.name} · ${find(S.categories,c.category_id).name} · ${c.name} · ${c.gender}`;};
 const medal=r=>S.medals.find(m=>m.result_id===r.id)?.type||'—';
 D.athletes=S.athletes.map(a=>{const p=entries(a.id)[0],c=division(p.division_id);return {...a,category:find(S.categories,c.category_id).name,class:c.name,age:find(S.ageGroups,c.age_group_id).name,division_id:c.id,initials:a.name.split(' ').map(n=>n[0]).slice(0,2).join(''),tone:a.gender==='Putra'?'red':'blue'};});
 D.events=S.competitions.map(e=>({...e,category:e.category_ids.map(id=>find(S.categories,id).name).join(' / '),level:find(S.levels,e.level_id).name,organizer:find(S.levels,e.level_id).organizer}));
 // Homepage preview is exactly one division; full event results are rendered from canonical records.
 D.results={};
 for(const e of S.competitions){const results=S.competitionResults.filter(r=>find(S.participations,r.participation_id).event_id===e.id),first=results.find(r=>!find(S.participations,r.participation_id).team_id);if(!first)continue;const p=find(S.participations,first.participation_id),c=division(p.division_id);D.results[e.id]={status:'Provisional',source:'Hasil simulasi berelasi dengan entry',updated:D.asOf,category:find(S.categories,c.category_id).name,class:context(p),rows:results.filter(r=>find(S.participations,r.participation_id).division_id===p.division_id).map(r=>({athlete:find(S.participations,r.participation_id).athlete_id,position:r.position,medal:medal(r),result_id:r.id}))};}
 const ranking=(gender='Putra')=>S.ranking.map(r=>{const a=find(D.athletes,r.athlete_id),counts={Emas:0,Perak:0,Perunggu:0};for(const id of r.medal_result_ids){const m=S.medals.find(m=>m.result_id===id);if(m)counts[m.type]++;}return {...a,rank:r.position,points:r.points,medals:counts,ranking_id:r.id};}).filter(a=>a.gender===gender).sort((a,b)=>a.rank-b.rank);
 window.IPSI_SPORTS={S,find,division,divisions,members,entries,context,medal,ranking};
})();
