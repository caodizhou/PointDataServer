pointCloud3d = function (data,container,scale) {
    this.data = data;
    this.dataindex = 0;
    this.container = container;
    this.scale = scale;
}
pointCloud3d.prototype = {
    drawPointCloud3d: function () {
        var data = this.data;
        var container = this.container;
        var scale = this.scale;
        var scene, camera, renderer;

        // I guess we need this stuff too
        var HEIGHT,
            WIDTH, fieldOfView, aspectRatio,
            nearPlane, farPlane, stats,
            geometry, particleCount,
            i,
            materials,
            mouseX = 0,
            mouseY = 0,
            windowHalfX, windowHalfY, cameraZ,
            fogHex, fogDensity, parameters = {},
            parameterCount, particles, time, now,
            dataindex = scale.dataindex;

        init();
        animate();

        function init() {

            HEIGHT = window.innerHeight;
            WIDTH = window.innerWidth;
            windowHalfX = WIDTH / 2;
            windowHalfY = HEIGHT / 2;

            fieldOfView = 75;
            aspectRatio = WIDTH / HEIGHT;
            nearPlane = 1;
            farPlane = 3000;
            /* 	fieldOfView — Camera frustum vertical field of view.
             aspectRatio — Camera frustum aspect ratio.
             nearPlane — Camera frustum near plane.
             farPlane — Camera frustum far plane.

             - https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

             In geometry, a frustum (plural: frusta or frustums)
             is the portion of a solid (normally a cone or pyramid)
             that lies between two parallel planes cutting it. - wikipedia.		*/

            cameraZ = farPlane / 3;
            /*	So, 1000? Yes! move on!	*/
            fogHex = 0x000000;
            /* As black as your heart.	*/
            fogDensity = 0.0007;
            /* So not terribly dense?	*/

            camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
            camera.position.z = cameraZ;

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(fogHex, fogDensity);

            // container = document.createElement('div');
            document.body.appendChild(container);
            document.body.style.margin = 0;
            document.body.style.overflow = 'hidden';

            geometry = new THREE.Geometry();
            /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
            var dataset = data[dataindex];
            particleCount = dataset.length;
            /* Leagues under the sea */

            /*	Hope you took your motion sickness pills;
             We're about to get loopy.	*/

            for (i = 0; i < particleCount; i++) {

                var vertex = new THREE.Vector3();
                vertex.x = dataset[i].x * 10;
                vertex.y = dataset[i].y * 10;
                vertex.z = dataset[i].z * 10;

                geometry.vertices.push(vertex);
            }
            /*	We can't stop here, this is bat country!	*/

            parameters = [
                [
                    [1, 1, 0.5], 5
                ],
                [
                    [0.95, 1, 0.5], 4
                ],
                [
                    [0.90, 1, 0.5], 3
                ],
                [
                    [0.85, 1, 0.5], 2
                ],
                [
                    [0.80, 1, 0.5], 1
                ]
            ];
            parameterCount = parameters.length;

            /*	I told you to take those motion sickness pills.
             Clean that vommit up, we're going again!	*/


            // color = parameters[0][0];
            // size = parameters[0][1];

            materials = new THREE.PointCloudMaterial({
                size: 0.3
            });

            particles = new THREE.PointCloud(geometry, materials);

            particles.rotation.x = Math.random() * 6;
            console.log(particles.rotation.x);

            scene.add(particles);
            time = Date.now();
//拖拽控件对象

            /*	If my calculations are correct, when this baby hits 88 miles per hour...
             you're gonna see some serious shit.	*/

            renderer = new THREE.WebGLRenderer();
            /*	Rendererererers particles.	*/
            renderer.setPixelRatio(window.devicePixelRatio);
            /*	Probably 1; unless you're fancy.	*/
            renderer.setSize(WIDTH, HEIGHT);
            /*	Full screen baby Wooooo!	*/

            var controls = new THREE.OrbitControls(camera,renderer.domElement);//创建控件对象 camera是你的相机对象
            controls.addEventListener('change', render);//监听鼠标、键盘事件
            container.appendChild(renderer.domElement);
            /* Let's add all this crazy junk to the page.	*/

            /*	I don't know about you, but I like to know how bad my
             code is wrecking the performance of a user's machine.
             Let's see some damn stats!	*/

            stats = new Stats();
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.top = '0px';
            stats.domElement.style.right = '0px';
            container.appendChild(stats.domElement);

            /* Event Listeners */

            window.addEventListener('resize', onWindowResize, false);
            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);

        }

        function animate() {
            requestAnimationFrame(animate);
            render();
            // particles.rotation.x+=0.1;
            stats.update();
        }

        function render() {
            // now = Date.now();
            // if (now - time > 100 && $("#onoffswitch").is(':checked'))
            if(dataindex != scale.dataindex)
            {

                geometry = new THREE.Geometry();
                /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
                var dataset = data[(dataindex) % data.length];
                particleCount = dataset.length;
                /* Leagues under the sea */

                /*	Hope you took your motion sickness pills;
                 We're about to get loopy.	*/

                for (i = 0; i < particleCount; i++) {

                    var vertex = new THREE.Vector3();
                    vertex.x = dataset[i].x * 10;
                    vertex.y = dataset[i].y * 10;
                    vertex.z = dataset[i].z * 10;

                    geometry.vertices.push(vertex);
                }
                particles.geometry = geometry;
                // time = now;
                dataindex = scale.dataindex;
            }


            // for (i = 0; i < materials.length; i++) {
            //
            //     color = parameters[i][0];
            //
            //     h = (360 * (color[0] + time) % 360) / 360;
            //     materials[i].color.setHSL(h, color[1], color[2]);
            // }

            renderer.render(scene, camera);
        }

        function onDocumentMouseMove(e) {
            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;
        }

        /*	Mobile users?  I got your back homey	*/

        function onDocumentTouchStart(e) {

            if (e.touches.length === 1) {

                e.preventDefault();
                mouseX = e.touches[0].pageX - windowHalfX;
                mouseY = e.touches[0].pageY - windowHalfY;
            }
        }

        function onDocumentTouchMove(e) {

            if (e.touches.length === 1) {

                e.preventDefault();
                mouseX = e.touches[0].pageX - windowHalfX;
                mouseY = e.touches[0].pageY - windowHalfY;
            }
        }

        function onWindowResize() {

            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }
}
// function drawPointCloud3d (data) {
//     'use strict';
//     // 'To actually be able to display anything with Three.js, we need three things:
//     // A scene, a camera, and a renderer so we can render the scene with the camera.'
//     // - https://threejs.org/docs/#Manual/Introduction/Creating_a_scene
//
//     var scene, camera, renderer;
//
//     // I guess we need this stuff too
//     var container, HEIGHT,
//         WIDTH, fieldOfView, aspectRatio,
//         nearPlane, farPlane, stats,
//         geometry, particleCount,
//         i, h, color, size,
//         materials,
//         mouseX = 0,
//         mouseY = 0,
//         windowHalfX, windowHalfY, cameraZ,
//         fogHex, fogDensity, parameters = {},
//         parameterCount, particles, time,now,dataindex;
//
//     init();
//     animate();
//
//     function init() {
//
//         HEIGHT = window.innerHeight;
//         WIDTH = window.innerWidth;
//         windowHalfX = WIDTH / 2;
//         windowHalfY = HEIGHT / 2;
//
//         fieldOfView = 75;
//         aspectRatio = WIDTH / HEIGHT;
//         nearPlane = 1;
//         farPlane = 3000;
//         dataindex = 0;
//         /* 	fieldOfView — Camera frustum vertical field of view.
// 	aspectRatio — Camera frustum aspect ratio.
// 	nearPlane — Camera frustum near plane.
// 	farPlane — Camera frustum far plane.
//
// 	- https://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
//
// 	In geometry, a frustum (plural: frusta or frustums)
// 	is the portion of a solid (normally a cone or pyramid)
// 	that lies between two parallel planes cutting it. - wikipedia.		*/
//
//         cameraZ = farPlane / 3;
//         /*	So, 1000? Yes! move on!	*/
//         fogHex = 0x000000;
//         /* As black as your heart.	*/
//         fogDensity = 0.0007;
//         /* So not terribly dense?	*/
//
//         camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
//         camera.position.z = cameraZ;
//
//         scene = new THREE.Scene();
//         scene.fog = new THREE.FogExp2(fogHex, fogDensity);
//
//         container = document.createElement('div');
//         document.body.appendChild(container);
//         document.body.style.margin = 0;
//         document.body.style.overflow = 'hidden';
//
//         geometry = new THREE.Geometry();
//         /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
//         var dataset = data[dataindex];
//         particleCount = dataset.length;
//         /* Leagues under the sea */
//
//         /*	Hope you took your motion sickness pills;
// 	We're about to get loopy.	*/
//
//         for (i = 0; i < particleCount; i++) {
//
//             var vertex = new THREE.Vector3();
//             vertex.x = dataset[i].x * 10;
//             vertex.y = dataset[i].y * 10;
//             vertex.z = dataset[i].z * 10;
//
//             geometry.vertices.push(vertex);
//         }
//         /*	We can't stop here, this is bat country!	*/
//
//         parameters = [
//             [
//                 [1, 1, 0.5], 5
//             ],
//             [
//                 [0.95, 1, 0.5], 4
//             ],
//             [
//                 [0.90, 1, 0.5], 3
//             ],
//             [
//                 [0.85, 1, 0.5], 2
//             ],
//             [
//                 [0.80, 1, 0.5], 1
//             ]
//         ];
//         parameterCount = parameters.length;
//
//         /*	I told you to take those motion sickness pills.
// 	Clean that vommit up, we're going again!	*/
//
//
//         // color = parameters[0][0];
//         // size = parameters[0][1];
//
//         materials = new THREE.PointCloudMaterial({
//             size: 0.3
//         });
//
//         particles = new THREE.PointCloud(geometry, materials);
//
//         particles.rotation.x = Math.random() * 6;
//         console.log(particles.rotation.x);
//
//         scene.add(particles);
//         time = Date.now();
// //拖拽控件对象
//
//         /*	If my calculations are correct, when this baby hits 88 miles per hour...
// 	you're gonna see some serious shit.	*/
//
//         renderer = new THREE.WebGLRenderer();
//         /*	Rendererererers particles.	*/
//         renderer.setPixelRatio(window.devicePixelRatio);
//         /*	Probably 1; unless you're fancy.	*/
//         renderer.setSize(WIDTH, HEIGHT);
//         /*	Full screen baby Wooooo!	*/
//
//         var controls = new THREE.OrbitControls(camera);//创建控件对象 camera是你的相机对象
//         controls.addEventListener('change', render);//监听鼠标、键盘事件
//         container.appendChild(renderer.domElement);
//         /* Let's add all this crazy junk to the page.	*/
//
//         /*	I don't know about you, but I like to know how bad my
// 		code is wrecking the performance of a user's machine.
// 		Let's see some damn stats!	*/
//
//         stats = new Stats();
//         stats.domElement.style.position = 'absolute';
//         stats.domElement.style.top = '0px';
//         stats.domElement.style.right = '0px';
//         container.appendChild(stats.domElement);
//
//         /* Event Listeners */
//
//         window.addEventListener('resize', onWindowResize, false);
//         document.addEventListener('mousemove', onDocumentMouseMove, false);
//         document.addEventListener('touchstart', onDocumentTouchStart, false);
//         document.addEventListener('touchmove', onDocumentTouchMove, false);
//
//     }
//
//     function animate() {
//         requestAnimationFrame(animate);
//         render();
//         // particles.rotation.x+=0.1;
//         stats.update();
//     }
//
//     function render() {
//          now = Date.now();
//         if (now - time > 100&&$("#onoffswitch").is(':checked')) {
//             geometry = new THREE.Geometry();
//             /*	NO ONE SAID ANYTHING ABOUT MATH! UGH!	*/
//             var dataset = data[(++dataindex)%data.length];
//             particleCount = dataset.length;
//             /* Leagues under the sea */
//
//             /*	Hope you took your motion sickness pills;
//         We're about to get loopy.	*/
//
//             for (i = 0; i < particleCount; i++) {
//
//                 var vertex = new THREE.Vector3();
//                 vertex.x = dataset[i].x * 10;
//                 vertex.y = dataset[i].y * 10;
//                 vertex.z = dataset[i].z * 10;
//
//                 geometry.vertices.push(vertex);
//             }
//             particles.geometry = geometry;
//             time = now;
//         }
//
//
//         // for (i = 0; i < materials.length; i++) {
//         //
//         //     color = parameters[i][0];
//         //
//         //     h = (360 * (color[0] + time) % 360) / 360;
//         //     materials[i].color.setHSL(h, color[1], color[2]);
//         // }
//
//         renderer.render(scene, camera);
//     }
//
//     function onDocumentMouseMove(e) {
//         mouseX = e.clientX - windowHalfX;
//         mouseY = e.clientY - windowHalfY;
//     }
//
//     /*	Mobile users?  I got your back homey	*/
//
//     function onDocumentTouchStart(e) {
//
//         if (e.touches.length === 1) {
//
//             e.preventDefault();
//             mouseX = e.touches[0].pageX - windowHalfX;
//             mouseY = e.touches[0].pageY - windowHalfY;
//         }
//     }
//
//     function onDocumentTouchMove(e) {
//
//         if (e.touches.length === 1) {
//
//             e.preventDefault();
//             mouseX = e.touches[0].pageX - windowHalfX;
//             mouseY = e.touches[0].pageY - windowHalfY;
//         }
//     }
//
//     function onWindowResize() {
//
//         windowHalfX = window.innerWidth / 2;
//         windowHalfY = window.innerHeight / 2;
//
//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize(window.innerWidth, window.innerHeight);
//     }
// };