const canvas = document.getElementById("birthdayCanvas");
const ctx = canvas.getContext("2d");
const modal = document.getElementById("wishModal");
const popup = document.getElementById("popup");
const closeBtn = document.querySelector(".close-button");
const mainPhoto = document.getElementById("mainPhoto");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

/* CONFETTI */
class Confetti {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 5 + 3;
    this.color = ["#ffc72c","#ff6b6b","#1dd1a1","#5f27cd"][Math.floor(Math.random()*4)];
    this.vx = Math.random()*6 - 3;
    this.vy = Math.random()*-10 - 5;
    this.g = 0.2;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
  update() {
    this.vy += this.g;
    this.x += this.vx;
    this.y += this.vy;
    this.draw();
  }
}

let confetti = [];

function boom() {
  modal.style.display = "flex";   // ⬅️ MUNCUL SAAT DIKLIK
  for(let i=0;i<50;i++){
    confetti.push(new Confetti(canvas.width/2, canvas.height));
  }
  animate();
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach((c,i)=>{
    c.update();
    if(c.y > canvas.height) confetti.splice(i,1);
  });
  if(confetti.length) requestAnimationFrame(animate);
}

/* KLIK FOTO → MODAL KEJUTAN */
mainPhoto.addEventListener("click", boom, { once:true });

/* TUTUP MODAL KEJUTAN */
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

/* PASSWORD */
function cekPassword(){
  const pass = "blabla"; // GANTI PASSWORD
  const input = document.getElementById("password").value;
  if(input === pass){
    popup.style.display = "flex";  // ⬅️ MUNCUL JIKA BENAR
  } else {
    alert("Password salah!");
  }
}
function tutup(){
  popup.style.display = "none";
}
