# 마드라스체크 웹 서버 개발자 채용 과제

## 파일 확장자 차단

고정 확장자는 checkbox 형식의 input 요소를 통해 on/off하는 기능과 커스텀 확장자를 추가, 삭제하는 기능을 구현하는 과제를 진행했습니다.

Back단은 Node.js로 작성하였으며 MySQL 데이터베이스를 컨트롤하기 위해 ORM인 `Sequelize` 라이브러리를 사용하였습니다.

Front단은 간단하게 HTML, CSS, JavaScript를 기반으로 작성하였으며 Node Server에서 `ejs` 엔진을 통해 브라우저에 렌더합니다.

## 요구 사항

- 상단에 위치한 고정 확장자는 기본적으로 unCheck되어있어야 한다.
- checkbox를 컨트롤할 때 마다 해당하는 데이터를 DB에 업데이트해야 한다.
- 확장자명은 20자리를 넘으면 안된다.
- 추가 버튼 클릭시 DB에 새로운 커스텀 확장자가 추가되어야 한다.
- 커스텀 확장자 입력 하단에 추가한 커스텀 확장자가 출력되어야 한다.
- 추가된 커스텀 확장자 옆의 X 버튼을 클릭하면 해당 커스텀 확장자는 삭제되어야 하며 삭제된 커스텀 확장자는 DB에서도 삭제되어야한다.
- 같은 이름의 확장자명 중복으로 추가가 되지 않도록 해야 한다.

## 개발 스택

|||
|------|---|
|Front|<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/></a>  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/></a>  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/></a>|
|Back|<img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white"/></a>  <img src="https://img.shields.io/badge/Sequelize-4479A1?style=flat-square&logo=Sequelize&logoColor=white"/></a>|
|DB|<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white"/></a>|

## 실행법

1. `git clone https://github.com/GitSeob/flow.git` 명령어를 입력합니다.
2. `cd flow` 명령어를 입력합니다.
3. `config/config.json` 파일 내부 `development`환경의 설정에서 `username`과 `password`를 환경에 맞게 수정합니다.
( 3-1. `export PORT=원하는 포트번호` 혹은 `index.js` 파일에서 포트번호를 수정합니다.)
4. `npm install` 명령어를 입력합니다.
5. `npm start` 명령어를 입력합니다.
6. 브라우저 주소창에 `http://localhost:3000`를 입력하여 접속합니다. (3-1에서 포트번호를 수정하였으면 해당하는 포트로 접속합니다.)
