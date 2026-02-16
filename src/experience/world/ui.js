import Experience from "../experience.js";
import { gsap } from 'gsap';
import views from '../assets/views';

const SCROLL_VIEW_ORDER = [4, 1, 11, 2, 12, 3, 9, 10, 6, 5, 7, 8];

export default class UI {
    constructor() {
        this.experience = new Experience();
        this.camera = this.experience.camera.instance;
        this.controls = this.experience.camera.controls;
        this.cone = this.experience.world.cone.mesh;
        this.resources = this.experience.resources;
        this.currentViewId = 1;
        this.scrollCooldown = false;

        this.event = {
            switchView: this.switchView.bind(this),
            zoom: this.zoom.bind(this)
        }

        this.switchViewListener();
        this.setupScrollNavigation();
    }

    getViewIndex(viewId) {
        return SCROLL_VIEW_ORDER.indexOf(Number(viewId));
    }


    setupScrollNavigation() {
        const applyScroll = (direction) => {
            if (this.scrollCooldown) return;
            const index = this.getViewIndex(this.currentViewId);
            const nextIndex = direction > 0
                ? Math.min(index + 1, SCROLL_VIEW_ORDER.length - 1)
                : Math.max(index - 1, 0);
            if (nextIndex !== index) {
                this.scrollCooldown = true;
                this.switchView(SCROLL_VIEW_ORDER[nextIndex]);
                setTimeout(() => { this.scrollCooldown = false; }, 1200);
            }
        };

        const handleWheel = (e) => {
            if (this.scrollCooldown) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            applyScroll(e.deltaY > 0 ? 1 : -1);
        };
        window.addEventListener('wheel', handleWheel, { passive: false });

        // Touch support for mobile: swipe up = next room, swipe down = previous
        const TOUCH_THRESHOLD = 50;
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };
        const handleTouchEnd = (e) => {
            if (!e.changedTouches[0]) return;
            const touchEndY = e.changedTouches[0].clientY;
            const delta = touchStartY - touchEndY;
            if (Math.abs(delta) >= TOUCH_THRESHOLD) {
                applyScroll(delta > 0 ? 1 : -1);
            }
        };
        window.addEventListener('touchstart', handleTouchStart, { passive: true });
        window.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    /**
     * Switcing camera position and updating HTML description based on view ID
     */
    switchView(viewId) {
        const item = views.find(x => x.viewId == viewId);
        if (!item) return;
        this.currentViewId = item.viewId;
        this.updateHTML(item);
        this.moveCameraToRoomPosition(item);
        document.querySelectorAll('.sidebar__item').forEach(el => {
            el.classList.toggle('sidebar__item--active', el.dataset.view == viewId);
        });
    }

    switchViewListener() {
        this.resources.on('switch.view', () => {
            this.switchView(1);
        })
    }

    /**
     * Zoom of the current camera position (animated)
     * 
     * @param {boolean} increase arg defines if you want to zoom in or zoom out
     */
    zoom(increase) {
        const targetFov = increase
            ? Math.min(this.camera.fov + 10, 100)
            : Math.max(this.camera.fov - 10, 35);

        if (targetFov === this.camera.fov) return;

        gsap.killTweensOf(this.camera);
        gsap.to(this.camera, {
            fov: targetFov,
            duration: 0.5,
            ease: 'power2.out',
            onUpdate: () => this.camera.updateProjectionMatrix()
        });
    }

    /**
     * Moving camera and controls based on selected view
     * 
     * @param {*} item arg is an object from hardcoded ../assets/views array
     */
    moveCameraToRoomPosition(item) {
        gsap.to(this.camera.position, {
            ...item.position.camera,
            duration: 3,
            onUpdate: () => {
                this.camera.lookAt(0, 0, 0);
            }
        });
    
        gsap.to(this.cone.position, {
            ...item.position.cone,
            duration: 4
        });
    
        const viewIndicator = document.getElementById('menu-view-indicator');
        if (viewIndicator) viewIndicator.style.transform = `rotate(${item.css.rotate}deg)`;
    
        gsap.to(this.controls.target, {
            ...item.position.controls,
            duration: 3
        });
    }

    /**
    * Updating the HTML title and description based on selected view
    * 
    * @param {*} item arg is an object from hardcoded ../assets/views array
    */
    updateHTML(item) {
        const box = document.querySelector('.room-desc__box');
        const titleEl = document.querySelector('.room-desc__title');
        const textEl = document.querySelector('.room-desc__text');
        if (!box) return;
        gsap.to(box, {
            opacity: 0,
            duration: 0.15,
            onComplete: () => {
                if (titleEl) titleEl.textContent = item.title || '';
                if (textEl) textEl.textContent = item.description || '';
                gsap.fromTo(box, { opacity: 0, x: 20 }, { opacity: 0.85, x: 0, duration: 0.4, ease: 'power2.out' });
            }
        });
    }
}