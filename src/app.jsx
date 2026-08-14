const { useState, useEffect, useMemo } = React;
const POSITIONS = ["GK","CB","LFB","RFB","DM","LM","RM","AM","LW","RW","CF"];
const POLICIES = ['カウンター', 'ムービング', 'ポゼッション', 'リアクション'];
const RARITIES = ['☆3', '☆3+', '☆3++', '☆4', '☆4+', '☆4++', '☆5'];
const PLAY_STYLE_LEVELS = ["Ⅰ","Ⅱ","Ⅲ"];
const PLAY_STYLES = [
  "オーソドックスGK",
  "スイーパーGK",
  "ストッパー",
  "組立CB",
  "スプリントCB",
  "守備的LFB",
  "守備的RFB",
  "攻撃的LFB",
  "攻撃的RFB",
  "ハードマーカー",
  "セントラルDM",
  "パサーDM",
  "ドリブラーLM",
  "サイドアタッカーLM",
  "ドリブラーRM",
  "サイドアタッカーRM",
  "セントラルAM",
  "パサーAM",
  "アタッカー",
  "ドリブラーLW",
  "サイドアタッカーLW",
  "ワイドストライカーLW",
  "ドリブラーRW",
  "サイドアタッカーRW",
  "ワイドストライカーRW",
  "ポストプレーヤー",
  "ラインブレーカー",
  "ストライカー"
];
const INITIAL_PLAYERS = window.INITIAL_PLAYERS || [];
const INITIAL_MANAGERS = window.INITIAL_MANAGERS || [];
const INITIAL_COMBOS = window.INITIAL_COMBOS || [];

const YOUTUBE_VIDEOS = [
  {
    id: "3cWmdX7SO9g",
    title: "【私は引きません】ポリシーガチャ襲来！スルーか引くべきか徹底的に解説します【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/3cWmdX7SO9g/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=3cWmdX7SO9g"
  },
  {
    id: "TW5ffHOwVho",
    title: "【みんなは買う?】新特練SSR佐藤寿人、徹底解説！これは本当に必要なカードですか？【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/TW5ffHOwVho/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=TW5ffHOwVho"
  },
  {
    id: "-ML6aziQT8A",
    title: "【引く前に見て】新ガチャ徹底解説！得点王が勢揃いしたJリーグガチャ。あなたは引きますか？【サカつく2026】レオ・セアラ、山岸祐也、山田寛人、泉柊椰、山本桜大、田村翔太、土信田悠生",
    thumbnail: "https://i.ytimg.com/vi/-ML6aziQT8A/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=-ML6aziQT8A"
  },
  {
    id: "rKvTMErnm7E",
    title: "【質問歓迎】虹アビリティは欲しいよね。限定特練カードガチャ200連まつり【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/rKvTMErnm7E/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=rKvTMErnm7E"
  },
  {
    id: "Nk9fShVZ1sI",
    title: "【引く前に見て】新ガチャ徹底解説！虹アビリティ登場。新特練SSRがすごい【サカつく2026】ペレ、アラウホ、ジョーダン・ヘンダーソン、カンセロ",
    thumbnail: "https://i.ytimg.com/vi/Nk9fShVZ1sI/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Nk9fShVZ1sI"
  },
  {
    id: "9ZWQtijxVVM",
    title: "【質問歓迎】能力を比較できるアプリを開発中。皆さんの協力が必要なので力を貸してください【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/9ZWQtijxVVM/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=9ZWQtijxVVM"
  },
  {
    id: "B7wgP9c6dyQ",
    title: "【質問歓迎】ブラジル人4人衆を育成して使ってみましょう【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/B7wgP9c6dyQ/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=B7wgP9c6dyQ"
  },
  {
    id: "Bw9Xk-aqn5Q",
    title: "【質問歓迎】物議を醸している限定ブラジル人ガチャ、370連祭り開催のお知らせ【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/Bw9Xk-aqn5Q/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=Bw9Xk-aqn5Q"
  },
  {
    id: "L6wiFTj1-_I",
    title: "【引く前に見て】限定ガチャ徹底解説！物議を醸すリアクション大強化時代突入【サカつく2026】ギマランイス、ハフィーニャ、ロドリゴ、ブレーメル",
    thumbnail: "https://i.ytimg.com/vi/L6wiFTj1-_I/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=L6wiFTj1-_I"
  },
  {
    id: "q0ShrPT_r0Y",
    title: "【質問歓迎】能力を比較できるアプリを開発中。皆さんの協力が必要なので力を貸してください【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/q0ShrPT_r0Y/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=q0ShrPT_r0Y"
  },
  {
    id: "pqmcNKbWNyo",
    title: "【衝撃】GKにベルベットフィードを覚えさせてみた結果をご報告いたします【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/pqmcNKbWNyo/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=pqmcNKbWNyo"
  },
  {
    id: "CPTyoW1aIEc",
    title: "【質問歓迎】完凸ブラジルトリオを育成していきます(2回目)【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/CPTyoW1aIEc/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=CPTyoW1aIEc"
  },
  {
    id: "unixgXGcOco",
    title: "【初心者必見】リアルタイム対戦のコツ『1VS1』徹底解説【サカつく2026】　駆け引きのポイント、数値の秘密、最重要項目、豪華報酬など",
    thumbnail: "https://i.ytimg.com/vi/unixgXGcOco/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=unixgXGcOco"
  },
  {
    id: "smq93QdtPkY",
    title: "【質問歓迎】完凸ブラジルトリオを育成していきます(2回目)【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/smq93QdtPkY/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=smq93QdtPkY"
  },
  {
    id: "19dFH-F1fyA",
    title: "【ぶっ壊れ】新フォメコン、『セレソン’70』徹底人選解説【サカつく2026】ペレ育成方法、ブラジル人選手、ポジション別ランキングなど",
    thumbnail: "https://i.ytimg.com/vi/19dFH-F1fyA/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=19dFH-F1fyA"
  }
];

const AFFILIATE_ADS = [
  {
    id: "rakuten_user_1",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/56933d29.f3516166.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MTY3NDAyLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/56933d29.f3516166.569332c7.ce1aeeb3/?me_id=2101008&me_adv_id=167402&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_2",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/56933dec.4e256677.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIxIiwiYmFuIjo6NzM4MDUsImFtcCI6ZmFsc2V9" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/56933dec.4e256677.569332c7.ce1aeeb3/?me_id=2101032&me_adv_id=673805&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_3",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/5693335b.1cabcc4e.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiI8NSIsImJhbiI6MTQzNDI2NSwiYW1wIjpmYWxzZX0%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/5693335b.1cabcc4e.569332c7.ce1aeeb3/?me_id=1&me_adv_id=1434265&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_4",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/56934416.e8681afe.569332c7.ce1aeeb3/?link_type=pict&rafst=rmn&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MjM3Nzg5NiwiYW1wIjpmYWxzZX0%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/56934416.e8681afe.569332c7.ce1aeeb3/?me_id=2101065&me_adv_id=2377896&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_5",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/56933f77.437320c8.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MjMwMjg5NSwiYW1wIjpmYWxzZX0%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/56933f77.437320c8.569332c7.ce1aeeb3/?me_id=2101061&me_adv_id=2302895&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_6",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/569345bd.2285d5fa.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOjEsImJhbiI6MjEzODQyNiwiYW1wIjpmYWxzZX0%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/569345bd.2285d5fa.569332c7.ce1aeeb3/?me_id=2101064&me_adv_id=2138426&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_7",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569348ca.add96354.569348cb.d247976b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhhh-style%2Ff980%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/569348ca.add96354.569348cb.d247976b/?me_id=1312968&item_id=10030243&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fhhh-style%2Fcabinet%2F60204%2Ff980-1.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/569348ca.add96354.569348cb.d247976b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhhh-style%2Ff980%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">2026SS新作 UVカットパーカー つば付き</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569348ca.add96354.569348cb.d247976b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fhhh-style%2Ff980%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_8",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56934b82.b6aad5f9.56934b83.c5e00d8c/?me_id=1399277&item_id=10002614&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fdji-shop%2Fcabinet%2Fbnr%2F6937224133082_t.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">DJI Osmo Pocket 4 クリエイターコンボ</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_9",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934c6a.299fede4.56934c6b.cb46746b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fvenex-j%2F8611%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56934c6a.299fede4.56934c6b.cb46746b/?me_id=1385473&item_id=10000447&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fvenex-j%2Fcabinet%2F08813271%2F08819837%2Fkyuyo_ponch_ol.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934c6a.299fede4.56934c6b.cb46746b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fvenex-j%2F8611%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">【ポイント10倍】ベネクス リカバリーウェア VENEX</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934c6a.299fede4.56934c6b.cb46746b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fvenex-j%2F8611%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_10",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934fa0.48f1fa77.56934fa1.27f40ee1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnext-at%2Foth-me-jk-1542-2%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56934fa0.48f1fa77.56934fa1.27f40ee1/?me_id=1365926&item_id=10003112&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fnext-at%2Fcabinet%2Fsyouhin8%2F1542-26ss.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934fa0.48f1fa77.56934fa1.27f40ee1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnext-at%2Foth-me-jk-1542-2%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">セットアップ UVカット95% 洗えるスーツ</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934fa0.48f1fa77.56934fa1.27f40ee1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fnext-at%2Foth-me-jk-1542-2%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_12",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569351c5.d6e14103.569351c6.ab760e7c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fesports%2F6000000145999%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/569351c5.d6e14103.569351c6.ab760e7c/?me_id=1192233&item_id=11595787&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fesports%2Fcabinet%2F6000-202%2F6000000145999.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/569351c5.d6e14103.569351c6.ab760e7c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fesports%2F6000000145999%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">サッカー日本代表 2026 レプリカ ユニフォーム</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569351c5.d6e14103.569351c6.ab760e7c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fesports%2F6000000145999%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_13",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693545f.c98bc76b.56935460.b107cdc1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffootball-life%2Farg2018hjm10jr%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/5693545f.c98bc76b.56935460.b107cdc1/?me_id=1240480&item_id=10003990&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Ffootball-life%2Fcabinet%2Frakuup%2Frakuup1%2Fr1323_0813_0021.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693545f.c98bc76b.56935460.b107cdc1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffootball-life%2Farg2018hjm10jr%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">アルゼンチン代表 メッシ ホーム ユニフォーム</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693545f.c98bc76b.56935460.b107cdc1/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Ffootball-life%2Farg2018hjm10jr%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_14",
    badge: "楽天 PR",
    htmlCode: `<a href="https://hb.afl.rakuten.co.jp/hsc/569354a6.5664c2ff.569332c7.ce1aeeb3/?link_type=pict&ut=eyJwYWdlIjoic2hvcCIsInR5cGUiOiJwaWN0IiwiY29sIjoxLCJjYXQiOiIxIiwiYmFuIjoyMTg8NjQ3LCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hsb/569354a6.5664c2ff.569332c7.ce1aeeb3/?me_id=2100001&me_adv_id=2188647&t=pict" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:12px;" alt="" title=""></a>`
  },
  {
    id: "rakuten_user_15",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935549.b8fa1385.5693554a.a4fbe38b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmundial%2F90003899%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56935549.b8fa1385.5693554a.a4fbe38b/?me_id=1258767&item_id=10006491&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fmundial%2Fcabinet%2Fimg09%2F2018-10101.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935549.b8fa1385.5693554a.a4fbe38b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmundial%2F90003899%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">クリスティアーノ・ロナウド Tシャツ</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935549.b8fa1385.5693554a.a4fbe38b/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fmundial%2F90003899%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_18",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935817.368d4b42.56935818.53ddee2c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Falldocube%2Fiplay80miniturbo%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56935817.368d4b42.56935818.53ddee2c/?me_id=1425378&item_id=10000113&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Falldocube%2Fcabinet%2F13643959%2F13646210%2F1-4.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935817.368d4b42.56935818.53ddee2c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Falldocube%2Fiplay80miniturbo%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">ALLDOCUBE iPlay 80 mini Turbo タブレット 8.8インチ</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56935817.368d4b42.56935818.53ddee2c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Falldocube%2Fiplay80miniturbo%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_19",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693588d.d1a7584c.5693588e.7adb3382/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpremiumgift%2Fn3350%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/5693588d.d1a7584c.5693588e.7adb3382/?me_id=1390924&item_id=10000010&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fpremiumgift%2Fcabinet%2F08670126%2F14q8h-main-2.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693588d.d1a7584c.5693588e.7adb3382/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpremiumgift%2Fn3350%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">【新品】第13世代CPU搭載 Office付き 14.1型 ノートPC</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693588d.d1a7584c.5693588e.7adb3382/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpremiumgift%2Fn3350%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_20",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693591d.8f95d4d4.5693591e.ad3960e3/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpasodon%2Fam4gaming-t3%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/5693591d.8f95d4d4.5693591e.ad3960e3/?me_id=1402356&item_id=10001496&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fpasodon%2Fcabinet%2F13009718%2F15_46_38.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693591d.8f95d4d4.5693591e.ad3960e3/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpasodon%2Fam4gaming-t3%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">構成が選べる！Ryzen7/5 ゲーミングPC</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693591d.8f95d4d4.5693591e.ad3960e3/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fpasodon%2Fam4gaming-t3%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_21",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693592f.e55ca924.56935930.6adc2289/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkrdirect%2Fgaming_blacktower_r_gtx960_i5_mn%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/5693592f.e55ca924.56935930.6adc2289/?me_id=1396705&item_id=10001716&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fkrdirect%2Fcabinet%2Fdesk%2Fgaming%2Fg_monitor_n_gkm1060b.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693592f.e55ca924.56935930.6adc2289/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkrdirect%2Fgaming_blacktower_r_gtx960_i5_mn%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">PASOUL 煌 ゲーミングPC 22型液晶モニター付</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/5693592f.e55ca924.56935930.6adc2289/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fkrdirect%2Fgaming_blacktower_r_gtx960_i5_mn%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_22",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569359af.83f22ae0.569359b0.62cb3116/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsvitoo-direct-store%2F1119tp11%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/569359af.83f22ae0.569359b0.62cb3116/?me_id=1436979&item_id=10000002&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fsvitoo-direct-store%2Fcabinet%2F12874258%2F12995716%2F12995720%2F00-1.jpg%3F_ex%3D240x240&s=240x240&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/569359af.83f22ae0.569359b0.62cb3116/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsvitoo-direct-store%2F1119tp11%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">【楽天1位】Android 16 タブレット 11インチ 20GB+128GB</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/569359af.83f22ae0.569359b0.62cb3116/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fsvitoo-direct-store%2F1119tp11%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIyNDB4MjQwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "rakuten_user_23",
    badge: "楽天 PR",
    htmlCode: `<script type="text/javascript">rakuten_design="slide";rakuten_affiliateId="139121d6.f8fc7b1a.139121d7.8db230fc";rakuten_items="ctsmatch";rakuten_genreId="0";rakuten_size="250x250";rakuten_target="_blank";rakuten_theme="gray";rakuten_border="off";rakuten_auto_mode="on";rakuten_genre_title="off";rakuten_recommend="on";rakuten_ts="1786728392098";</script><script type="text/javascript" src="https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106"></script>`
  },
  {
    id: "rakuten_user_25",
    badge: "楽天 PR",
    htmlCode: `<script type="text/javascript">rakuten_design="slide";rakuten_affiliateId="139121d6.f8fc7b1a.139121d7.8db230fc";rakuten_items="ctsmatch";rakuten_genreId="0";rakuten_size="250x250";rakuten_target="_blank";rakuten_theme="gray";rakuten_border="off";rakuten_auto_mode="on";rakuten_genre_title="off";rakuten_recommend="off";rakuten_ts="1786728704019";</script><script type="text/javascript" src="https://xml.affiliate.rakuten.co.jp/widget/js/rakuten_widget.js?20230106"></script>`
  },
  {
    id: "amazon_user_26",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/black-curtain/heated-tobacco-black-curtain?ie=UTF8&returnUrl=%2Fdp%2FB0F58PLXZ7&linkCode=ll2&tag=nekonira-22&linkId=df91a68fac728854f068fef171312d8f&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.SMOLESS_A1_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="一本で二回吸える！BLACK CURTAIN 加熱式タバコ デバイス" title="BLACK CURTAIN 加熱式タバコ デバイス"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/black-curtain/heated-tobacco-black-curtain?ie=UTF8&returnUrl=%2Fdp%2FB0F58PLXZ7&linkCode=ll2&tag=nekonira-22&linkId=df91a68fac728854f068fef171312d8f&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">一本で二回吸える！BLACK CURTAIN 加熱式タバコ デバイス</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/black-curtain/heated-tobacco-black-curtain?ie=UTF8&returnUrl=%2Fdp%2FB0F58PLXZ7&linkCode=ll2&tag=nekonira-22&linkId=df91a68fac728854f068fef171312d8f&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_27",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/%E3%80%901%E6%9C%AC%E3%81%A72%E5%9B%9E%E5%90%B8%E3%81%88%E3%82%8B%E3%80%91Fasoul-%E3%83%95%E3%82%A1%E3%82%BD%E3%82%A6%E3%83%AB-%E5%8A%A0%E7%86%B1%E5%BC%8F%E3%81%9F%E3%81%B0%E3%81%93%E4%BA%92%E6%8F%9B%E6%A9%9F-%E6%9C%AC%E4%BD%93%EF%BD%9C%E3%83%86%E3%83%AA%E3%82%A2%E3%83%BB%E3%82%BB%E3%83%B3%E3%83%86%E3%82%A3%E3%82%A2%E5%AF%BE%E5%BF%9C%EF%BD%9C%E3%83%95%E3%83%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E6%B6%B2%E6%99%B6%E6%90%AD%E8%BC%89%EF%BD%9CIQOS%E3%82%A4%E3%83%AB%E3%83%9E%E4%BA%92%E6%8F%9B-%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF/dp/B0DRYMYYDH?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1MVS22IV7LODW&dib=eyJ2IjoiMSJ9.mXEDnTRopOTpbe7Z4XAdQdacsjWbwX7cLsnrwb8IJENvu4OGl4E2pR9vDfwaAqdYSPAK_R7IIAAbhFgOclFA1uqd-tWFJhxRkWpY1Nktw9Mt5hZS3CezUkzkEy3T33MXz_q0WEbgs8Rz830G3JXbBlCireCMyuQpjr23onAyzNCg5LdOTjv33_lLSMdK8mZbqvlOPASjIqAsvwySRjorttzXIjg6aVtXY2LPIN90fjkZJNcBcS00OZwsRr2B5wOm9DFEsmMZfERFvWvA7raIv_g8N2rTzuWEubZGMcW3XyE.2NB5tBfJg-TtSY47Glonl_PUYzmWCXFAI0CGdC01bsU&dib_tag=se&keywords=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%E4%BA%92%E6%8F%9B%E6%A9%9F&qid=1786730093&sprefix=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%2B%E4%BA%92%E6%8F%9B%E6%A9%9F%2Caps%2C187&sr=8-3&th=1&linkCode=ll2&tag=nekonira-22&linkId=e1576813e8795f19b0c3cb190458d3c8&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.FASOUL_Q1_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="1本で2回吸える Fasoul Q1 アイコス イルマ互換機" title="Fasoul Q1 アイコス イルマ互換機"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/%E3%80%901%E6%9C%AC%E3%81%A72%E5%9B%9E%E5%90%B8%E3%81%88%E3%82%8B%E3%80%91Fasoul-%E3%83%95%E3%82%A1%E3%82%BD%E3%82%A6%E3%83%AB-%E5%8A%A0%E7%86%B1%E5%BC%8F%E3%81%9F%E3%81%B0%E3%81%93%E4%BA%92%E6%8F%9B%E6%A9%9F-%E6%9C%AC%E4%BD%93%EF%BD%9C%E3%83%86%E3%83%AA%E3%82%A2%E3%83%BB%E3%82%BB%E3%83%B3%E3%83%86%E3%82%A3%E3%82%A2%E5%AF%BE%E5%BF%9C%EF%BD%9C%E3%83%95%E3%83%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E6%B6%B2%E6%99%B6%E6%90%AD%E8%BC%89%EF%BD%9CIQOS%E3%82%A4%E3%83%AB%E3%83%9E%E4%BA%92%E6%8F%9B-%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF/dp/B0DRYMYYDH?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1MVS22IV7LODW&dib=eyJ2IjoiMSJ9.mXEDnTRopOTpbe7Z4XAdQdacsjWbwX7cLsnrwb8IJENvu4OGl4E2pR9vDfwaAqdYSPAK_R7IIAAbhFgOclFA1uqd-tWFJhxRkWpY1Nktw9Mt5hZS3CezUkzkEy3T33MXz_q0WEbgs8Rz830G3JXbBlCireCMyuQpjr23onAyzNCg5LdOTjv33_lLSMdK8mZbqvlOPASjIqAsvwySRjorttzXIjg6aVtXY2LPIN90fjkZJNcBcS00OZwsRr2B5wOm9DFEsmMZfERFvWvA7raIv_g8N2rTzuWEubZGMcW3XyE.2NB5tBfJg-TtSY47Glonl_PUYzmWCXFAI0CGdC01bsU&dib_tag=se&keywords=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%E4%BA%92%E6%8F%9B%E6%A9%9F&qid=1786730093&sprefix=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%2B%E4%BA%92%E6%8F%9B%E6%A9%9F%2Caps%2C187&sr=8-3&th=1&linkCode=ll2&tag=nekonira-22&linkId=e1576813e8795f19b0c3cb190458d3c8&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">【1本で2回吸える】Fasoul Q1 アイコス イルマ互換機</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/%E3%80%901%E6%9C%AC%E3%81%A72%E5%9B%9E%E5%90%B8%E3%81%88%E3%82%8B%E3%80%91Fasoul-%E3%83%95%E3%82%A1%E3%82%BD%E3%82%A6%E3%83%AB-%E5%8A%A0%E7%86%B1%E5%BC%8F%E3%81%9F%E3%81%B0%E3%81%93%E4%BA%92%E6%8F%9B%E6%A9%9F-%E6%9C%AC%E4%BD%93%EF%BD%9C%E3%83%86%E3%83%AA%E3%82%A2%E3%83%BB%E3%82%BB%E3%83%B3%E3%83%86%E3%82%A3%E3%82%A2%E5%AF%BE%E5%BF%9C%EF%BD%9C%E3%83%95%E3%83%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%B3%E6%B6%B2%E6%99%B6%E6%90%AD%E8%BC%89%EF%BD%9CIQOS%E3%82%A4%E3%83%AB%E3%83%9E%E4%BA%92%E6%8F%9B-%E3%83%96%E3%83%A9%E3%83%83%E3%82%AF/dp/B0DRYMYYDH?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1MVS22IV7LODW&dib=eyJ2IjoiMSJ9.mXEDnTRopOTpbe7Z4XAdQdacsjWbwX7cLsnrwb8IJENvu4OGl4E2pR9vDfwaAqdYSPAK_R7IIAAbhFgOclFA1uqd-tWFJhxRkWpY1Nktw9Mt5hZS3CezUkzkEy3T33MXz_q0WEbgs8Rz830G3JXbBlCireCMyuQpjr23onAyzNCg5LdOTjv33_lLSMdK8mZbqvlOPASjIqAsvwySRjorttzXIjg6aVtXY2LPIN90fjkZJNcBcS00OZwsRr2B5wOm9DFEsmMZfERFvWvA7raIv_g8N2rTzuWEubZGMcW3XyE.2NB5tBfJg-TtSY47Glonl_PUYzmWCXFAI0CGdC01bsU&dib_tag=se&keywords=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%E4%BA%92%E6%8F%9B%E6%A9%9F&qid=1786730093&sprefix=%E3%82%A2%E3%82%A4%E3%82%B3%E3%82%B9%2B%E4%BA%92%E6%8F%9B%E6%A9%9F%2Caps%2C187&sr=8-3&th=1&linkCode=ll2&tag=nekonira-22&linkId=e1576813e8795f19b0c3cb190458d3c8&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_28",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/%E9%81%B8%E3%81%B0%E3%82%8C%E3%81%AA%E3%81%8B%E3%81%A3%E3%81%9F%E5%83%95%E3%81%AE%E6%88%A6%E3%81%84%E6%96%B9-%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%E6%B7%B3%E4%B8%80/dp/4799332872?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2CELWWX3EENS6&dib=eyJ2IjoiMSJ9.U6ZDn9V4rnt5WcU9glXMm7zvcxoXmeQOiaGjT_wBXax2NpieoE9B9nAU11rR_nbvvd2ugUi6Wp0VW3YU_4CDH5uYD7kR3JtQ0Bnwo_XZNPRAc_KIDuWPtwAP8hjtJoqgMgPdTL1kmp4HX4Wqdkq_hXUv2ZDRSpvMQ7Q2UjHymJgCbUz-Ib0E1z1dvFxA1hJJIDGJsS3v5az5tETXhrzfpG1aO_1zQMBUREHiESrG0Gft0gM3RhgBVQ8n5AOgQXgJ.qCXwt1HvQvtJoT5ZFAeYWEnvQGOajoRm6MOVL2wBKmw&dib_tag=se&keywords=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD&qid=1786730352&sprefix=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%2Cspecialty-aps%2C158&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=6a5ef973866b5a94c492e292f5828db3&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.TANAKA_PAULO_BOOK_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="【書籍】選ばれなかった僕の戦い方 田中パウロ淳一" title="選ばれなかった僕の戦い方 田中パウロ淳一"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/%E9%81%B8%E3%81%B0%E3%82%8C%E3%81%AA%E3%81%8B%E3%81%A3%E3%81%9F%E5%83%95%E3%81%AE%E6%88%A6%E3%81%84%E6%96%B9-%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%E6%B7%B3%E4%B8%80/dp/4799332872?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2CELWWX3EENS6&dib=eyJ2IjoiMSJ9.U6ZDn9V4rnt5WcU9glXMm7zvcxoXmeQOiaGjT_wBXax2NpieoE9B9nAU11rR_nbvvd2ugUi6Wp0VW3YU_4CDH5uYD7kR3JtQ0Bnwo_XZNPRAc_KIDuWPtwAP8hjtJoqgMgPdTL1kmp4HX4Wqdkq_hXUv2ZDRSpvMQ7Q2UjHymJgCbUz-Ib0E1z1dvFxA1hJJIDGJsS3v5az5tETXhrzfpG1aO_1zQMBUREHiESrG0Gft0gM3RhgBVQ8n5AOgQXgJ.qCXwt1HvQvtJoT5ZFAeYWEnvQGOajoRm6MOVL2wBKmw&dib_tag=se&keywords=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD&qid=1786730352&sprefix=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%2Cspecialty-aps%2C158&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=6a5ef973866b5a94c492e292f5828db3&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">選ばれなかった僕の戦い方 - 田中パウロ淳一 (著)</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/%E9%81%B8%E3%81%B0%E3%82%8C%E3%81%AA%E3%81%8B%E3%81%A3%E3%81%9F%E5%83%95%E3%81%AE%E6%88%A6%E3%81%84%E6%96%B9-%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%E6%B7%B3%E4%B8%80/dp/4799332872?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=2CELWWX3EENS6&dib=eyJ2IjoiMSJ9.U6ZDn9V4rnt5WcU9glXMm7zvcxoXmeQOiaGjT_wBXax2NpieoE9B9nAU11rR_nbvvd2ugUi6Wp0VW3YU_4CDH5uYD7kR3JtQ0Bnwo_XZNPRAc_KIDuWPtwAP8hjtJoqgMgPdTL1kmp4HX4Wqdkq_hXUv2ZDRSpvMQ7Q2UjHymJgCbUz-Ib0E1z1dvFxA1hJJIDGJsS3v5az5tETXhrzfpG1aO_1zQMBUREHiESrG0Gft0gM3RhgBVQ8n5AOgQXgJ.qCXwt1HvQvtJoT5ZFAeYWEnvQGOajoRm6MOVL2wBKmw&dib_tag=se&keywords=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD&qid=1786730352&sprefix=%E7%94%B0%E4%B8%AD%E3%83%91%E3%82%A6%E3%83%AD%2Cspecialty-aps%2C158&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=6a5ef973866b5a94c492e292f5828db3&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_29",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/J%E3%83%AA%E3%83%BC%E3%82%B0%E9%81%B8%E6%89%8B%E5%90%8D%E9%91%912026-27-J1%E3%83%BBJ2%E3%83%BBJ3-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD%E7%89%B9%E5%88%A5%E7%B7%A8%E9%9B%86-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD-%E7%B7%A8%E9%9B%86%E9%83%A8/dp/B0H7W5YHT8?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=7caf9f5d7632ea2afe86c5f874ec1a74&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.JLEAGUE_MEIKAN_2026_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="【書籍】Jリーグ選手名鑑2026-27 J1・J2・J3" title="Jリーグ選手名鑑2026-27 J1・J2・J3"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/J%E3%83%AA%E3%83%BC%E3%82%B0%E9%81%B8%E6%89%8B%E5%90%8D%E9%91%912026-27-J1%E3%83%BBJ2%E3%83%BBJ3-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD%E7%89%B9%E5%88%A5%E7%B7%A8%E9%9B%86-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD-%E7%B7%A8%E9%9B%86%E9%83%A8/dp/B0H7W5YHT8?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=7caf9f5d7632ea2afe86c5f874ec1a74&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">Jリーグ選手名鑑2026-27 J1・J2・J3 (エルゴラッソ特別編集)</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/J%E3%83%AA%E3%83%BC%E3%82%B0%E9%81%B8%E6%89%8B%E5%90%8D%E9%91%912026-27-J1%E3%83%BBJ2%E3%83%BBJ3-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD%E7%89%B9%E5%88%A5%E7%B7%A8%E9%9B%86-%E3%82%A8%E3%83%AB%E3%83%BB%E3%82%B4%E3%83%A9%E3%83%83%E3%82%BD-%E7%B7%A8%E9%9B%86%E9%83%A8/dp/B0H7W5YHT8?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-1&linkCode=ll2&tag=nekonira-22&linkId=7caf9f5d7632ea2afe86c5f874ec1a74&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_30",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-%E8%A9%A6%E5%90%88%E3%81%8C%E3%81%90%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-1051-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8/dp/4582860516?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-14&linkCode=ll2&tag=nekonira-22&linkId=2a45586fca6cf3b97e6bd3679c2ffe3e&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.HAYASHI_RYOHEI_BOOK_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="【書籍】林陵平のサッカー観戦術 試合がぐっと面白くなる極意" title="林陵平のサッカー観戦術"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-%E8%A9%A6%E5%90%88%E3%81%8C%E3%81%90%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-1051-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8/dp/4582860516?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-14&linkCode=ll2&tag=nekonira-22&linkId=2a45586fca6cf3b97e6bd3679c2ffe3e&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">林陵平のサッカー観戦術 試合がぐっと面白くなる極意 (平凡社新書)</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-%E8%A9%A6%E5%90%88%E3%81%8C%E3%81%90%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-1051-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8/dp/4582860516?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.-KOnjc2uzP7Sc1oPQmV9xr_JX4Q7S-EOxDua6m3zxMs8NbkbxvExqLKf9cMcDwU1qRrNmtk75d_kumXya9B0OQ5WEV3Uvt-JY7uZPSuzkrJ1Y3koRPGpzNqw1xIil0DrfMHpxFHrinwtqlTFmu2ab8y9DS31u4fpC0uvtIZOWHEef1HWrO47J7PalUeRSMnWKHSQSo2nH-4T6FyEUQyNm41vc24wXMtUoEgrrXFbaTd0yw-WUjPKVCGuSWcfJT9xlhEsEdbDtItTEzpv0LKwMoZf3HnPMXoNbAjvrGXpNeo.7OoiF3nnOljcEOg4dXC-op9Q7qMdL45_9c0IWk20jjI&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730406&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-14&linkCode=ll2&tag=nekonira-22&linkId=2a45586fca6cf3b97e6bd3679c2ffe3e&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_31",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-2-%E8%A9%A6%E5%90%88%E3%81%8C%E3%82%82%E3%81%A3%E3%81%A8%E3%82%82%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8-1099/dp/4582860990?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.Ii674zUDIeClg1rHqoE7dvc3ZUq19iWxAL6qtPWqt8CfGI4vfpBAfK16Fnb0JRO06E_cxhlT2zfRls0lgzsxxX2MJyGVP0tID7Y5Dh0sK4tZUMh-IYbvX5WoN24mtxsX5YAJd5WSgoqLKOyQpTaQsEWpEo_WKV7D0eGe9CRfh-ldKVg3-XeEgrU-kl1Lsw2WwEpUUjHbCMWq85Q9k8QkhogMHObVuzTsLBrBZS4D7lA-sSIxU7VXdoJEtfGecEVl3NPXN_xzhP2K3yQi37VWk6LNoH6UNUYQNkB7_qGY1Wg.QTDFVDkX7BOc7TT0DbqKjrce3LRBKpXAa2Rojft0Y38&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730971&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-51-spons&xpid=FU1MxLqzOp2Bo&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfbmV4dA&psc=1&linkCode=ll2&tag=nekonira-22&linkId=2dd81d7345e0afc2f2f4a700ba9877ff&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.HAYASHI_RYOHEI_BOOK2_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="【書籍】林陵平のサッカー観戦術 2 試合がもっともっと面白くなる極意" title="林陵平のサッカー観戦術 2"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-2-%E8%A9%A6%E5%90%88%E3%81%8C%E3%82%82%E3%81%A3%E3%81%A8%E3%82%82%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8-1099/dp/4582860990?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.Ii674zUDIeClg1rHqoE7dvc3ZUq19iWxAL6qtPWqt8CfGI4vfpBAfK16Fnb0JRO06E_cxhlT2zfRls0lgzsxxX2MJyGVP0tID7Y5Dh0sK4tZUMh-IYbvX5WoN24mtxsX5YAJd5WSgoqLKOyQpTaQsEWpEo_WKV7D0eGe9CRfh-ldKVg3-XeEgrU-kl1Lsw2WwEpUUjHbCMWq85Q9k8QkhogMHObVuzTsLBrBZS4D7lA-sSIxU7VXdoJEtfGecEVl3NPXN_xzhP2K3yQi37VWk6LNoH6UNUYQNkB7_qGY1Wg.QTDFVDkX7BOc7TT0DbqKjrce3LRBKpXAa2Rojft0Y38&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730971&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-51-spons&xpid=FU1MxLqzOp2Bo&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfbmV4dA&psc=1&linkCode=ll2&tag=nekonira-22&linkId=2dd81d7345e0afc2f2f4a700ba9877ff&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">林陵平のサッカー観戦術 2 試合がもっともっと面白くなる極意 (平凡社新書 1099)</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/%E6%9E%97%E9%99%B5%E5%B9%B3%E3%81%AE%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%E8%A6%B3%E6%88%A6%E8%A1%93-2-%E8%A9%A6%E5%90%88%E3%81%8C%E3%82%82%E3%81%A3%E3%81%A8%E3%82%82%E3%81%A3%E3%81%A8%E9%9D%A2%E7%99%BD%E3%81%8F%E3%81%AA%E3%82%8B%E6%A5%B5%E6%84%8F-%E5%B9%B3%E5%87%A1%E7%A4%BE%E6%96%B0%E6%9B%B8-1099/dp/4582860990?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1PPPI4JAM6FMS&dib=eyJ2IjoiMSJ9.Ii674zUDIeClg1rHqoE7dvc3ZUq19iWxAL6qtPWqt8CfGI4vfpBAfK16Fnb0JRO06E_cxhlT2zfRls0lgzsxxX2MJyGVP0tID7Y5Dh0sK4tZUMh-IYbvX5WoN24mtxsX5YAJd5WSgoqLKOyQpTaQsEWpEo_WKV7D0eGe9CRfh-ldKVg3-XeEgrU-kl1Lsw2WwEpUUjHbCMWq85Q9k8QkhogMHObVuzTsLBrBZS4D7lA-sSIxU7VXdoJEtfGecEVl3NPXN_xzhP2K3yQi37VWk6LNoH6UNUYQNkB7_qGY1Wg.QTDFVDkX7BOc7TT0DbqKjrce3LRBKpXAa2Rojft0Y38&dib_tag=se&keywords=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC&qid=1786730971&sprefix=%E3%82%B5%E3%83%83%E3%82%AB%E3%83%BC%2Cspecialty-aps%2C165&sr=8-51-spons&xpid=FU1MxLqzOp2Bo&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGZfbmV4dA&psc=1&linkCode=ll2&tag=nekonira-22&linkId=2dd81d7345e0afc2f2f4a700ba9877ff&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  },
  {
    id: "amazon_user_32",
    badge: "Amazon PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://www.amazon.co.jp/%E3%80%90Re-Rise%E3%80%91%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC-GeForce-Windows11-%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3%E3%80%90%E3%82%B3%E3%82%B9%E3%83%91%E9%87%8D%E8%A6%96%E3%80%91/dp/B0FZVW4KVD?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1H2N2M35UUNW2&dib=eyJ2IjoiMSJ9.307qIpNBJ-m2jiuITLE3qnFgHdrr8OdoSEi2nWi-EaQnigmbOkGu5WzGJIQpk65w8EhQHbzCUyZYLc8bQbpN905TBc6E4O44pQ96ljL1-rqqbzwLDCKVdOIJUgzcUOy3ycpgGpqQZbJZCD9rE479PExdAHWytET7xGsjfvig7gMFVIdkHMHpdPpg7_KKpAWOZdSH4iMY36bBlhizVUsowKtNWVRnfVeMCq0jyVfJ3UqlKaiGGZqoa_v49kRQBgH2RLhpImLHSpcv9Bg6o0XPoAL4E8fP3PMak33cFF_OswE.Lupd2JupJ5d7XHNQg8A8QWm4ID0ysuw7uptavhbrJtU&dib_tag=se&keywords=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC&qid=1786731574&sprefix=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0pc%2Caps%2C175&sr=8-7&ufe=app_do%3Aamzn1.fos.35785624-70c4-44ae-a5c3-3f044f475d63&linkCode=ll2&tag=nekonira-22&linkId=713553fb67bbadabc20a26f33ad1bb8a&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="${window.RERISE_GAMING_PC_IMAGE || ''}" border="0" style="margin:2px; max-width:100%; height:auto; border-radius:8px;" alt="【Re-Rise】ゲーミングPC GeForce Windows11" title="【Re-Rise】ゲーミングPC"></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://www.amazon.co.jp/%E3%80%90Re-Rise%E3%80%91%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC-GeForce-Windows11-%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3%E3%80%90%E3%82%B3%E3%82%B9%E3%83%91%E9%87%8D%E8%A6%96%E3%80%91/dp/B0FZVW4KVD?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1H2N2M35UUNW2&dib=eyJ2IjoiMSJ9.307qIpNBJ-m2jiuITLE3qnFgHdrr8OdoSEi2nWi-EaQnigmbOkGu5WzGJIQpk65w8EhQHbzCUyZYLc8bQbpN905TBc6E4O44pQ96ljL1-rqqbzwLDCKVdOIJUgzcUOy3ycpgGpqQZbJZCD9rE479PExdAHWytET7xGsjfvig7gMFVIdkHMHpdPpg7_KKpAWOZdSH4iMY36bBlhizVUsowKtNWVRnfVeMCq0jyVfJ3UqlKaiGGZqoa_v49kRQBgH2RLhpImLHSpcv9Bg6o0XPoAL4E8fP3PMak33cFF_OswE.Lupd2JupJ5d7XHNQg8A8QWm4ID0ysuw7uptavhbrJtU&dib_tag=se&keywords=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC&qid=1786731574&sprefix=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0pc%2Caps%2C175&sr=8-7&ufe=app_do%3Aamzn1.fos.35785624-70c4-44ae-a5c3-3f044f475d63&linkCode=ll2&tag=nekonira-22&linkId=713553fb67bbadabc20a26f33ad1bb8a&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333; font-weight:bold;">【Re-Rise】ゲーミングPC GeForce Windows11【コスパ重視】</a></p><div style="margin:6px 0 2px 0;"><a href="https://www.amazon.co.jp/%E3%80%90Re-Rise%E3%80%91%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC-GeForce-Windows11-%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0%E3%83%91%E3%82%BD%E3%82%B3%E3%83%B3%E3%80%90%E3%82%B3%E3%82%B9%E3%83%91%E9%87%8D%E8%A6%96%E3%80%91/dp/B0FZVW4KVD?__mk_ja_JP=%E3%82%AB%E3%82%BF%E3%82%AB%E3%83%8A&crid=1H2N2M35UUNW2&dib=eyJ2IjoiMSJ9.307qIpNBJ-m2jiuITLE3qnFgHdrr8OdoSEi2nWi-EaQnigmbOkGu5WzGJIQpk65w8EhQHbzCUyZYLc8bQbpN905TBc6E4O44pQ96ljL1-rqqbzwLDCKVdOIJUgzcUOy3ycpgGpqQZbJZCD9rE479PExdAHWytET7xGsjfvig7gMFVIdkHMHpdPpg7_KKpAWOZdSH4iMY36bBlhizVUsowKtNWVRnfVeMCq0jyVfJ3UqlKaiGGZqoa_v49kRQBgH2RLhpImLHSpcv9Bg6o0XPoAL4E8fP3PMak33cFF_OswE.Lupd2JupJ5d7XHNQg8A8QWm4ID0ysuw7uptavhbrJtU&dib_tag=se&keywords=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0PC&qid=1786731574&sprefix=%E3%82%B2%E3%83%BC%E3%83%9F%E3%83%B3%E3%82%B0pc%2Caps%2C175&sr=8-7&ufe=app_do%3Aamzn1.fos.35785624-70c4-44ae-a5c3-3f044f475d63&linkCode=ll2&tag=nekonira-22&linkId=713553fb67bbadabc20a26f33ad1bb8a&ref_=as_li_ss_tl" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#FF9900;color:#111!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> Amazonで購入 </div></a></div></td></tr></table></div></td></tr></table>`
  }
];

function SideAdBanner({ position }) {
  const [closedIds, setClosedIds] = useState({});
  const [sidebarAds, setSidebarAds] = useState([]);

  useEffect(() => {
    const shuffled = [...AFFILIATE_ADS].sort(() => 0.5 - Math.random());
    const isTallAd = (ad) => ad && ad.htmlCode && !ad.htmlCode.includes('468x160');
    const firstTwo = shuffled.slice(0, 2);
    const hasTall = firstTwo.some(isTallAd);
    const maxCount = hasTall ? 2 : 3;
    setSidebarAds(shuffled.slice(0, maxCount));
  }, [position]);

  const visibleAds = sidebarAds.filter(ad => !closedIds[ad.id]);

  if (visibleAds.length === 0) {
    return (
      <aside className={`hidden xl:block w-44 2xl:w-52 flex-shrink-0 sticky top-20 self-start ${position === 'left' ? 'mr-3' : 'ml-3'}`} />
    );
  }

  return (
    <aside className={`hidden xl:block w-44 2xl:w-52 flex-shrink-0 sticky top-20 self-start space-y-3 max-h-[calc(100vh-6rem)] overflow-y-auto ${position === 'left' ? 'mr-3' : 'ml-3'}`}>
      {visibleAds.map(ad => (
        <div key={ad.id} className="relative group glass-panel p-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl flex justify-center items-center overflow-hidden">
          <button
            onClick={() => setClosedIds(prev => ({ ...prev, [ad.id]: true }))}
            className="absolute top-1 right-1 z-10 w-5 h-5 rounded-full bg-slate-950/80 hover:bg-red-500/90 text-slate-400 hover:text-white border border-slate-700/60 flex items-center justify-center text-[10px] opacity-70 group-hover:opacity-100 transition-all shadow-md cursor-pointer"
            title="この広告を非表示"
          >
            ✕
          </button>
          {ad.htmlCode ? (
            ad.htmlCode.includes('<script') ? (
              <iframe
                srcDoc={`<!DOCTYPE html><html><head><base target='_blank'><style>body{margin:0;padding:0;background:transparent;display:flex;justify-content:center;align-items:center;overflow:hidden;} img,table,div{max-width:100%!important;}</style></head><body>${ad.htmlCode}</body></html>`}
                className="w-full border-0 overflow-hidden rounded-xl"
                style={{ height: ad.htmlCode.includes('468x160') ? '160px' : '250px' }}
                title={ad.id}
              />
            ) : (
              <div className="w-full flex justify-center items-center overflow-hidden [&_table]:max-w-full [&_img]:max-w-full [&_img]:h-auto [&_div]:max-w-full [&_td]:block [&_td]:w-full" dangerouslySetInnerHTML={{ __html: ad.htmlCode }} />
            )
          ) : (
            <a
              href={ad.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block group w-full"
            >
              <img
                src={ad.image}
                alt={ad.title || ""}
                className="w-full h-auto rounded-xl object-cover group-hover:opacity-90 transition-opacity"
                loading="lazy"
              />
            </a>
          )}
        </div>
      ))}
    </aside>
  );
}

const OFFSETS = {
  '☆3': 0,
  '☆3+': 16,
  '☆3++': 33,   // 16 + 17
  '☆4': 65,     // 33 + 32
  '☆4+': 81,    // 65 + 16
  '☆4++': 98,   // 81 + 17
  '☆5': 130     // 98 + 32
};

const NATIONALITY_READINGS = {
  '日本': 'にほん',
  '韓国': 'かんこく',
  '中国': 'ちゅうごく',
  'ブラジル': 'ぶらじる',
  'アルゼンチン': 'あるぜんちん',
  'イングランド': 'いんぐらんど',
  'フランス': 'ふらんす',
  'ドイツ': 'どいつ',
  'スペイン': 'すぺいん',
  'イタリア': 'いたりあ',
  'オランダ': 'おらんだ',
  'ポルトガル': 'ぽるとがる',
  'ベルギー': 'べるぎー',
  'クロアチア': 'くろあちあ',
  'ウルグアイ': 'うるぐあい',
  'コロンビア': 'ころんびあ',
  'チリ': 'ちり',
  'パラグアイ': 'ぱらぐあい',
  'ペルー': 'ぺるー',
  'ロシア': 'ろしあ',
  'アメリカ': 'あめりか',
  'カナダ': 'かなだ',
  'メキシコ': 'めきしこ',
  'エジプト': 'えじぷと',
  'モロッコ': 'もろっこ',
  'ナイジェリア': 'ないじぇりあ',
  'セネガル': 'せねがる',
  'ガーナ': 'がーな',
  'カメルーン': 'かめるーん',
  'オーストラリア': 'おーすとらりあ',
  'ニュージーランド': 'にゅーじーらんど',
  'セルビア': 'せるびあ',
  'スウェーデン': 'すうぇーでん',
  'ノルウェー': 'のるうぇー',
  'デンマーク': 'でんまーく',
  'ポーランド': 'ぽーらんど',
  'オーストリア': 'おーすとりあ',
  'スイス': 'すいす',
  'ウクライナ': 'うくらいな',
  'スコットランド': 'すこっとらんど',
  'ウェールズ': 'うぇーるず',
  'アイルランド': 'あいるらんど',
  'トルコ': 'とるこ',
  'ギリシャ': 'ぎりしゃ',
  'チェコ': 'ちぇこ',
  'スロバキア': 'すろばきあ',
  'ハンガリー': 'はんがりー',
  'ルーマニア': 'るーまにあ',
  'ブルガリア': 'ぶるがりあ'
};


const getNationalityReading = (nat) => {
  if (!nat) return '';
  return NATIONALITY_READINGS[nat] || nat;
};

// 選手アバター画像安全取得ヘルパー（ファン・ダイク、ペレ等でBase64カード画像優先）
const PLAYER_IMAGE_MAP = {
  "p01": "PELE_IMAGE",
  "p02": "RONALDO_IMAGE",
  "p03": "DEBRUYNE_IMAGE",
    "p05": "VAN_DIJK_IMAGE",
  "p06": "BELLINGHAM_IMAGE",
  "p07": "HONDA_IMAGE",
  "p08": "MESSI_MLS_IMAGE",
  "p09": "VINICIUS_IMAGE",
  "p10": "MULLER_IMAGE",
  "p11": "DEMBELE_IMAGE",
  "p12": "REUS_IMAGE",
  "p13": "GVARDIOL_IMAGE",
  "p14": "SALAH_IMAGE",
  "p15": "PORRO_IMAGE",
  "p16": "SON_MLS_IMAGE",
  "p17": "HAALAND_IMAGE",
  "p18": "GRIEZMANN_IMAGE",
  "p19": "LEWANDOWSKI_IMAGE",
  "p20": "VALVERDE_IMAGE",
  "p21": "SALIBA_IMAGE",
  "p22": "KAMADA_IMAGE",
  "p23": "FODEN_IMAGE",
  "p24": "KVARATSKHELIA_IMAGE",
  "p25": "DIALLO_IMAGE",
  "p26": "PEDRO_IMAGE",
  "p27": "MCKENNIE_IMAGE",
  "p28": "EL_SHAARAWY_IMAGE",
  "p29": "KURATA_IMAGE",
  "p30": "YOUNG_IMAGE",
  "p31": "MARMOUSH_IMAGE",
  "p32": "JOAO_PEDRO_IMAGE",
  "p33": "MINAMINO_IMAGE",
  "p34": "MODRIC_IMAGE",
  "p35": "ODEGAARD_IMAGE",
  "p36": "FABIAN_IMAGE",
  "p37": "HWANG_INBEOM_IMAGE",
  "p38": "CALHANOGLU_IMAGE",
  "p39": "BARELLA_IMAGE",
  "p40": "EDERSON_IMAGE",
  "p41": "TCHOUAMENI_IMAGE",
  "p42": "BENTANCUR_IMAGE",
  "p43": "ROLDAN_IMAGE",
  "p44": "NAKAMURA_IMAGE",
  "p45": "ISCO_IMAGE",
  "p46": "LONGSTAFF_IMAGE",
  "p47": "HIGASHI_IMAGE",
  "p48": "MCTOMINAY_IMAGE",
  "p49": "CAMAVINGA_IMAGE",
  "p50": "SANO_IMAGE",
  "p51": "YAMAGUCHI_IMAGE",
  "p52": "HASHIMOTO_IMAGE",
  "p53": "DANTE_IMAGE",
  "p54": "TANIGUCHI_IMAGE",
  "p55": "MORISHIGE_IMAGE",
  "p56": "AYASE_UEDA_IMAGE",
  "p57": "AUWAILUN_IMAGE",
  "p58": "HISATOSATO_IMAGE",
  "p59": "YUKOBAYASHI_IMAGE",
  "p60": "SONHEUNGMIN_IMAGE",
  "p61": "LAUTARO_IMAGE",
  "p62": "KAKITANI_IMAGE",
  "p63": "CORREA_IMAGE",
  "p64": "SORLOTH_IMAGE",
  "p65": "RYOHEIHAYASHI_IMAGE",
  "p66": "WILSON_IMAGE",
  "p67": "MILITAO_IMAGE",
  "p68": "HIROKIITO_IMAGE",
  "p69": "TSUYOSHIWATANABE_IMAGE",
  "p70": "GABRIEL_IMAGE",
  "p71": "BASTONI_IMAGE",
  "p72": "AKE_IMAGE",
  "p73": "TSUBOI_IMAGE",
  "p74": "GATTI_IMAGE",
  "p75": "ALEXSANDRO_IMAGE",
  "p76": "BALDE_IMAGE",
  "p77": "CANCELO_IMAGE",
  "p78": "DIMARCO_IMAGE",
  "p79": "HAKIMI_IMAGE",
  "p80": "DUMFRIES_IMAGE",
  "p81": "MOLINA_IMAGE",
  "p82": "SPINAZZOLA_IMAGE",
  "p83": "TIMBER_IMAGE",
  "p84": "LUKESHAW_IMAGE",
  "p85": "WALKER_IMAGE",
  "p86": "BENWHITE_IMAGE",
  "p87": "REECEJAMES_IMAGE",
  "p88": "SAKA_IMAGE",
  "p89": "BRAHIM_IMAGE",
  "p90": "LEEKINWO_IMAGE",
  "p91": "ALMIRON_IMAGE",
  "p92": "ITO_IMAGE",
  "p93": "DOAN_IMAGE",
  "p94": "CUADRADO_IMAGE",
  "p95": "MITOMAJPN_IMAGE",
  "p96": "KEITO_NAKAMURA_IMAGE",
  "p97": "NICOWILLIAMS_IMAGE",
  "p98": "MITOMA2526_IMAGE",
  "p99": "HWANG_IMAGE",
  "p100": "COURTOIS_IMAGE",
  "p101": "OBLAK_IMAGE",
  "p102": "SUZUKI_IMAGE",
  "p103": "MAIGNAN_IMAGE",
  "p104": "SOMMER_IMAGE",
  "p105": "JOANGARCIA_IMAGE",
  "p106": "POPE_IMAGE",
  "p107": "BRUNO_GUIMARAES_IMAGE",
  "p108": "RAPHINHA_IMAGE",
  "p109": "RODRYGO_IMAGE",
  "p110": "BREMER_IMAGE",
  "p111": "KAWAMOTO_IMAGE",
  "p112": "MESSI_HAIFU_IMAGE",
  "p113": "SOMA_IMAGE",
  "p114": "RAFAEL_ELIAS_IMAGE",
  "p115": "LEO_CEARA_IMAGE",
  "p116": "ITO_TATSUYA_IMAGE",
  "p117": "KOIZUMI_IMAGE",
  "p118": "INAGAKI_IMAGE",
  "p119": "TANAKA_IMAGE",
  "p120": "ARAKI_IMAGE",
  "p121": "KOGA_IMAGE",
  "p122": "NAOMICHI_UEDA_IMAGE",
  "p123": "HAYAKAWA_BEST11_IMAGE",
  "p127": "HAYAKAWA_2026_IMAGE",
  "p128": "KAWASHIMA_IMAGE",
  "p129": "MAEKAWA_IMAGE",
  "p130": "SCHMIDT_IMAGE",
  "p131": "HIGASHIGUCHI_IMAGE",
  "p132": "KOJIMA_IMAGE",
  "p133": "MATHEUS_IMAGE",
  "p134": "AKIHIRO_HAYASHI_IMAGE",
  "p135": "GAKUJI_OTA_IMAGE",
  "p136": "MASAAKI_GOTO_IMAGE",
  "p137": "LENNART_MOSER_IMAGE",
  "p138": "SABBAG_IMAGE",
  "p139": "SONG_IMAGE",
  "p140": "LEE_IMAGE",
  "p141": "KANG_IMAGE",
  "p142": "KIM_IMAGE",
  "p143": "PARK_IMAGE",
  "p144": "HONG_IMAGE",
  "p145": "LEE_MYUNG_JAE_IMAGE",
  "p146": "KIM_MOON_HWAN_IMAGE",
  "p147": "SONG_BUM_KEUN_IMAGE",
  "p148": "YAZAN_IMAGE",
  "p149": "ARAKI_2026_IMAGE",
  "p150": "JONJIC_2026_IMAGE",
  "p151": "TATSUTA_2026_IMAGE",
  "p152": "OKA_2026_IMAGE",
  "p153": "IWASHITA_2026_IMAGE",
  "p154": "YOSHIOKA_2026_IMAGE",
  "p155": "NISHIYAMA_2026_IMAGE",
  "p156": "CELESTINE_2026_IMAGE",
  "p157": "SHIOTANI_2026_IMAGE",
  "p158": "SHOJI_2026_IMAGE",
  "p159": "HATANAKA_2026_IMAGE",
  "p160": "NEMOTO_2026_IMAGE",
  "p161": "HOSOI_2026_IMAGE",
  "p162": "ROS_2026_IMAGE",
  "p163": "FUJII_2026_IMAGE",
  "p164": "SAKAI_2026_IMAGE",
  "p165": "MOCHIZUKI_2026_IMAGE",
  "p166": "IKOMA_2026_IMAGE",
  "p167": "SASAKI_2026_IMAGE",
  "p168": "YOSHIDA_2026_IMAGE",
  "p169": "OSAKI_2026_IMAGE",
  "p170": "MAEJIMA_2026_IMAGE",
  "p171": "FUJIHARU_2026_IMAGE",
  "p172": "MUROYA_2026_IMAGE",
  "p173": "UMEKI_2026_IMAGE",
  "p174": "FUKUDA_2026_IMAGE",
  "p175": "NISHIYA_2026_IMAGE",
  "p176": "NISHIMURA_2026_IMAGE",
  "p177": "MAENG_2026_IMAGE",
  "p178": "KAWAHARA_2026_IMAGE",
  "p179": "SEO_MINWOO_2026_IMAGE",
  "p180": "YAMANE_2026_IMAGE",
  "p181": "NISHIZAWA_2026_IMAGE",
  "p182": "LEE_HUI_GYUN_2026_IMAGE",
  "p183": "SHIBASAKI_2026_IMAGE",
  "p184": "MATHEUS_BUENO_2026_IMAGE",
  "p185": "KIYOTAKE_2026_IMAGE",
  "p186": "KAWABE_2026_IMAGE",
  "p187": "YAMAMOTO_YUKI_2026_IMAGE",
  "p188": "YAMAGUCHI_DAIKI_2026_IMAGE",
  "p189": "TOJO_2026_IMAGE",
  "p190": "KOIZUMI_2026_IMAGE",
  "p191": "REIJNDERS_DIST_2026_IMAGE",
  "p192": "TONO_2026_IMAGE",
  "p193": "SASAKI_2026_IMAGE",
  "p194": "YAMAMI_2026_IMAGE",
  "p195": "NAGO_2026_IMAGE",
  "p196": "KIMURA_TAKAYA_2026_IMAGE",
  "p197": "GOTO_YUSUKE_2026_IMAGE",
  "p198": "FUJIKAWA_KOTARO_2026_IMAGE",
  "p199": "ARAKI_RYOTARO_2026_IMAGE",
  "p200": "MATHEUS_SAVIO_2026_IMAGE",
  "p201": "SATO_RYUNOSUKE_2026_IMAGE",
  "p202": "HIMENO_MAKOTO_2026_IMAGE",
  "p203": "KATO_CHIHIRO_2026_IMAGE",
  "p204": "NORMAN_CAMPBELL_2026_IMAGE",
  "p205": "CARLINHOS_JUNIOR_2026_IMAGE",
  "p206": "SOMA_YUKI_2026_IMAGE",
  "p207": "KURATA_SHU_2026_IMAGE",
  "p208": "ISHII_HISATSUGU_2026_IMAGE",
  "p209": "NAKAMURA_RYOTA_2026_IMAGE",
  "p210": "MARCO_TULIO_2026_IMAGE",
  "p211": "MATHEUS_MORAES_2026_IMAGE",
  "p212": "LUDWIGSON_GUSTAV_2026_IMAGE",
  "p213": "LEE_CHUNG_YONG_2026_IMAGE",
  "p214": "GO_JAE_HYEON_2026_IMAGE",
  "p215": "KUBO_TOJIRO_2026_IMAGE",
  "p216": "TAKAHASHI_DAIGO_2026_IMAGE",
  "p217": "MO_JAE_HYEON_2026_IMAGE",
  "p218": "MATSUHASHI_YUAN_2026_IMAGE",
  "p219": "TAKEMOTO_YUHI_2026_IMAGE",
  "p220": "KAMEDA_AYUMU_2026_IMAGE",
  "p221": "THIAGO_ANDRADE_2026_IMAGE",
  "p222": "GALEGO_2026_IMAGE",
  "p223": "THIAGUINHO_2026_IMAGE",
  "p224": "JEON_BYEONG_GWAN_2026_IMAGE",
  "p225": "CHOI_GEON_JU_2026_IMAGE",
  "p226": "LEE_DONG_JUN_2026_IMAGE",
  "p227": "EMERSON_RAMON_2026_IMAGE",
  "p228": "KIDA_2026_IMAGE",
  "p229": "JUNIOR_ROCHA_2026_IMAGE",
  "p230": "JOO_MIN_KYU_2026_IMAGE",
  "p231": "FRIDJONSSON_2026_IMAGE",
  "p232": "YAGO_CARIELLO_2026_IMAGE",
  "p233": "LUCAS_BARCELOS_2026_IMAGE",
  "p234": "AMADOU_BAKAYOKO_2026_IMAGE",
  "p235": "BRENO_HERCULANO_2026_IMAGE",
  "p236": "SUGIMOTO_2026_IMAGE",
  "p237": "SAKURAGAWA_2026_IMAGE",
  "p238": "TOSHIDA_2026_IMAGE",
  "p239": "SAWAKAMI_2026_IMAGE",
  "p240": "SHIMADA_2026_IMAGE",
  "p241": "MIURA_KAZUYOSHI_2026_IMAGE",
  "p242": "HIDANO_2026_IMAGE",
  "p243": "NAGAKURA_2026_IMAGE",
  "p244": "ISHIKAWA_DAICHI_2026_IMAGE",
  "p245": "YAMURA_2026_IMAGE",
  "p246": "MUTO_2026_IMAGE",
  "p247": "SHINTANI_2026_IMAGE",
  "p248": "KAWAMOTO_2026_IMAGE",
  "p249": "YANO_KISHO_2026_IMAGE",
  "p250": "KAWAMURA_KEITO_2026_IMAGE",
  "p251": "NAITO_YAMATO_2026_IMAGE",
  "p252": "TANAKA_SORA_2026_IMAGE",
  "p253": "KLIMALA_2026_IMAGE",
  "p254": "MUGOSA_2026_IMAGE",
  "p255": "TRANZISKA_2026_IMAGE",
  "p256": "HUMMET_2026_IMAGE",
  "p257": "TANIMURA_KAINA_2026_IMAGE",
  "p258": "YAMAGISHI_2026_IMAGE",
  "p259": "HAALAND_GIFT_2026_IMAGE",
  "p260": "DIAS_GIFT_2026_IMAGE",
  "p261": "HIRATSUKA_GIFT_2026_IMAGE",
  "p262": "KAWAMOTO_PACK_2026_IMAGE",
  "p263": "LEO_CEARA_2026_IMAGE",
  "p264": "YAMAGISHI_2026_TS_IMAGE",
  "p265": "YAMADA_HIROTO_2026_TS_IMAGE",
  "p266": "TAMURA_SHOTA_2026_TS_IMAGE",
  "p267": "TOSHIDA_YUSEI_2026_TS_IMAGE",
  "p268": "IZUMI_TOYA_2026_TS_IMAGE",
  "p269": "YAMAMOTO_OUTA_2026_TS_IMAGE"
};

const getPlayerAvatarUrl = (player) => {
  if (!player) return '';
  const imgVar = PLAYER_IMAGE_MAP[player.id];
  if (imgVar && window[imgVar]) return window[imgVar];
  if (player.avatarUrl) return player.avatarUrl;
  return '';
};
window.getPlayerAvatarUrl = getPlayerAvatarUrl;

const PlayerAvatar = ({ player, className = "", alt = "" }) => {
  const [imgError, setImgError] = React.useState(false);
  const avatarUrl = getPlayerAvatarUrl(player);
  
  React.useEffect(() => {
    setImgError(false);
  }, [avatarUrl, player?.id]);

  const category = player?.category || 'FW';
  const pos = player?.mainPosition || player?.category || 'FW';
  const name = player?.name || '';
  const rarity = player?.rarity || '☆3';
  
  const categoryThemes = {
    FW: { bg: 'from-rose-950/90 via-slate-900 to-rose-900/40', border: 'border-rose-500/50', text: 'text-rose-400', badge: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
    MF: { bg: 'from-emerald-950/90 via-slate-900 to-emerald-900/40', border: 'border-emerald-500/50', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    DF: { bg: 'from-blue-950/90 via-slate-900 to-blue-900/40', border: 'border-blue-500/50', text: 'text-blue-400', badge: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    GK: { bg: 'from-amber-950/90 via-slate-900 to-amber-900/40', border: 'border-amber-500/50', text: 'text-amber-400', badge: 'bg-amber-500/20 text-amber-300 border-amber-500/30' }
  };

  const theme = categoryThemes[category] || categoryThemes.FW;

  if (avatarUrl && !imgError) {
    return (
      <img
        src={avatarUrl}
        alt={alt || name}
        className={className}
        onError={() => setImgError(true)}
      />
    );
  }

  return (
    <div className={`relative flex flex-col items-center justify-between p-1 overflow-hidden bg-gradient-to-b ${theme.bg} ${theme.border} ${className}`}>
      <div className="w-full flex items-center justify-between text-[9px] font-extrabold z-10">
        <span className={`px-1 rounded border ${theme.badge} font-num`}>{pos}</span>
        <span className="text-amber-400 font-num font-bold text-[8px]">{rarity}</span>
      </div>
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 space-y-0.5 w-full px-0.5">
        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-950/80 border border-slate-700/80 flex items-center justify-center ${theme.text} shadow-inner`}>
          <Icon name="user" className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-90" />
        </div>
        <div className="text-[9px] md:text-[10px] font-bold text-white leading-tight truncate w-full">
          {name.split(' ')[0] || name}
        </div>
      </div>
      <div className={`w-full text-center text-[8px] font-extrabold uppercase tracking-wider ${theme.text} bg-slate-950/80 rounded py-0.5 z-10 border border-white/5`}>
        {category}
      </div>
    </div>
  );
};



// スキル・アビリティ ランク別専用カラー スタイリング
const getRankBadgeStyle = (rank) => {
  switch (rank) {
    case '金':
      return 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-400/20 text-[#FFD700] border border-[#FFD700]/70 font-extrabold shadow-sm shadow-[#FFD700]/20';
    case '銀':
      return 'bg-gradient-to-r from-slate-300/20 to-slate-100/20 text-[#E2E8F0] border border-[#E2E8F0]/70 font-extrabold shadow-sm shadow-[#E2E8F0]/20';
    case '銅':
      return 'bg-gradient-to-r from-amber-700/25 to-amber-600/25 text-[#FF9E43] border border-[#CD7F32]/70 font-extrabold shadow-sm shadow-[#CD7F32]/20';
    case 'ノーマル':
    default:
      return 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/70 font-extrabold shadow-sm shadow-[#00FF66]/20';
  }
};

const getRankTextStyle = (rank) => {
  switch (rank) {
    case '金':
      return 'text-[#FFD700] font-extrabold drop-shadow-[0_1px_2px_rgba(255,215,0,0.3)]';
    case '銀':
      return 'text-[#E2E8F0] font-extrabold drop-shadow-[0_1px_2px_rgba(226,232,240,0.3)]';
    case '銅':
      return 'text-[#FF9E43] font-extrabold drop-shadow-[0_1px_2px_rgba(205,127,50,0.3)]';
    case 'ノーマル':
    default:
      return 'text-[#00FF66] font-extrabold drop-shadow-[0_1px_2px_rgba(0,255,102,0.3)]';
  }
};

const getRarityBadgeStyle = (rarity = '☆3') => {
  if (rarity.includes('☆5')) return 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 shadow-md shadow-amber-500/20';
  if (rarity.includes('☆4')) return 'bg-gradient-to-r from-purple-400 to-indigo-400 text-slate-950 shadow-md';
  if (rarity.includes('☆3++')) return 'bg-cyan-400 text-slate-950';
  if (rarity.includes('☆3+')) return 'bg-emerald-400 text-slate-950';
  return 'bg-slate-700 text-slate-200';
};

// スキル（1種類）データ安全取得
const getPlayerSkill = (player) => {
  if (player?.skill) return player.skill;
  if (player?.skills && player.skills.length > 0) {
    const s = player.skills[0];
    const rankMap = { SS: '金', S: '銀', A: '銅', B: 'ノーマル' };
    return {
      name: s.name,
      rank: rankMap[s.type] || '金',
      description: s.description || '特技効果'
    };
  }
  return { name: 'なし', rank: 'ノーマル', description: '' };
};

// アビリティ（2〜3種類）データ安全取得
const getPlayerAbilities = (player) => {
  if (player?.abilities && player.abilities.length > 0) {
    return player.abilities;
  }
  if (player?.traits && player.traits.length > 0) {
    const defaultRanks = ['金', '銀', '銅'];
    return player.traits.map((t, idx) => ({
      name: t,
      rank: defaultRanks[idx] || 'ノーマル',
      description: '能力強化アビリティ'
    }));
  }
  return [
    { name: '能力補正', rank: '銀', description: 'ステータス調整' },
    { name: '精神力強化', rank: '銅', description: 'メンタル補正' }
  ];
};

// 指定レアリティおよび強化状態(初期/最大強化)に応じて能力値を自動計算・適用する動的プレイヤー生成関数
const getAdjustedPlayer = (player, targetRarity, useMaxEnhanced = false) => {
  if (!player) return null;
  // 加工済みの調整済みオブジェクトが渡された場合も常に無加工な元プレイヤーデータ(rawPlayer)を参照
  const basePlayer = player.rawPlayer || player;
  const avatar = getPlayerAvatarUrl(basePlayer);

  // 🔥 最大強化選択時は全選手をレアリティ☆5固定およびisMaxEnhanced: trueとして生成
  if (useMaxEnhanced) {
    if (basePlayer.maxEnhanced) {
      const sourceObj = basePlayer.maxEnhanced;
      return {
        ...basePlayer,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        overall: sourceObj.overall,
        baseStats: sourceObj.baseStats,
        detailStats: sourceObj.detailStats,
        addedOffset: 0,
        avatarUrl: avatar,
        isMaxEnhanced: true
      };
    } else {
      // 専用最大強化データ未入力の選手も自動的に☆5育成完了状態(isMaxEnhanced: true)で生成
      const baseResult = getAdjustedPlayer(basePlayer, '☆5', false);
      return {
        ...baseResult,
        rawPlayer: basePlayer,
        rarity: '☆5',
        simulatedRarity: '☆5',
        isMaxEnhanced: true
      };
    }
  }

  // 🌱 通常初期値選択時のレアリティ別加算計算
  const currentRarity = targetRarity || basePlayer.simulatedRarity || basePlayer.rarity || '☆3';
  const baseRarity = basePlayer.baseRarity || '☆3';

  const baseOffset = OFFSETS[baseRarity] !== undefined ? OFFSETS[baseRarity] : 0;
  const targetOffset = OFFSETS[currentRarity] !== undefined ? OFFSETS[currentRarity] : baseOffset;
  const diff = targetOffset - baseOffset;

  const overallVal = basePlayer.overall || 0;
  const baseStatsObj = basePlayer.baseStats;
  const detailStatsObj = basePlayer.detailStats;

  if (diff === 0) {
    return {
      ...basePlayer,
      rawPlayer: basePlayer,
      rarity: currentRarity,
      simulatedRarity: currentRarity,
      overall: overallVal,
      baseStats: baseStatsObj,
      detailStats: detailStatsObj,
      addedOffset: 0,
      avatarUrl: avatar,
      isMaxEnhanced: false
    };
  }

  // 18種詳細能力値への差分加算
  const newDetailStats = {};
  if (detailStatsObj) {
    Object.keys(detailStatsObj).forEach(catKey => {
      newDetailStats[catKey] = {};
      Object.keys(detailStatsObj[catKey]).forEach(subKey => {
        newDetailStats[catKey][subKey] = (detailStatsObj[catKey][subKey] || 0) + diff;
      });
    });
  }

  // 主要6能力値
  const newBaseStats = {};
  if (baseStatsObj) {
    Object.keys(baseStatsObj).forEach(catKey => {
      const itemsCount = detailStatsObj && detailStatsObj[catKey] ? Object.keys(detailStatsObj[catKey]).length : 3;
      newBaseStats[catKey] = (baseStatsObj[catKey] || 0) + (diff * itemsCount);
    });
  }

  return {
    ...basePlayer,
    rawPlayer: basePlayer,
    rarity: currentRarity,
    simulatedRarity: currentRarity,
    overall: overallVal, // カタログ総合力はレアリティ変更で昇算せず初期値のまま固定
    baseStats: newBaseStats,
    detailStats: newDetailStats,
    addedOffset: diff,
    avatarUrl: avatar,
    isMaxEnhanced: false
  };
};

// プレー意識 14項目定義
const PLAY_TENDENCY_ITEMS = [
  { key: 'attack', label: '攻撃意識' },
  { key: 'defense', label: '守備意識' },
  { key: 'dribble', label: 'ドリブル意識' },
  { key: 'shoot', label: 'シュート意識' },
  { key: 'longShoot', label: 'ロングシュート意識' },
  { key: 'shortPass', label: 'ショートパス意識' },
  { key: 'longPass', label: 'ロングパス意識' },
  { key: 'throughPass', label: 'スルーパス意識' },
  { key: 'cutIn', label: '切り込み意識' },
  { key: 'keep', label: 'キープ意識' },
  { key: 'delay', label: 'ディレイ意識' },
  { key: 'rushOut', label: '飛び出し意識' },
  { key: 'feint', label: 'フェイント意識' },
  { key: 'press', label: 'プレス意識' }
];

// ポリシー別専用カラー判定ヘルパー
const getPolicyTextColor = (policy) => {
  switch (policy) {
    case 'カウンター':
      return 'text-pink-400 font-extrabold';
    case 'ムービング':
      return 'text-emerald-400 font-extrabold';
    case 'ポゼッション':
      return 'text-orange-400 font-extrabold';
    case 'リアクション':
      return 'text-cyan-400 font-extrabold';
    default:
      return 'text-slate-300 font-bold';
  }
};

const getPolicyBadgeClass = (policy) => {
  switch (policy) {
    case 'カウンター':
      return 'bg-pink-500/15 text-pink-400 border-pink-500/30';
    case 'ムービング':
      return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
    case 'ポゼッション':
      return 'bg-orange-500/15 text-orange-400 border-orange-500/30';
    case 'リアクション':
      return 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700';
  }
};

// プレー意識（-2 〜 +2）の表示フォーマット・カラーバッジヘルパー
const formatTendencyVal = (val) => {
  const num = Number(val) || 0;
  if (num > 0) return `+${num}`;
  return `${num}`;
};

const getTendencyBadgeStyle = (val) => {
  const num = Number(val) || 0;
  if (num === 2) return 'bg-red-500/25 text-red-400 border border-red-500/70 font-num font-black shadow-md shadow-red-500/20';
  if (num === 1) return 'bg-orange-500/25 text-orange-400 border border-orange-500/60 font-num font-extrabold';
  if (num === 0) return 'bg-slate-800 text-slate-300 border border-slate-700 font-num font-bold';
  if (num === -1) return 'bg-cyan-500/25 text-cyan-300 border border-cyan-500/60 font-num font-extrabold';
  if (num === -2) return 'bg-blue-600/30 text-blue-400 border border-blue-500/70 font-num font-black shadow-md shadow-blue-500/20';
  return 'bg-slate-800 text-slate-400';
};

// プレー意識のデータ取得（未定義の場合のポジション安全補完）
const getPlayerPlayTendency = (player, key) => {
  if (player && player.playTendencies && player.playTendencies[key] !== undefined) {
    return player.playTendencies[key];
  }
  const isFW = ['CF', 'LW', 'RW', 'ST'].includes(player?.mainPosition);
  const isDF = ['CB', 'LFB', 'RFB', 'GK'].includes(player?.mainPosition);
  const defaultMap = {
    attack: isFW ? 2 : (isDF ? -1 : 1),
    defense: isDF ? 2 : (isFW ? -1 : 0),
    dribble: isFW ? 2 : 0,
    shoot: isFW ? 2 : 0,
    longShoot: 1,
    shortPass: 1,
    longPass: 0,
    throughPass: 1,
    cutIn: isFW ? 1 : 0,
    keep: 1,
    delay: isDF ? 1 : -1,
    rushOut: isFW ? 1 : 0,
    feint: 0,
    press: isDF ? 2 : 1
  };
  return defaultMap[key] !== undefined ? defaultMap[key] : 0;
};

// 各主要能力カテゴリ (shoot, pass, dribble, defense, physical, speed) の詳細数値合計を計算
const getCategoryTotal = (player, catKey) => {
  if (!player || !player.detailStats || !player.detailStats[catKey]) {
    return player?.baseStats?.[catKey] || 0;
  }
  const obj = player.detailStats[catKey];
  return Object.values(obj).reduce((sum, v) => sum + (Number(v) || 0), 0);
};

// 18項目すべての詳細能力値の「能力合計実数値」を計算
const getPlayerTotalStats18 = (player) => {
  if (!player) return 0;
  if (!player.detailStats) {
    if (!player.baseStats) return 0;
    return Object.values(player.baseStats).reduce((sum, v) => sum + (Number(v) || 0), 0);
  }
  let total = 0;
  Object.keys(player.detailStats).forEach(catKey => {
    const catObj = player.detailStats[catKey];
    Object.values(catObj).forEach(val => {
      total += (Number(val) || 0);
    });
  });
  return total;
};

// SVG アイコンコンポーネント
const Icon = ({ name, className = "w-5 h-5", size = 20 }) => {
  const icons = {
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    filter: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 01-8 0z" />,
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    zap: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
    database: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />,
    layout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />,
    grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />,
    list: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    share: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />,
    save: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    compare: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
    info: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    award: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
    sparkles: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
    sortUp: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />,
    sortDown: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />,
    brain: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />,
    tools: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />,
    star: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />,
    external: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  };

  return (
    <svg className={className} width={size} height={size} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      {icons[name] || icons.info}
    </svg>
  );
};

// 「調整中」表示用コンポーネント
function UnderAdjustmentNotice({ title, description, onGoToDB }) {
  return (
    <div className="min-h-[460px] flex flex-col items-center justify-center p-8 text-center space-y-5 glass-panel rounded-3xl border border-slate-800 animate-fadeIn my-6">
      <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-500/5">
        <Icon name="tools" className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <div className="inline-block px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-black">
          調整中
        </div>
        <h2 className="text-2xl md:text-3xl font-black font-num text-white">{title}</h2>
        <p className="text-slate-400 text-sm max-w-md mx-auto leading-relaxed">
          {description || "現在こちらの機能は調整中です。アップデートまで今しばらくお待ちください。"}
        </p>
      </div>
      {onGoToDB && (
        <button
          onClick={onGoToDB}
          className="mt-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs shadow-lg shadow-[#00FF66]/20 hover:brightness-110 flex items-center gap-2 transition-transform active:scale-95"
        >
          <Icon name="users" className="w-4 h-4" />
          選手データベースを見る
        </button>
      )}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('players');

  const getLatestPlayers = () => {
    const list = (window.INITIAL_PLAYERS && window.INITIAL_PLAYERS.length > 0)
      ? window.INITIAL_PLAYERS
      : ((window.SAKATSUKU_DATA && window.SAKATSUKU_DATA.INITIAL_PLAYERS) || INITIAL_PLAYERS || []);
    return list.map(p => ({
      ...p,
      avatarUrl: getPlayerAvatarUrl(p)
    }));
  };

  const [players, setPlayers] = useState(() => getLatestPlayers());

  useEffect(() => {
    try {
      localStorage.clear();
    } catch (e) {}
    const latest = getLatestPlayers();
    if (latest.length > 0) {
      setPlayers(latest);
    }
  }, []);

  const [managers, setManagers] = useState(() => INITIAL_MANAGERS);
  const [combos, setCombos] = useState(() => INITIAL_COMBOS);

  // 全体一括シミュレーション用レアリティ選択 ('ORIGINAL' | '☆3' | '☆3+' | '☆3++' | '☆4' | '☆4+' | '☆4++' | '☆5')
  const [simulatedGlobalRarity, setSimulatedGlobalRarity] = useState('ORIGINAL');

  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const toggleCompare = (player) => {
    setCompareList(prev => {
      const exists = prev.find(p => p.id === player.id);
      if (exists) {
        return prev.filter(p => p.id !== player.id);
      } else {
        if (prev.length >= 5) {
          alert('比較に追加できるのは最大5人までです');
          return prev;
        }
        return [...prev, player];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans pb-20 md:pb-0">
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-8 py-3">
        <div className="max-w-[1300px] w-full mx-auto flex items-center justify-between">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#00FF66] to-[#00E5FF] p-[2px] shadow-lg shadow-[#00FF66]/20">
              <div className="w-full h-full bg-[#070a10] rounded-[10px] flex items-center justify-center">
                <Icon name="shield" className="w-6 h-6 text-[#00FF66] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-num font-black text-xl md:text-2xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00E5FF] to-white">
                  サカつく2026
                </span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40">
                  DB & BUILDER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">育成シミュレーション データベース</p>
            </div>
          </div>

          <nav className="flex items-center gap-1 bg-[#0e1522]/90 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'home'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="sparkles" className="w-4 h-4" />
              ホーム
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'players'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="users" className="w-4 h-4" />
              選手DB
            </button>
            <button
              onClick={() => setActiveTab('managers')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'managers'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="award" className="w-4 h-4" />
              監督・コンボDB (調整中)
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'builder'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="layout" className="w-4 h-4" />
              チームビルダー (調整中)
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'data'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="database" className="w-4 h-4" />
              データ管理
            </button>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-[1750px] w-full mx-auto flex justify-center items-start px-2 lg:px-4 py-4 md:py-6">
        <SideAdBanner position="left" />

        <main className="flex-1 max-w-[1300px] w-full mx-auto min-w-0">
          {activeTab === 'home' && (
            <HomeTab
              players={players}
              managers={managers}
              combos={combos}
              setActiveTab={setActiveTab}
              setSelectedPlayer={setSelectedPlayer}
            />
          )}
          {activeTab === 'players' && (
            <PlayerDBTab
              players={players}
              compareList={compareList}
              toggleCompare={toggleCompare}
              setIsCompareModalOpen={setIsCompareModalOpen}
              setSelectedPlayer={setSelectedPlayer}
              simulatedGlobalRarity={simulatedGlobalRarity}
              setSimulatedGlobalRarity={setSimulatedGlobalRarity}
            />
          )}
          {activeTab === 'managers' && (
            <ManagerComboDBTab
              onGoToDB={() => setActiveTab('players')}
            />
          )}
          {activeTab === 'builder' && (
            <TeamBuilderTab
              onGoToDB={() => setActiveTab('players')}
            />
          )}
          {activeTab === 'data' && (
            <DataManagerTab
              players={players}
              setPlayers={setPlayers}
              managers={managers}
              setManagers={setManagers}
              combos={combos}
              setCombos={setCombos}
            />
          )}
        </main>

        <SideAdBanner position="right" />
      </div>

      {/* スマホ専用 固定ボトムナビゲーションバー (< md で表示) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a10]/95 border-t border-slate-800/80 backdrop-blur-xl px-1 py-1.5 flex items-center justify-around shadow-2xl">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${activeTab === 'home' ? 'text-[#00FF66] font-bold' : 'text-slate-400'}`}
        >
          <Icon name="sparkles" className="w-5 h-5" />
          <span className="text-[10px]">ホーム</span>
        </button>

        <button
          onClick={() => setActiveTab('players')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${activeTab === 'players' ? 'text-[#00FF66] font-bold' : 'text-slate-400'}`}
        >
          <Icon name="users" className="w-5 h-5" />
          <span className="text-[10px]">選手DB</span>
        </button>

        <button
          onClick={() => setActiveTab('managers')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${activeTab === 'managers' ? 'text-[#00FF66] font-bold' : 'text-slate-400'}`}
        >
          <Icon name="award" className="w-5 h-5" />
          <span className="text-[10px]">監督・コンボ</span>
        </button>

        <button
          onClick={() => setActiveTab('builder')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${activeTab === 'builder' ? 'text-[#00FF66] font-bold' : 'text-slate-400'}`}
        >
          <Icon name="layout" className="w-5 h-5" />
          <span className="text-[10px]">ビルダー</span>
        </button>

        <button
          onClick={() => setActiveTab('data')}
          className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-colors ${activeTab === 'data' ? 'text-[#00FF66] font-bold' : 'text-slate-400'}`}
        >
          <Icon name="database" className="w-5 h-5" />
          <span className="text-[10px]">データ</span>
        </button>
      </nav>

      {/* サイト最下部 フッター免責事項 & 著作権 */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/90 py-6 px-4 text-center text-xs text-slate-400 space-y-2">
        <div className="max-w-4xl mx-auto space-y-1.5 leading-relaxed">
          <p>
            プロサッカークラブをつくろう！・サカつく・サカつく2026は<a href="https://segafcchampions.sega.com/ja/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">SEGA</a>の登録商標です。
          </p>
          <p>
            当サイトは個人ファンサイトであり、<a href="https://segafcchampions.sega.com/ja/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">SEGA</a>様とは一切関係ありません。下記はサイト独自の内容に関する著作権を示すものです。
          </p>
          <p className="pt-1 text-slate-300 font-medium">
            © 2026 <a href="https://nekonira.github.io/SFCCDB/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline font-bold">NEKONIRA</a>
          </p>
        </div>
      </footer>

      {/* フローティング比較バー */}
      {compareList.length > 0 && (
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0e1522]/95 border border-[#00FF66]/50 rounded-2xl p-3 shadow-2xl shadow-[#00FF66]/20 backdrop-blur-xl flex items-center gap-4 max-w-xl w-[92%]">
          <div className="flex items-center gap-2 flex-1 overflow-x-auto py-1">
            <span className="text-xs font-bold text-[#00FF66] whitespace-nowrap pl-1">比較 ({compareList.length}/5)</span>
            <div className="flex gap-2">
              {compareList.map(p => {
                const avatar = getPlayerAvatarUrl(p);
                return (
                  <div key={p.id} className="relative group flex-shrink-0">
                    <PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 shadow-md group-hover:border-[#00FF66] transition-colors" />
                    <button
                      onClick={() => toggleCompare(p)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform"
                      title="比較から外す"
                    >
                      <Icon name="x" className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:brightness-110 whitespace-nowrap"
          >
            <Icon name="compare" className="w-4 h-4" />
            比較表
          </button>
        </div>
      )}

      {selectedPlayer && (
        <PlayerDetailModal
          player={selectedPlayer}
          onClose={() => setSelectedPlayer(null)}
          onCompareToggle={() => toggleCompare(selectedPlayer)}
          isCompared={compareList.some(p => p.id === selectedPlayer.id)}
        />
      )}

      {isCompareModalOpen && (
        <PlayerCompareModal
          compareList={compareList}
          onClose={() => setIsCompareModalOpen(false)}
          onRemove={(p) => toggleCompare(p)}
        />
      )}
    </div>
  );
}

function HomeTab({ players, managers, combos, setActiveTab, setSelectedPlayer }) {
  const topPlayers = useMemo(() => {
    return [...players].sort((a, b) => b.overall - a.overall).slice(0, 4);
  }, [players]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="relative rounded-3xl p-6 md:p-10 overflow-hidden bg-gradient-to-br from-[#0e1522] via-[#141d2e] to-[#070a10] border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00FF66]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-bold">
            <Icon name="sparkles" className="w-3.5 h-3.5" />
            サカつく2026 最新データベース
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            全選手データ & 成長シミュレーション<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00E5FF] to-white">
              ☆3〜☆5 レアリティ別能力比較
            </span>
          </h1>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('players')}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-sm shadow-lg shadow-[#00FF66]/25 hover:brightness-110 flex items-center gap-2 transition-transform active:scale-95"
            >
              <Icon name="search" className="w-5 h-5 text-slate-950" />
              選手データベースを開く
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20">
            <Icon name="users" className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-num font-black text-white">{players.length}</div>
            <div className="text-xs text-slate-400 font-semibold">登録選手数</div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Icon name="star" className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-num font-black text-white">7 段階</div>
            <div className="text-xs text-slate-400 font-semibold">レアリティ成長 (☆3〜☆5)</div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 opacity-60">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Icon name="tools" className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black font-num text-amber-400">調整中</div>
            <div className="text-xs text-slate-400 font-semibold">チームビルダー</div>
          </div>
        </div>
        <div className="glass-card p-4 rounded-2xl flex items-center gap-4 opacity-60">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Icon name="tools" className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-black font-num text-amber-400">調整中</div>
            <div className="text-xs text-slate-400 font-semibold">監督・コンボDB</div>
          </div>
        </div>
      </div>

      {/* YouTube 最新動画 (横一列スクロール) */}
      <div className="glass-panel p-4 md:p-6 rounded-3xl space-y-3 border border-red-500/30 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white flex items-center gap-1 shadow-sm">
              ▶ YouTube
            </span>
            <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-1.5">
              ねこにら サカつく2026 最新動画
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@%E3%81%AD%E3%81%93%E3%81%AB%E3%82%891/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
          >
            チャンネルを見る ↗
          </a>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
          {YOUTUBE_VIDEOS.map(video => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-44 md:w-52 bg-slate-900/90 hover:bg-slate-800/90 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all hover:scale-[1.02] shadow-md group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
                  {video.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold font-num flex items-center gap-2">
            <span className="w-2 h-5 bg-[#00FF66] rounded-full"></span>
            トップレート注目選手
          </h2>
          <button
            onClick={() => setActiveTab('players')}
            className="text-xs font-bold text-[#00FF66] hover:underline flex items-center gap-1"
          >
            全選手一覧へ →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {topPlayers.map(player => (
            <PlayerCard key={player.id} player={player} onClick={() => setSelectedPlayer(player)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function PlayerDBTab({
  players,
  compareList,
  toggleCompare,
  setIsCompareModalOpen,
  setSelectedPlayer,
  simulatedGlobalRarity,
  setSimulatedGlobalRarity
}) {
  const [searchName, setSearchName] = useState('');
  const [posFilter, setPosFilter] = useState('ALL');
  const [playStyleFilter, setPlayStyleFilter] = useState('ALL');
  const [playStyleLevelFilter, setPlayStyleLevelFilter] = useState('ALL');
  const [policyFilter, setPolicyFilter] = useState('ALL');
  const [nationalityFilter, setNationalityFilter] = useState('ALL');
  const [rarityFilter, setRarityFilter] = useState('ALL');

  const [isMaxEnhanced, setIsMaxEnhanced] = useState(false);
  const [viewMode, setViewMode] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768) ? 'grid' : 'table');

  // テーブルソート設定 state ({ key, direction: 'asc' | 'desc' })
  const [sortConfig, setSortConfig] = useState({ key: 'overall', direction: 'desc' });

  const nationalitiesList = useMemo(() => {
    const set = new Set();
    players.forEach(p => { if (p.nationality && p.nationality.trim()) set.add(p.nationality.trim()); });
    return Array.from(set).sort((a, b) => getNationalityReading(a).localeCompare(getNationalityReading(b), 'ja'));
  }, [players]);

  const handleSort = (key) => {
    setSortConfig(prev => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { key, direction: (key === 'nationality' || key === 'name' || key === 'pos' || key === 'policy') ? 'asc' : 'desc' };
    });
  };

  const filteredPlayers = useMemo(() => {
    const list = players.map(p => {
      const targetR = simulatedGlobalRarity === 'ORIGINAL' ? null : simulatedGlobalRarity;
      return getAdjustedPlayer(p, targetR, isMaxEnhanced);
    }).filter(p => {
      // 1. 選手名・読み検索
      if (searchName) {
        const query = searchName.toLowerCase().trim();
        const matchName = (p.name || '').toLowerCase().includes(query);
        const matchReading = p.readingName ? p.readingName.toLowerCase().includes(query) : false;
        if (!matchName && !matchReading) return false;
      }

      // 2. ポジションフィルター（主・サブポジション及び同義表記LSB/LFB, RSB/RFBの柔軟判定）
      if (posFilter !== 'ALL') {
        const pMain = p.mainPosition || '';
        const pSubs = p.subPositions || [];
        const allPos = [pMain, ...pSubs];
        const hasPos = allPos.some(pos => {
          if (!pos) return false;
                    if (pos === posFilter) return true;
          if ((posFilter === 'DM') && (pos === 'DM' || pos === 'DMF' || pos === 'CMF')) return true;
          if ((posFilter === 'AM') && (pos === 'AM' || pos === 'OMF')) return true;
          if ((posFilter === 'LM') && (pos === 'LM' || pos === 'LMF' || (pos === 'SMF' && p.category === 'MF'))) return true;
          if ((posFilter === 'RM') && (pos === 'RM' || pos === 'RMF' || (pos === 'SMF' && p.category === 'MF'))) return true;
          if ((posFilter === 'LFB' || posFilter === 'LSB') && (pos === 'LFB' || pos === 'LSB')) return true;
          if ((posFilter === 'RFB' || posFilter === 'RSB') && (pos === 'RFB' || pos === 'RSB')) return true;
          if ((posFilter === 'LW' || posFilter === 'LWG') && (pos === 'LW' || pos === 'LWG')) return true;
          if ((posFilter === 'RW' || posFilter === 'RWG') && (pos === 'RW' || pos === 'RWG')) return true;
          return false;
        });
        if (!hasPos) return false;
      }

      // 3. プレースタイルフィルター（主・サブプレースタイルの柔軟判定）
      if (playStyleFilter !== 'ALL') {
        const pStyle = p.playStyle || '';
        const pSubStyles = p.subPlayStyles || [];
        const allStyles = [pStyle, ...pSubStyles];
        const hasStyle = allStyles.some(s => {
          if (!s) return false;
          if (s === playStyleFilter) return true;
          if (playStyleFilter === 'ストライカー' && s.includes('ワイドストライカー')) return false;
          if (playStyleFilter === 'アタッカー' && s.includes('サイドアタッカー')) return false;
          return s.includes(playStyleFilter);
        });
        if (!hasStyle) return false;
      }

      // 4. プレースタイルレベルフィルター
      if (playStyleLevelFilter !== 'ALL') {
        const pLevel = String(p.playStyleLevel || '').trim();
        const fLevel = String(playStyleLevelFilter).trim();
        if (pLevel !== fLevel && !pLevel.includes(fLevel)) return false;
      }

      // 5. ポリシーフィルター（柔軟判定）
      if (policyFilter !== 'ALL') {
        const pPol = p.policy || '';
        if (pPol !== policyFilter && !pPol.includes(policyFilter)) return false;
      }

      // 6. 国籍フィルター（厳密・正確判定）
      if (nationalityFilter !== 'ALL') {
        const pNat = (p.nationality || '').trim();
        const fNat = nationalityFilter.trim();
        if (pNat !== fNat) return false;
      }

      // 7. レアリティフィルター
      if (rarityFilter !== 'ALL' && p.rarity !== rarityFilter) return false;

      return true;
    });

    // ポジション標準ソート順
    const POS_ORDER = {
      'GK': 1,
      'CB': 2,
      'LFB': 3, 'LSB': 3,
      'RFB': 4, 'RSB': 4,
      'DM': 5, 'DMF': 5, 'CMF': 5,
      'LM': 6, 'LMF': 6,
      'RM': 7, 'RMF': 7,
      'AM': 8, 'OMF': 8,
      'LW': 9, 'LWG': 9,
      'RW': 10, 'RWG': 10,
      'CF': 11, 'ST': 11
    };

    const multiplier = sortConfig.direction === 'asc' ? 1 : -1;

    // ソート処理（浅いコピーを作成して安定ソート）
    return [...list].sort((a, b) => {
      let primaryResult = 0;

      switch (sortConfig.key) {
        case 'playStyle': {
          const styleA = a.playStyle || '';
          const styleB = b.playStyle || '';
          primaryResult = styleA.localeCompare(styleB, 'ja');
          break;
        }
        case 'playStyleLevel': {
          const levelMap = { 'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5 };
          const lvlA = levelMap[a.playStyleLevel] || parseInt(a.playStyleLevel) || 0;
          const lvlB = levelMap[b.playStyleLevel] || parseInt(b.playStyleLevel) || 0;
          primaryResult = lvlA - lvlB;
          break;
        }
        case 'name': {
          const nameA = a.readingName || a.name || '';
          const nameB = b.readingName || b.name || '';
          primaryResult = nameA.localeCompare(nameB, 'ja');
          break;
        }
        case 'pos': {
          const orderA = POS_ORDER[a.mainPosition] || 99;
          const orderB = POS_ORDER[b.mainPosition] || 99;
          primaryResult = orderA - orderB;
          break;
        }
        case 'nationality': {
          const natA = (a.nationality || 'その他').trim();
          const natB = (b.nationality || 'その他').trim();
          if (natA !== natB) {
            const readA = getNationalityReading(natA);
            const readB = getNationalityReading(natB);
            primaryResult = readA.localeCompare(readB, 'ja');
          } else {
            primaryResult = 0;
          }
          break;
        }
        case 'overall': {
          primaryResult = (a.overall || 0) - (b.overall || 0);
          break;
        }
        case 'totalStats18': {
          const totA = getPlayerTotalStats18(a);
          const totB = getPlayerTotalStats18(b);
          primaryResult = totA - totB;
          break;
        }
        case 'policy': {
          const polA = a.policy || '';
          const polB = b.policy || '';
          primaryResult = polA.localeCompare(polB, 'ja');
          break;
        }
        case 'shoot':
        case 'pass':
        case 'dribble':
        case 'defense':
        case 'physical':
        case 'speed': {
          const statA = getCategoryTotal(a, sortConfig.key);
          const statB = getCategoryTotal(b, sortConfig.key);
          primaryResult = statA - statB;
          break;
        }
        default: {
          primaryResult = (a.overall || 0) - (b.overall || 0);
        }
      }

      if (primaryResult !== 0) {
        return primaryResult * multiplier;
      }

      // --- タイブレーク（同点時のサブソート） ---
      // 第2ソート：カタログ総合値(overall) 降順
      if (sortConfig.key !== 'overall') {
        const overallDiff = (b.overall || 0) - (a.overall || 0);
        if (overallDiff !== 0) return overallDiff;
      }

      // 第3ソート：合計実数値(totalStats18) 降順
      if (sortConfig.key !== 'totalStats18') {
        const totDiff = getPlayerTotalStats18(b) - getPlayerTotalStats18(a);
        if (totDiff !== 0) return totDiff;
      }

      // 第4ソート：名前 昇順
      const finalNameA = a.readingName || a.name || '';
      const finalNameB = b.readingName || b.name || '';
      return finalNameA.localeCompare(finalNameB, 'ja');
    });
  }, [players, searchName, posFilter, playStyleFilter, playStyleLevelFilter, policyFilter, nationalityFilter, rarityFilter, sortConfig, simulatedGlobalRarity, isMaxEnhanced]);

  const renderSortIndicator = (key) => {
    if (sortConfig.key !== key) return <span className="text-slate-600 ml-1">↕</span>;
    return sortConfig.direction === 'asc' ?
      <Icon name="sortUp" className="w-4 h-4 inline text-[#00FF66] ml-0.5" /> :
      <Icon name="sortDown" className="w-4 h-4 inline text-[#00FF66] ml-0.5" />;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* YouTube 最新動画 (横一列スクロール) */}
      <div className="glass-panel p-4 rounded-2xl space-y-3 border border-red-500/30 bg-slate-900/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-xs font-black bg-red-600 text-white flex items-center gap-1 shadow-sm">
              ▶ YouTube
            </span>
            <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-1.5">
              ねこにら サカつく2026 最新動画
            </h3>
          </div>
          <a
            href="https://www.youtube.com/@%E3%81%AD%E3%81%93%E3%81%AB%E3%82%891/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-red-400 hover:text-red-300 hover:underline flex items-center gap-1"
          >
            チャンネルを見る ↗
          </a>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin scrollbar-thumb-slate-700">
          {YOUTUBE_VIDEOS.map(video => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-44 md:w-52 bg-slate-900/90 hover:bg-slate-800/90 rounded-xl overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all hover:scale-[1.02] shadow-md group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-between">
                <p className="text-xs font-bold text-slate-200 group-hover:text-white line-clamp-2 leading-snug">
                  {video.title}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0e1522] p-4 md:p-6 rounded-3xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-black font-num flex items-center gap-2">
            <Icon name="users" className="w-7 h-7 text-[#00FF66]" />
            選手データベース
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* ✨ 強化ステータス (初期値 vs 最大強化) 切替ボタン */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-orange-500/40">
            <button
              onClick={() => setIsMaxEnhanced(false)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isMaxEnhanced
                ? 'bg-slate-800 text-slate-100 shadow border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              🌱 初期値
            </button>
            <button
              onClick={() => setIsMaxEnhanced(true)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${isMaxEnhanced
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                : 'text-orange-400 hover:text-orange-300'
                }`}
            >
              🔥 最大強化
            </button>
          </div>

          {/* 一括レアリティシミュレーション選択切替 (最大強化時は☆5固定) */}
          <div className={`flex items-center gap-2 bg-slate-900/90 px-3 py-1.5 rounded-xl border transition-opacity ${isMaxEnhanced ? 'border-orange-500/60 opacity-90' : 'border-amber-500/40'
            }`}>
            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1">
              <Icon name="star" className="w-3.5 h-3.5 text-amber-400" />
              一括成長シミュレート:
            </span>
            {isMaxEnhanced ? (
              <span className="text-xs font-num font-black text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/40">
                ☆5 (最大強化固定)
              </span>
            ) : (
              <select
                value={simulatedGlobalRarity}
                onChange={e => setSimulatedGlobalRarity(e.target.value)}
                className="bg-slate-800 border border-slate-700 rounded-lg px-2 py-1 text-xs font-num font-bold text-white focus:outline-none focus:border-amber-400"
              >
                <option value="ORIGINAL">基準（デフォルト）</option>
                {RARITIES.map(r => (
                  <option key={r} value={r}>{r} 段階能力</option>
                ))}
              </select>
            )}
          </div>

          <div className="flex items-center gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'table' ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40' : 'text-slate-400'
                }`}
            >
              <Icon name="list" className="w-4 h-4" />
              テーブル (一覧)
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors ${viewMode === 'grid' ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40' : 'text-slate-400'
                }`}
            >
              <Icon name="grid" className="w-4 h-4" />
              カード
            </button>
          </div>
        </div>
      </div>

      <div className="glass-panel p-4 rounded-2xl space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs font-bold text-slate-400 mb-1 block">選手名・読み検索</label>
            <div className="relative">
              <Icon name="search" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="例: メッシ, みとま..."
                value={searchName}
                onChange={e => setSearchName(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">国籍 フィルター</label>
            <select
              value={nationalityFilter}
              onChange={e => setNationalityFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて (国籍)</option>
              {nationalitiesList.map(nat => <option key={nat} value={nat}>{nat}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">並び替え (ソート)</label>
            <select
              value={sortConfig.key}
              onChange={e => setSortConfig({ key: e.target.value, direction: (e.target.value === 'nationality' || e.target.value === 'name' || e.target.value === 'pos' || e.target.value === 'playStyle') ? 'asc' : 'desc' })}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs font-bold text-[#00FF66] focus:outline-none focus:border-[#00FF66]"
            >
              <option value="overall">カタログ総合力 順</option>
              <option value="totalStats18">合計実数値 順</option>
              <option value="nationality">国籍 順 🌐</option>
              <option value="name">選手名 順</option>
              <option value="pos">ポジション 順</option>
              <option value="playStyle">プレースタイル 順</option>
              <option value="playStyleLevel">プレースタイルLV 順</option>
              <option value="policy">ポリシー 順</option>
              <option value="shoot">シュート (SHO) 順</option>
              <option value="pass">パス (PAS) 順</option>
              <option value="dribble">ドリブル (DRB) 順</option>
              <option value="defense">ディフェンス (DEF) 順</option>
              <option value="physical">フィジカル (PHY) 順</option>
              <option value="speed">スピード (SPD) 順</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">ポジション</label>
            <select
              value={posFilter}
              onChange={e => setPosFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて (ALL)</option>
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">プレースタイル</label>
            <select
              value={playStyleFilter}
              onChange={e => setPlayStyleFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて</option>
              {PLAY_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">プレースタイルLV</label>
            <select
              value={playStyleLevelFilter}
              onChange={e => setPlayStyleLevelFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて (LV.Ⅰ〜Ⅲ)</option>
              {PLAY_STYLE_LEVELS.map(lvl => <option key={lvl} value={lvl}>LV.{lvl}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 mb-1 block">ポリシー</label>
            <select
              value={policyFilter}
              onChange={e => setPolicyFilter(e.target.value)}
              className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-[#00FF66]"
            >
              <option value="ALL">すべて</option>
              {POLICIES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
        <span>ヒット件数: <strong className="text-white text-base font-num">{filteredPlayers.length}</strong> 件</span>
        {(searchName || posFilter !== 'ALL' || playStyleFilter !== 'ALL' || playStyleLevelFilter !== 'ALL' || policyFilter !== 'ALL' || nationalityFilter !== 'ALL' || rarityFilter !== 'ALL' || simulatedGlobalRarity !== 'ORIGINAL') && (
          <button
            onClick={() => {
              setSearchName(''); setPosFilter('ALL'); setPlayStyleFilter('ALL'); setPlayStyleLevelFilter('ALL'); setPolicyFilter('ALL'); setNationalityFilter('ALL'); setRarityFilter('ALL'); setSimulatedGlobalRarity('ORIGINAL'); setSortConfig({ key: 'overall', direction: 'desc' });
            }}
            className="text-red-400 hover:underline flex items-center gap-1"
          >
            <Icon name="x" className="w-3.5 h-3.5" />
            フィルターリセット
          </button>
        )}
      </div>

      {viewMode === 'table' ? (
        <>
          {/* モバイル専用: 横スクロール不要・画面幅100%フィット コンパクトリスト表示 */}
          <div className="md:hidden space-y-2.5">
            {filteredPlayers.map((p, idx) => {
              const isCompared = compareList.some(item => item.id === p.id);
              const avatar = getPlayerAvatarUrl(p);
              const totalStats = getPlayerTotalStats18(p);

              return (
                <div
                  key={`${p.id}_mb_${idx}`}
                  onClick={() => setSelectedPlayer(p)}
                  className={`glass-panel p-3 rounded-2xl border transition-all flex items-center justify-between gap-2.5 cursor-pointer active:scale-[0.99] ${isCompared
                    ? 'border-[#00FF66] bg-[#00FF66]/10 shadow-lg shadow-[#00FF66]/10'
                    : 'border-slate-800 bg-slate-900/80 hover:border-slate-700'
                    }`}
                >
                  {/* アバター & 基本情報 */}
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <PlayerAvatar player={p} className="w-12 h-16 rounded-xl object-contain bg-slate-950 border border-slate-700 flex-shrink-0 shadow-md" />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-num font-black bg-slate-900 text-[#00FF66] border border-[#00FF66]/30">
                          {p.mainPosition}
                        </span>
                        <span className="text-[10px] font-num font-extrabold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
                          {p.rarity}
                        </span>
                        {p.nationality && (
                          <span className="text-[10px] text-slate-400 font-semibold truncate">
                            🌐 {p.nationality}
                          </span>
                        )}
                      </div>
                      <div className="font-black text-sm text-white truncate mt-1">{p.name}</div>
                      <div className="text-[10px] text-purple-300 font-bold truncate mt-0.5">
                        {p.playStyle || 'スタイル未設定'} <span className="text-[#00FF66]">LV.{p.playStyleLevel}</span>
                      </div>
                    </div>
                  </div>

                  {/* 数値バッジ & 比較ボタン */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className="text-center bg-slate-950/90 px-2 py-1 rounded-xl border border-slate-800">
                      <div className="text-[8px] text-slate-400 font-extrabold uppercase tracking-tight">カタログ</div>
                      <div className="text-sm font-black font-num text-[#00FF66]">{p.overall}</div>
                    </div>
                    <div className="text-center bg-slate-950/90 px-2 py-1 rounded-xl border border-slate-800">
                      <div className="text-[8px] text-slate-400 font-extrabold uppercase tracking-tight">合計実数値</div>
                      <div className="text-sm font-black font-num text-[#00E5FF]">{totalStats}</div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleCompare(p);
                      }}
                      className={`p-2 rounded-xl text-xs font-bold transition-all ${isCompared
                        ? 'bg-[#00FF66] text-slate-950 shadow-md shadow-[#00FF66]/20'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                        }`}
                      title="比較表に追加"
                    >
                      <Icon name="compare" className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* デスクトップ専用: フル15列 ソート可能テーブル */}
          <div className="hidden md:block glass-panel rounded-2xl overflow-x-auto border border-slate-800 shadow-xl w-full">
            <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800 font-bold uppercase select-none">
              <tr>
                <th className="py-3 px-2 text-center w-10 whitespace-nowrap">比較</th>
                <th onClick={() => handleSort('name')} className="py-3 px-3 cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                  選手名 {renderSortIndicator('name')}
                </th>
                <th onClick={() => handleSort('pos')} className="py-3 px-2 cursor-pointer hover:text-white transition-colors text-center whitespace-nowrap">
                  POS {renderSortIndicator('pos')}
                </th>
                <th onClick={() => handleSort('nationality')} className="py-3 px-2 cursor-pointer hover:text-white transition-colors text-center whitespace-nowrap">
                  国籍 {renderSortIndicator('nationality')}
                </th>
                <th onClick={() => handleSort('playStyle')} className="py-3 px-2 cursor-pointer hover:text-white transition-colors whitespace-nowrap">
                  プレースタイル & LV {renderSortIndicator('playStyle')}
                </th>
                <th onClick={() => handleSort('overall')} className="py-3 px-2 cursor-pointer hover:text-[#00FF66] transition-colors text-center text-sm whitespace-nowrap">
                  カタログ {renderSortIndicator('overall')}
                </th>
                <th onClick={() => handleSort('totalStats18')} className="py-3 px-2 cursor-pointer hover:text-[#00E5FF] transition-colors text-center text-sm whitespace-nowrap">
                  合計実数値 {renderSortIndicator('totalStats18')}
                </th>
                <th onClick={() => handleSort('policy')} className="py-3 px-3 cursor-pointer hover:text-white transition-colors text-center whitespace-nowrap">
                  ポリシー {renderSortIndicator('policy')}
                </th>
                <th onClick={() => handleSort('shoot')} className="py-3 px-1.5 cursor-pointer hover:text-[#00FF66] transition-colors text-center whitespace-nowrap">
                  SHO {renderSortIndicator('shoot')}
                </th>
                <th onClick={() => handleSort('pass')} className="py-3 px-1.5 cursor-pointer hover:text-[#00FF66] transition-colors text-center whitespace-nowrap">
                  PAS {renderSortIndicator('pass')}
                </th>
                <th onClick={() => handleSort('dribble')} className="py-3 px-1.5 cursor-pointer hover:text-[#00FF66] transition-colors text-center whitespace-nowrap">
                  DRB {renderSortIndicator('dribble')}
                </th>
                <th onClick={() => handleSort('defense')} className="py-3 px-1.5 cursor-pointer hover:text-[#00FF66] transition-colors text-center whitespace-nowrap">
                  DEF {renderSortIndicator('defense')}
                </th>
                <th onClick={() => handleSort('physical')} className="py-3 px-1.5 cursor-pointer hover:text-[#00FF66] transition-colors text-center whitespace-nowrap">
                  PHY {renderSortIndicator('physical')}
                </th>
                <th onClick={() => handleSort('speed')} className="py-3 px-1.5 cursor-pointer hover:text-white transition-colors text-center whitespace-nowrap">
                  SPD {renderSortIndicator('speed')}
                </th>
                <th className="py-3 px-3 text-right whitespace-nowrap">詳細</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredPlayers.map((p, idx) => {
                const isCompared = compareList.some(item => item.id === p.id);
                const skill = getPlayerSkill(p);
                const avatar = getPlayerAvatarUrl(p);

                return (
                  <tr
                    key={`${p.id}_${idx}`}
                    className={`transition-colors cursor-pointer ${isCompared
                      ? 'bg-[#00FF66]/10 border-l-4 border-l-[#00FF66] hover:bg-[#00FF66]/15'
                      : 'hover:bg-slate-800/40'
                      }`}
                    onClick={() => toggleCompare(p)}
                  >
                    <td className="py-3 px-2 text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => toggleCompare(p)}
                        className={`w-6 h-6 rounded mx-auto flex items-center justify-center transition-all ${isCompared
                          ? 'bg-[#00FF66] text-slate-950 shadow-md shadow-[#00FF66]/30'
                          : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
                          }`}
                        title="比較対象に追加/解除"
                      >
                        {isCompared ? <Icon name="check" className="w-4 h-4" /> : <Icon name="plus" className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 flex-shrink-0" />
                        <div>
                          <div className="font-bold text-white text-sm flex items-center gap-1.5">
                            <span>{p.name}</span>
                            <span className="text-xs text-amber-400 font-num font-bold bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/30">
                              {p.rarity}
                            </span>
                          </div>
                          {skill && (
                            <div className="text-[10px] mt-0.5">
                              <span className={`px-1 py-0.2 rounded text-[9px] ${getRankBadgeStyle(skill.rank)}`}>
                                {skill.name}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded font-black text-xs bg-slate-800 text-[#00FF66] font-num">
                        {p.mainPosition}{p.subPositions && p.subPositions.length > 0 ? ` / ${p.subPositions.join(' / ')}` : ''}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-xs font-semibold text-slate-300 whitespace-nowrap">
                      {p.nationality || '-'}
                    </td>
                    <td className="py-3 px-2 text-slate-300 text-xs whitespace-nowrap">
                      {p.playStyle}{p.subPlayStyles && p.subPlayStyles.length > 0 ? ` / ${p.subPlayStyles.join(' / ')}` : ''} <span className="text-[#00FF66] font-num font-bold">LV.{p.playStyleLevel}</span>
                    </td>
                    <td className="py-3 px-2 text-center font-num font-black text-lg md:text-xl text-[#00FF66] whitespace-nowrap">{p.overall}</td>
                    <td className="py-3 px-2 text-center font-num font-black text-lg md:text-xl text-[#00E5FF] whitespace-nowrap">{getPlayerTotalStats18(p).toLocaleString()}</td>
                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <span className={`${getPolicyTextColor(p.policy)} font-bold whitespace-nowrap`}>{p.policy}</span>
                    </td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'shoot')}</td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'pass')}</td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'dribble')}</td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'defense')}</td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'physical')}</td>
                    <td className="py-3 px-1.5 text-center font-num font-extrabold text-sm md:text-base text-white">{getCategoryTotal(p, 'speed')}</td>
                    <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => setSelectedPlayer(p)}
                        className="px-2.5 py-1.5 rounded text-xs font-bold bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF]/30 border border-[#00E5FF]/30"
                      >
                        詳細
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredPlayers.map((player, idx) => (
            <PlayerCard
              key={`${player.id}_${idx}`}
              player={player}
              onClick={() => setSelectedPlayer(player)}
              onCompareToggle={() => toggleCompare(player)}
              isCompared={compareList.some(p => p.id === player.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PlayerCard({ player, onClick, onCompareToggle, isCompared }) {
  const totalStats18 = getPlayerTotalStats18(player);

  const shoTot = getCategoryTotal(player, 'shoot');
  const pasTot = getCategoryTotal(player, 'pass');
  const drbTot = getCategoryTotal(player, 'dribble');
  const defTot = getCategoryTotal(player, 'defense');
  const phyTot = getCategoryTotal(player, 'physical');
  const spdTot = getCategoryTotal(player, 'speed');

  const skill = getPlayerSkill(player);
  const abilities = getPlayerAbilities(player);
  const avatar = getPlayerAvatarUrl(player);

  return (
    <div
      onClick={onClick}
      className="glass-card p-4.5 rounded-2xl flex flex-col justify-between cursor-pointer relative group border border-slate-800 hover:border-[#00FF66]/50"
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded text-xs font-num font-black bg-slate-900 text-[#00FF66] border border-[#00FF66]/30">
              {player.mainPosition}{player.subPositions && player.subPositions.length > 0 ? ` / ${player.subPositions.join(' / ')}` : ''}
            </span>
            <span className="text-xs font-num font-extrabold text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded border border-amber-400/30">
              {player.rarity}
            </span>
          </div>

          {onCompareToggle && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCompareToggle();
              }}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all ${isCompared
                ? 'bg-[#00FF66] text-slate-950 shadow-md shadow-[#00FF66]/30'
                : 'bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              title="比較対象に追加"
            >
              <Icon name="compare" className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 mb-3">
          <PlayerAvatar player={player} className="w-16 h-22 rounded-xl object-contain bg-slate-950/90 border-2 border-slate-700 group-hover:border-[#00FF66] transition-colors shadow-lg" />
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-base text-white group-hover:text-[#00FF66] transition-colors leading-tight truncate">
              {player.name}
            </h3>
            <div className="text-xs text-purple-300 font-medium mt-0.5">
              {player.playStyle} <span className="text-[#00FF66] font-num font-bold">LV.{player.playStyleLevel}</span>
            </div>
            <div className={`text-xs ${getPolicyTextColor(player.policy)}`}>
              {player.policy}
            </div>
          </div>
        </div>

        {/* 所持スキル & アビリティのバッジ表示 */}
        <div className="space-y-1.5 mb-3 bg-slate-950/60 p-2 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[9px] font-bold text-slate-400">スキル:</span>
            <span className={`px-2 py-0.5 rounded text-[10px] ${getRankBadgeStyle(skill.rank)}`}>
              [{skill.rank}] {skill.name}
            </span>
          </div>
          <div className="flex items-center gap-1 flex-wrap">
            <span className="text-[9px] font-bold text-slate-400">アビリティ:</span>
            {abilities.map((ab, i) => (
              <span key={i} className={`px-1.5 py-0.2 rounded text-[9px] ${getRankBadgeStyle(ab.rank)}`}>
                {ab.name}
              </span>
            ))}
          </div>
        </div>

        {/* カタログ総合力 & 18項目能力合計実数値 */}
        <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 mb-3 text-center">
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">カタログ総合力</div>
            <div className="text-xl md:text-2xl font-num font-black text-[#00FF66] mt-0.5">
              {player.overall}
            </div>
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase">能力合計実数値</div>
            <div className="text-xl md:text-2xl font-num font-black text-[#00E5FF] mt-0.5">
              {totalStats18.toLocaleString()}
            </div>
          </div>
        </div>

        {/* 主要6能力（大文字数値） */}
        <div className="grid grid-cols-3 gap-1.5 text-xs font-semibold text-slate-300">
          <div className="bg-slate-900/70 p-1.5 rounded text-center">SHO <strong className="text-white text-sm md:text-base font-num font-black block">{shoTot}</strong></div>
          <div className="bg-slate-900/70 p-1.5 rounded text-center">PAS <strong className="text-white text-sm md:text-base font-num font-black block">{pasTot}</strong></div>
          <div className="bg-slate-900/70 p-1.5 rounded text-center">DRB <strong className="text-white text-sm md:text-base font-num font-black block">{drbTot}</strong></div>
          <div className="bg-slate-900/70 p-1.5 rounded text-center">DEF <strong className="text-white text-sm md:text-base font-num font-black block">{defTot}</strong></div>
          <div className="bg-slate-900/70 p-1.5 rounded text-center">PHY <strong className="text-white text-sm md:text-base font-num font-black block">{phyTot}</strong></div>
          <div className="bg-slate-900/70 p-1.5 rounded text-center">SPD <strong className="text-white text-sm md:text-base font-num font-black block">{spdTot}</strong></div>
        </div>
      </div>
    </div>
  );
}

function ManagerComboDBTab({ onGoToDB }) {
  return (
    <UnderAdjustmentNotice
      title="監督・コンボデータベース (調整中)"
      description="現在こちらの機能はアップデートのため調整中です。選手データベースをぜひご利用ください。"
      onGoToDB={onGoToDB}
    />
  );
}

function TeamBuilderTab({ onGoToDB }) {
  return (
    <UnderAdjustmentNotice
      title="チームビルダー (調整中)"
      description="現在こちらの機能はフォーメーションロジック調整中です。公開まで今しばらくお待ちください。"
      onGoToDB={onGoToDB}
    />
  );
}

function DataManagerTab({ players, setPlayers, managers, setManagers, combos, setCombos }) {
  const exportData = () => {
    const data = { players, managers, combos };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sakatsuku2026_db_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
  };

  const importData = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.players) setPlayers(data.players);
        if (data.managers) setManagers(data.managers);
        if (data.combos) setCombos(data.combos);
        alert('データベースを正常にインポートしました！');
      } catch (err) {
        alert('JSONファイルの解析に失敗しました。');
      }
    };
    reader.readAsText(file);
  };

  const resetToDefault = () => {
    if (confirm('すべてのデータおよびカスタム保存編成を初期化しますか？')) {
      localStorage.clear();
      setPlayers(INITIAL_PLAYERS);
      setManagers(INITIAL_MANAGERS);
      setCombos(INITIAL_COMBOS);
      alert('初期データにリセットしました。');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-[#0e1522] p-4 md:p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-black font-num flex items-center gap-2">
          <Icon name="database" className="w-7 h-7 text-[#00FF66]" />
          データ管理 & 拡張機能
        </h2>
        <p className="text-xs text-slate-400 mt-1">JSONデータのエクスポート/インポート・キャッシュ管理</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <Icon name="download" className="w-8 h-8 text-[#00FF66]" />
          <h3 className="font-extrabold text-lg">JSONエクスポート</h3>
          <p className="text-xs text-slate-400">現在登録されている全選手データをJSONファイルとして保存します。</p>
          <button
            onClick={exportData}
            className="w-full py-3 bg-[#00FF66]/20 hover:bg-[#00FF66]/30 text-[#00FF66] font-extrabold text-xs rounded-xl border border-[#00FF66]/40 flex items-center justify-center gap-2"
          >
            バックアップ作成
          </button>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <Icon name="upload" className="w-8 h-8 text-[#00E5FF]" />
          <h3 className="font-extrabold text-lg">JSONインポート</h3>
          <p className="text-xs text-slate-400">外部からカスタムデータ（JSON）を取り込みデータベースを更新します。</p>
          <label className="w-full py-3 bg-[#00E5FF]/20 hover:bg-[#00E5FF]/30 text-[#00E5FF] font-extrabold text-xs rounded-xl border border-[#00E5FF]/40 flex items-center justify-center gap-2 cursor-pointer">
            ファイルを選択
            <input type="file" accept=".json" onChange={importData} className="hidden" />
          </label>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
          <Icon name="x" className="w-8 h-8 text-red-400" />
          <h3 className="font-extrabold text-lg">初期リセット</h3>
          <p className="text-xs text-slate-400">LocalStorage のキャッシュを消去し、デフォルトの初期データに復元します。</p>
          <button
            onClick={resetToDefault}
            className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 font-extrabold text-xs rounded-xl border border-red-500/40"
          >
            初期化実行
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODAL: 選手詳細 (カタログ総合力・18項目詳細能力・プレー意識14項目・🌟 レアリティ成長シミュレーター・金銀銅ノーマルスキル＆アビリティ)
// ─────────────────────────────────────────────────────────────
function PlayerDetailModal({ player, onClose, onCompareToggle, isCompared }) {
  const [activeTab, setActiveTab] = useState('summary');
  const [selectedRarity, setSelectedRarity] = useState(player.rarity || '☆3');
  const [isMaxEnhanced, setIsMaxEnhanced] = useState(player.isMaxEnhanced || false);

  // レアリティ成長・育成状態反映プレイヤー
  const adjustedPlayer = useMemo(() => {
    return getAdjustedPlayer(player, selectedRarity, isMaxEnhanced);
  }, [player, selectedRarity, isMaxEnhanced]);

  const totalStats18 = getPlayerTotalStats18(adjustedPlayer);
  const skill = getPlayerSkill(adjustedPlayer);
  const abilities = getPlayerAbilities(adjustedPlayer);
  const avatar = getPlayerAvatarUrl(adjustedPlayer);

  const isGK = adjustedPlayer.mainPosition === 'GK' || adjustedPlayer.category === 'GK';

  const detailBreakdown = [
    {
      key: 'shoot', catName: 'SHO', label: 'シュート (SHO)', items: [
        { name: '決定力', val: adjustedPlayer.detailStats?.shoot?.finishing || 0 },
        { name: 'キック力', val: adjustedPlayer.detailStats?.shoot?.power || 0 },
        { name: '冷静さ', val: adjustedPlayer.detailStats?.shoot?.composure || 0 }
      ]
    },
    {
      key: 'pass', catName: 'PAS', label: 'パス (PAS)', items: [
        { name: 'ショートパス', val: adjustedPlayer.detailStats?.pass?.shortPass || 0 },
        { name: 'ロングパス', val: adjustedPlayer.detailStats?.pass?.longPass || 0 },
        { name: 'キック精度', val: adjustedPlayer.detailStats?.pass?.accuracy || 0 }
      ]
    },
    {
      key: 'dribble', catName: 'DRB', label: 'ドリブル (DRB)', items: [
        { name: '突破力', val: adjustedPlayer.detailStats?.dribble?.breakout || 0 },
        { name: 'キープ力', val: adjustedPlayer.detailStats?.dribble?.keeping || 0 },
        { name: 'ボールタッチ', val: adjustedPlayer.detailStats?.dribble?.ballTouch || 0 }
      ]
    },
    {
      key: 'defense', catName: 'DEF', label: isGK ? 'GK能力 (DEF)' : 'ディフェンス (DEF)', items: [
        { name: isGK ? 'セービング' : 'タックル', val: adjustedPlayer.detailStats?.defense?.tackle || 0 },
        { name: isGK ? '反応速度' : 'パスカット', val: adjustedPlayer.detailStats?.defense?.interception || 0 },
        { name: isGK ? '1対1' : 'マーク', val: adjustedPlayer.detailStats?.defense?.marking || 0 }
      ]
    },
    {
      key: 'physical', catName: 'PHY', label: 'フィジカル (PHY)', items: [
        { name: 'ジャンプ', val: adjustedPlayer.detailStats?.physical?.jumping || 0 },
        { name: 'コンタクト', val: adjustedPlayer.detailStats?.physical?.contact || 0 },
        { name: 'スタミナ', val: adjustedPlayer.detailStats?.physical?.stamina || 0 }
      ]
    },
    {
      key: 'speed', catName: 'SPD', label: 'スピード (SPD)', items: [
        { name: '走力', val: adjustedPlayer.detailStats?.speed?.running || 0 },
        { name: '敏捷性', val: adjustedPlayer.detailStats?.speed?.agility || 0 }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="max-w-[1750px] w-full mx-auto flex justify-between items-center px-2 lg:px-4 my-auto">
        <SideAdBanner position="left" />

        <div className="glass-panel max-w-2xl w-full mx-auto rounded-3xl border border-slate-700 p-4 md:p-6 space-y-5 max-h-[90vh] overflow-y-auto animate-fadeIn flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <PlayerAvatar player={adjustedPlayer} className="w-24 h-32 md:w-28 md:h-36 rounded-2xl object-contain bg-slate-950/90 border-2 border-[#00FF66] shadow-2xl" />
            <div>
              <div className="text-xs font-extrabold text-amber-400 flex items-center gap-2 font-num">
                <span className="bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/40 text-amber-300">
                  {adjustedPlayer.rarity}
                </span>
                <span>•</span>
                <span>{adjustedPlayer.mainPosition}{adjustedPlayer.subPositions && adjustedPlayer.subPositions.length > 0 ? ` / ${adjustedPlayer.subPositions.join(' / ')}` : ''}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-white">{adjustedPlayer.name}</h2>
              <div className="text-xs text-slate-400 font-medium">{adjustedPlayer.nationality}</div>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <Icon name="x" className="w-6 h-6" />
          </button>
        </div>

        {/* 育成状態切替（初期値 / 最大強化） */}
        {player.maxEnhanced && (
          <div className="flex items-center justify-between bg-slate-900/90 p-3 rounded-2xl border border-orange-500/40">
            <span className="text-xs font-extrabold text-orange-400 flex items-center gap-1.5">
              <Icon name="sparkles" className="w-4 h-4 text-orange-400" />
              育成レベル表示切り替え
            </span>
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => setIsMaxEnhanced(false)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!isMaxEnhanced
                  ? 'bg-slate-800 text-slate-100 shadow border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200'
                  }`}
              >
                🌱 無育成 (初期値)
              </button>
              <button
                onClick={() => setIsMaxEnhanced(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${isMaxEnhanced
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                  : 'text-orange-400 hover:text-orange-300'
                  }`}
              >
                🔥 最大強化
              </button>
            </div>
          </div>
        )}

        {/* 🌟 成長・レアリティ段階切替シミュレーター */}
        <div className={`bg-slate-900/90 p-3.5 rounded-2xl border space-y-2 transition-all ${isMaxEnhanced ? 'border-orange-500/40' : 'border-amber-500/40'
          }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
              <Icon name="star" className="w-4 h-4 text-amber-400" />
              成長・レアリティ段階シミュレーター
            </span>
            {isMaxEnhanced ? (
              <span className="text-xs font-num font-black text-orange-400 bg-orange-500/20 px-2 py-0.5 rounded border border-orange-500/40">
                ☆5 (最大強化固定)
              </span>
            ) : adjustedPlayer.addedOffset > 0 && (
              <span className="text-xs font-num font-black text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30">
                18項目 各能力 +{adjustedPlayer.addedOffset}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1">
            {RARITIES.map(r => {
              const isActive = isMaxEnhanced ? r === '☆5' : selectedRarity === r;
              const isDisabled = isMaxEnhanced && r !== '☆5';
              return (
                <button
                  key={r}
                  disabled={isDisabled}
                  onClick={() => !isDisabled && setSelectedRarity(r)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-num font-black transition-all flex-shrink-0 ${isActive
                    ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md shadow-amber-500/20 scale-105'
                    : isDisabled
                      ? 'bg-slate-900/80 text-slate-600 border border-slate-800/80 opacity-30 cursor-not-allowed pointer-events-none select-none'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                    }`}
                  title={isDisabled ? "最大強化時は☆5固定です" : ""}
                >
                  {r}
                </button>
              );
            })}
          </div>

          <div className="text-[10px] text-slate-400 font-medium pt-1 border-t border-slate-800">
            {isMaxEnhanced
              ? "※ 最大強化データはレアリティ☆5育成完了時の最終能力値のため、☆5固定（他レアリティはロック）となります。"
              : "昇格上昇値: ☆3→☆3+(+16), ☆3+→☆3++(+17), ☆3++→☆4(+32), ☆4→☆4+(+16), ☆4+→☆4++(+17), ☆4++→☆5(+32)"
            }
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 bg-slate-900/90 p-3 rounded-2xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">プレースタイル & LV</span>
            <span className="text-sm font-extrabold text-purple-300">
              {adjustedPlayer.playStyle}{adjustedPlayer.subPlayStyles && adjustedPlayer.subPlayStyles.length > 0 ? ` / ${adjustedPlayer.subPlayStyles.join(' / ')}` : ''} <span className="text-[#00FF66] font-num font-bold">LV.{adjustedPlayer.playStyleLevel}</span>
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold block">ポリシー</span>
            <span className={`text-sm ${getPolicyTextColor(adjustedPlayer.policy)}`}>{adjustedPlayer.policy}</span>
          </div>
        </div>

        <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'summary' ? 'bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40' : 'text-slate-400'
              }`}
          >
            概要 & 主要能力
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'details' ? 'bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/40' : 'text-slate-400'
              }`}
          >
            18項目 詳細能力値
          </button>
          <button
            onClick={() => setActiveTab('tendencies')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'tendencies' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' : 'text-slate-400'
              }`}
          >
            🧠 プレー意識 (14項目)
          </button>
        </div>

        {activeTab === 'summary' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-400">カタログ総合力</span>
                <span className="text-3xl md:text-4xl font-num font-black text-[#00FF66] mt-1">
                  {adjustedPlayer.overall} <span className="text-xs font-normal text-slate-400 font-sans">(MAX {adjustedPlayer.maxOverall})</span>
                </span>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                <span className="text-xs font-bold text-slate-400">能力合計実数値 ({selectedRarity})</span>
                <span className="text-3xl md:text-4xl font-num font-black text-[#00E5FF] mt-1">
                  {totalStats18.toLocaleString()} <span className="text-xs font-normal text-slate-400 font-sans">(18項目合計)</span>
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-300">主要6能力実数値（それぞれの詳細能力値の合計）</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">SHO (シュート)</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'shoot')}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">PAS (パス)</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'pass')}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">DRB (ドリブル)</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'dribble')}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">{isGK ? 'DEF (GK能力)' : 'DEF (守備)'}</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'defense')}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">PHY (フィジカル)</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'physical')}</span>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="text-slate-400">SPD (スピード)</span>
                  <span className="text-white font-num font-black text-lg md:text-xl">{getCategoryTotal(adjustedPlayer, 'speed')}</span>
                </div>
              </div>
            </div>

            {/* スキル（1種類）& アビリティ（2〜3種類）専用セクション */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                  <Icon name="sparkles" className="w-4 h-4 text-amber-400" />
                  所持スキル (1種類)
                </h3>
                <div className="bg-slate-900/90 p-3.5 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-xs ${getRankBadgeStyle(skill.rank)}`}>
                      {skill.rank}スキル
                    </span>
                    <span className={`text-base ${getRankTextStyle(skill.rank)}`}>
                      {skill.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-1">{skill.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-extrabold text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                  <Icon name="award" className="w-4 h-4 text-[#00E5FF]" />
                  所持アビリティ ({abilities.length}種類)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {abilities.map((ab, idx) => (
                    <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-[10px] ${getRankBadgeStyle(ab.rank)}`}>
                          {ab.rank}
                        </span>
                        <span className={`text-xs ${getRankTextStyle(ab.rank)}`}>
                          {ab.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{ab.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'details' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {detailBreakdown.map(cat => {
                const catTot = getCategoryTotal(adjustedPlayer, cat.key);

                return (
                  <div key={cat.key} className="bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-extrabold text-[#00FF66]">{cat.label}</div>
                      <div className="text-xs font-num font-black text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded border border-[#00FF66]/30">
                        合計 {catTot}
                      </div>
                    </div>
                    <div className="space-y-2">
                      {cat.items.map(item => (
                        <div key={item.name} className="flex justify-between items-center text-xs">
                          <span className="text-slate-300 font-medium">{item.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                              <div className="bg-[#00FF66] h-full rounded-full" style={{ width: `${Math.min(100, item.val)}%` }}></div>
                            </div>
                            <span className="font-num font-extrabold text-[#00E5FF] text-base w-7 text-right">{item.val}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 🧠 プレー意識 14項目表示エリア */}
        {activeTab === 'tendencies' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="bg-slate-900/90 p-4 rounded-2xl border border-amber-500/30">
              <div className="text-xs font-extrabold text-amber-400 mb-1 flex items-center gap-1.5">
                <Icon name="brain" className="w-4 h-4 text-amber-400" />
                プレー意識 14項目5段階評価 (-2 〜 +2)
              </div>
              <p className="text-[11px] text-slate-400">
                選手のピッチ上でのAI行動優先度・判断傾向を指標化しています。
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PLAY_TENDENCY_ITEMS.map(item => {
                const val = getPlayerPlayTendency(adjustedPlayer, item.key);

                return (
                  <div key={item.key} className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200">{item.label}</span>
                    <span className={`px-3 py-1 rounded-lg text-sm font-num ${getTendencyBadgeStyle(val)}`}>
                      {formatTendencyVal(val)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => onCompareToggle(adjustedPlayer)}
            className={`flex-1 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 ${isCompared ? 'bg-[#00FF66] text-slate-950 shadow-lg shadow-[#00FF66]/20' : 'bg-slate-800 text-slate-200 border border-slate-700'}`}
          >
            <Icon name="compare" className="w-4 h-4" />
            {isCompared ? '比較リストから外す' : `比較表に追加 (${selectedRarity} 状態)`}
          </button>
        </div>
      </div>

      <SideAdBanner position="right" />
    </div>
  </div>
);
}

// ─────────────────────────────────────────────────────────────
// MODAL: 選手比較表 MODAL
// ─────────────────────────────────────────────────────────────
function PlayerCompareModal({ compareList, onClose, onRemove }) {
  if (compareList.length === 0) return null;

  // 比較表全体での一括最大強化モード state
  const [isGlobalMaxEnhanced, setIsGlobalMaxEnhanced] = useState(false);

  // 各比較選手ごとの個別強化モード設定 state ({ [playerId]: boolean })
  const [playerEnhancedMap, setPlayerEnhancedMap] = useState({});

  // 各比較選手ごとの個別レアリティ設定 state
  const [playerRarityMap, setPlayerRarityMap] = useState(() => {
    const map = {};
    compareList.forEach(p => {
      map[p.id] = p.simulatedRarity || p.rarity || '☆3';
    });
    return map;
  });

  // 個別選択レアリティ＆強化モード反映後のリスト
  const adjustedCompareList = useMemo(() => {
    return compareList.map(p => {
      const isEnhanced = isGlobalMaxEnhanced || (playerEnhancedMap[p.id] !== undefined ? playerEnhancedMap[p.id] : (p.isMaxEnhanced || false));
      const targetR = isEnhanced ? '☆5' : (playerRarityMap[p.id] || p.simulatedRarity || p.rarity || '☆3');
      return getAdjustedPlayer(p, targetR, isEnhanced);
    });
  }, [compareList, playerRarityMap, playerEnhancedMap, isGlobalMaxEnhanced]);

  const statGroups = [
    {
      key: 'shoot',
      catName: 'SHO',
      label: 'SHO (シュート)',
      maxPossTotal: 500,
      maxPossSub: 199,
      details: [
        { subKey: 'finishing', label: '決定力' },
        { subKey: 'power', label: 'キック力' },
        { subKey: 'composure', label: '冷静さ' }
      ]
    },
    {
      key: 'pass',
      catName: 'PAS',
      label: 'PAS (パス)',
      maxPossTotal: 500,
      maxPossSub: 199,
      details: [
        { subKey: 'shortPass', label: 'ショートパス' },
        { subKey: 'longPass', label: 'ロングパス' },
        { subKey: 'accuracy', label: 'キック精度' }
      ]
    },
    {
      key: 'dribble',
      catName: 'DRB',
      label: 'DRB (ドリブル)',
      maxPossTotal: 500,
      maxPossSub: 199,
      details: [
        { subKey: 'breakout', label: '突破力' },
        { subKey: 'keeping', label: 'キープ力' },
        { subKey: 'ballTouch', label: 'ボールタッチ' }
      ]
    },
    {
      key: 'defense',
      catName: 'DEF',
      label: 'DEF (ディフェンス / GK能力)',
      maxPossTotal: 500,
      maxPossSub: 199,
      details: [
        { subKey: 'tackle', label: 'タックル', gkLabel: 'セービング' },
        { subKey: 'interception', label: 'パスカット', gkLabel: '反応速度' },
        { subKey: 'marking', label: 'マーク', gkLabel: '1対1' }
      ]
    },
    {
      key: 'physical',
      catName: 'PHY',
      label: 'PHY (フィジカル)',
      maxPossTotal: 500,
      maxPossSub: 199,
      details: [
        { subKey: 'jumping', label: 'ジャンプ' },
        { subKey: 'contact', label: 'コンタクト' },
        { subKey: 'stamina', label: 'スタミナ' }
      ]
    },
    {
      key: 'speed',
      catName: 'SPD',
      label: 'SPD (スピード)',
      maxPossTotal: 400,
      maxPossSub: 199,
      details: [
        { subKey: 'running', label: '走力' },
        { subKey: 'agility', label: '敏捷性' }
      ]
    }
  ];

  // 1位(赤 ★BEST)、2位(黄 2ND)、3位(水色 3RD) のランク判定ヘルパー
  const renderRankBadge = (val, allVals) => {
    const sortedUnique = [...new Set(allVals)].sort((a, b) => b - a);
    const rank = sortedUnique.indexOf(val) + 1;

    if (rank === 1) {
      return <span className="text-[9px] font-black text-red-500 bg-red-500/10 px-1 py-0.2 rounded border border-red-500/30">★BEST</span>;
    } else if (rank === 2) {
      return <span className="text-[9px] font-extrabold text-amber-400 bg-amber-400/10 px-1 py-0.2 rounded border border-amber-400/30">2ND</span>;
    } else if (rank === 3) {
      return <span className="text-[9px] font-bold text-[#00E5FF] bg-[#00E5FF]/10 px-1 py-0.2 rounded border border-[#00E5FF]/30">3RD</span>;
    }
    return null;
  };

  const getRankBarStyle = (val, allVals) => {
    const sortedUnique = [...new Set(allVals)].sort((a, b) => b - a);
    const rank = sortedUnique.indexOf(val) + 1;
    if (rank === 1) return 'bg-gradient-to-r from-red-600 via-[#ff453a] to-amber-500 shadow-md shadow-red-500/20';
    if (rank === 2) return 'bg-gradient-to-r from-amber-600 via-amber-400 to-[#00FF66]';
    if (rank === 3) return 'bg-gradient-to-r from-cyan-600 via-[#00E5FF] to-blue-500';
    return 'bg-slate-600';
  };

  const allCatalogOveralls = adjustedCompareList.map(p => p.overall);
  const allTotalStats18 = adjustedCompareList.map(p => getPlayerTotalStats18(p));

  const colCountClass =
    adjustedCompareList.length === 1 ? 'grid-cols-1' :
      adjustedCompareList.length === 2 ? 'grid-cols-2 divide-x divide-slate-800/80' :
        adjustedCompareList.length === 3 ? 'grid-cols-3 divide-x divide-slate-800/80' :
          adjustedCompareList.length === 4 ? 'grid-cols-4 divide-x divide-slate-800/80' :
            'grid-cols-5 divide-x divide-slate-800/80';

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="max-w-[1750px] w-full mx-auto flex justify-between items-start px-2 lg:px-4 my-auto">
        <SideAdBanner position="left" />
        <div className="glass-panel max-w-6xl w-full mx-auto rounded-3xl border border-[#00FF66]/40 p-4 md:p-6 space-y-6 max-h-[92vh] overflow-y-auto animate-fadeIn min-w-0 flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-3">
            <div>
              <h2 className="text-xl md:text-2xl font-black font-num text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00E5FF] to-white flex items-center gap-2">
                <Icon name="compare" className="w-6 h-6 text-[#00FF66]" />
                選手能力値 & プレー意識 比較表
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                <span className="text-red-500 font-bold">1位 ★BEST</span>
                <span className="text-amber-400 font-bold">2位 2ND</span>
                <span className="text-[#00E5FF] font-bold">3位 3RD</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* 一括最大強化モード切替 */}
              <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-orange-500/40">
                <button
                  onClick={() => setIsGlobalMaxEnhanced(false)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${!isGlobalMaxEnhanced
                    ? 'bg-slate-800 text-slate-100 shadow border border-slate-700'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  🌱 全員初期値
                </button>
                <button
                  onClick={() => setIsGlobalMaxEnhanced(true)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${isGlobalMaxEnhanced
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                    : 'text-slate-400 hover:text-slate-200'
                    }`}
                >
                  ⚡ 全員最大強化 (★5+完凸)
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/60 hover:border-red-500/40 transition-all cursor-pointer"
                title="閉じる"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 比較カードヘッダー */}
          <div className="space-y-4">
            <div className={`grid gap-3 ${colCountClass}`}>
              {adjustedCompareList.map(p => {
                const isEnhanced = isGlobalMaxEnhanced || (playerEnhancedMap[p.id] !== undefined ? playerEnhancedMap[p.id] : (p.isMaxEnhanced || false));
                const currentRarity = playerRarityMap[p.id] || p.simulatedRarity || p.rarity || '☆3';
                const mainStyle = p.style || p.playStyle || "スタイル未設定";
                const abilities = getPlayerAbilities(p);

                return (
                  <div key={p.id} className="glass-panel p-3 rounded-2xl border border-slate-800 space-y-3 relative group">
                    <button
                      onClick={() => onRemove(p)}
                      className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-slate-900/90 hover:bg-red-500 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                      title="この選手を比較から外す"
                    >
                      <Icon name="x" className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex flex-col items-center text-center space-y-2 pt-1">
                      <div className="relative">
                        <PlayerAvatar player={p} className="w-16 h-22 rounded-xl object-contain bg-slate-950 border border-slate-700 shadow-xl" />
                        <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-black ${getRarityBadgeStyle(currentRarity)}`}>
                          {currentRarity}
                        </span>
                      </div>

                      <div className="pt-2 w-full">
                        <div className="text-sm font-black text-white truncate">{p.name}</div>
                        <div className="text-[11px] text-[#00FF66] font-bold mt-0.5">{p.position} | {mainStyle}</div>
                      </div>

                      {/* 総合値 & 18種能力合計 */}
                      <div className="grid grid-cols-2 gap-1.5 w-full pt-1">
                        <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80 text-center">
                          <div className="text-[9px] text-slate-400 font-extrabold uppercase">総合値</div>
                          <div className="text-base font-black font-num text-[#00FF66] flex items-center justify-center gap-1">
                            {p.overall}
                            {renderRankBadge(p.overall, allCatalogOveralls)}
                          </div>
                        </div>
                        <div className="bg-slate-950/80 p-1.5 rounded-lg border border-slate-800/80 text-center">
                          <div className="text-[9px] text-slate-400 font-extrabold uppercase">18種合計</div>
                          <div className="text-base font-black font-num text-[#00E5FF] flex items-center justify-center gap-1">
                            {getPlayerTotalStats18(p)}
                            {renderRankBadge(getPlayerTotalStats18(p), allTotalStats18)}
                          </div>
                        </div>
                      </div>

                      {/* レアリティ＆個別強化シミュレーション操作バー */}
                      <div className="w-full space-y-1.5 pt-1 border-t border-slate-800/80 mt-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-[9px] text-slate-400 font-bold">レア指定:</span>
                          <div className="flex gap-0.5">
                            {['☆3', '☆4', '☆5'].map(r => (
                              <button
                                key={r}
                                onClick={() => {
                                  setPlayerRarityMap(prev => ({ ...prev, [p.id]: r }));
                                }}
                                disabled={isEnhanced}
                                className={`px-1.5 py-0.5 rounded text-[9px] font-black transition-all ${currentRarity === r
                                  ? 'bg-[#00FF66] text-slate-950 shadow'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                                  } ${isEnhanced ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setPlayerEnhancedMap(prev => ({
                              ...prev,
                              [p.id]: !isEnhanced
                            }));
                          }}
                          className={`w-full py-1 rounded-lg text-[10px] font-black transition-all border flex items-center justify-center gap-1 cursor-pointer ${isEnhanced
                            ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-400 shadow'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                            }`}
                        >
                          {isEnhanced ? '⚡ 最大強化中' : '🌱 通常表示'}
                        </button>
                      </div>

                      {/* 特徴 & スキル一覧 */}
                      <div className="w-full text-left space-y-2 pt-2 border-t border-slate-800/80">
                        {/* 所持スキル */}
                        <div className="space-y-1 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                          <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                            <span>⚽ 所持スキル</span>
                          </div>
                          {p.skills && p.skills.length > 0 ? (
                            <div className="space-y-1">
                              {p.skills.map((s, i) => (
                                <div key={i} className="text-[10px] bg-slate-950/80 p-1 rounded border border-slate-800 text-slate-200 font-semibold flex items-center justify-between">
                                  <span>{s.name || s}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 italic">なし</div>
                          )}
                        </div>

                        {/* 所持アビリティ */}
                        <div className="space-y-1.5 bg-slate-900/60 p-2 rounded-lg border border-slate-800/80">
                          <div className="text-[9px] text-slate-400 font-bold flex items-center gap-1">
                            <span>✨ 所持アビリティ ({abilities.length})</span>
                          </div>
                          {abilities && abilities.length > 0 ? (
                            <div className="space-y-2">
                              {abilities.map((ab, i) => (
                                <div key={i} className="space-y-1 bg-slate-950/60 p-1.5 rounded border border-slate-800/50">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span className={`px-1.5 py-0.2 rounded text-[9px] ${getRankBadgeStyle(ab.rank)}`}>
                                      {ab.rank}
                                    </span>
                                    <span className={`text-[11px] font-bold ${getRankTextStyle(ab.rank)}`}>
                                      {ab.name}
                                    </span>
                                  </div>
                                  {ab.description && (
                                    <div className="text-[9px] text-slate-300 leading-relaxed">
                                      {ab.description}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[10px] text-slate-500 italic">なし</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 主要能力 + 直下の18種詳細能力 グラフ表示 */}
        <div className="space-y-6">
          {statGroups.map(grp => {
            const allCatTotals = adjustedCompareList.map(p => getCategoryTotal(p, grp.key));

            return (
              <div key={grp.key} className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-4 shadow-lg">
                <div className="space-y-2.5">
                  <div className="text-sm md:text-base font-black text-[#00FF66] uppercase tracking-wider flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#00FF66] shadow-sm shadow-[#00FF66]/50"></span>
                      {grp.label}
                    </div>
                  </div>

                  {/* 主要能力バーグラフ */}
                  <div className={`grid gap-0 bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden ${colCountClass}`}>
                    {adjustedCompareList.map(p => {
                      const catTot = getCategoryTotal(p, grp.key);
                      const pct = Math.min(100, Math.round((catTot / grp.maxPossTotal) * 100));

                      return (
                        <div key={p.id} className="p-3 space-y-2 relative">
                          <div className="flex justify-between items-center">
                            <span className="text-xs md:text-sm font-black text-amber-300 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                              {grp.catName}合計
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-white font-num font-black text-lg md:text-xl">{catTot}</span>
                              {renderRankBadge(catTot, allCatTotals)}
                            </div>
                          </div>

                          {/* グラフメーター本体 */}
                          <div className="w-full bg-[#070a10] rounded-full h-3 md:h-3.5 overflow-hidden relative border border-slate-800">
                            <div className="absolute inset-0 grid grid-cols-4 divide-x divide-slate-800/60 pointer-events-none"><div></div><div></div><div></div></div>
                            <div
                              className={`h-full rounded-full transition-all ${getRankBarStyle(catTot, allCatTotals)}`}
                              style={{ width: `${pct}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 18種詳細能力 グラフ */}
                <div className="pt-3 border-t border-slate-800/80 space-y-3">
                  {grp.details.map(dt => {
                    const detailVals = adjustedCompareList.map(p => {
                      if (p.detailStats && p.detailStats[grp.key]) {
                        return p.detailStats[grp.key][dt.subKey] || 0;
                      }
                      return 0;
                    });

                    const hasGKInList = adjustedCompareList.some(p => p.mainPosition === 'GK' || p.category === 'GK');
                    const allGKInList = adjustedCompareList.every(p => p.mainPosition === 'GK' || p.category === 'GK');

                    let displayLabel = dt.label;
                    if (grp.key === 'defense' && dt.gkLabel) {
                      if (allGKInList) {
                        displayLabel = dt.gkLabel;
                      } else if (hasGKInList) {
                        displayLabel = `${dt.label} / ${dt.gkLabel}`;
                      }
                    }

                    return (
                      <div key={dt.subKey} className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80">
                        <div className="text-sm md:text-base font-black text-amber-300 pl-1 flex items-center gap-1.5">
                          <span className="text-[#00FF66]">▶</span> {displayLabel}
                        </div>
                        <div className={`grid gap-0 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden ${colCountClass}`}>
                          {adjustedCompareList.map((p, idx) => {
                            const val = detailVals[idx];
                            const pct = Math.min(100, Math.round((val / grp.maxPossSub) * 100));

                            return (
                              <div key={p.id} className="p-2.5 space-y-1.5">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs md:text-sm text-slate-200 font-bold truncate">{p.name.split(' ')[0]}</span>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-num font-black text-white text-base md:text-lg">{val}</span>
                                    {renderRankBadge(val, detailVals)}
                                  </div>
                                </div>

                                <div className="w-full bg-[#070a10] rounded-full h-2.5 md:h-3 overflow-hidden relative border border-slate-800">
                                  <div
                                    className={`h-full rounded-full transition-all ${getRankBarStyle(val, detailVals)}`}
                                    style={{ width: `${pct}%` }}
                                  ></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 🧠 プレー意識 (14項目) 対比セクション */}
        <div className="glass-panel p-4 rounded-2xl border border-amber-500/40 space-y-4 shadow-xl">
          <div className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-2 gap-2">
            <div className="flex items-center gap-2">
              <Icon name="brain" className="w-5 h-5 text-amber-400" />
              🧠 プレー意識 14項目 対比 (-2 〜 +2)
            </div>
            <div className="flex items-center gap-1.5 text-[10px] font-num font-extrabold flex-wrap">
              <span className="text-red-400 bg-red-500/20 px-1.5 py-0.5 rounded border border-red-500/40">+2:赤</span>
              <span className="text-orange-400 bg-orange-500/20 px-1.5 py-0.5 rounded border border-orange-500/40">+1:橙</span>
              <span className="text-slate-300 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">0:灰</span>
              <span className="text-cyan-300 bg-cyan-500/20 px-1.5 py-0.5 rounded border border-cyan-500/40">-1:水</span>
              <span className="text-blue-400 bg-blue-500/20 px-1.5 py-0.5 rounded border border-blue-500/40">-2:青</span>
            </div>
          </div>

          <div className="space-y-3">
            {PLAY_TENDENCY_ITEMS.map(item => (
              <div key={item.key} className="space-y-1.5 bg-slate-900/60 p-2.5 rounded-2xl border border-slate-800/80">
                <div className="text-sm md:text-base font-black text-amber-300 pl-1 flex items-center gap-1.5">
                  <span className="text-amber-400">🧠</span> {item.label}
                </div>
                <div className={`grid gap-0 bg-slate-950/80 rounded-xl border border-slate-800/80 overflow-hidden ${colCountClass}`}>
                  {adjustedCompareList.map(p => {
                    const val = getPlayerPlayTendency(p, item.key);

                    return (
                      <div key={p.id} className="p-2.5 flex items-center justify-between">
                        <span className="text-xs md:text-sm text-slate-200 font-bold truncate">{p.name.split(' ')[0]}</span>
                        <span className={`px-3 py-1 rounded-lg text-sm md:text-base font-num font-black ${getTendencyBadgeStyle(val)}`}>
                          {formatTendencyVal(val)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SideAdBanner position="right" />
    </div>
  </div>
);
}
