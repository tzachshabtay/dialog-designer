import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readManifest, writeManifest, createAiAssetDevServer } from '@ai-game-assets/dev';
import { syncDialogOptionVoiceLines } from '@dialog-designer/core';
import { createDialogDesignerDevServer, writeDialogManifest } from '../../dev/dist/index.js';
import { DialogDesignerDebugClient, DialogOptionAssetClient } from '../dist/index.js';

test('draft options generate and record before dialog promotion, preserving existing takes and unrelated assets', async () => {
 const root = await mkdtemp(join(tmpdir(), 'option-generation-'));
 let dialogServer, assetServer;
 try {
  const manifestPath = join(root, 'assets.json'), dialogPath = join(root, 'dialogs.json');
  const original = {schemaVersion:1, assets:{hero:{id:'hero',kind:'voice',prompt:'Hero',activeVersion:'',versions:{}}}};
  original.assets.unrelated={id:'unrelated',kind:'sound',prompt:'Keep me',activeVersion:'old',versions:{old:{name:'old',file:'old.wav',prompt:'Keep me',createdAt:'2026-11-02T00:00:00Z'}}};
  await writeManifest(manifestPath, original);
  const draft = {schemaVersion:1,dialogs:{talk:{id:'talk',name:'Talk',enabled:true,entryNodeId:'topics',nodes:{topics:{id:'topics',type:'decision',name:'Topics',enabled:true,prompt:'Choose',options:Array.from({length:19},(_,i)=>({id:`choice-${i}`,text:`Choice ${i}`,enabled:true,spokenByCharacter:true,voiceAssetId:'hero'}))}}}}};
  syncDialogOptionVoiceLines(draft, original);
  await writeDialogManifest(dialogPath, draft);
  const diskDialog = await readFile(dialogPath, 'utf8');
  syncDialogOptionVoiceLines(draft, original);
  const calls=[];
  dialogServer = createDialogDesignerDevServer({manifestPath:dialogPath,aiAssetsManifestPath:manifestPath,port:0});
  assetServer = createAiAssetDevServer({manifestPath,assetsDir:root,publicPathPrefix:'art',port:0,audioProvider:{async generate({asset}) {
   calls.push(asset.id);
   return [{image:Buffer.from('test-audio'),mimeType:'audio/wav',prompt:asset.prompt,voiceSettings:asset.voiceSettings}];
  }}});
  const d=await dialogServer.listen(); await assetServer.listen(); const a=assetServer.server.address();
  const client=new DialogOptionAssetClient(`http://127.0.0.1:${a.port}`,()=>draft,new DialogDesignerDebugClient(`http://${d.host}:${d.port}`));
  const options=draft.dialogs.talk.nodes.topics.options;
  for(const option of options) assert.equal((await client.generate({assetId:option.lineAssetId})).length,1);
  assert.equal(calls.length,19);
  const option=options[0],id=option.lineAssetId;
  const saved=await client.save({activate:true,assetId:id,versionName:'recorded-take',dataUrl:'data:audio/wav;base64,dGFrZQ==',prompt:'Recorded',voiceSettings:{voiceAssetId:'hero',text:option.text}});
  assert.equal(saved.asset.activeVersion,'recorded-take');
  // A new spoken choice can be recorded directly, without generating first.
  const added={...option,id:'record-only',text:'Recorded first.',lineAssetId:undefined};
  options.push(added); syncDialogOptionVoiceLines(draft,await readManifest(manifestPath));
  await client.save({activate:true,assetId:added.lineAssetId,versionName:'take',dataUrl:'data:audio/wav;base64,dGFrZQ==',prompt:'Recorded',voiceSettings:{voiceAssetId:'hero',text:added.text}});
  option.text='Changed choice';
  const streamed=[]; await client.generateStream({assetId:id},x=>streamed.push(x));assert.equal(streamed.length,1);
  const current=await readManifest(manifestPath);
  assert.equal(current.assets[id].voiceSettings.text,'Changed choice');
  assert.deepEqual(current.assets[id].versions,saved.asset.versions);
  assert.equal(current.assets[id].activeVersion,'recorded-take');
  assert.equal(current.assets[added.lineAssetId].activeVersion,'take');
  assert.deepEqual(current.assets.unrelated,original.assets.unrelated);
  const count=calls.length;
  const blocked=new DialogOptionAssetClient(`http://127.0.0.1:${a.port}`,()=>draft,{async syncOptionVoices(){throw new Error('Sync failed');}});
  await assert.rejects(blocked.generate({assetId:id}),/Sync failed/);
  assert.equal(calls.length,count,'Failed registration never starts paid generation');
  assert.equal(await readFile(dialogPath,'utf8'),diskDialog,'The dialog graph is not promoted as a side effect');
 } finally {await assetServer?.close();await dialogServer?.close();await rm(root,{recursive:true,force:true});}
});
