import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readManifest, writeManifest } from '@ai-game-assets/dev';
import { syncDialogOptionVoiceLines, DialogRuntime } from '@dialog-designer/core';
import { createDialogDesignerDevServer, readDialogManifest } from '../dist/index.js';

test('promoting spoken choices saves voice assets before their references and reloads correctly', async()=>{
 const root=await mkdtemp(join(tmpdir(),'dialog-options-'));let server;
 try {
  const manifestPath=join(root,'dialogs.json'), aiAssetsManifestPath=join(root,'assets.json');
  const source={schemaVersion:1,assets:{hero:{id:'hero',kind:'voice',prompt:'Hero',activeVersion:'',versions:{}}}};
  await writeManifest(aiAssetsManifestPath,source);
  const dialogs={schemaVersion:1,dialogs:{talk:{id:'talk',name:'Talk',enabled:true,entryNodeId:'topics',nodes:{topics:{id:'topics',name:'Topics',type:'decision',enabled:true,prompt:'Choose',options:[{id:'bye',text:'Until tomorrow.',enabled:true,exitDialog:true,spokenByCharacter:true,voiceAssetId:'hero'}]}}}}};
  syncDialogOptionVoiceLines(dialogs,source);
  server=createDialogDesignerDevServer({manifestPath,aiAssetsManifestPath,port:0});const a=await server.listen();
  const response=await fetch(`http://${a.host}:${a.port}/__dialog-designer/promote`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({manifest:dialogs})});
  assert.equal(response.status,200,await response.text());
  const reloaded=await readDialogManifest(manifestPath),assets=await readManifest(aiAssetsManifestPath);
  const option=reloaded.dialogs.talk.nodes.topics.options[0];assert.equal(assets.assets[option.lineAssetId].voiceSettings.text,option.text);
  const runtime=new DialogRuntime(reloaded,assets);runtime.start('talk');assert.equal(runtime.choose('bye').resolved.text,'Until tomorrow.');assert.equal(runtime.advance().type,'end');
 }finally{await server?.close();await rm(root,{recursive:true,force:true});}
});
