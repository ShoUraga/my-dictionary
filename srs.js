/*
 * マイ辞書 — 単語テストの間隔反復学習（SRS）ロジック
 *
 * - 簡易 SM-2（○×2択版）で、各単語の次回復習日を「忘却曲線に沿って」算出する。
 * - 学習データは entries.js とは完全分離し、localStorage キー "dict.srs.v1" に持つ。
 *   辞書本体（window.DICTIONARY_ENTRIES）の追記・閲覧とは衝突しない。
 * - 単語との紐付けは安定キーである id（"YYYY-MM-DD-slug"）で行う。word では行わない。
 * - Alpine 非依存の純粋関数群。window.SRS としてエクスポートする。
 */
(function () {
  'use strict';

  // ===== 定数 =====
  var CONST = {
    MIN_EASE: 1.3,        // ease の下限（苦手語ほどここに近づく）
    DEFAULT_EASE: 2.5,    // 新規語の初期 ease
    FIRST_INTERVAL: 1,    // 初回正解後: 1日
    SECOND_INTERVAL: 3,   // 2回目正解後: 3日
    EASE_PENALTY: 0.2,    // 「× まだ」での ease 減少
    LAPSE_INTERVAL: 1,    // 「× まだ」の後の再出題間隔（翌日）
    SESSION_LIMIT: 20,    // 1セッションの最大出題数
    NEW_PER_SESSION: 5    // 1セッションに混ぜる新規語の最大数
  };

  var STORAGE_KEY = 'dict.srs.v1';
  var memoryFallback = null; // localStorage 不可環境用（セッション限り）

  // ===== 日付ユーティリティ（ローカルタイム 00:00 基準・"YYYY-MM-DD"） =====
  function fmt(d) {
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, '0');
    var day = String(d.getDate()).padStart(2, '0');
    return y + '-' + m + '-' + day;
  }

  function parseDate(dateStr) {
    var parts = String(dateStr).split('-').map(Number);
    return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
  }

  function today() {
    return fmt(new Date());
  }

  function addDays(dateStr, n) {
    var d = parseDate(dateStr);
    d.setDate(d.getDate() + n);
    return fmt(d);
  }

  function diffDays(a, b) { // a - b を日数で返す
    return Math.round((parseDate(a) - parseDate(b)) / 86400000);
  }

  // ===== localStorage アクセス =====
  function emptyData() {
    return { version: 1, cards: {}, stats: { lastSessionDate: null, totalReviews: 0 } };
  }

  function newDefaultState() {
    return {
      reps: 0,
      ease: CONST.DEFAULT_EASE,
      interval: 0,
      due: null,
      lastReviewed: null,
      correct: 0,
      wrong: 0
    };
  }

  function loadSrs() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return memoryFallback || emptyData();
      var data = JSON.parse(raw);
      if (!data || typeof data !== 'object' || !data.cards) return emptyData();
      if (!data.stats) data.stats = { lastSessionDate: null, totalReviews: 0 };
      return data;
    } catch (e) {
      return memoryFallback || emptyData();
    }
  }

  function saveSrs(data) {
    memoryFallback = data; // 失敗時もこのセッションでは保持できるように
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      return true;
    } catch (e) {
      return false; // file:// で無効化されている等。メモリ内のみ。
    }
  }

  function getCardState(data, id) {
    if (data && data.cards && data.cards[id]) return data.cards[id];
    return newDefaultState();
  }

  // ===== SRS コア: 1回の採点で state を更新 =====
  // grade: 'good'（○ わかった） | 'again'（× まだ）
  function reviewCard(state, grade, todayStr) {
    var s = Object.assign(newDefaultState(), state || {});
    if (grade === 'again') {
      s.reps = 0;
      s.ease = Math.max(CONST.MIN_EASE, s.ease - CONST.EASE_PENALTY);
      s.interval = CONST.LAPSE_INTERVAL;
      s.wrong = (s.wrong || 0) + 1;
    } else { // 'good'
      var prevInterval = s.interval || 0;
      s.reps = (s.reps || 0) + 1;
      s.correct = (s.correct || 0) + 1;
      if (s.reps === 1) s.interval = CONST.FIRST_INTERVAL;
      else if (s.reps === 2) s.interval = CONST.SECOND_INTERVAL;
      else s.interval = Math.max(1, Math.round(prevInterval * s.ease));
    }
    s.lastReviewed = todayStr;
    s.due = addDays(todayStr, s.interval);
    return s;
  }

  // 採点結果を data に書き込み保存する（quiz から呼ぶ高水準API）
  function applyReview(data, id, grade, todayStr) {
    var next = reviewCard(getCardState(data, id), grade, todayStr);
    if (!data.cards) data.cards = {};
    data.cards[id] = next;
    if (!data.stats) data.stats = { lastSessionDate: null, totalReviews: 0 };
    data.stats.totalReviews = (data.stats.totalReviews || 0) + 1;
    data.stats.lastSessionDate = todayStr;
    saveSrs(data);
    return next;
  }

  // ===== 補助 =====
  function shuffle(arr) { // Fisher-Yates（破壊的）
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  function makeItem(entry, data, todayStr) {
    var isNew = !(data.cards && data.cards[entry.id]);
    return {
      entry: entry,
      direction: Math.random() < 0.5 ? 'word2meaning' : 'meaning2word',
      state: getCardState(data, entry.id),
      isNew: isNew
    };
  }

  // 今日の出題内訳をカウント（入口バッジ・開始画面用）
  function countQueue(entries, data, todayStr) {
    var cards = (data && data.cards) || {};
    var due = 0, fresh = 0;
    (entries || []).forEach(function (e) {
      if (!cards[e.id]) fresh++;
      else if (String(cards[e.id].due) <= todayStr) due++;
    });
    return { due: due, "new": fresh };
  }

  // 次回の復習予定（最小 due とその日に出る語数）。なければ null。
  function nextReview(entries, data, todayStr) {
    var cards = (data && data.cards) || {};
    var dues = (entries || [])
      .filter(function (e) { return cards[e.id] && cards[e.id].due; })
      .map(function (e) { return cards[e.id].due; });
    if (!dues.length) return null;
    dues.sort();
    var min = dues[0];
    return { date: min, count: dues.filter(function (d) { return d === min; }).length };
  }

  // ===== 出題キュー生成 =====
  // options: { sessionLimit, newPerSession, ahead, aheadCount }
  //  - 通常: due 到来語（古い順優先）＋ 新規語を混合してシャッフル
  //  - ahead=true: due が未来の学習済み語を due 昇順に aheadCount 件（前倒し復習）
  function buildQueue(entries, data, todayStr, options) {
    options = options || {};
    var sessionLimit = options.sessionLimit || CONST.SESSION_LIMIT;
    var newPerSession = options.newPerSession != null ? options.newPerSession : CONST.NEW_PER_SESSION;
    var cards = (data && data.cards) || {};
    entries = entries || [];

    if (options.ahead) {
      var aheadCount = options.aheadCount || sessionLimit;
      var studied = entries
        .filter(function (e) { return cards[e.id] && cards[e.id].due; })
        .sort(function (a, b) { return String(cards[a.id].due).localeCompare(String(cards[b.id].due)); })
        .slice(0, aheadCount);
      shuffle(studied);
      return studied.map(function (e) { return makeItem(e, data, todayStr); });
    }

    // due 到来語（古い期限ほど優先するため due 昇順で上限を切る）
    var due = entries
      .filter(function (e) { return cards[e.id] && String(cards[e.id].due) <= todayStr; })
      .sort(function (a, b) { return String(cards[a.id].due).localeCompare(String(cards[b.id].due)); })
      .slice(0, sessionLimit);

    // 新規語（addedAt 新しい順）。残り枠に詰める。
    var remaining = Math.max(0, sessionLimit - due.length);
    var fresh = entries
      .filter(function (e) { return !cards[e.id]; })
      .sort(function (a, b) { return String(b.addedAt || '').localeCompare(String(a.addedAt || '')); })
      .slice(0, Math.min(newPerSession, remaining));

    // グループ内をシャッフルしてから結合（due グループが先頭＝復習優先）
    shuffle(due);
    shuffle(fresh);
    return due.concat(fresh).map(function (e) { return makeItem(e, data, todayStr); });
  }

  // ===== エクスポート =====
  window.SRS = {
    CONST: CONST,
    STORAGE_KEY: STORAGE_KEY,
    today: today,
    addDays: addDays,
    diffDays: diffDays,
    loadSrs: loadSrs,
    saveSrs: saveSrs,
    getCardState: getCardState,
    reviewCard: reviewCard,
    applyReview: applyReview,
    buildQueue: buildQueue,
    countQueue: countQueue,
    nextReview: nextReview
  };
})();
