const sounds = [
  {
    name: "Ring",
    url: "http://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a",
    img: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/95b91a82-dea0-45f0-a1f7-e69e683ce44c/df33wc2-83a686a8-e9f8-4843-ab9c-5de157b51154.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzk1YjkxYTgyLWRlYTAtNDVmMC1hMWY3LWU2OWU2ODNjZTQ0Y1wvZGYzM3djMi04M2E2ODZhOC1lOWY4LTQ4NDMtYWI5Yy01ZGUxNTdiNTExNTQuZ2lmIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.R1Bun3TRHhRbkJBb1egdgZkqBnxp5Yhx9qfBavzzu3c",
  },
  {
    name: "Alien shoot",
    url: "http://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/alien_shoot.wav",
    img: "https://as2.ftcdn.net/v2/jpg/05/14/21/65/1000_F_514216598_gdfGlO1JXlDZea7k0cBYL15LJFKuH4oj.jpg",
  },
];

class Soundboard {
  constructor() {
    this.sounds =
      localStorage.getItem("sounds") == []
        ? [...JSON.parse(localStorage.getItem("sounds"))]
        : [...sounds];
    this.soundboardEl = document.querySelector(".soundboard");
    this.addSoundButton = document.querySelector(".add-sound");

    this.initialize();
  }

  initialize() {
    this.renderSounds();
    this.addSoundButton.addEventListener("click", () => this.addSound());
  }

  renderSounds() {
    this.soundboardEl.innerHTML = ""; //reset soundboard
    this.createAllSounds().forEach((soundEl) =>
      this.soundboardEl.appendChild(soundEl)
    );
  }

  createAllSounds() {
    return this.sounds.map((sound) => {
      const soundEl = document.createElement("div");
      soundEl.classList.add(
        "group",
        "relative",
        "rounded-lg",
        "overflow-hidden",
        "cursor-pointer",
        "sound"
      );
      soundEl.innerHTML = `
                <img
              src=${sound.img}
              alt="Sound 1"
              width="300"
              height="200"
              class="w-full h-auto object-cover transition-all group-hover:scale-105"
              style="aspect-ratio: 300 / 200; object-fit: cover"
            />
            <div
              class="absolute inset-0 bg-secondary-dark flex items-center justify-center opacity-0 group-hover:opacity-70 transition-opacity"
            >
              <button
                class="flex items-center mb-3 justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-10 w-10 text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-6 h-6"
                >
                  <polygon points="6 3 20 12 6 21 6 3"></polygon>
                </svg>
              </button>
            </div>
            <div
              class="absolute bottom-0 left-0 w-full bg-primary p-2 text-secondary-dark text-sm font-semibold flex justify-between"
            >
              <p>${sound.name}</p>
            <button
                class="delete-sound flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-[20px] w-[20px] text-secondary-dark"
              >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="w-5 h-5"
                >
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
              </button>
            </div>
            `;
      soundEl.addEventListener("click", () => this.playSound(sound.url));
      soundEl.children[0].addEventListener("click", (e) => {
        e.stopPropagation();
        this.playSound(sound.url);
      });
      soundEl.children[2].children[1].addEventListener("click", (e) => {
        e.stopPropagation();
        this.deleteSound(sound);
      });
      return soundEl;
    });
  }

  playSound(url) {
    const audio = new Audio(url);
    audio.play();
  }

  addSound() {
    const name = prompt("Ingresa nombre: ");
    const url = prompt("Ingresa URL: ");
    const img = prompt("Ingresa portada (url):");

    if (name && url && img) {
      this.sounds.push({ name, url, img });
      localStorage.setItem("sounds", JSON.stringify(this.sounds));
      this.renderSounds();
    } else {
      alert("Ingresa todos los campos");
    }
  }

  deleteSound(sound) {
    this.sounds = this.sounds.filter((s) => s.name !== sound.name);
    localStorage.setItem("sounds", JSON.stringify(this.sounds));
    this.renderSounds();
  }
}

new Soundboard();
