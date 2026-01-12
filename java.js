const portalData = [
  { title: "NSP Scholarship 2026", category: "scholarship", date: "15 Mar", desc: "National Scholarship Portal", link: "#" },
  { title: "Mid-Sem Time Table", category: "exam", date: "20 Feb", desc: "Exam schedule", link: "#" },
  { title: "Hostel Fees Notice", category: "notice", date: "05 Jan", desc: "Hostel dues", link: "#" },
  { title: "Reliance Foundation Grant", category: "scholarship", date: "10 Feb", desc: "Merit scholarship", link: "#" },
  { title: "End-Sem Registration", category: "notice", date: "30 Jan", desc: "Exam form", link: "#" }
];

const grid = document.getElementById("mainGrid");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");

let activeCategory = "all";

function renderCards(data){
  grid.innerHTML = "";
  data.forEach(item=>{
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <span class="badge type-${item.category}">${item.category}</span>
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      <small>${item.date}</small>
    `;
    grid.appendChild(card);
  });
}

function filterContent(category, btn){
  activeCategory = category;
  filterButtons.forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  applyFilter();
}

function applyFilter(){
  const term = searchInput.value.toLowerCase();
  let data = portalData;

  if(activeCategory!=="all")
    data = data.filter(i=>i.category===activeCategory);

  if(term)
    data = data.filter(i=>i.title.toLowerCase().includes(term));

  renderCards(data);
}

searchInput.addEventListener("input", applyFilter);
renderCards(portalData);







