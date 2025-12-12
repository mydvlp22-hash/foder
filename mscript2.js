function startCWMarquee() {
    document.querySelectorAll("#continueWatch h4").forEach(h4 => {
        let text = h4.innerText.trim();
        h4.innerHTML = `<span class="scroll-inner">${text}</span>`;

        let inner = h4.querySelector(".scroll-inner");

        // যদি টেক্সট ছোট হয় স্ক্রল দরকার নেই
        if (inner.scrollWidth <= h4.clientWidth) return;

        // 2× টেক্সট clone (infinite effect)
        inner.innerHTML = text + " ⠀ ⠀ " + text;

        let speed = 35; // lower = faster
        let pos = 0;

        function scroll() {
            pos -= 1;
            if (Math.abs(pos) >= inner.scrollWidth / 1) pos = 0;
            inner.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(scroll);
        }
        scroll();
    });
}

setTimeout(startCWMarquee, 500);


document.querySelectorAll(".dropdown .dropBtn").forEach(btn=>{
  btn.addEventListener("click", function(e){
    e.stopPropagation();  // sidebar আর auto-close হবে না
    this.parentElement.classList.toggle("open");
  });
});