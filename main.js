import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
/**
 * @author Kim Dowon
 * @date Dec 2023
 * @description three.js의 기본 사용법과 기초내용 정리
 *
 * @return
 * 1. 기본적인 구성요소는 3가지 이다.
 * - Scene : 3D를 담는 container
 * - Camera : 3D를 우리 눈에 보여주는 매개체
 * - Renderer : 3D를 마법처럼 만드는 것
 *
 * 2. Camera의 종류 : 보여주는 방식에 따라 각각 다르다.
 * - PerspectiveCamera : 원근법까지 적용되어 인간의 눈과 가장 유사한 카메라 - 일반적인 경우
 * - ArrayCamera : 효율적인 랜더를 하고 여러 대의 카메라를 활용하는 카메라 - VR
 * - CubeCamera : 상하좌우전후 모든 방향을 각각 렌더링을 진행하는 카메라 - environment(주변환경)의 map, shadow map
 * - StereoCamera : 사람의 시점을 보여주는 카메라로 깊이감을 주고 사람의 눈을 모사한 카메라 - VR
 * - OrthographicCamera : 2D장면 or UI요소를 렌더링할 때 유용하며, 카메라의 거리와 상관없이 일정하게 3D의 크기는 일정하게 유지되는 카메라
 * 공식 문서 : https://threejs.org/docs/#api/en/cameras/Camera
 *
 * 3. Camera사용법
 * - 자세한 내용은 doc를 참고
 * - 자주 사용되는 PerspectiveCamera를 대표적으로 예시
 *  -> (field on view:카메라가 보는 시야 범위각도, aspect ratio:3D카메라 비율, view frustum(near):카메라의 깊이(가까이 갈건지), view frustum(far):카메라의 깊이(멀리 갈건지))
 *
 * 4. renderer
 * - 공식 문서 : https://threejs.org/docs/?q=RENDE#api/en/constants/Renderer
 */

const scene = new THREE.Scene(); // 3D가 들어갈 공간 생성
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerWidth, 0.1, 1000); // 3D 카메라 설정
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'), // 3D를 공간에 그린다는 것을 설정
});
renderer.setPixelRatio(window.devicePixelRatio); // renderer의 픽셀 비율은 window로 기준으로 설정, 상황에 따라 변경
renderer.setSize(window.innerWidth, window.innerHeight); // renderer할 크기를 설정, 3D가 들어갈 공간을 그리는 크기
camera.position.setZ(30);
camera.position.setX(-3); // 카메라 세부조절을 통한 3D위치를 보기위한 카메라 설정

//#######################################################################################################################################################

/**
 * @return
 * 기본적인 3D구조물 생성
 * 1. 어떤 모양을 할것인가? - geometry(x,y,z)
 * - 공식 문서 : https://threejs.org/docs/#api/en/geometries/BoxGeometry
 * 2. 어떤 재질을 가질것인가? (3D파일에 어떤 것을 wrapping할건지) - material()
 * - 공식 문서 : https://threejs.org/docs/#api/en/materials/LineBasicMaterial
 * 3. Mesh : 모양과 재질을 모아 하나의 3D모형을 생성
 * 4. animation
 * - 공식 문서 : https://threejs.org/docs/?q=ani#api/en/animation/AnimationAction
 * 5. light
 * - 공식 문서 : https://threejs.org/docs/?q=light#api/en/lights/AmbientLight
 * 6. lightHelper : light가 어떤 위치에 있고 어떤 식으로 빛을 비추는지 확인가능하게 도와주는 것
 * - 공식 문서 : https://threejs.org/docs/?q=light#api/en/helpers/DirectionalLightHelper
 * 7. Camera control : 마우스 or 키보드로 카메라를 자유자재 움직일 수 있게 한다.
 * - 공식 문서 : https://threejs.org/docs/?q=con#examples/en/controls/ArcballControls
 * 8. TextureLoader : 3D파일의 겉 표면에 Image를 넣을 수 있다.
 * - 공식 문서 : https://threejs.org/docs/?q=texture#api/en/loaders/TextureLoader
 */
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus); // 3D에 들어갈 공간에 3D파일을 add, 즉, 추가해준다.

//#######################################################################################################################################################

const directionalLight = new THREE.DirectionalLight(0xffffff); // 3D가 필요한 빛을 선언하기
directionalLight.position.set(5, 5, 5); // light의 위치를 조정하여 3D에게 빛을 선언한다.

const ambientLight = new THREE.AmbientLight(0xffffff); // LIGHT는 중복으로 넣을 수도 있다.
scene.add(directionalLight, ambientLight); // 3D에 들어갈 공간에 빛을 추가해준다.

//#######################################################################################################################################################

// const lightHelper = new THREE.PointLightHelper(pointLight);
// const gridHelper = new THREE.GridHelper(200, 50); // 두개의 거리를 선으로 보여주는 도움 선이다.
// scene.add(lightHelper, gridHelper);

//#######################################################################################################################################################

const controls = new OrbitControls(camera, renderer.domElement); // controls(카메마를 움직일 것, dom요소들이 같이 움직일때 렌더링될 것)

//#######################################################################################################################################################

// 추가 mesh를 생성(즉, mesh는 3D모형이다.)
function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffffff });
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3)
        .fill()
        .map(() => THREE.MathUtils.randFloatSpread(100)); // 공식 문서 : https://threejs.org/docs/#api/en/math/MathUtils (수학적인 기능을 넣고 싶을때 사용)

    star.position.set(x, y, z);
    scene.add(star);
}
Array(200).fill().forEach(addStar); // 랜덤으로 200정도 채우기

// star에 texture넣기
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

//#######################################################################################################################################################

// Avatar생성
const avatarTexture = new THREE.TextureLoader().load('cat.jpg');
const avatar = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: avatarTexture })); //
scene.add(avatar); // 3D공간에 추가하기

//#######################################################################################################################################################

// Moon생성
const moonTexture = new THREE.TextureLoader().load('moon.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: normalTexture, // 표면을 좀더 사실적으로 표현하기 위해 map에 추가 map을 해서 표면을 표현한다.
    })
);
scene.add(moon); // 3D공간에 추가하기

// 달 위치 조정
moon.position.z = 15;
moon.position.setX(-10);

avatar.position.z = -5;
avatar.position.x = 2;

//#######################################################################################################################################################

// 스크롤에 따라 camera이동하기
function moveCamera() {
    const t = document.body.getBoundingClientRect().top; // body의 top에서 측정요소까지 반응
    torus.rotation.x += 0.01;
    torus.rotation.z += 0.01;

    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    avatar.rotation.y += 0.01;
    avatar.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;
}
document.body.onscroll = moveCamera;
moveCamera();

//#######################################################################################################################################################

// animate으로 3D물체를 움직이게하여 3D를 더 3D답게 구성할 수도 있다.
function animate() {
    requestAnimationFrame(animate); // web에 animation을 요청
    // 어떤식으로 animation을 줄것인지 설정해야한다.
    // 3D 물체를 받고 거기에 3D가 어떤 식으로 움직일지 작성한다.
    // torus.rotation.x += 0.01; // x축 기준으로 돌리기
    torus.rotation.y += 0.005; // y축 기준으로 돌리기
    // torus.rotation.z += 0.01; // z축 기준으로 돌리기

    controls.update(); // 매 프레임마다 camera는 움직여야 하기 때문에 animate으로 들어간다.

    renderer.render(scene, camera); // 실제 Web에서 보여주기 위해 3D가 들어갈 공간을 인식시켜주고, 카메라도 인식시켜 기본적인 구조를 구성한다.
}

animate(); //animate실행시키기
