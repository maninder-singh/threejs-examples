(function(){

    var camera,scene,renderer,controls,spotLight,gui,options,orbitControl;
      
    usingWebGLRenderer();  
    
    function usingWebGLRenderer(){

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.z = 150;

        // Add light to scene
        addLight();
        
        // Extrude shape ( Batman logo) 
        var svgString = $("#batman-path").attr("d"),
            extrudeGeometry = new THREE.ExtrudeGeometry(transformSVGPathExposed(svgString),{
                    amount: 2,
                    bevelThickness: 2,
                    bevelSize :0.5,
                    bevelEnabled: true,
                    bevelEnabled : true,
                    bevelSegments: 3,
                    curveSegments : 12,
                    steps: 1
                }
            ),
            extrudeMeshMaterial = new THREE.MeshPhongMaterial({color: 0x333333});

        extrudeGeometry.applyMatrix(new THREE.Matrix4().makeTranslation(-390, -74, 0));
        extrudeMesh = new THREE.Mesh(extrudeGeometry, extrudeMeshMaterial);
        extrudeMesh.scale.x = 0.1;
        extrudeMesh.scale.y = 0.1;
        extrudeMesh.rotation.z = Math.PI;
        extrudeMesh.rotation.x = -1.1;
        scene.add(extrudeMesh);

        function addLight(){
            spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.position.set(0, 0, 500 );
            scene.add(spotLight);
        }
        
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));

        // Add OrbitControls so that we can pan around with the mouse.
        orbitControl = new THREE.OrbitControls(camera, renderer.domElement);


        $("#batman-logo").append(renderer.domElement);
        var previousPoint = {
            x : window.pageX,
            y : window.pageY
        };

        render();
            
        function render() {
            requestAnimationFrame(render);
            renderer.render( scene, camera );
            orbitControl.update();
        }
    }

})();