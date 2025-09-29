#!/usr/bin/env node

import fs from 'fs';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

// ES 모듈에서 __dirname 얻기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 스크립트가 위치한 디렉터리 경로
const scriptDir = __dirname;
console.log(scriptDir);

// .cursor 디렉터리 경로 (스크립트 디렉터리의 상위 디렉터리)
const cursorDir = path.resolve(scriptDir, '..');
console.log(cursorDir);

// 입력/출력 JSON 파일 경로
const defaultInputFile = path.join(cursorDir, 'default_mcp.json');
const outputFile = path.join(cursorDir, 'mcp.json');

// 운영체제 감지
const osType = os.platform();
console.log(`감지된 운영체제: ${osType}`);

// 경로 형태의 문자열인지 확인하는 함수
function looksLikePath(str) {
  if (typeof str !== 'string') {
    return false;
  }
  return str.startsWith('./') || str.includes('/') || str.includes('\\');
}

// 상대 경로를 절대 경로로 변환하는 함수
function toAbsolutePath(relativePath, baseDir) {
  // '/mcp-server'가 포함된 절대경로라면
  const mcpServerIdx = relativePath.indexOf('/mcp-server');
  if (mcpServerIdx !== -1) {
    // '/mcp-server' 이후 경로 추출
    const mcpServerSubPath = relativePath.slice(mcpServerIdx + '/mcp-server'.length);
    const newPath = path.join(cursorDir, 'mcp-server', mcpServerSubPath);
    return normalizePath(newPath);
  }

  if (path.isAbsolute(relativePath)) {
    return normalizePath(relativePath);
  }

  // 상대 경로를 절대 경로로 변환
  const absolutePath = path.resolve(baseDir, relativePath);
  return normalizePath(absolutePath);
}

// 운영체제에 맞게 경로 구분자 정규화
function normalizePath(pathStr) {
  // Windows에서는 백슬래시를 슬래시로 변환
  if (osType === 'win32') {
    return pathStr.replace(/\\/g, '/');
  }
  return pathStr;
}

// JSON 내의 모든 경로 형태의 문자열을 찾아 변환하는 함수 (args 하위만 변환)
function convertPathsInJson(obj, baseDir, keyPath = []) {
  if (obj === null || obj === undefined) {
    return obj;
  }

  if (Array.isArray(obj)) {
    // 배열의 각 항목을 재귀적으로 처리
    return obj.map((item) => convertPathsInJson(item, baseDir, keyPath));
  } else if (typeof obj === 'object') {
    // 객체의 각 속성을 재귀적으로 처리
    const result = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // keyPath에 현재 key 추가
        result[key] = convertPathsInJson(obj[key], baseDir, keyPath.concat(key));
      }
    }
    return result;
  } else if (
    keyPath.includes('args') && // args 하위에 있을 때만
    looksLikePath(obj)
  ) {
    // 경로 형태의 문자열을 절대경로로 변환
    return toAbsolutePath(obj, baseDir);
  }

  return obj;
}

try {
  // default_mcp.json 읽기
  if (!fs.existsSync(defaultInputFile)) {
    console.error(`오류: default 파일이 존재하지 않습니다: ${defaultInputFile}`);
    process.exit(1);
  }

  const jsonData = JSON.parse(fs.readFileSync(defaultInputFile, 'utf8'));

  // JSON 내의 경로 변환
  const updatedJson = convertPathsInJson(jsonData, cursorDir);

  // 변환된 JSON을 mcp.json으로 저장 (들여쓰기 적용)
  fs.writeFileSync(outputFile, JSON.stringify(updatedJson, null, 4), 'utf8');

  console.log(
    `성공: default_mcp.json을 기반으로 mcp.json을 생성/갱신했고, ${osType} 환경에 맞는 절대 경로로 변환했습니다.`
  );
} catch (error) {
  console.error(`오류: ${error.message}`);
  process.exit(1);
}
