import test from 'node:test';
import assert from 'node:assert/strict';
import { DialogRuntime, syncDialogOptionVoiceLines, assertDialogAiAssets, assertDialogManifest, createDialogOption } from '../dist/index.js';
const source = {schemaVersion:1,assets:{hero:{id:'hero',kind:'voice',prompt:'Hero',activeVersion:'',versions:{}},reply:{id:'reply',kind:'voice-line',prompt:'Calm',voiceSettings:{voiceAssetId:'hero',text:'Reply'},activeVersion:'',versions:{}}}};
function fixture(){
 const line={id:'reply',enabled:true,voiceAssetId:'hero',lineAssetId:'reply'};
 const manifest={schemaVersion:1,dialogs:{talk:{id:'talk',name:'Talk',enabled:true,entryNodeId:'topics',nodes:{
 topics:{id:'topics',type:'decision',name:'Topics',prompt:'Choose',enabled:true,options:[
 {id:'ask',text:'A question?',enabled:true,nextNodeId:'reply',exitDialog:false,spokenByCharacter:true,voiceAssetId:'hero'},
 {id:'bye',text:'Goodbye.',enabled:true,exitDialog:true,spokenByCharacter:true,voiceAssetId:'hero'}]},
 reply:{id:'reply',type:'block',name:'Reply',enabled:true,lines:[line],nextNodeId:'last'},
 last:{id:'last',type:'block',name:'Last reply',enabled:true,lines:[{...line,id:'last'}]}
 }}}};
 const assets=syncDialogOptionVoiceLines(manifest,source);return {manifest,assets};
}
test('selected option speaks once, runs its whole branch, returns; exit option speaks before ending',()=>{
 const {manifest,assets}=fixture();const runtime=new DialogRuntime(manifest,assets);const said=[];runtime.on('line:said',t=>said.push(t.resolved.text));
 assert.equal(runtime.start('talk').type,'decision');
 const choice=runtime.choose('ask');assert.equal(choice.optionId,'ask');assert.equal(choice.resolved.text,'A question?');
 assert.equal(runtime.advance().nodeId,'reply');assert.equal(runtime.advance().nodeId,'last');assert.equal(runtime.advance().type,'decision');
 assert.deepEqual(said,['A question?','Reply','Reply']);
 assert.equal(runtime.choose('bye').resolved.text,'Goodbye.');assert.equal(runtime.advance().type,'end');
});
test('switching speech off skips just the choice line; exit flags work independently',()=>{
 const {manifest,assets}=fixture();const option=manifest.dialogs.talk.nodes.topics.options[0];option.spokenByCharacter=false;option.exitDialog=true;
 const runtime=new DialogRuntime(manifest,assets);runtime.start('talk');assert.equal(runtime.choose('ask').nodeId,'reply');runtime.advance();assert.equal(runtime.advance().type,'end');
 option.exitDialog=false; delete option.nextNodeId; delete manifest.dialogs.talk.nodes.reply;delete manifest.dialogs.talk.nodes.last;
 const empty=new DialogRuntime(manifest,assets);empty.start('talk');assert.equal(empty.choose('ask').type,'decision');
});
test('spoken line sync is stable, linked under its voice, and keeps old takes after edits',()=>{
 const {manifest,assets}=fixture();const option=manifest.dialogs.talk.nodes.topics.options[0],id=option.lineAssetId;
 const asset=assets.assets[id];asset.activeVersion='take';asset.versions.take={name:'take',file:'take.mp3',prompt:'Calm',createdAt:'2026-01-01T00:00:00Z',voiceSettings:{...asset.voiceSettings}};
 const same=syncDialogOptionVoiceLines(manifest,assets);assert.equal(same.assets[id].activeVersion,'take');
 option.text='A different question?';const changed=syncDialogOptionVoiceLines(manifest,same);
 assert.equal(option.lineAssetId,id);assert.equal(changed.assets[id].activeVersion,'take');assert.ok(changed.assets[id].versions.take);
 assert.equal(changed.assets[id].voiceSettings.text,option.text);assert.equal(changed.assets.hero.linkedAnimationAssets[id].assetId,id);
 assertDialogManifest(manifest);assertDialogAiAssets(manifest,changed);
 const runtime=new DialogRuntime(manifest,changed);runtime.start('talk');const turn=runtime.choose('ask');assert.equal(turn.resolved.text,option.text);assert.equal(turn.resolved.audio,undefined);
});
test('nested decisions return locally and their exit option ends the dialog',()=>{
 const {manifest,assets}=fixture();manifest.dialogs.talk.nodes.last.nextNodeId='nested';manifest.dialogs.talk.nodes.nested={id:'nested',name:'Nested',type:'decision',prompt:'More?',enabled:true,options:[{id:'again',text:'Again',enabled:true,exitDialog:false},{id:'done',text:'Done',enabled:true,exitDialog:true}]};
 const runtime=new DialogRuntime(manifest,assets);runtime.start('talk');runtime.choose('ask');runtime.advance();runtime.advance();assert.equal(runtime.advance().nodeId,'nested');assert.equal(runtime.choose('again').nodeId,'nested');assert.equal(runtime.choose('done').type,'end');
});
test('stopping option speech clears all return state and supports reentrant listeners',()=>{
 const {manifest,assets}=fixture();const runtime=new DialogRuntime(manifest,assets);runtime.on('line:ready',turn=>{if(turn.optionId) runtime.stop();});
 runtime.start('talk');assert.equal(runtime.choose('ask').reason,'stopped');assert.equal(runtime.start('talk').type,'decision');
});
test('factory preserves the two independent option settings',()=>{
 assert.deepEqual(createDialogOption({id:'choice',text:'Hello',exitDialog:false,spokenByCharacter:true,voiceAssetId:'hero',lineAssetId:'line'}),{id:'choice',text:'Hello',enabled:true,exitDialog:false,spokenByCharacter:true,voiceAssetId:'hero',lineAssetId:'line',nextNodeId:undefined,tags:undefined,metadata:undefined});
});
