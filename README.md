# 미우타임즈 2.0 
- Node: 20.10.0
- PackageManager: yarn
- NextJS + TS + Tailwind
- Recoil
- Graphql + Apollo

## Getting Started
yarn berry에서 사용가능한 pnp 기능은 일단 사용하지 않음. (yarn/cache 파일들은 올라와 있긴함)

```bash
yarn install
yarn run dev
```
클론 후 위 커맨드로 로컬에서 실행할 수 있음.

### graphql code generate
```bash
yarn codegen
yarn codegen --watch // 개발시 변경사항 자동 체크해서 generate
```

## StoryBook
로컬에서 개발시 스토리북 실행을 위해 아래 커맨드를 사용.
```bash
yarn run storybook
```
작업 후 develop 브랜치로 PR 생성시 StoryBook 빌드결과를 확인할 수 있는 url이 해당 PR의 코멘트로 달립니다.

main, develop 브랜치의 현재 형상은 아래와 같은 방식으로 확인 가능.
- https://main--657f9b1ec4930fd17624a879.chromatic.com
- https://develop--657f9b1ec4930fd17624a879.chromatic.com


## 반응형 디자인
Mobile first로 구현, 스크린 사이즈가 커져가면서 바뀌어야 하는 부분들 대응.<br/>
tailwind screen theme 커스텀하여 사용

```javascript
//tailwind.config.js
theme: {
    ..., //others
    screens: {
    'tablet': '480px',
    'laptop': '960px',
    'desktop': '1280px',
    },
}
```

`tablet:`과 같이 tailwind breakpoint 사용 가능

- 모바일 보다 커지는 경우 대응 -> `tablet:` 사용
- 태블릿 보다 커지는 경우 대응 -> `laptop:` 사용
- 데스크탑(컨텐츠 max width)보다 커지는 경우 -> `desktop:` 사용.


태블릿 사이즈(960 이하)부터 모바일과 유사한 UI 로 노출

## 코드 포매팅
`.prettierrc` 참고<br>
전체 파일 포맷팅 아래 커맨드로 가능<br>
```
yarn pretty
```