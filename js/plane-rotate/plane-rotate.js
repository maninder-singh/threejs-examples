(function(){

    var scene = new THREE.Scene(),
    	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000),
    	renderer = new THREE.WebGLRenderer(),
    	gui = new dat.GUI(),
        planeGeometry = new THREE.PlaneGeometry(30, 30),
        planeMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc}),
        plane = null,
        planeRotation = {};
        
    planeRotation = {
            x : -0.5,
            y : 0,
            z : 0
    };
    renderer.setClearColorHex();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    plane = new THREE.Mesh(planeGeometry, planeMaterial),
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    camera.position.x = -30;
    camera.position.y = 40;
    camera.position.z = 30;
    camera.lookAt(scene.position);
    $("#plane-rotate").append(renderer.domElement);
    gui.add(planeRotation, 'x', -3, 3);
    gui.add(planeRotation, 'y', -3, 3);
    gui.add(planeRotation, 'z', -3, 3);

    function render() {
  		plane.rotation.x = planeRotation.x;
  		plane.rotation.y = planeRotation.y;
  		plane.rotation.z = planeRotation.z;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }
    render();
})();