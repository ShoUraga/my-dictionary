/* ===== マイ辞書 — 単語テスト（フラッシュカード）の Alpine コンポーネント ===== */
/*
 * 既存の dictionary コンポーネントとは独立。window.DICTIONARY_ENTRIES を直接読むので
 * 検索やタグ絞り込みの状態に影響されず、常に全語が学習対象になる。
 * SRS ロジック（出題キュー・採点・保存）は srs.js（window.SRS）に委譲する。
 */
document.addEventListener('alpine:init', () => {
  Alpine.data('quiz', () => ({
    entries: [],
    data: null,              // 現在の SRS データ（loadSrs の結果）

    open: false,
    screen: 'start',         // 'start' | 'card' | 'summary'
    ahead: false,            // 前倒し復習モードか（文言切り替え用）

    queue: [],
    index: 0,
    showAnswer: false,
    session: { good: 0, again: 0, reviewed: 0, newCount: 0 },

    // 入口バッジ・開始画面・サマリー用の集計
    dueCount: 0,
    newCount: 0,
    nextReviewInfo: null,    // { date, count } or null

    init() {
      this.entries = Array.isArray(window.DICTIONARY_ENTRIES) ? window.DICTIONARY_ENTRIES : [];
      this.data = window.SRS ? window.SRS.loadSrs() : null;
      this.refreshCounts();
      // Esc でテストを閉じる（辞書側の Esc と共存。open のときだけ反応）
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.open) this.closeQuiz();
      });
    },

    // ----- 算出 -----
    get current() {
      return this.queue[this.index] || null;
    },

    get accuracy() {
      const total = this.session.good + this.session.again;
      return total ? Math.round((this.session.good / total) * 100) : 0;
    },

    // 今回のキューに実際入った内訳（開始画面の表示用）
    get queueNew() {
      return this.queue.filter((it) => it.isNew).length;
    },
    get queueDue() {
      return this.queue.length - this.queueNew;
    },

    // ----- 集計の更新（バッジ・開始画面・サマリー） -----
    refreshCounts() {
      if (!window.SRS) return;
      const d = this.data || window.SRS.loadSrs();
      const c = window.SRS.countQueue(this.entries, d, window.SRS.today());
      this.dueCount = c.due;
      this.newCount = c['new'];
      this.nextReviewInfo = window.SRS.nextReview(this.entries, d, window.SRS.today());
    },

    // ----- セッション開始 -----
    start() {
      if (!window.SRS) return;
      this.data = window.SRS.loadSrs();
      this.queue = window.SRS.buildQueue(this.entries, this.data, window.SRS.today());
      this.ahead = false;
      this.session = { good: 0, again: 0, reviewed: 0, newCount: 0 };
      this.refreshCounts();
      this.index = 0;
      this.showAnswer = false;
      this.screen = 'start';
      this.open = true;
      document.body.style.overflow = 'hidden';
    },

    // 開始画面の「はじめる」
    begin() {
      if (!this.queue.length) return;
      this.screen = 'card';
      this.index = 0;
      this.showAnswer = false;
    },

    // 今日の復習がないときの「前倒し復習」（due が近い学習済み語をまとめて出す）
    practiceAhead() {
      if (!window.SRS) return;
      this.data = window.SRS.loadSrs();
      this.queue = window.SRS.buildQueue(this.entries, this.data, window.SRS.today(), {
        ahead: true,
        aheadCount: 10
      });
      this.ahead = true;
      this.session = { good: 0, again: 0, reviewed: 0, newCount: 0 };
      if (!this.queue.length) return;
      this.index = 0;
      this.showAnswer = false;
      this.screen = 'card';
    },

    // ----- カード操作 -----
    flip() {
      this.showAnswer = true;
    },

    grade(g) { // 'good' | 'again'
      const item = this.current;
      if (!item || !window.SRS) return;
      window.SRS.applyReview(this.data, item.entry.id, g, window.SRS.today());
      this.session[g] = (this.session[g] || 0) + 1;
      this.session.reviewed++;
      if (item.isNew) this.session.newCount++;
      this.next();
    },

    next() {
      if (this.index < this.queue.length - 1) {
        this.index++;
        this.showAnswer = false;
      } else {
        this.refreshCounts(); // 次回復習日を最新化
        this.screen = 'summary';
      }
    },

    closeQuiz() {
      this.open = false;
      this.screen = 'start';
      this.data = window.SRS ? window.SRS.loadSrs() : this.data;
      this.refreshCounts();
      document.body.style.overflow = '';
    },

    // ----- 表示ヘルパー -----
    fmtMD(dateStr) {
      if (!dateStr) return '';
      const p = String(dateStr).split('-');
      return Number(p[1]) + '/' + Number(p[2]);
    }
  }));
});
