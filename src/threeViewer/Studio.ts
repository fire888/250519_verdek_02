import * as THREE from 'three'
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'


export class Studio {
    public containerDom: HTMLElement

    private renderer: THREE.WebGLRenderer
    private scene: THREE.Scene
    private camera: THREE.PerspectiveCamera
    private controls: OrbitControls

    constructor () {
        this.containerDom = document.createElement('div')
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        this.renderer.setClearColor(0x333333)
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.shadowMap.enabled = true
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        this.containerDom.appendChild(this.renderer.domElement)

        this.scene = new THREE.Scene()
    
        const lightA = new THREE.AmbientLight(0xccccff, 30)
        this.scene.add( lightA )
    
        const dirLight = new THREE.DirectionalLight( 0xffffaa, 50)
        dirLight.position.set(-500, 1300, 700)
        dirLight.castShadow = true
        dirLight.shadow.camera.top = 5000
        dirLight.shadow.camera.bottom = -5000
        dirLight.shadow.camera.left = -5000
        dirLight.shadow.camera.right = 5000
        dirLight.shadow.camera.near = 1
        dirLight.shadow.camera.far = 10000
        this.scene.add(dirLight)
    
        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(2000, 2000, 1, 1),
            new THREE.ShadowMaterial( { color: 0x000011, opacity: .2, side: THREE.DoubleSide })
        )
        ground.rotation.x = - Math.PI / 2
        ground.position.y = -1
        ground.receiveShadow = true
        this.scene.add(ground)
       
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 20000)
        this.camera.position.set(1000, 600, 1000)
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
        this.controls.target.set(200, 300, 0)
        this.controls.update()

        window.addEventListener('resize', this.onWindowResize.bind(this))
    }

    setDomParent (elem: HTMLElement) {
        elem.appendChild(this.containerDom)
        this.onWindowResize()
    }

    removeDomParent () {
        this.containerDom.parentNode?.removeChild(this.containerDom)
    }

    render () {
        this.renderer.render(this.scene, this.camera)
        this.controls.update()
    }

    private onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    add (m: THREE.Object3D) {
        this.scene.add(m)
    }

    remove (m: THREE.Object3D) {
        this.scene.remove(m)
    }

    addAxisHelper () {
        const axesHelper = new THREE.AxesHelper(15)
        this.scene.add(axesHelper)
    }

    cameraLookAt (x: number, y: number, z: number) {
        this.camera.lookAt(x, y, z)
    }
}