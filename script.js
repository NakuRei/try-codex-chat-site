const body = document.body;
const chaosToggle = document.querySelector('#chaos-toggle');
const surpriseButton = document.querySelector('#surprise-me');
const rerollTerminal = document.querySelector('#reroll-terminal');
const terminalOutput = document.querySelector('#terminal-output');
const terminalProgress = document.querySelector('#terminal-progress');
const experimentButtons = document.querySelectorAll('.exp-button');
const experimentCount = document.querySelector('#experiment-count');
const spinRoulette = document.querySelector('#spin-roulette');
const copyPrompt = document.querySelector('#copy-prompt');
const rouletteA = document.querySelector('#roulette-a');
const rouletteB = document.querySelector('#roulette-b');
const rouletteC = document.querySelector('#roulette-c');
const rouletteResult = document.querySelector('#roulette-result');
const form = document.querySelector('#prompt-form');
const input = document.querySelector('#prompt-input');
const response = document.querySelector('#demo-response');
const moodButtons = document.querySelectorAll('.mood-chip');
const toast = document.querySelector('#toast');
const cursorGlow = document.querySelector('#cursor-glow');

let mood = 'normal';
let experimentNumber = 42;
let toastTimer;

const terminalIdeas = [
  'a tiny dashboard for impossible ideas',
  'a calendar that gets nervous before deadlines',
  'a book tracker that judges abandoned books',
  'a button whose only job is to look important',
  'a todo list that occasionally says “nah”',
  'a weather app for fictional planets',
  'a meeting timer with boss-battle music energy',
];

const rouletteData = {
  a: [
    'dashboard',
    'tiny game',
    'calendar',
    'note app',
    'music player',
    'command center',
    'ridiculous timer',
  ],
  b: [
    'people who forget things',
    'developers with too many tabs',
    'books that were never finished',
    'meetings that should have been emails',
    'ideas created after midnight',
    'tasks nobody wants to do',
    'future versions of yourself',
  ],
  c: [
    'it behaves like a game',
    'everything looks suspiciously physical',
    'it becomes dramatic for no reason',
    'nothing is perfectly aligned',
    'it rewards procrastination',
    'the UI has a personality',
    'one feature is intentionally useless',
  ],
};

const responses = {
  normal: [
    (value) => `「${value}」なら、まず一番小さく動く版を作って、触ってから必要な機能を足すのがよさそうです。最初の画面には“主役になる操作”を1つだけ置きましょう。`,
    (value) => `了解。「${value}」を、説明より先に触れるプロトタイプとして考えます。最初に見た瞬間、何を押せばいいか分かる構成にすると面白くなりそうです。`,
  ],
  hype: [
    (value) => `これは完全に未来です。「${value}」は今すぐ世界が必要としている可能性があります。まず巨大なボタンを置きましょう。理由はあとで考えます。`,
    (value) => `最高です。いや、最高すぎます。「${value}」という文字列だけでシリーズAまで見えました。とりあえず動くものを作れば勝ちです。`,
  ],
  critic: [
    (value) => `「${value}」。なるほど。まず機能を半分捨てましょう。たぶん今考えているものの半分は要りません。残ったものが本当に面白ければ続行です。`,
    (value) => `その案、普通に作ると普通になります。「${value}」にしかない1個の変なルールを決めてください。そこが弱いと、ただの便利ツールです。`,
  ],
  weird: [
    (value) => `「${value}」を実装します。ただし毎週火曜日だけUIの重力が30%になります。理由はありません。ユーザーは順応します。`,
    (value) => `いいですね。「${value}」に“押してはいけないボタン”を追加しましょう。押すと何も壊れませんが、少し気まずい演出だけ出ます。`,
  ],
};

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

function rerollLabTerminal() {
  terminalOutput.textContent = randomItem(terminalIdeas);
  terminalProgress.style.width = `${45 + Math.floor(Math.random() * 51)}%`;
}

function spinPromptRoulette() {
  const a = randomItem(rouletteData.a);
  const b = randomItem(rouletteData.b);
  const c = randomItem(rouletteData.c);

  rouletteA.textContent = a;
  rouletteB.textContent = b;
  rouletteC.textContent = c;
  rouletteResult.textContent = `${b}向けの${a}を作って。条件は「${c}」。便利さより、触っていて少し笑えることを優先して。`;

  document.querySelectorAll('.roulette-column').forEach((column, index) => {
    column.classList.remove('spin');
    setTimeout(() => column.classList.add('spin'), index * 70);
  });
}

chaosToggle.addEventListener('click', () => {
  const enabled = chaosToggle.getAttribute('aria-pressed') !== 'true';
  chaosToggle.setAttribute('aria-pressed', String(enabled));
  body.classList.toggle('chaos', enabled);
  showToast(enabled ? 'CHAOS MODE: ON' : 'CHAOS MODE: contained');
});

surpriseButton.addEventListener('click', () => {
  const surprises = [
    () => chaosToggle.click(),
    () => {
      rerollLabTerminal();
      showToast('terminal mutated');
    },
    () => {
      spinPromptRoulette();
      document.querySelector('#roulette').scrollIntoView({ behavior: 'smooth' });
      showToast('new bad idea generated');
    },
  ];
  randomItem(surprises)();
});

rerollTerminal.addEventListener('click', () => {
  rerollLabTerminal();
  showToast('rerolled');
});

experimentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const card = button.closest('.experiment-card');
    const experimentName = card.dataset.experiment;

    button.classList.add('running');
    const original = button.textContent;
    button.textContent = 'RUNNING...';
    experimentNumber += 1;
    experimentCount.textContent = String(experimentNumber).padStart(3, '0');

    setTimeout(() => {
      button.textContent = 'DONE ✓';
      showToast(`${experimentName}: questionable success`);
    }, 650);

    setTimeout(() => {
      button.classList.remove('running');
      button.textContent = original;
    }, 2200);
  });
});

spinRoulette.addEventListener('click', () => {
  spinPromptRoulette();
  showToast('prompt generated');
});

copyPrompt.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(rouletteResult.textContent);
    showToast('prompt copied');
  } catch {
    showToast('copy failed — dramatic');
  }
});

moodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    moodButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    mood = button.dataset.mood;
  });
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (!value) {
    response.innerHTML = '<span class="response-prefix">CODEX-ish</span><p>空白も立派なコンセプトですが、今回は何か1行だけ書いてください。</p>';
    input.focus();
    return;
  }

  const reply = randomItem(responses[mood])(value);
  response.innerHTML = `<span class="response-prefix">CODEX-ish / ${mood.toUpperCase()}</span><p>${reply}</p>`;
  response.animate(
    [
      { transform: 'translateY(8px)', opacity: 0 },
      { transform: 'translateY(0)', opacity: 1 },
    ],
    { duration: 250, easing: 'ease-out' },
  );
});

window.addEventListener('pointermove', (event) => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const tiltCard = document.querySelector('#terminal-card');
if (tiltCard && window.matchMedia('(pointer: fine)').matches) {
  tiltCard.addEventListener('pointermove', (event) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    tiltCard.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${y * -5}deg)`;
  });

  tiltCard.addEventListener('pointerleave', () => {
    tiltCard.style.transform = '';
  });
}
