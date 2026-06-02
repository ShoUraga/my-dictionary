/* ===== マイ辞書 — ビューアのロジック（Alpine.js） ===== */

document.addEventListener('alpine:init', () => {
  Alpine.data('dictionary', () => ({
    entries: Array.isArray(window.DICTIONARY_ENTRIES) ? window.DICTIONARY_ENTRIES : [],
    query: '',
    sort: 'newest',
    activeTags: [],
    selected: null,

    init() {
      // 読み込み中フォールバックを隠す
      const fb = document.getElementById('loading-fallback');
      if (fb) fb.style.display = 'none';

      // ?word=... が付いていれば該当語の詳細を自動で開く（コマンドからの導線用）
      const target = new URLSearchParams(location.search).get('word');
      if (target) {
        const hit = this.entries.find(e => e.word === target || e.id === target);
        if (hit) this.openDetail(hit);
      }

      // Esc で詳細を閉じる
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') this.closeDetail();
      });
    },

    // 全エントリに登場するタグ一覧（重複なし）
    get allTags() {
      const set = new Set();
      this.entries.forEach(e => (e.tags || []).forEach(t => set.add(t)));
      return Array.from(set).sort((a, b) => a.localeCompare(b, 'ja'));
    },

    toggleTag(tag) {
      const i = this.activeTags.indexOf(tag);
      if (i === -1) this.activeTags.push(tag);
      else this.activeTags.splice(i, 1);
    },

    // 検索＋タグ絞り込み＋並び替え
    get filtered() {
      const q = this.query.trim().toLowerCase();
      let list = this.entries.filter(e => {
        // タグ絞り込み（選択タグをすべて含む）
        if (this.activeTags.length > 0) {
          const tags = e.tags || [];
          if (!this.activeTags.every(t => tags.includes(t))) return false;
        }
        // フリーワード検索
        if (q) {
          const haystack = [
            e.word, e.reading, e.shortMeaning, e.meaning, e.source,
            (e.tags || []).join(' '),
            (e.examples || []).join(' ')
          ].filter(Boolean).join(' ').toLowerCase();
          if (!haystack.includes(q)) return false;
        }
        return true;
      });

      const byDate = (a, b) => String(a.addedAt || '').localeCompare(String(b.addedAt || ''));
      if (this.sort === 'newest') list = [...list].sort((a, b) => byDate(b, a));
      else if (this.sort === 'oldest') list = [...list].sort(byDate);
      else if (this.sort === 'kana') {
        list = [...list].sort((a, b) =>
          String(a.reading || a.word).localeCompare(String(b.reading || b.word), 'ja'));
      }
      return list;
    },

    openDetail(entry) {
      this.selected = entry;
      document.body.style.overflow = 'hidden';
    },

    closeDetail() {
      this.selected = null;
      document.body.style.overflow = '';
    }
  }));
});
