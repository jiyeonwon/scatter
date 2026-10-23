import test from 'node:test';
import assert from 'node:assert/strict';
import {tokenize,load,persist,initial,KEY} from '../src/storage.js';
test('한국어 조사와 순서 보존, 공백·문장부호 분리',()=>{assert.deepEqual(tokenize({id:'m1',text:'빛과 그림자를 활용한 전시 공간. 기억, 기억!'}).map(w=>w.text),['빛과','그림자를','활용한','전시','공간','기억','기억']);});
test('중복 단어와 메모 출처는 독립적',()=>{const a=tokenize({id:'a',text:'빛 빛'}),b=tokenize({id:'b',text:'빛'});assert.equal(new Set([...a,...b].map(w=>w.id)).size,3);assert.equal(a[1].index,1);assert.equal(b[0].memoId,'b');});
test('새로고침 저장 복원과 손상 데이터 복구',()=>{const data=new Map();globalThis.localStorage={getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,v)};const s=initial();s.memos.push({id:'a',text:'기억',createdAt:'2026-10-19'});s.archives.push({id:'archive',words:tokenize(s.memos[0]),sources:structuredClone(s.memos)});assert.equal(persist(s),true);const restored=load();assert.equal(restored.memos.length,11);assert.deepEqual(restored.memos[0],s.memos[0]);assert.deepEqual(restored.archives,s.archives);assert.equal(restored.libraryVersion,2);data.set(KEY,'broken');assert.equal(load().memos.length,10);});
test('저장 공간 오류를 호출자에게 전달',()=>{globalThis.localStorage={setItem(){throw Error('QuotaExceeded')}};assert.equal(persist(initial()),false);});
