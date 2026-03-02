function asFixed(x, digits=1){
  const n = parseFloat(x);
  return Number.isFinite(n) ? n.toFixed(digits) : "–";
}


const SLOT_COUNT = 10;
const MAX_POINTS = 20;

const SPRITE = {
  heart_on: "heart_full.png",
  heart_half: "heart_half.png",
  heart_off: "heart_nill.png",
  drum_on: "hunger_full.png",
  drum_off: "hunger_nill.png",
  _fallback: {
    heart_on: "/mnt/data/bcd80407-acb9-4585-bfff-539a9a86ae80.png",
    heart_off: "/mnt/data/ade6b8df-cdbd-4e6c-8bba-cf7f30d8a9e4.png",
    heart_half: "/mnt/data/68dfb9e4-9af0-4bd3-a40f-0d32ce42a7b5.png",
    drum_on: "/mnt/data/c0788081-c0d4-41be-a6c9-9fd753293981.png",
    drum_off: "/mnt/data/020dc783-ab0d-4d23-b291-f59cddbcff37.png"
  }
};

const DATA_FILES = ["Food.csv", "/mnt/data/Food.csv"];
const SKIN_FILES = ["Technoblade_skin.png", "/mnt/data/Technoblade_skin.png", "/mnt/data/Technoblade_skin.PNG"];


const gHearts = d3.select("#rowHearts");
const gHunger = d3.select("#rowHunger");
const gSatFx  = d3.select("#rowSatFX");
const foodSprite = d3.select("#foodSprite");

const btnHearts = d3.select("#btnSortHearts");
const btnHunger = d3.select("#btnSortHunger");
const chipHearts = d3.select("#chipHearts");
const chipHunger = d3.select("#chipHunger");

const txtName = d3.select("#txtName");
const txtType = d3.select("#txtType");
const txtStats= d3.select("#txtStats");
const txtNeed = d3.select("#txtNeeded");
const fillHunger = d3.select("#fillHunger");

function slugify(s){ return String(s||"").toLowerCase().replace(/[^a-z0-9]+/g,"_").replace(/^_|_$/g,""); }
function tryCsv(paths){ const [p,...r]=paths; if(!p) return Promise.reject("No CSV path"); return d3.csv(p).catch(()=>tryCsv(r)); }
function probeImage(src){ return new Promise(res=>{ const im=new Image(); im.onload=()=>res(true); im.onerror=()=>res(false); im.src=src; }); }
async function pickSprite(key){ const p=SPRITE[key], fb=SPRITE._fallback[key]||p; return (await probeImage(p))?p:fb; }
async function setSkin(){
  const el=document.getElementById("avatar");
  for(const p of SKIN_FILES){ if(await probeImage(p)){ el.setAttribute("href",p); return; } }
}

async function assembleIcons(group, onKey, halfKey, offKey){
  const onHref   = await pickSprite(onKey);
  const halfHref = halfKey ? await pickSprite(halfKey) : null;
  const offHref  = await pickSprite(offKey);

  const SLOT_W = 34, SLOT_H = 30, GAP = 6;
  const slots = group.selectAll(".slot").data(d3.range(SLOT_COUNT)).enter()
    .append("g").attr("class","slot")
    .attr("transform", i => `translate(${i*(SLOT_W+GAP)},0)`);

  slots.append("image").attr("href", offHref).attr("width",SLOT_W).attr("height",SLOT_H);

  if (halfHref){
    slots.append("image")
      .attr("class","half")
      .attr("href", halfHref)
      .attr("width",SLOT_W).attr("height",SLOT_H)
      .style("opacity", 0);
  }

  slots.append("image")
    .attr("class","on")
    .attr("href", onHref)
    .attr("width",SLOT_W).attr("height",SLOT_H)
    .style("opacity", 0);

  function paint(points){
    const v = Math.max(0, Math.min(MAX_POINTS, points||0));
    const full = Math.floor(v / 2);
    const hasHalf = (v % 2) >= 1;

    const gs = group.selectAll(".slot");
    gs.select(".on").style("opacity", (d,i)=> i < full ? 1 : 0);
    if (halfHref){
      gs.select(".half").style("opacity", (d,i)=> (i===full && hasHalf) ? 1 : 0);
    }
  }
  return paint;
}

function normalizeRow(d) {
  const num = (x, def = 0) => {
    if (x === null || x === undefined) return def;
    const n = parseFloat(String(x).replace(/,/g, '').trim());
    return Number.isFinite(n) ? n : def;
  };
  const name = d.name || d.Name || d.food || d.item || d.Item || "Unknown";
  const type = d.food_type || d.type || d.category || d.Category || "";
  const hunger = num(d.hunger ?? d.Hunger ?? d.hunger_points ?? d["Hunger Restored"]);
  const saturation = num(d.saturation ?? d.Saturation ?? d.saturation_modifier ?? d["Saturation"]);
  const heartsDirect = num(d.hearts ?? d.heal ?? d.heal_hearts ?? d.health);
  const hearts = (isFinite(heartsDirect) && heartsDirect > 0) ? heartsDirect
               : (isFinite(hunger) ? hunger * 0.5 : 0);
  return { name, type, hunger, saturation, hearts };
}

let items = [], cursor = 0, key = "hearts";
let drawHearts, drawHunger;

function orderItems(){
  items.sort((a,b)=> d3.descending(a[key], b[key]));
  cursor = 0;
  draw();
}
function stepForward(){ cursor = (cursor + 1) % items.length; draw(); }
function stepBack(){ cursor = (cursor - 1 + items.length) % items.length; draw(); }
function wireUi(){
  d3.select("#btnPrev").on("click", stepBack);
  d3.select("#btnNext").on("click", stepForward);
  d3.select(window).on("keydown", (ev)=>{
    if(ev.key === "ArrowRight") stepForward();
    if(ev.key === "ArrowLeft") stepBack();
  });
  btnHearts.on("click", ()=>{
    key="hearts"; btnHearts.classed("active", true); btnHunger.classed("active", false); orderItems();
  });
  btnHunger.on("click", ()=>{
    key="hunger"; btnHearts.classed("active", false); btnHunger.classed("active", true); orderItems();
  });
}

function updateChips(f){
  chipHearts.text(`Hearts/item: ${asFixed(f.hearts,1)}`);
  chipHunger.text(`Hunger: ${asFixed(f.hunger,0)}`);
}

function draw(){
  if(!items.length) return;
  const f = items[cursor];

  drawHearts(f.hearts);
  const hungerPts = Math.max(0, Math.min(MAX_POINTS, (isFinite(f.hunger)? f.hunger : 0)));
  drawHunger(hungerPts);

  const maxH = d3.max(items, d=>d.hunger) || 20;
  const sH = d3.scaleLinear().domain([0,maxH]).range([0,460]);
  fillHunger.transition().duration(280).attr("width", sH(Math.max(0,f.hunger)));

  const need = f.hearts > 0 ? Math.ceil(MAX_POINTS / f.hearts) : "∞";
  txtName.text(f.name);
  txtType.text(f.type ? `Type: ${f.type}` : "Type: —");
  txtStats.text(`Hunger: ${isFinite(f.hunger)?f.hunger:"—"}`);
  txtNeed.text(`Need ${need} × for full (20 hearts)`);
  updateChips(f);

  const target = `foods/${slugify(f.name)}.png`;
  probeImage(target).then(ok=>{
    if(ok){
      foodSprite.attr("href", target).transition().duration(180).attr("opacity", 1);
    }else{
      foodSprite.attr("opacity", 0);
    }
  });

  d3.select("#avatar")
    .transition().duration(120).attr("transform","scale(1.03)")
    .transition().duration(120).attr("transform","scale(1)");
}

(async function main(){
  await setSkin();
  drawHearts = await assembleIcons(gHearts, "heart_on","heart_half","heart_off");
  drawHunger = await assembleIcons(gHunger, "drum_on", null,"drum_off");
  wireUi();

  tryCsv(DATA_FILES).then(rows=>{
    items = rows.map(normalizeRow).filter(d=>d.name && isFinite(d.hearts));
    orderItems();
  }).catch(err=>{
    txtName.text("Data not found");
    txtType.text("");
    txtStats.text("Place Food.csv and required PNGs next to index.html.");
    txtNeed.text(err?.message || "Error loading assets.");
  });
})();
