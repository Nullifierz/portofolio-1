// 1. Logic Animasi Layout (Chaos -> Order)
window.addEventListener('load', () => {
    const gallery = document.querySelector('.gallery');
    const cards = document.querySelectorAll('.card');
    
    setTimeout(() => {
        // opacity 1 for gallery
        gallery.style.opacity = '1';
        
    }, 2500); // Initial delay before starting animation
    
    setTimeout(() => {
        cards.forEach((card, index) => {
            // Add class with staggered delay (one by one)
            setTimeout(() => {
                card.classList.add('in-order');
            }, index * 200); 
        });
    }, 3000);
});

// 2. Logic Ganti Teks dengan GSAP
const textElement = document.getElementById('changing-text');
const words = ["simplify", "organize"]; 
let index = 0;

// Pastikan elemen inline-block agar transform berfungsi
textElement.style.display = "inline-block";

// Mulai loop animasi
function animateText() {
    const nextWord = words[index];
    
    // Timeline animasi text
    const tl = gsap.timeline({
        onComplete: () => {
            index++;
            if (index < words.length) {
                gsap.delayedCall(1, animateText);
            }
        }
    });

    // 1. Keluar ke atas
    tl.to(textElement, {
        duration: 0.3,
        y: -20,
        opacity: 0,
        ease: "power2.in"
    })
    // 2. Ganti teks & reset posisi ke bawah
    .set(textElement, {
        innerText: nextWord,
        y: 20
    })
    // 3. Masuk dari bawah
    .to(textElement, {
        duration: 0.3,
        y: 0,
        opacity: 1,
        ease: "power2.out"
    });
}

// Jalankan animasi pertama kali setelah delay
gsap.delayedCall(0.5, animateText);