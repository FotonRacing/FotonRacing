let scene, camera, renderer;
const spans = document.querySelectorAll('span')
let counter = 0
let wasDown = false
let isDown = false
let lastScrollTime = 0;
let lastScrollPosition = 0;
const maxScrollSpeed = 50;
if (window.screen.width < 900) {
  for (var i = 0; i <spans.length; i++) {
    spans[i].style.top = 70 + i*6 + 'vh'
  }
} else {
  for (var i = 0; i <spans.length; i++) {
    spans[i].style.top = 20 + i*6 + 'vh'
  }
}

      function init() {

        scene = new THREE.Scene();
        scene.background = new THREE.Color("#09080b");

        camera = new THREE.PerspectiveCamera(45,1,1,500000);
        
        camera.position.x = 3.42;
        camera.position.y = 3.84;
        camera.position.z = 10.4;

        controls = new THREE.OrbitControls(camera);
        controls.noPan = true; 
        controls.noZoom = true
        controls.addEventListener('change', renderer);

        hlight = new THREE.AmbientLight (0x404040,4);
        scene.add(hlight);

        directionalLight = new THREE.DirectionalLight(0xffffff,1);
        directionalLight.position.set(0,1,0);
        directionalLight.castShadow = true;
        scene.add(directionalLight);
        light = new THREE.PointLight(0xc4c4c4,1);
        light.position.set(0,30000,50000);
        scene.add(light);
        light2 = new THREE.PointLight(0xc4c4c4,1);
        light2.position.set(50000,10000,0);
        scene.add(light2);
        light3 = new THREE.PointLight(0xc4c4c4,1);
        light3.position.set(0,10000,-50000);
        scene.add(light3);
        light4 = new THREE.PointLight(0xc4c4c4,1);
        light4.position.set(-50000,30000,50000);
        scene.add(light4);

        renderer = new THREE.WebGLRenderer({antialias:true});
        renderer.setSize(500,500);
        if (window.screen.width >900) {
          console.log('desktop')
          document.getElementById("model").appendChild(renderer.domElement);
        } else {
          console.log('smartphone')
          document.getElementById("model2").appendChild(renderer.domElement);
        }
        

        let loader = new THREE.GLTFLoader();
        loader.load('https://fotonracing.github.io/img/car/vehicle.gltf', function(gltf){
          console.log('first step')
          car = gltf.scene.children[6];
          ambient = gltf.scene.children[0]
          ambient.scale.set(0.5,0.5,0.5);
          ambient.visible = false
          scene.add(gltf.scene);
          animate();
          var canvas = document.getElementsByTagName('canvas')[0]
          var canvas2 = document.getElementsByTagName('canvas')[1]
          canvas.style.width = '100%'
          canvas.style.height = '100%'

          canvas2.style.width = '100%'
          canvas2.style.height = '100%'
        });
      }
      function animate() {
        console.log('second step')
        renderer.render(scene,camera);
        console.log('last step')
      }
      init();

      function handleScroll(event) {
        const currentTime = Date.now();
        const scrollSpeed = Math.abs(window.pageYOffset - lastScrollPosition) / (currentTime - lastScrollTime);
      
        if (scrollSpeed > maxScrollSpeed) {
          event.preventDefault();
          window.scrollTo(0, lastScrollPosition);
        }
      
        lastScrollTime = currentTime;
        lastScrollPosition = window.pageYOffset;
      }
window.onscroll = function(e) {
  if (window.screen.width < 900) {
    console.log('smartphone')
    return 0
  }
  handleScroll()
  console.log(this.scrollY)
    if (this.scrollY > 250) {
        var elem = spans[0]
        elem.classList.add('animated')
        elem.addEventListener('animationend', ()=>{
            console.log('ended')
            elem.style.transition = 'none'
            elem.style.right = 'calc(60vh + 10% + 20px + 20px)'
        })
    }
    if (this.scrollY > 500) {
      var elem = spans[1]
      elem.classList.add('animated')
      elem.addEventListener('animationend', ()=>{
          console.log('ended')
          elem.style.transition = 'none'
          elem.style.right = 'calc(60vh + 10% + 20px + 20px)'
      })
    }
    if (this.scrollY > 750) {
      var elem = spans[2]
      elem.classList.add('animated')
      elem.addEventListener('animationend', ()=>{
          console.log('ended')
          elem.style.transition = 'none'
          elem.style.right = 'calc(60vh + 10% + 20px + 20px)'
      })
    }
    if (this.scrollY > 1000) {
      var elem = spans[3]
      elem.classList.add('animated')
      elem.addEventListener('animationend', ()=>{
          console.log('ended')
          elem.style.transition = 'none'
          elem.style.right = 'calc(60vh + 10% + 20px + 20px)'
      })
    }
    if (this.scrollY >= 1000) {
        for (var i = 0; i< spans.length; i++) {
            spans[i].style.transition = 'none'
            spans[i].style.position = 'absolute'
            spans[i].style.top = 160 + i*6 + 'vh'
        }
        var model = document.getElementById('model')
        model.style.transition = 'none'
        model.style.position = 'absolute'
        model.style.top = 160 + 'vh'
        var h1 = document.querySelector('h1')
        h1.style.transition = 'none'
        h1.style.position = 'absolute'
        h1.style.top = 140 + 'vh'
        wasDown = true
        isDown = true
    }
    if (this.scrollY <= 1000 && wasDown && isDown) {
        for (var i = 0; i <spans.length; i++) {
            spans[i].style.position = 'fixed'
            spans[i].style.top = 20 + i*6 + 'vh'
        }
        var model = document.getElementById('model')
        model.style.position = 'fixed'
        model.style.top = 20 + 'vh'
        var h1 = document.querySelector('h1')
        h1.style.position = 'fixed'
        h1.style.top = 0 + 'vh'
        isDown = false
    }
  if (this.oldScroll > this.scrollY) {
    requestAnimationFrame(animate);
    scene.children[6].rotation.y -= 0.02
    renderer.render(scene,camera);
  } else {
    requestAnimationFrame(animate);
    scene.children[6].rotation.y += 0.02
    renderer.render(scene,camera);
  }
  this.oldScroll = this.scrollY;
}
