// Three.js Page Transition Effect
class PageTransition {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x0a192f, 0);
        
        // Create a container div at the back layer
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.top = '0';
        this.container.style.left = '0';
        this.container.style.width = '100%';
        this.container.style.height = '100%';
        this.container.style.zIndex = '-1'; // Place at the back
        this.container.style.pointerEvents = 'none';
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // Initialize animation properties
        this.isAnimating = false;
        this.currentAnimation = null;
        this.animations = {
            particles: this.createParticleSystem(),
            wave: this.createWaveAnimation(),
            spiral: this.createSpiralAnimation(),
            grid: this.createGridAnimation(),
            circle: this.createCircleAnimation(),
            stars: this.createStarAnimation()
        };

        this.camera.position.z = 5;

        // Add profile image circle animation properties
        this.isAboutPage = this.getPageType() === 'about';
        if (this.isAboutPage) {
            this.profileImage = document.querySelector('.aboutImage img');
            if (this.profileImage) {
                this.profileRect = this.profileImage.getBoundingClientRect();
                this.createProfileCircle();
            }
        }
    }

    createParticleSystem() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 10;
            positions[i + 1] = (Math.random() - 0.5) * 10;
            positions[i + 2] = (Math.random() - 0.5) * 10;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createWaveAnimation() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            const x = (i / count) * 10 - 5;
            positions[i] = x;
            positions[i + 1] = Math.sin(x * 2) * 2;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createSpiralAnimation() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            const angle = (i / count) * Math.PI * 4;
            const radius = (i / count) * 5;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = Math.sin(angle) * radius;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createGridAnimation() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        const gridSize = Math.sqrt(count);
        
        for (let i = 0; i < count * 3; i += 3) {
            const x = (i / 3) % gridSize;
            const y = Math.floor((i / 3) / gridSize);
            positions[i] = (x - gridSize/2) * 0.5;
            positions[i + 1] = (y - gridSize/2) * 0.5;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createCircleAnimation() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            const angle = (i / count) * Math.PI * 2;
            const radius = 5;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = Math.sin(angle) * radius;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createStarAnimation() {
        const geometry = new THREE.BufferGeometry();
        const count = 100;
        const positions = new Float32Array(count * 3);
        
        for (let i = 0; i < count * 3; i += 3) {
            const angle = (i / count) * Math.PI * 2;
            const radius = Math.random() * 5;
            positions[i] = Math.cos(angle) * radius;
            positions[i + 1] = Math.sin(angle) * radius;
            positions[i + 2] = (Math.random() - 0.5) * 2;
        }
        
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.PointsMaterial({
            color: 0x64ffda,
            size: 0.05,
            transparent: true,
            opacity: 0
        });
        
        return new THREE.Points(geometry, material);
    }

    createProfileCircle() {
        // Create a ring geometry for the profile image with 3x size
        const ringGeometry = new THREE.RingGeometry(2.4, 3, 64); // Increased from 0.8, 1 to 2.4, 3
        const ringMaterial = new THREE.MeshBasicMaterial({
            color: 0x64ffda,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide
        });
        this.profileRing = new THREE.Mesh(ringGeometry, ringMaterial);
        this.scene.add(this.profileRing);

        // Position the ring around the profile image
        this.updateRingPosition();
    }

    updateRingPosition() {
        if (!this.profileImage || !this.profileRing) return;

        const rect = this.profileImage.getBoundingClientRect();
        const centerX = (rect.left + rect.right) / 2;
        const centerY = (rect.top + rect.bottom) / 2;
        
        // Convert screen coordinates to Three.js world coordinates
        const vector = new THREE.Vector3(
            (centerX / window.innerWidth) * 2 - 1,
            -(centerY / window.innerHeight) * 2 + 1,
            0
        );
        vector.unproject(this.camera);
        vector.z = -5;
        
        this.profileRing.position.copy(vector);
        // Scale the ring to match the profile image size
        const scale = rect.width / 2;
        this.profileRing.scale.set(scale, scale, 1);
    }

    getPageType() {
        const path = window.location.pathname;
        if (path === '/' || path === '/index.html') return 'index';
        if (path.includes('About.html')) return 'about';
        if (path.includes('Projects.html')) return 'projects';
        if (path.includes('Contact.html')) return 'contact';
        return 'index';
    }

    startTransition(targetUrl) {
        this.isAnimating = true;
        this.targetUrl = targetUrl;
        
        // Remove previous animation if exists
        if (this.currentAnimation) {
            this.scene.remove(this.currentAnimation);
        }
        
        // Select random animation
        const animationKeys = Object.keys(this.animations);
        const randomKey = animationKeys[Math.floor(Math.random() * animationKeys.length)];
        this.currentAnimation = this.animations[randomKey];
        this.scene.add(this.currentAnimation);
        
        if (this.isAboutPage && this.profileRing) {
            // Start the profile circle animation
            this.profileRing.material.opacity = 0;
            this.profileRing.rotation.z = 0;
        }
        
        this.animate();
    }

    animate() {
        if (!this.isAnimating) return;

        requestAnimationFrame(() => this.animate());

        if (this.currentAnimation) {
            this.currentAnimation.rotation.x += 0.001;
            this.currentAnimation.rotation.y += 0.001;
            
            if (this.currentAnimation.material.opacity < 0.3) {
                this.currentAnimation.material.opacity += 0.01;
            }
        }

        if (this.isAboutPage && this.profileRing) {
            this.profileRing.rotation.z += 0.05;
            if (this.profileRing.material.opacity < 0.3) {
                this.profileRing.material.opacity += 0.02;
            }
        }

        if (this.currentAnimation && this.currentAnimation.material.opacity >= 0.3) {
            window.location.href = this.targetUrl;
        }

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        
        if (this.isAboutPage && this.profileRing) {
            this.updateRingPosition();
        }
    }
}

// Initialize transition effect
let pageTransition;

document.addEventListener('DOMContentLoaded', () => {
    pageTransition = new PageTransition();
    window.addEventListener('resize', () => pageTransition.resize());

    // Add transition to all navigation links
    document.querySelectorAll('a').forEach(link => {
        if (link.hostname === window.location.hostname) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                pageTransition.startTransition(link.href);
            });
        }
    });
}); 