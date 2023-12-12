# THREE.JS를 사용하여 간단한 Portfolio 제작하기
## 시작
### npm i or npm install
### npm run dev

## 개발 tool
### Vite("https://ko.vitejs.dev/guide/")
## vite로 구성한 이유
- 로컬 서버 구동 속도가 매우 빠르다.
- 기존 웹팩 데브서버와 비교시 실행시간이 빠르다.
- 번들링을 하지 않고 바로 서버를 실행하기 때문에 명령어를 실행함과 동시에 서버가 바로 구동된다.
## Library
### 👉 THREE.JS
## 📖 THREE.JS 기본 내용 정리
### 1. 기본적인 구성요소는 3가지 이다.
- Scene : 3D를 담는 container
- Camera : 3D를 우리 눈에 보여주는 매개체
- Renderer : 3D를 마법처럼 만드는 것
### 2. Camera의 종류 : 보여주는 방식에 따라 각각 다르다.
- PerspectiveCamera : 원근법까지 적용되어 인간의 눈과 가장 유사한 카메라 - 일반적인 경우
- ArrayCamera : 효율적인 랜더를 하고 여러 대의 카메라를 활용하는 카메라 - VR
- CubeCamera : 상하좌우전후 모든 방향을 각각 렌더링을 진행하는 카메라 - environment(주변환경)의 map, shadow map
- StereoCamera : 사람의 시점을 보여주는 카메라로 깊이감을 주고 사람의 눈을 모사한 카메라 - VR
- OrthographicCamera : 2D장면 or UI요소를 렌더링할 때 유용하며, 카메라의 거리와 상관없이 일정하게 3D의 크기는 일정하게 유지되는 카메라
* 공식 문서 : https://threejs.org/docs/#api/en/cameras/Camera
### 3. Camera사용법
- 자세한 내용은 doc를 참고
- 자주 사용되는 PerspectiveCamera를 대표적으로 예시
  -> (field on view:카메라가 보는 시야 범위각도, aspect ratio:3D카메라 비율, view frustum(near):카메라의 깊이(가까이 갈건지),
      view frustum(far):카메라의 깊이(멀리 갈건지))
### 4. renderer
- 공식 문서 : https://threejs.org/docs/?q=RENDE#api/en/constants/Renderer

## 기본적인 3D구조물 생성
### 1. 어떤 모양을 할것인가? - geometry(x,y,z)
- 공식 문서 : https://threejs.org/docs/#api/en/geometries/BoxGeometry
### 2. 어떤 재질을 가질것인가? (3D파일에 어떤 것을 wrapping할건지) - material()
- 공식 문서 : https://threejs.org/docs/#api/en/materials/LineBasicMaterial
### 3. Mesh : 모양과 재질을 모아 하나의 3D모형을 생성
### 4. animation
- 공식 문서 : https://threejs.org/docs/?q=ani#api/en/animation/AnimationAction
### 5. light
- 공식 문서 : https://threejs.org/docs/?q=light#api/en/lights/AmbientLight
### 6. lightHelper : light가 어떤 위치에 있고 어떤 식으로 빛을 비추는지 확인가능하게 도와주는 것
- 공식 문서 : https://threejs.org/docs/?q=light#api/en/helpers/DirectionalLightHelper
### 7. Camera control : 마우스 or 키보드로 카메라를 자유자재 움직일 수 있게 한다.
- 공식 문서 : https://threejs.org/docs/?q=con#examples/en/controls/ArcballControls
### 8. TextureLoader : 3D파일의 겉 표면에 Image를 넣을 수 있다.
- 공식 문서 : https://threejs.org/docs/?q=texture#api/en/loaders/TextureLoader

<img src="![GI](https://github.com/KoreaMoney/three.js-Beginner/assets/117058112/9112ffd1-af67-4852-825b-6d73e334f9a1)" width="80%" />
