/**
 * 고수템 맘테스트 + 가설 검증 음성 인터뷰 웹폼 (v2.2)
 * - 유도 질문·서비스명·미래 가정 문구 0건
 * - 한국어 Web Speech API 음성 입력 + 구글 스프레드시트 자동 적재
 */

// [설정] Google Apps Script 웹 앱 배포 URL을 아래 따옴표 안에 붙여넣으세요.
// 비워 두어도 테스트 및 로컬 저장·카톡 복사는 그대로 작동합니다.
const GOOGLE_SCRIPT_URL = "";

// URL 파라미터(?ref=friend 또는 ?ref=swim)로 지인/타깃 자동 구분
const urlParams = new URLSearchParams(window.location.search);
const RESPONDENT_GROUP = urlParams.get("ref") === "friend" ? "지인" : "타깃";
const DEFAULT_DOMAIN = urlParams.get("ref") === "swim" ? "수영" : "";

// 맘테스트 v2.2 7문항 데이터 (questions.js에서 분리 로드)
const QUESTIONS = window.GOSUTEM_QUESTIONS || [];

// 상태 관리
let currentIndex = 0;
const answers = {};
let recognition = null;
let isRecording = false;
let baseTextBeforeSpeech = "";

// DOM 요소
const topBar = document.getElementById("topBar");
const stepLabel = document.getElementById("stepLabel");
const progressFill = document.getElementById("progressFill");
const introScreen = document.getElementById("introScreen");
const questionScreen = document.getElementById("questionScreen");
const doneScreen = document.getElementById("doneScreen");
const respondentInfo = document.getElementById("respondentInfo");
const startBtn = document.getElementById("startBtn");
const qBadge = document.getElementById("qBadge");
const qTitle = document.getElementById("qTitle");
const qGuide = document.getElementById("qGuide");
const chipsWrap = document.getElementById("chipsWrap");
const voiceLabel = document.getElementById("voiceLabel");
const speechStatus = document.getElementById("speechStatus");
const micBtn = document.getElementById("micBtn");
const micBtnText = document.getElementById("micBtnText");
const micFallbackTip = document.getElementById("micFallbackTip");
const answerTextarea = document.getElementById("answerTextarea");
const contactGroup = document.getElementById("contactGroup");
const contactInput = document.getElementById("contactInput");
const errorMsg = document.getElementById("errorMsg");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const doneDesc = document.getElementById("doneDesc");
const summaryBox = document.getElementById("summaryBox");
const copyBtn = document.getElementById("copyBtn");
const restartBtn = document.getElementById("restartBtn");

// 음성 인식(Web Speech API) 초기화
function initSpeechRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    micBtn.hidden = true;
    micFallbackTip.hidden = false;
    speechStatus.textContent = "키보드 마이크 사용";
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = "ko-KR";
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = () => {
    isRecording = true;
    baseTextBeforeSpeech = answerTextarea.value.trim();
    micBtn.classList.add("recording");
    micBtn.setAttribute("aria-pressed", "true");
    micBtnText.textContent = "듣고 있어요… (누르면 멈춤)";
    speechStatus.textContent = "녹음 중";
    speechStatus.classList.add("recording");
  };

  recognition.onresult = (event) => {
    let finalChunk = "";
    let interimChunk = "";
    for (let i = 0; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalChunk += transcript;
      } else {
        interimChunk += transcript;
      }
    }
    const combined = [baseTextBeforeSpeech, (finalChunk + interimChunk).trim()]
      .filter(Boolean)
      .join(" ");
    answerTextarea.value = combined;
    saveCurrentText();
  };

  recognition.onerror = (event) => {
    stopRecordingUI();
    if (event.error === "not-allowed") {
      speechStatus.textContent = "마이크 권한 필요";
      micFallbackTip.hidden = false;
    } else {
      speechStatus.textContent = "다시 눌러 말씀해 주세요";
    }
  };

  recognition.onend = () => {
    stopRecordingUI();
  };
}

function stopRecordingUI() {
  isRecording = false;
  micBtn.classList.remove("recording");
  micBtn.setAttribute("aria-pressed", "false");
  micBtnText.textContent = "눌러서 말하기";
  speechStatus.textContent = "대기 중";
  speechStatus.classList.remove("recording");
}

function toggleMic() {
  if (!recognition) return;
  if (isRecording) {
    recognition.stop();
  } else {
    try {
      recognition.start();
    } catch (e) {
      recognition.stop();
    }
  }
}

function saveCurrentText() {
  const q = QUESTIONS[currentIndex];
  if (!answers[q.id]) answers[q.id] = { choices: [], text: "" };
  answers[q.id].text = answerTextarea.value.trim();
}

// 문항 렌더링
function renderQuestion() {
  if (isRecording && recognition) recognition.stop();
  const q = QUESTIONS[currentIndex];
  if (!answers[q.id]) {
    answers[q.id] = {
      choices: q.id === "q1" && DEFAULT_DOMAIN ? [DEFAULT_DOMAIN] : [],
      text: ""
    };
  }

  const pct = Math.round(((currentIndex + 1) / QUESTIONS.length) * 100);
  stepLabel.textContent = `질문 ${currentIndex + 1} / ${QUESTIONS.length}`;
  progressFill.style.width = `${pct}%`;

  qBadge.textContent = q.badge;
  qTitle.textContent = q.title;
  qGuide.textContent = q.guide;
  voiceLabel.textContent = q.voiceLabel;
  answerTextarea.placeholder = q.placeholder;
  answerTextarea.value = answers[q.id].text || "";
  errorMsg.hidden = true;

  // 선택 칩 렌더링
  chipsWrap.innerHTML = "";
  chipsWrap.hidden = false;
  q.chips.forEach((chipText) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "chip-btn";
    btn.textContent = chipText;
    if (answers[q.id].choices.includes(chipText)) {
      btn.classList.add("selected");
    }
    btn.addEventListener("click", () => {
      const list = answers[q.id].choices;
      if (q.multi) {
        const idx = list.indexOf(chipText);
        if (idx >= 0) list.splice(idx, 1);
        else list.push(chipText);
      } else {
        answers[q.id].choices = [chipText];
      }
      renderQuestionChipsOnly(q);
      errorMsg.hidden = true;
    });
    chipsWrap.appendChild(btn);
  });

  contactGroup.hidden = q.id !== "q7";
  prevBtn.textContent = currentIndex === 0 ? "처음으로" : "이전";
  nextBtn.textContent = currentIndex === QUESTIONS.length - 1 ? "제출하기" : "다음";
}

function renderQuestionChipsOnly(q) {
  const buttons = chipsWrap.querySelectorAll(".chip-btn");
  buttons.forEach((btn) => {
    btn.classList.toggle("selected", answers[q.id].choices.includes(btn.textContent));
  });
}

// 제출 페이로드 구성 (구글 시트 원장 18컬럼 구조와 1:1 매핑)
function buildPayload() {
  const now = new Date();
  const timestamp = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  return {
    timestamp,
    group: RESPONDENT_GROUP,
    channel: "음성웹폼",
    respondent: respondentInfo.value.trim() || "미기재",
    q1_domain: (answers.q1?.choices || []).join(", "),
    q1_text: answers.q1?.text || "",
    q2_channels: (answers.q2?.choices || []).join(", "),
    q2_text: answers.q2?.text || "",
    q3_spend: (answers.q3?.choices || []).join(", "),
    q3_text: answers.q3?.text || "",
    q4_regret: (answers.q4?.choices || []).join(", "),
    q4_text: answers.q4?.text || "",
    q5_link_react: (answers.q5?.choices || []).join(", "),
    q5_text: answers.q5?.text || "",
    q6_used: (answers.q6?.choices || []).join(", "),
    q6_text: answers.q6?.text || "",
    q6b_apps: (answers.q6b?.choices || []).join(", "),
    q6b_text: answers.q6b?.text || "",
    q7_promise: (answers.q7?.choices || []).join(", "),
    q7_text: answers.q7?.text || "",
    contact: contactInput.value.trim() || ""
  };
}

function formatSummaryText(p) {
  return [
    `[입문 준비물 인터뷰 응답 · ${p.timestamp}]`,
    `구분: ${p.group} / 소개: ${p.respondent}`,
    `1) 활동·빈도: ${p.q1_domain} | ${p.q1_text}`,
    `2) 탐색·멈칫: ${p.q2_channels} | ${p.q2_text}`,
    `3) 시간·금액: ${p.q3_spend} | ${p.q3_text}`,
    `4) 후회 물건: ${p.q4_regret} | ${p.q4_text}`,
    `5) 조언·링크: ${p.q5_link_react} | ${p.q5_text}`,
    `6) 중고·고수: ${p.q6_used} | ${p.q6_text}`,
    `7) 약속 여부: ${p.q7_promise} | ${p.q7_text}${p.contact ? " / 연락처: " + p.contact : ""}`
  ].join("\n");
}

async function submitForm() {
  if (isRecording && recognition) recognition.stop();
  nextBtn.disabled = true;
  nextBtn.textContent = "저장 중…";

  const payload = buildPayload();
  const summaryText = formatSummaryText(payload);

  // 로컬 백업 저장
  try {
    const saved = JSON.parse(localStorage.getItem("gosutem_interviews") || "[]");
    saved.push(payload);
    localStorage.setItem("gosutem_interviews", JSON.stringify(saved));
  } catch (e) {}

  let sentToSheet = false;
  if (GOOGLE_SCRIPT_URL) {
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload)
      });
      sentToSheet = true;
    } catch (e) {
      sentToSheet = false;
    }
  }

  topBar.hidden = true;
  questionScreen.hidden = true;
  doneScreen.hidden = false;
  summaryBox.textContent = summaryText;

  if (sentToSheet) {
    doneDesc.textContent = "구글 스프레드시트에 자동으로 저장되었습니다. 솔직하게 들려주신 경험이 큰 도움이 됩니다!";
  } else {
    doneDesc.textContent = "응답이 기기에 안전하게 정리되었습니다. 아래 [복사하기] 버튼을 눌러 카톡으로 보내주셔도 됩니다!";
  }

  nextBtn.disabled = false;
}

// 이벤트 연결
startBtn.addEventListener("click", () => {
  introScreen.hidden = true;
  topBar.hidden = false;
  questionScreen.hidden = false;
  currentIndex = 0;
  renderQuestion();
});

micBtn.addEventListener("click", toggleMic);
answerTextarea.addEventListener("input", saveCurrentText);

prevBtn.addEventListener("click", () => {
  saveCurrentText();
  if (currentIndex === 0) {
    topBar.hidden = true;
    questionScreen.hidden = true;
    introScreen.hidden = false;
  } else {
    currentIndex--;
    renderQuestion();
  }
});

nextBtn.addEventListener("click", () => {
  saveCurrentText();
  const q = QUESTIONS[currentIndex];
  const ans = answers[q.id];
  if (q.requiredChoice && (!ans || ans.choices.length === 0)) {
    errorMsg.textContent = "위 선택지 중 해당하는 항목을 1개 이상 눌러주세요.";
    errorMsg.hidden = false;
    return;
  }
  if (currentIndex < QUESTIONS.length - 1) {
    currentIndex++;
    renderQuestion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    submitForm();
  }
});

copyBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(summaryBox.textContent);
    copyBtn.textContent = "복사 완료! 카톡에 바로 붙여넣으세요 ✓";
    setTimeout(() => {
      copyBtn.textContent = "내 답변 텍스트 복사하기 (카톡 전달용)";
    }, 2500);
  } catch (e) {
    copyBtn.textContent = "위 상자 안의 글을 길게 눌러 복사해 주세요";
  }
});

restartBtn.addEventListener("click", () => {
  Object.keys(answers).forEach((k) => delete answers[k]);
  respondentInfo.value = "";
  contactInput.value = "";
  doneScreen.hidden = true;
  introScreen.hidden = false;
});

initSpeechRecognition();
