(function(){

    var camera,scene,renderer,mesh,controls,spotLight,planeGeometry,planeMaterial,gui,options;
      
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    spotLight = new THREE.SpotLight( 0xffffff );
    spotLight.position.set(0, 0, 500 );
    scene.add(spotLight);
    planeGeometry = new THREE.PlaneGeometry( 50,70);
    options = {
        amount : 10,
        bevelEnabled : true,
        bevelThickness : 3,
        bevelSize : 3
    };
    // planeGeometry = new THREE.ExtrudeGeometry(new THREE.PlaneGeometry( 50,70),options);
    planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: THREE.ImageUtils.loadTexture("../../assets/images/flower/lotus.jpg")
    });
    plane = new THREE.Mesh(planeGeometry, planeMaterial );
    plane.material.side = THREE.DoubleSide;
    scene.add( plane );
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    $("#3d-flower").append(renderer.domElement);
    var previousPoint = {
        x : window.pageX,
        y : window.pageY
    };
    $( "body" ).mousemove(function( event ){
        if(event.pageX < previousPoint.x){
            plane.rotation.y += 0.02;    
        }else{
            plane.rotation.y -= 0.02;
        }
        previousPoint.x = event.pageX;
        previousPoint.y = event.pageY;
    });

    var orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControls.target = new THREE.Vector3(0, 20, 0);
    // scene.add(orbitControls);
    controls = new function () {
        this.x = 1;
        this.y = 1;
        this.z = 1;
    };

    gui = new dat.GUI();
    gui.add(controls, 'x',-100, 100);
    gui.add(controls, 'y',-100, 100);
    gui.add(controls, 'z',-100, 100);
    render();
        
    function render() {

        plane.position.x = controls.x;
        plane.position.y = controls.y;
        requestAnimationFrame(render);
        renderer.render( scene, camera );
    }

})();