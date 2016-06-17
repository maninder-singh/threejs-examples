(function(){

    var camera,scene,renderer,controls,spotLight,gui,options;
      
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 10;

    // Add light to scene
    addLight();
    
    function addLight(){
        spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set(0, 0, 500 );
        scene.add(spotLight);
    }
 
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    $("#collada-image").append(renderer.domElement);

    var colladaLoader = new THREE.ColladaLoader();
    colladaLoader.load("../../assets/models/room/scene.dae",function(collada){
            collada.scene.name = "scene";
            scene.add(collada.scene);
        },function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        }
    );

    var previousPoint = {
        x : window.pageX,
        y : window.pageY
    };

    controls = new function () {
        this.x = 1;
        this.y = 1;
        this.z = 1;
    };

    gui = new dat.GUI();
    gui.add(controls, 'x',-180, 180);
    gui.add(controls, 'y',-180, 180);
    gui.add(controls, 'z',-180, 180);
    render();
        
    function render() {
        var box = scene.getObjectByName("scene");
        if(box){
            box.rotation.set( controls.x,controls.y,controls.z);
            box.updateMatrix();
        }
        requestAnimationFrame(render);
        renderer.render( scene, camera );
    }

})();