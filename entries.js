/*
 * 辞書データ本体（自動生成・追記されるファイル）
 *
 * - 単語を声で質問するか `/dict <単語>` を使うと、Claude がこの配列に
 *   新しいエントリを追記します。手で編集しても構いません。
 * - index.html を file:// で直接開いても読めるよう、JSON ではなく
 *   グローバル変数として持っています（CORS 回避）。
 *
 * 1エントリの形:
 * {
 *   id, word, reading, partOfSpeech,
 *   shortMeaning,        // 一覧カード用の1行説明
 *   meaning,             // 詳細用のくわしい説明
 *   examples: [ ... ],   // 使用例（1〜2件）
 *   trivia,              // おもしろ雑学（なければ ""）
 *   tags: [ ... ],       // AI自動分類タグ
 *   isRealThing,         // 実物（植物/動物/モノ）か
 *   image,               // "images/xxx.jpg" or null
 *   imageCredit,         // 画像の帰属・出典URL
 *   source,              // どの本/文脈で出会ったか
 *   addedAt              // 登録日 "YYYY-MM-DD"
 * }
 */
window.DICTIONARY_ENTRIES = [
  {
    id: "2026-06-02-touhonseisou",
    word: "東奔西走",
    reading: "とうほんせいそう",
    partOfSpeech: "四字熟語（名詞・〜する）",
    shortMeaning: "目的のために、あちこち忙しく駆け回ること。",
    meaning: "目的を果たすために、あちこちを忙しく走り回ること。「東に奔（はし）り西に走る」という字の通り、東西＝方々を意味し、休む間もなく動き回るさまを表す。「資金繰りに東奔西走する」のように「〜する」を付けて動詞的にも使う。",
    examples: [
      "開店準備のため、彼は朝から東奔西走している。",
      "被災地の支援に東奔西走する日々が続いた。"
    ],
    trivia: "「奔」も「走」もどちらも『はしる』意味の漢字で、似た意味の字を重ねて『せわしなく走り回る』ことを強調している。「東西」は具体的な方角というより「あちこち・方々」を指す。同じ発想の四字熟語に「南船北馬（なんせんほくば）＝各地を忙しく旅すること」がある。",
    tags: ["四字熟語", "慣用句", "難読"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-zz-localize-test",
    word: "（テスト）画像取り込み確認",
    reading: "てすと",
    partOfSpeech: "名詞",
    shortMeaning: "Action動作確認用の一時エントリ（直後に削除）。",
    meaning: "GitHub Actionのメディア自動取り込みを検証するための使い捨てエントリ。",
    examples: [],
    trivia: "",
    tags: ["テスト"],
    isRealThing: true,
    image: "images/2026-06-02-zz-localize-test.jpg",
    imageCredit: "Wikimedia Commons / Example.jpg",
    source: "",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-casdori",
    word: "キャスドリ",
    reading: "キャスドリ",
    partOfSpeech: "名詞（俗語・略語）",
    shortMeaning: "「キャストドリンク」の略。コンカフェ等で客がキャスト（店員）におごるドリンク。",
    meaning: "コンセプトカフェ（コンカフェ）やガールズバーなどで、客がキャスト（接客スタッフ）のために注文するドリンク、またそれをおごる行為のこと。「キャストドリンク」の略。キャストはそれを飲みながら客と乾杯・会話し、店の「ドリンクバック」制度により売上の一部（相場でキャスドリ代の約20%）が給料に反映される。値段は1杯1,000〜1,500円ほどが一般的。",
    examples: [
      "推しのキャストにキャスドリを入れて乾杯した。",
      "キャスドリを断るときは、やんわり理由を添えると角が立たない。"
    ],
    trivia: "キャストにとっては「ドリンクバック」で収入に直結するため、キャスドリは応援（推し活）の代表的な手段。チェキ（撮影）と並ぶ定番の貢ぎ方で、客がたくさん入れることを俗に「（推しを）太らせる」と言うこともある。",
    tags: ["俗語", "略語", "コンカフェ"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-studs",
    word: "スタッズ",
    reading: "スタッズ（英: studs）",
    partOfSpeech: "名詞",
    shortMeaning: "革製品や衣服に飾りで打ち込む、金属の小さな鋲（びょう）。",
    meaning: "バッグ・靴・ベルト・ジャケットなどに装飾として打ち込む、金属製の小さな鋲（びょう）のこと。半球形やピラミッド型、円錐（スパイク）型などがあり、表面に並べて付けることで、ロックやパンク、ワイルドな雰囲気を演出する。多くは複数形「スタッズ」で使われる。",
    examples: [
      "スタッズが並んだ黒い革ジャンを羽織る。",
      "ベルトにスタッズをあしらってアクセントにした。"
    ],
    trivia: "英語 stud はもともと「飾り鋲・びょう」を指す語で、複数並ぶことから日本では複数形の「スタッズ」で定着した。元は馬具や軍装の補強・装飾に使われた金具で、1970年代のパンク・ロックファッションでトゲ状のスタッズが流行し、反抗の象徴的なアイコンになった。",
    tags: ["ファッション", "装飾", "外来語"],
    isRealThing: true,
    image: "images/studs.jpg",
    imageCredit: "Wikimedia Commons: Studded Belts.jpg (https://commons.wikimedia.org/wiki/File:Studded_Belts.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-celtic-music",
    word: "ケルト音楽",
    reading: "ケルトおんがく",
    partOfSpeech: "名詞",
    shortMeaning: "アイルランドやスコットランドなど、ケルト文化圏に伝わる民族音楽。",
    meaning: "アイルランド、スコットランド、ウェールズ、ブルターニュ（フランス北西部）など、ケルト系の文化圏に伝わる伝統音楽の総称。フィドル（バイオリン）、ティン・ホイッスル、バグパイプ、アイリッシュ・ハープ、バウロン（太鼓）などを用い、軽快な舞曲（ジグやリール）や、もの哀しく叙情的な旋律が特徴。近年は伝統に現代的なアレンジを加えた曲も広く親しまれている。",
    examples: [
      "パブで生演奏のケルト音楽に合わせて足を踏み鳴らした。",
      "映画のサントラに、もの哀しいケルト音楽が流れた。"
    ],
    trivia: "アイルランドの象徴であるアイリッシュ・ハープ（ケルティック・ハープ）は、国の紋章やギネスビールのロゴにも使われている。ケルト音楽の代表的な舞曲「ジグ」と「リール」は拍子（リズム）が異なり、いずれもダンスと深く結びついて発展した。",
    tags: ["音楽", "文化", "外来語"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    audio: "audio/celtic-music.mp3",
    audioCredit: "代表的な曲調の一例: アイリッシュ・ジグ「Swallowtail Jig」より約30秒。演奏: Katy Adelson（CC BY 3.0）／ Wikimedia Commons (https://commons.wikimedia.org/wiki/File:Swallowtail_Jig_-_Irish_Fiddle_Tune!.webm)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-wall-shelf",
    word: "ウォールシェルフ",
    reading: "ウォールシェルフ（英: wall shelf）",
    partOfSpeech: "名詞",
    shortMeaning: "壁に取り付けて使う棚。床に置かず壁面を収納・飾り棚にする。",
    meaning: "壁に直接取り付けて使う棚のこと。床に脚を置かず壁面を利用するため、省スペースで部屋を広く使える。本や小物の収納だけでなく、観葉植物や写真などを飾るディスプレイ用途にも使われる。支えが見えないタイプは「フローティングシェルフ（浮き棚）」とも呼ばれる。",
    examples: [
      "壁にウォールシェルフを付けて、お気に入りの本を並べている。",
      "ウォールシェルフに小さな観葉植物を飾った。"
    ],
    trivia: "「ウォール（wall＝壁）」＋「シェルフ（shelf＝棚）」の組み合わせ。支柱や脚を見せず壁から生えているように見せる「フローティング（浮遊）シェルフ」は、金具を壁の内部や棚板の中に隠して取り付けることで、すっきりした見た目を実現している。",
    tags: ["インテリア", "家具", "外来語"],
    isRealThing: true,
    image: "images/wall-shelf.jpg",
    imageCredit: "Wikimedia Commons: Office attic remodel with floating bookshelves.jpg (https://commons.wikimedia.org/wiki/File:Office_attic_remodel_with_floating_bookshelves.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-maxi-chiffon-skirt",
    word: "マキシ丈シフォンスカート",
    reading: "マキシたけシフォンスカート",
    partOfSpeech: "名詞",
    shortMeaning: "足首〜床近くまで長い、シフォン地（薄く透ける軽い生地）のスカート。",
    meaning: "「マキシ丈（足首〜床に届くほど長い丈）」の「シフォン（薄くて透け感のある軽やかな生地）」でできたスカート。ふんわり揺れるドレープが出て、涼しげで女性らしい印象になる。春夏のコーディネートに使われることが多い。",
    examples: [
      "夏は風になびくマキシ丈シフォンスカートが涼しげで人気だ。",
      "マキシ丈シフォンスカートにスニーカーを合わせて軽快にまとめた。"
    ],
    trivia: "「マキシ」は最大を表す maximum に由来する丈の呼び名で、短い順にミニ＜ひざ丈＜ミモレ（ミディ）＜マキシ と長くなる。「シフォン」はフランス語で『薄い布・ぼろ布』を意味する chiffon が語源で、ふわふわ軽いシフォンケーキも、この生地の質感になぞらえた名前。",
    tags: ["ファッション", "衣服", "外来語"],
    isRealThing: true,
    image: "images/maxi-skirt.jpg",
    imageCredit: "マキシ丈スカートの一例（丈・シルエットの参考。素材はリバティプリント）。Wikimedia Commons: 1970s maxi skirt in Liberty print (https://commons.wikimedia.org/wiki/File:1970s_maxi_skirt_in_Liberty_print,_with_tooled_leather_shoulder_bag_and_black_T-shirt.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-sleeveless-knit",
    word: "ノースリーブニット",
    reading: "ノースリーブニット（no-sleeve + knit）",
    partOfSpeech: "名詞",
    shortMeaning: "袖のない、編み地（ニット）のトップス。",
    meaning: "袖のないニット（編み物）のトップスのこと。「ノースリーブ（袖なし）」＋「ニット（編み地の衣服）」の組み合わせで、肩や腕を出して着る。一枚で着るほか、シャツやカットソーの上に重ねたり、ニットベストのように使ったりもする。春夏や、空調の効いた室内での着回しに使われることが多い。",
    examples: [
      "夏は涼しげなノースリーブニットを一枚で着る。",
      "ブラウスの上にノースリーブニットを重ねた。"
    ],
    trivia: "「ノースリーブ」は英語の no（ない）＋ sleeve（袖）から作られた和製英語で、英語では sleeveless（スリーブレス）と言う。日本では袖の長さを表す言い方として、ノースリーブ／半袖／長袖…と並ぶ定番の語になっている。",
    tags: ["ファッション", "衣服", "和製英語"],
    isRealThing: true,
    image: "images/sleeveless-knit.jpg",
    imageCredit: "ノースリーブのニット（セーターベスト）の一例。Wikimedia Commons: Tanktop2.jpg (https://commons.wikimedia.org/wiki/File:Tanktop2.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-off-white",
    word: "オフホワイト",
    reading: "オフホワイト（英: off-white）",
    partOfSpeech: "名詞",
    shortMeaning: "純白ではなく、わずかに灰色や黄み・クリーム色を帯びた白。",
    meaning: "真っ白（純白）ではなく、ほんの少しグレーや黄みなどの色みを含んだ白の総称。まぶしすぎず落ち着いた印象を与えるため、ファッション・インテリア・塗装などで広く使われる。厳密な一色ではなく近い白の系統を指し、代表的な値はおおよそ #FAF9F6 あたり。",
    examples: [
      "壁を真っ白ではなくオフホワイトに塗ると、空間がやわらかい印象になる。",
      "オフホワイトのシャツは肌なじみがよく、上品に見える。"
    ],
    trivia: "「off-」は『〜から外れた』の意味で、off-white は文字どおり「白から少し外れた色」。純白（ピュアホワイト）はまぶしく硬い印象になりがちなため、写真・印刷・空間デザインでは目にやさしいオフホワイトが好まれる。ウェディングドレスでは白系をピュアホワイト・オフホワイト・アイボリーの3色に分けることが多い。",
    tags: ["色", "外来語", "デザイン"],
    isRealThing: true,
    image: "images/off-white.svg",
    imageCredit: "色見本（オフホワイト ≒ #FAF9F6 ／純白 #FFFFFF との比較）",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-soso",
    word: "楚々",
    reading: "そそ",
    partOfSpeech: "形容動詞（「楚々とした」の形で使う）",
    shortMeaning: "清らかで可憐な、控えめで上品なさま。",
    meaning: "主に女性について、清らかで可憐なさま、慎ましく上品で美しいさまを表す言葉。多く「楚々とした」「楚々として」の形で使われ、派手さはないが凛とした静かな美しさを言い表す。「楚々とした顔」なら、控えめで清楚な印象の顔立ちを指す。",
    examples: [
      "楚々とした立ち居振る舞いに、誰もが目を奪われた。",
      "派手さはないが、楚々とした美しさのある人だ。"
    ],
    trivia: "「楚」はもともと、いばら（とげのある低木）やそれで作った鞭（むち）を表す漢字。中国の古典で草木がすっきり清らかに生えるさまを「楚々」と言ったのが転じて、人の清楚で可憐な様子を表すようになった。「清楚」の「楚」も同じ字である。",
    tags: ["古風な表現", "難読", "形容"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-nibiiro",
    word: "鈍色",
    reading: "にびいろ（にぶいろ）",
    partOfSpeech: "名詞",
    shortMeaning: "青みを帯びた濃い灰色。日本の伝統色のひとつ。",
    meaning: "薄墨より濃い、青みを帯びた暗い灰色を指す日本の伝統色。「にぶいろ」とも読む。平安時代には喪服（凶服）の色として用いられ、悲しみや無常を連想させた。現代でも「鈍色の空（どんよりした曇り空）」のように、重く沈んだ灰色をたとえるのに使われる。色の目安はおおよそ #727171 ほどの濃いグレー。",
    examples: [
      "鈍色の雲が低く垂れこめ、今にも雨が降りそうだ。",
      "彼女は喪に服し、鈍色の衣をまとっていた。"
    ],
    trivia: "平安時代、鈍色は近親者を亡くしたときに着る喪の色で、悲しみが深いほど濃い鈍色を着たという。『源氏物語』などの古典にもしばしば登場する。漢字の「鈍」は刃物などが「にぶい」さまを表し、鮮やかさを欠いたくすんだ色合いをよく言い表している。",
    tags: ["色", "伝統色", "難読"],
    isRealThing: true,
    image: "images/nibiiro.svg",
    imageCredit: "色見本（鈍色 #727171 / 出典: 和色大辞典 colordic.org）",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-unison",
    word: "ユニゾン",
    reading: "ユニゾン（英: unison）",
    partOfSpeech: "名詞",
    shortMeaning: "複数の人や楽器が同じ高さの音を一緒に出すこと。斉唱・斉奏。",
    meaning: "音楽で、複数の声部や楽器が同じ高さ（または1オクターブ違い）の音を同時に演奏・歌唱すること。異なる音を重ねる和音（ハーモニー）と対比され、日本語では声なら「斉唱」、楽器なら「斉奏」にあたる。転じて、複数の人が声や行動をぴたりとそろえることのたとえにも使う。",
    examples: [
      "サビでギターとボーカルがユニゾンで同じ旋律を奏でる。",
      "観客が一斉にユニゾンで歌い上げた。"
    ],
    trivia: "語源はラテン語 unus（ひとつ）＋ sonus（音）で「ひとつの音」。ハモり（ハーモニー）が異なる音を重ねるのに対し、ユニゾンは同じ音を重ねて厚みや一体感を出す。英語の in unison は「声をそろえて／足並みをそろえて」という比喩でも使われる。",
    tags: ["外来語", "音楽", "専門用語"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-hitonouwasa-mo-shichijugonichi",
    word: "人の噂も七十五日",
    reading: "ひとのうわさもしちじゅうごにち",
    partOfSpeech: "慣用句（ことわざ）",
    shortMeaning: "世間の噂も長くは続かず、やがて忘れられるということ。",
    meaning: "人々の関心や世間の噂はせいぜい七十五日ほどで薄れ、いつしか忘れ去られるものだ、ということ。悪い噂を立てられても気に病みすぎる必要はなく、時が解決してくれる、という慰めや励ましの意味で使われる。「人の噂も七十五日」が本来の形。",
    examples: [
      "今は騒がれているが、人の噂も七十五日、じきに皆忘れるさ。",
      "スキャンダルも人の噂も七十五日で、半年後には誰も話題にしていなかった。"
    ],
    trivia: "なぜ「七十五日」なのかには諸説あり、季節がひと巡りする目安の日数に由来するという説や、種をまいてから初物が実るまでのおよその期間になぞらえたという説などがある。要するに「ほどよい月日」を表す象徴的な数字とされる。",
    tags: ["ことわざ", "慣用句", "教訓"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-tatsutori-ato-wo-nigosazu",
    word: "立つ鳥跡を濁さず",
    reading: "たつとりあとをにごさず",
    partOfSpeech: "慣用句（ことわざ）",
    shortMeaning: "立ち去る者は、あとが見苦しくないようきれいに始末すべきだということ。",
    meaning: "水鳥が飛び立ったあとの水辺が濁らず清らかであることから、人も立ち去るときには見苦しくないようきちんと後始末をすべきだ、という戒め。転じて、引き際は潔く美しくあるべきだという意味でも使われる。「立つ鳥跡を濁さず」が本来の形で、末尾の「ず（＝〜しない）」が付くのが正しい。",
    examples: [
      "退職前にデスクを片づけ、立つ鳥跡を濁さずで職場を去った。",
      "立つ鳥跡を濁さずというから、借りた部屋はきれいに掃除して返そう。"
    ],
    trivia: "「立つ鳥」は飛び立つ水鳥のこと。同じ意味で「飛ぶ鳥跡を濁さず」とも言う。逆に、あとのことは気にかけないという正反対の心境を表す言葉に「後は野となれ山となれ」がある。",
    tags: ["ことわざ", "慣用句", "教訓"],
    isRealThing: false,
    image: null,
    imageCredit: "",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-02-hachijojima",
    word: "八丈島",
    reading: "はちじょうじま",
    partOfSpeech: "名詞",
    shortMeaning: "東京都に属する、伊豆諸島南部の温暖な火山島。",
    meaning: "東京の南方海上およそ290kmに位置する、伊豆諸島南部の火山島。東京都八丈町に属する有人離島で、ひょうたん形の島は八丈富士（西山）と三原山（東山）の二つの火山からなる。黒潮の影響で温暖な気候に恵まれ、温泉やダイビング、伝統の絹織物「黄八丈」で知られる。",
    examples: [
      "八丈島へは羽田空港から飛行機で約55分で行ける。",
      "八丈島の海は黒潮が流れ、ダイビングスポットとして人気だ。"
    ],
    trivia: "江戸時代には流刑地（島流しの地）の一つで、多くの罪人が送られた歴史を持つ。一方で黄色を基調とした絹織物「黄八丈（きはちじょう）」の産地として有名で、島名がそのまま織物の名にもなっている。",
    tags: ["地名", "島", "地理"],
    isRealThing: true,
    image: "images/hachijojima.jpg",
    imageCredit: "Wikimedia Commons: Hachijojimaview-fromosakahill-2018-5-7.jpg (https://commons.wikimedia.org/wiki/File:Hachijojimaview-fromosakahill-2018-5-7.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-02"
  },
  {
    id: "2026-06-01-move",
    word: "ムーヴ",
    reading: "ムーヴ（ムーブ／Move）",
    partOfSpeech: "名詞",
    shortMeaning: "ダイハツが製造する軽トールワゴン（背の高い軽自動車）。",
    meaning: "ダイハツ工業が製造する軽自動車（軽トールワゴン）。全高を高くして車内空間を広く取った実用的なハイトワゴンで、スズキ・ワゴンRのライバルとして人気を集めた。1995年に登場し、2023年にいったん生産を終了、2025年に復活した。「ムーブ」とも表記される。",
    examples: [
      "近所の買い物にはムーヴがちょうどいい。",
      "ムーヴは天井が高くて荷物が積みやすい。"
    ],
    trivia: "車名の「Move」は英語の『動く・移動する』から。小型車ミラのシャシーをベースに車高を高くして作られ、初代のデザインはイタリアのデザイン会社が手がけたとされる。ワゴンRが開拓した『背の高い軽自動車』市場で、ダイハツの主力車種として長く親しまれた。",
    tags: ["自動車", "乗り物", "商品名"],
    isRealThing: true,
    image: "images/move.jpg",
    imageCredit: "Wikimedia Commons: Daihatsu Move Custom RS Turbo.JPG (https://commons.wikimedia.org/wiki/File:Daihatsu_Move_Custom_RS_Turbo.JPG)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-01"
  },
  {
    id: "2026-06-01-concourse",
    word: "コンコース",
    reading: "コンコース（英: concourse）",
    partOfSpeech: "名詞",
    shortMeaning: "駅・空港などにある、人が行き交う広い通路・中央広場。",
    meaning: "駅や空港、競技場などの建物内で、大勢の人が通行・集合するために設けられた広々とした空間や中央通路のこと。改札口とホームをつなぐ広場や、複数の通路・出入口が集まる開けた場所を指すことが多い。",
    examples: [
      "待ち合わせは駅のコンコースにある時計の下にしよう。",
      "空港のコンコースは出発を待つ人でにぎわっていた。"
    ],
    trivia: "語源はラテン語 concursus（com-「共に」＋ currere「走る」＝ともに走り集まること）。英語の concur（同意する）や current（流れ）と同じ語根で、『人々が流れ集まる場所』という原義がそのまま空間の呼び名になった。",
    tags: ["外来語", "建築", "交通"],
    isRealThing: true,
    image: "images/concourse.jpg",
    imageCredit: "Wikimedia Commons: Leeds City railway station concourse.jpg (https://commons.wikimedia.org/wiki/File:Leeds_City_railway_station_concourse.jpg)",
    source: "死んだら永遠に休めます",
    addedAt: "2026-06-01"
  }
];
