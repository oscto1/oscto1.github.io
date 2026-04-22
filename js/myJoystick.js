function createJoystick({
    baseEl,
    stickEl,
    radius = 50,
    deadZone = 0.1,
    onStart = () => {},
    onMove = () => {},
    onEnd = () => {}
}) {
    let active = false;
    let touchId = null;

    let center = { x: 0, y: 0 };

    // mutable handlers
    const handlers = {
        onStart,
        onMove,
        onEnd
    };

    function updateCenter() {
        const rect = baseEl.getBoundingClientRect();
        center.x = rect.left + rect.width / 2;
        center.y = rect.top + rect.height / 2;
    }

    baseEl.addEventListener('touchstart', (e) => {
        handlers.onStart(); // 👈 use handlers

        if (active) return;

        const touch = e.changedTouches[0];

        active = true;
        touchId = touch.identifier;

        updateCenter();
    });

    window.addEventListener('touchmove', (e) => {
        if (!active) return;

        const touch = [...e.changedTouches].find(t => t.identifier === touchId);
        if (!touch) return;

        let dx = touch.clientX - center.x;
        let dy = touch.clientY - center.y;

        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > radius) {
            dx = (dx / dist) * radius;
            dy = (dy / dist) * radius;
        }

        stickEl.style.transform = `translate(${dx}px, ${dy}px)`;

        let nx = dx / radius;
        let ny = dy / radius;

        if (Math.abs(nx) < deadZone) nx = 0;
        if (Math.abs(ny) < deadZone) ny = 0;

        handlers.onMove(nx, ny);
    });

    window.addEventListener('touchend', (e) => {
        if (!active) return;

        const touch = [...e.changedTouches].find(t => t.identifier === touchId);
        if (!touch) return;

        active = false;
        touchId = null;

        stickEl.style.transform = `translate(0px, 0px)`;

        handlers.onEnd();
    });

    return {
        setOnStart(fn) {
            handlers.onStart = fn;
        },
        setOnMove(fn) {
            handlers.onMove = fn;
        },
        setOnEnd(fn) {
            handlers.onEnd = fn;
        },
        destroy() {
            // optional cleanup later
        }
    };
}

export {createJoystick}