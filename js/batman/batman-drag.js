(function(){

    var camera,scene,renderer,controls,spotLight,gui,options,orbitControl;
      
    usingCSS3DRenderer();
    
    function usingCSS3DRenderer(){

        var targetRotationX = 0;
        var targetRotationY = 0;
        var targetRotationOnMouseDownX = 0;
        var targetRotationOnMouseDownY = 0;
        var mouseX = 0;
        var mouseY = 0;
        var mouseXOnMouseDown = 0;
        var mouseYOnMouseDown = 0;
        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

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
        //extrudeMesh.rotation.x = -1.1;
        scene.add(extrudeMesh);

        function addLight(){
            spotLight = new THREE.SpotLight( 0xffffff );
            spotLight.position.set(0, 0, 500 );
            scene.add(spotLight);
        }
        
        renderer = new THREE.CanvasRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        
        document.addEventListener( 'mousedown', onDocumentMouseDown, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );


        $("#batman-logo").append(renderer.domElement);
        
        function onDocumentMouseDown( event ) {
            event.preventDefault();
            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener( 'mouseup', onDocumentMouseUp, false );
            document.addEventListener( 'mouseout', onDocumentMouseOut, false );

            mouseXOnMouseDown = event.clientX - windowHalfX;
            mouseYOnMouseDown = event.clientY - windowHalfY;
            targetRotationOnMouseDownX = targetRotationX;
            targetRotationOnMouseDownY = targetRotationY;
        }

        function onDocumentMouseMove( event ) {
            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
            targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.02;
            targetRotationY = targetRotationOnMouseDownY + ( mouseY - mouseYOnMouseDown ) * 0.01;
        }

        function onDocumentMouseUp( event ) {
            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentMouseOut( event ) {
            document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
        }

        function onDocumentTouchStart( event ) {
            if ( event.touches.length === 1 ) {
                event.preventDefault();
                mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
                mouseYOnMouseDown = event.touches[0].pageY - windowHalfY;
                targetRotationOnMouseDownX = targetRotationX;
                targetRotationOnMouseDownY = targetRotationY;
            }
        }
        
        function onDocumentTouchMove( event ) {
            if ( event.touches.length === 1 ) {
                event.preventDefault();
                mouseX = event.touches[ 0 ].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;
                targetRotationX = targetRotationOnMouseDownX + ( mouseX - mouseXOnMouseDown ) * 0.05;
                targetRotationY = targetRotationOnMouseDownY + (mouseY - mouseYOnMouseDown) * 0.05;
            }
        }

        controls = {
            y : -74
        };
        
        var gui = new dat.GUI();
        gui.add(controls,'y',-74,74);
        
        yPosition = {y : -74};
        var tween = TweenLite.to(yPosition,2,{
                        y : 0,
                        onUpdate : function(){
                            extrudeMesh.position.y = yPosition.y;
                        }
                    });

        render();

        function render() {
            extrudeMesh.rotation.y += ( targetRotationX - extrudeMesh.rotation.y ) * 0.05;
            extrudeMesh.rotation.x += ( targetRotationY - extrudeMesh.rotation.x ) * 0.05;
            requestAnimationFrame(render);
            renderer.render( scene, camera );
        }
    }  

})();