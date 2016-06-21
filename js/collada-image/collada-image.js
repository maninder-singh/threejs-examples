var example = (function(){

    var camera,scene,renderer,controls,spotLight,gui,options;
      
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    // Add light to scene
    addLight();
    
    function addLight(){
        spotLight = new THREE.SpotLight( 0xffffff );
        spotLight.position.set(0, 0, 100 );
        scene.add(spotLight);
    }
    
    var axis = new THREE.AxisHelper(100);
    scene.add(axis);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
    $("#collada-image").append(renderer.domElement);

    var colladaLoader = new THREE.ColladaLoader();
    colladaLoader.load("../../assets/models/room/scene.dae",function(collada){
            var room = collada.scene;
            room.applyMatrix(new THREE.Matrix4().makeTranslation(-10,-10,0));
            room.name = "scene";
            room.scale.set(0.4,0.4,0.4);
            scene.add(room);
        },function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        }
    );

    var previousPoint = {
        x : window.pageX,
        y : window.pageY
    };

    var previousPoint = {
        x : window.pageX,
        y : window.pageY
    };
    
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);

    // $("body").mousemove(function(event){
    //     var box = example.scene.getObjectByName("scene");
    //     var rotationX = box.rotation.x;
    //     var rotationY = box.rotation.y;
    //     var rotationZ = box.rotation.z;
    //     if(event.pageX < previousPoint.x && event.pageY < previousPoint.y){
    //         // mouse moving up and left
    //         box.rotation.x = rotationX + 0.01;
    //         box.rotation.y = rotationY + 0.01;
    //         box.rotation.z = rotationZ - 0.01;
    //         //box.rotation.set(rotationX+1,rotationY+1,rotationZ - 1);
    //     }else if(event.pageX < previousPoint.x && event.pageY > previousPoint.y){
    //         // mouse moving down and left
    //         box.rotation.x = rotationX - 0.01;
    //         box.rotation.y = rotationY - 0.01;
    //         box.rotation.z = rotationZ + 0.01;
    //         //box.rotation.set(rotationX-1,rotationY -1,rotationZ+1);
    //     }else if(event.pageX > previousPoint.x && event.pageY < previousPoint.y){
    //         // mouse moving up and right
    //         box.rotation.x = rotationX + 0.01;
    //         box.rotation.y = rotationY + 0.01;
    //         box.rotation.z = rotationZ - 0.01;
    //         //box.rotation.set(rotationX+1,rotationY+1,rotationZ-1);
    //     }else{
    //         // mouse moving down and right
    //         box.rotation.x = rotationX + 0.01;
    //         box.rotation.y = rotationY - 0.01;
    //         box.rotation.z = rotationZ + 0.01;
    //         //box.rotation.set(rotationX+1,rotationY - 1,rotationZ+1);
    //     }
    //     previousPoint.x = event.pageX;
    //     previousPoint.y = event.pageY;
    //     box.updateMatrix();
    // });
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
        // if(box){
        //     box.rotation.set( controls.x,controls.y,controls.z);
        //     box.updateMatrix();
        // }
        requestAnimationFrame(render);
        renderer.render( scene, camera );
        orbitControl.update();
    }
    return {
        scene : scene
    }
})();