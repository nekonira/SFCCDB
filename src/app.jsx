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
    id: "PFUuw-rWI2E",
    title: "【質問歓迎】MCO加入大会を開催いたします(4名)【サカつく2026】",
    thumbnail: "https://i.ytimg.com/vi/PFUuw-rWI2E/hqdefault.jpg",
    url: "https://www.youtube.com/watch?v=PFUuw-rWI2E"
  },
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
    id: "rakuten_user_8",
    badge: "楽天 PR",
    htmlCode: `<table border="0" cellpadding="0" cellspacing="0"><tr><td><div style="border:1px solid #95a5a6;border-radius:.75rem;background-color:#FFFFFF;width:100%;margin:0px;padding:5px;text-align:center;overflow:hidden;"><table><tr><td style="width:100%;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><img src="https://hbb.afl.rakuten.co.jp/hgb/56934b82.b6aad5f9.56934b83.c5e00d8c/?me_id=1399277&item_id=10002614&pc=https%3A%2F%2Fthumbnail.image.rakuten.co.jp%2F%400_mall%2Fdji-shop%2Fcabinet%2Fbnr%2F6937224133082_t.jpg%3F_ex%3D300x300&s=300x300&t=picttext" border="0" style="margin:2px; max-width:100%; height:auto;" alt="" title=""></a></td></tr><tr><td style="vertical-align:top;width:100%;display:block;"><p style="font-size:11px;line-height:1.3em;text-align:left;margin:0px;padding:2px 4px;word-wrap:break-word"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ%3D%3D" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word; color:#333;">DJI Osmo Pocket 4 クリエイターコンボ</a></p><div style="margin:6px 0 2px 0;"><a href="https://hb.afl.rakuten.co.jp/ichiba/56934b82.b6aad5f9.56934b83.c5e00d8c/?pc=https%3A%2F%2Fitem.rakuten.co.jp%2Fdji-shop%2F6937224133082%2F%3Fscid%3Daf_pc_bbtn&link_type=picttext&ut=eyJwYWdlIjoiaXRlbSIsInR5cGUiOiJwaWN0dGV4dCIsInNpemUiOiIzMDB4MzAwIiwibmFtIjoxLCJuYW1wIjoicmlnaHQiLCJjb20iOjEsImNvbXAiOiJkb3duIiwicHJpY2UiOjAsImJvciI6MSwiY29sIjoxLCJiYnRuIjoxLCJwcm9kIjowLCJhbXAiOmZhbHNlfQ==" target="_blank" rel="nofollow sponsored noopener" style="word-wrap:break-word;"><div style="width:100%;height:28px;background-color:#bf0000;color:#fff!important;font-size:12px;font-weight:700;line-height:28px;border-radius:14px;cursor:pointer;text-align:center;"> 楽天で購入 </div></a></div></td></tr></table></div></td></tr></table>`
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
    id: "dmm_user_33",
    badge: "DMM PR",
    htmlCode: `<ins class="widget-banner"></ins><script class="widget-banner-script" src="https://widget-view.dmm.com/js/banner_placement.js?affiliate_id=NEKONIRA-001&banner_id=1027_300_250"></script>`
  },
  {
    id: "dmm_user_34",
    badge: "DMM PR",
    htmlCode: `<ins class="widget-banner"></ins><script class="widget-banner-script" src="https://widget-view.dmm.com/js/banner_placement.js?affiliate_id=NEKONIRA-001&banner_id=1198_300_250"></script>`
  },
  {
    id: "dmm_user_35",
    badge: "DMM PR",
    htmlCode: `<ins class="widget-banner"></ins><script class="widget-banner-script" src="https://widget-view.dmm.com/js/banner_placement.js?affiliate_id=NEKONIRA-001&banner_id=879_300_250"></script>`
  },
  {
    id: "dmm_user_37",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6191553%2Fb600esgk30720%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b600esgk30720/b600esgk30720pl.jpg" alt="無料で読む" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">無料で読む</span></a></div>`
  },
  {
    id: "dmm_user_38",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F120876%2Fb330ctksb01466%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b330ctksb01466/b330ctksb01466pl.jpg" alt="無料で読む" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">無料で読む</span></a></div>`
  },
  {
    id: "dmm_user_39",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6029489%2Fb900ckds06805%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b900ckds06805/b900ckds06805pl.jpg" alt="無料で読む" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">無料で読む</span></a></div>`
  },
  {
    id: "dmm_user_40",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6283826%2Fb950athes02249%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b950athes02249/b950athes02249pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_41",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F4150125%2Fb900xkds05249%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b900xkds05249/b900xkds05249pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_42",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F906134%2Fb900vkds02207%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b900vkds02207/b900vkds02207pl.jpg" alt="無料で読む" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">無料で読む</span></a></div>`
  },
  {
    id: "dmm_user_43",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F4365464%2Fb000ehftx15025%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b000ehftx15025/b000ehftx15025pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_44",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F560654%2Fb600psgk04472%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b600psgk04472/b600psgk04472pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_45",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6073142%2Fb900ckds19445%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b900ckds19445/b900ckds19445pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_46",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F56854%2Fb950bshes00093%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b950bshes00093/b950bshes00093pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_47",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F939379%2Fb000ahftx07628%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b000ahftx07628/b000ahftx07628pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_48",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6249223%2Fb355iakta98247%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b355iakta98247/b355iakta98247pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_49",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F766148%2Fb900rkds00962%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b900rkds00962/b900rkds00962pl.jpg" alt="無料で読む" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">無料で読む</span></a></div>`
  },
  {
    id: "dmm_user_50",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F4291705%2Fb371khkss00720%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b371khkss00720/b371khkss00720pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_51",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F6289663%2Fb950athes05041%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b950athes05041/b950athes05041pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
  },
  {
    id: "dmm_user_52",
    badge: "DMM PR",
    htmlCode: `<div style="margin:0;padding:5px;font-size:14px;word-break: break-all;"><a href="https://al.dmm.com/?lurl=https%3A%2F%2Fbook.dmm.com%2Fproduct%2F56848%2Fb950ashes00447%2F&af_id=NEKONIRA-001&ch=toolbar&ch_id=package_text_large" rel="sponsored" target="_blank"><img src="https://ebook-assets.dmm.com/digital/e-book/b950ashes00447/b950ashes00447pl.jpg" alt="試し読み" style="max-width:100%;height:auto;border-radius:8px;"/><span style="display:block;margin:5px 0 0 0;padding:0;text-align:center;color:#60a5fa;font-weight:bold;">試し読み</span></a></div>`
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

// モーダル表示回数カウンター（詳細表示・比較表モーダルでの3回に1回の広告表示頻度制御用）
let modalOpenCounter = 0;
const checkModalAdFrequency = () => {
  modalOpenCounter += 1;
  return (modalOpenCounter % 3 === 1);
};

function SideAdBanner({ position, isModal = false, showModalAd = true, refreshKey = null }) {
  const [closedIds, setClosedIds] = useState({});
  const [sidebarAds, setSidebarAds] = useState([]);

  useEffect(() => {
    setClosedIds({});
    const shuffled = [...AFFILIATE_ADS].sort(() => 0.5 - Math.random());
    const isTallAd = (ad) => ad && ad.htmlCode && !ad.htmlCode.includes('468x160');
    const firstTwo = shuffled.slice(0, 2);
    const hasTall = firstTwo.some(isTallAd);
    const maxCount = hasTall ? 2 : 3;
    setSidebarAds(shuffled.slice(0, maxCount));
  }, [position, refreshKey]);

  const visibleAds = sidebarAds.filter(ad => !closedIds[ad.id]);

  const renderAdContent = (ad, isMobile = false) => {
    if (ad.htmlCode) {
      if (ad.htmlCode.includes('<script')) {
        let nativeWidth = 300;
        let nativeHeight = 250;
        if (ad.htmlCode.includes('468x160')) {
          nativeWidth = 468;
          nativeHeight = 160;
        } else if (ad.htmlCode.includes('250x250')) {
          nativeWidth = 250;
          nativeHeight = 250;
        } else if (ad.htmlCode.includes('300_250') || ad.htmlCode.includes('300x250')) {
          nativeWidth = 300;
          nativeHeight = 250;
        }

        return (
          <div
            className="w-full relative overflow-hidden rounded-lg sm:rounded-xl [container-type:inline-size]"
            style={{ aspectRatio: `${nativeWidth} / ${nativeHeight}` }}
          >
            <iframe
              srcDoc={`<!DOCTYPE html><html><head><base target='_blank'><style>html,body{margin:0;padding:0;background:transparent;width:${nativeWidth}px;height:${nativeHeight}px;overflow:hidden;display:flex;justify-content:center;align-items:center;} *,*::before,*::after{box-sizing:border-box;}</style></head><body>${ad.htmlCode}</body></html>`}
              className="border-0 overflow-hidden absolute top-0 left-0"
              style={{
                width: `${nativeWidth}px`,
                height: `${nativeHeight}px`,
                transform: `scale(calc(100cqw / ${nativeWidth}px))`,
                transformOrigin: 'top left'
              }}
              title={ad.id}
            />
          </div>
        );
      }
      return (
        <div
          className="w-full flex justify-center items-center overflow-hidden [&_table]:max-w-full [&_img]:max-w-full [&_img]:h-auto [&_div]:max-w-full [&_td]:block [&_td]:w-full"
          dangerouslySetInnerHTML={{ __html: ad.htmlCode }}
        />
      );
    }
    return (
      <a
        href={ad.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block group w-full"
      >
        <img
          src={ad.image}
          alt={ad.title || ""}
          className="w-full h-auto rounded-lg sm:rounded-xl object-cover group-hover:opacity-90 transition-opacity"
          loading="lazy"
        />
      </a>
    );
  };

  if (visibleAds.length === 0) {
    return (
      <aside className={`hidden xl:block w-44 2xl:w-52 flex-shrink-0 sticky top-20 self-start ${position === 'left' ? 'mr-3' : 'ml-3'}`} />
    );
  }

  // 左サイドバーはPCのみ表示 (2つ固定表示)
  if (position === 'left') {
    return (
      <aside className="hidden xl:block w-44 2xl:w-52 flex-shrink-0 sticky top-20 self-start space-y-3 max-h-[calc(100vh-6rem)] overflow-y-auto mr-3">
        {visibleAds.slice(0, 2).map(ad => (
          <div key={ad.id} className="relative group glass-panel p-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl flex justify-center items-center overflow-hidden">
            <button
              onClick={() => setClosedIds(prev => ({ ...prev, [ad.id]: true }))}
              className="absolute top-1 right-1 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/90 hover:bg-red-600 active:bg-red-700 text-slate-200 hover:text-white border-2 border-slate-600/80 hover:border-red-400 flex items-center justify-center text-xs sm:text-sm font-bold opacity-90 hover:opacity-100 transition-all shadow-lg cursor-pointer"
              title="この広告を非表示"
            >
              ✕
            </button>
            {renderAdContent(ad)}
          </div>
        ))}
      </aside>
    );
  }

  // 右サイドバー：PC表示（左右2つずつ常時表示） ＋ スマホ・モバイル表示用 右側コンパクト固定広告（モーダル時は3回に1回表示）
  const shouldShowMobileAd = isModal ? showModalAd : true;
  const mobileAds = visibleAds.slice(0, 2);

  return (
    <>
      {/* PC表示用 右サイドバー広告 (PCでは常時2つ表示) */}
      <aside className="hidden xl:block w-44 2xl:w-52 flex-shrink-0 sticky top-20 self-start space-y-3 max-h-[calc(100vh-6rem)] overflow-y-auto ml-3">
        {visibleAds.slice(0, 2).map(ad => (
          <div key={ad.id} className="relative group glass-panel p-2 rounded-2xl border border-slate-800/80 bg-slate-900/80 shadow-xl flex justify-center items-center overflow-hidden">
            <button
              onClick={() => setClosedIds(prev => ({ ...prev, [ad.id]: true }))}
              className="absolute top-1 right-1 z-30 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-950/90 hover:bg-red-600 active:bg-red-700 text-slate-200 hover:text-white border-2 border-slate-600/80 hover:border-red-400 flex items-center justify-center text-xs sm:text-sm font-bold opacity-90 hover:opacity-100 transition-all shadow-lg cursor-pointer"
              title="この広告を非表示"
            >
              ✕
            </button>
            {renderAdContent(ad)}
          </div>
        ))}
      </aside>

      {/* スマホ・モバイル表示用 右側固定フローティング広告 (モーダル表示時は3回に1回の頻度で表示) */}
      {shouldShowMobileAd && mobileAds.length > 0 && (
        <div className="xl:hidden fixed bottom-16 right-1.5 z-40 flex flex-col gap-2 max-w-[115px] sm:max-w-[135px] pointer-events-auto">
          {mobileAds.map(ad => (
            <div key={ad.id} className="relative group glass-panel p-1 rounded-xl border border-slate-800/90 bg-slate-900/95 shadow-2xl flex justify-center items-center overflow-hidden w-full backdrop-blur-md">
              <button
                onClick={() => setClosedIds(prev => ({ ...prev, [ad.id]: true }))}
                className="absolute top-1 right-1 z-30 w-7 h-7 rounded-full bg-slate-950/95 hover:bg-red-600 active:bg-red-700 text-white border-2 border-slate-600/90 hover:border-red-400 flex items-center justify-center text-xs font-bold shadow-lg cursor-pointer"
                title="この広告を閉じる"
              >
                ✕
              </button>
              {renderAdContent(ad, true)}
            </div>
          ))}
        </div>
      )}
    </>
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
  const isFW = ['CF', 'LW', 'RW'].includes(player?.mainPosition);
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

  const [youtubeVideos, setYoutubeVideos] = useState(YOUTUBE_VIDEOS);

  useEffect(() => {
    fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.youtube.com%2Ffeeds%2Fvideos.xml%3Fchannel_id%3DUCR4YbOvw3pjlR5Ksordt3WQ')
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
          const fetched = data.items.map(item => {
            const match = item.link ? item.link.match(/v=([^&]+)/) : null;
            const videoId = item.guid ? item.guid.replace('yt:video:', '') : (match ? match[1] : '');
            return {
              id: videoId,
              title: item.title,
              thumbnail: item.thumbnail || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
              url: item.link
            };
          }).filter(v => v.id);
          if (fetched.length > 0) {
            setYoutubeVideos(fetched);
          }
        }
      })
      .catch(() => {});
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
          alert('比較枠(最大5人)がいっぱいです。下部バーの「全クリア」か選手アイコンの[✕]で枠を空けてから選択してください。');
          return prev;
        }
        return [...prev, player];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#070a10] text-slate-100 flex flex-col font-sans pb-20 md:pb-0">
      <header className="relative md:sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-2 sm:px-4 lg:px-8 py-1.5 md:py-3">
        <div className="max-w-[1300px] w-full mx-auto flex items-center justify-between gap-1.5 sm:gap-4">
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-gradient-to-tr from-[#00FF66] to-[#00E5FF] p-[1.5px] md:p-[2px] shadow-md shadow-[#00FF66]/20">
              <div className="w-full h-full bg-[#070a10] rounded-[6px] md:rounded-[10px] flex items-center justify-center">
                <Icon name="shield" className="w-4 h-4 md:w-6 md:h-6 text-[#00FF66] group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-num font-black text-sm sm:text-xl md:text-2xl tracking-tight sm:tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00E5FF] to-white">
                  サカつく2026
                </span>
                <span className="text-[8px] sm:text-[10px] font-extrabold px-1 py-0.2 sm:px-1.5 sm:py-0.5 rounded bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/40 whitespace-nowrap">
                  DB & BUILDER
                </span>
              </div>
              <p className="hidden sm:block text-xs text-slate-400 font-medium">育成シミュレーション データベース</p>
            </div>
          </div>

          <nav className="flex items-center gap-0.5 sm:gap-1 bg-[#0e1522]/90 p-1 sm:p-1.5 rounded-lg sm:rounded-xl border border-slate-800 overflow-x-auto max-w-full scrollbar-none">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeTab === 'home'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="sparkles" className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">ホーム</span>
            </button>
            <button
              onClick={() => setActiveTab('players')}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeTab === 'players'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="users" className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">選手DB</span>
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeTab === 'builder'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="layout" className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">チームビルダー</span>
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold transition-all ${activeTab === 'data'
                ? 'bg-gradient-to-r from-[#00FF66]/20 to-[#00E5FF]/20 text-[#00FF66] border border-[#00FF66]/40'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
            >
              <Icon name="database" className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">データ管理</span>
            </button>
          </nav>
        </div>
      </header>

      <div className="flex-1 max-w-[1750px] w-full mx-auto flex justify-center items-start px-2 lg:px-4 py-4 md:py-6">
        <SideAdBanner position="left" refreshKey={activeTab} />

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
          {activeTab === 'builder' && (
            <TeamBuilderTab
              players={players}
              setSelectedPlayer={setSelectedPlayer}
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

        <SideAdBanner position="right" refreshKey={activeTab} />
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
        <div className="fixed bottom-16 md:bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#0e1522]/95 border border-[#00FF66]/50 rounded-2xl p-3 shadow-2xl shadow-[#00FF66]/20 backdrop-blur-xl flex items-center gap-3 max-w-xl w-[92%]">
          <div className="flex items-center gap-2.5 flex-1 overflow-x-auto py-1">
            <div className="flex flex-col flex-shrink-0">
              <span className="text-xs font-bold text-[#00FF66] whitespace-nowrap pl-1">比較 ({compareList.length}/5)</span>
              <button
                onClick={() => {
                  setCompareList([]);
                  setIsCompareModalOpen(false);
                }}
                className="text-[10px] text-red-400 hover:text-red-300 font-bold underline cursor-pointer text-left pl-1"
                title="比較リストを全消去"
              >
                全クリア
              </button>
            </div>
            <div className="flex gap-2">
              {compareList.map(p => {
                const avatar = getPlayerAvatarUrl(p);
                return (
                  <div key={p.id} className="relative group flex-shrink-0">
                    <PlayerAvatar player={p} className="w-10 h-14 rounded-lg object-contain bg-slate-950/90 border border-slate-700 shadow-md group-hover:border-[#00FF66] transition-colors" />
                    <button
                      onClick={() => toggleCompare(p)}
                      className="absolute -top-1.5 -right-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full p-0.5 shadow-md hover:scale-110 transition-transform cursor-pointer"
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
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs rounded-xl shadow-md hover:brightness-110 whitespace-nowrap cursor-pointer"
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
          onClearAll={() => {
            setCompareList([]);
            setIsCompareModalOpen(false);
          }}
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
            <button
              onClick={() => setActiveTab('builder')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-sm border border-[#00FF66]/40 hover:border-[#00FF66] shadow-lg flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Icon name="layout" className="w-5 h-5 text-[#00FF66]" />
              チームビルダーを開く
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <button
          onClick={() => setActiveTab('builder')}
          className="glass-card p-4 rounded-2xl flex items-center gap-4 text-left hover:border-[#00FF66]/50 transition-all cursor-pointer group"
        >
          <div className="p-3 rounded-xl bg-[#00FF66]/10 text-[#00FF66] border border-[#00FF66]/20 group-hover:scale-110 transition-transform">
            <Icon name="layout" className="w-6 h-6" />
          </div>
          <div>
            <div className="text-base font-black text-white group-hover:text-[#00FF66] transition-colors flex items-center gap-1.5">
              チームビルダー
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#00FF66]/20 text-[#00FF66] border border-[#00FF66]/30">新機能</span>
            </div>
            <div className="text-xs text-slate-400 font-semibold">編成・コンボ解析</div>
          </div>
        </button>
      </div>

      {/* YouTube 最新動画 (スマホ時のみ超スリム固定スクロール) */}
      <div className="sticky md:relative top-0 md:top-auto z-30 glass-panel px-2 py-1 md:p-3 rounded-lg md:rounded-2xl space-y-0.5 md:space-y-2 border border-red-500/30 bg-slate-900/95 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1">
            <span className="px-1 py-0 rounded text-[8px] md:text-xs font-black bg-red-600 text-white flex items-center gap-0.5 shadow-sm">
              ▶ YouTube
            </span>
            <h2 className="text-[10px] md:text-sm font-bold text-white flex items-center gap-1">
              ねこにら サカつく2026 最新動画
            </h2>
          </div>
          <a
            href="https://www.youtube.com/@%E3%81%AD%E3%81%93%E3%81%AB%E3%82%891/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] md:text-[11px] font-bold text-red-400 hover:text-red-300 hover:underline flex items-center gap-0.5"
          >
            チャンネル ↗
          </a>
        </div>
        <div className="flex gap-1 md:gap-2.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-none">
          {youtubeVideos.map(video => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[76px] sm:w-24 md:w-40 bg-slate-900/90 hover:bg-slate-800/90 rounded md:rounded-lg overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all shadow-md group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-0.5 md:p-1.5 flex-1 flex flex-col justify-between">
                <p className="text-[9px] md:text-[11px] font-bold text-slate-200 group-hover:text-white truncate md:line-clamp-2 leading-tight">
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
  const [viewMode, setViewMode] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 1024) ? 'grid' : 'table');

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
      'CF': 11
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
      {/* YouTube 最新動画 (スマホ時のみ超スリム固定スクロール) */}
      <div className="sticky md:relative top-0 md:top-auto z-30 glass-panel px-2 py-1 md:p-3 rounded-lg md:rounded-2xl space-y-0.5 md:space-y-2 border border-red-500/30 bg-slate-900/95 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-center gap-1">
            <span className="px-1 py-0 rounded text-[8px] md:text-xs font-black bg-red-600 text-white flex items-center gap-0.5 shadow-sm">
              ▶ YouTube
            </span>
            <h3 className="text-[10px] md:text-sm font-bold text-white flex items-center gap-1">
              ねこにら サカつく2026 最新動画
            </h3>
          </div>
          <a
            href="https://www.youtube.com/@%E3%81%AD%E3%81%93%E3%81%AB%E3%82%891/videos"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[9px] md:text-[11px] font-bold text-red-400 hover:text-red-300 hover:underline flex items-center gap-0.5"
          >
            チャンネル ↗
          </a>
        </div>
        <div className="flex gap-1 md:gap-2.5 overflow-x-auto pb-0.5 pt-0.5 scrollbar-none">
          {youtubeVideos.map(video => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-[76px] sm:w-24 md:w-40 bg-slate-900/90 hover:bg-slate-800/90 rounded md:rounded-lg overflow-hidden border border-slate-800 hover:border-red-500/50 transition-all shadow-md group flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-slate-950 overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-0.5 md:p-1.5 flex-1 flex flex-col justify-between">
                <p className="text-[9px] md:text-[11px] font-bold text-slate-200 group-hover:text-white truncate md:line-clamp-2 leading-tight">
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
          {/* モバイル/スマホ（縦画面・横画面対応）専用: 横スクロール不要・画面幅100%フィット コンパクトリスト表示 */}
          <div className="lg:hidden space-y-2.5">
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
                        {p.policy && (
                          <span className={`text-[10px] font-black px-1.5 py-0.5 rounded border ${getPolicyBadgeClass(p.policy)}`}>
                            {p.policy}
                          </span>
                        )}
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

          {/* PC/大画面専用: フル15列 ソート可能テーブル */}
          <div className="hidden lg:block glass-panel rounded-2xl overflow-x-auto border border-slate-800 shadow-xl w-full">
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

// チームビルダー（デッキ編成・フォーメーションシミュレーター・コンボ解析）
const ROMAN_LEVEL_MAP = {
  'Ⅰ': 1, 'Ⅱ': 2, 'Ⅲ': 3, 'Ⅳ': 4, 'Ⅴ': 5,
  '1': 1, '2': 2, '3': 3, '4': 4, '5': 5,
  1: 1, 2: 2, 3: 3, 4: 4, 5: 5
};

const parsePlayStyleLevel = (levelVal) => {
  if (levelVal === undefined || levelVal === null) return 1;
  const str = String(levelVal).trim();
  return ROMAN_LEVEL_MAP[str] || parseInt(str, 10) || 1;
};

const matchPlayStyle = (playerStyleStr, requiredStyleStr) => {
  if (!playerStyleStr || !requiredStyleStr) return false;
  const normP = String(playerStyleStr).trim().replace(/ブレイカー/g, 'ブレーカー');
  const normReq = String(requiredStyleStr).trim().replace(/ブレイカー/g, 'ブレーカー');

  if (normP === normReq) return true;

  // 'サイドアタッカー' と 'アタッカー' を明確に区別
  if (normReq === 'アタッカー') {
    return normP === 'アタッカー';
  }

  // ポジション接尾辞 (LW, RW, LM, RM) の異なるプレースタイルが混同されないよう防止
  const sidePositions = ['LW', 'RW', 'LM', 'RM'];
  const reqSuffix = sidePositions.find(pos => normReq.endsWith(pos));
  const pSuffix = sidePositions.find(pos => normP.endsWith(pos));

  if (reqSuffix && pSuffix && reqSuffix !== pSuffix) {
    return false; // 例: required: 'サイドアタッカーLM' と player: 'サイドアタッカーLW' はミスマッチ
  }

  if (normReq === 'サイドアタッカー') {
    return normP.startsWith('サイドアタッカー');
  }

  return normP.startsWith(normReq) || normReq.startsWith(normP);
};

const checkPlayStyleRequirement = (player, requiredStyle, minLevel) => {
  if (!player) return false;
  const allStyles = [
    player.playStyle,
    player.style,
    ...(player.subPlayStyles || [])
  ].filter(Boolean);

  const styleMatched = allStyles.some(s => matchPlayStyle(s, requiredStyle));
  const levelNum = parsePlayStyleLevel(player.playStyleLevel || player.styleLevel);

  return styleMatched && levelNum >= minLevel;
};

const normalizePosition = (pos) => {
  if (!pos || pos === 'ALL') return 'ALL';
  const str = String(pos).trim().toUpperCase();

  if (str === 'GK') return 'GK';
  if (['CB', 'LCB', 'RCB', 'DF', 'DC'].includes(str)) return 'CB';
  if (['LFB', 'LB', 'LSB', 'DL', 'SB'].includes(str)) return 'LFB';
  if (['RFB', 'RB', 'RSB', 'DR'].includes(str)) return 'RFB';
  if (['DM', 'LDM', 'RDM', 'DMF', 'DH', 'CH', 'CMF', 'CM'].includes(str)) return 'DM';
  if (['AM', 'LAM', 'RAM', 'AMF', 'OMF', 'OH'].includes(str)) return 'AM';
  if (['LM', 'LMF', 'LSH', 'SMF'].includes(str)) return 'LM';
  if (['RM', 'RMF', 'RSH'].includes(str)) return 'RM';
  if (['LW', 'LWG'].includes(str)) return 'LW';
  if (['RW', 'RWG'].includes(str)) return 'RW';
  if (['CF', 'LCF', 'RCF', 'ST', 'FW'].includes(str)) return 'CF';

  return str;
};

const isPositionMatch = (playerPos, targetPos) => {
  if (!playerPos || !targetPos) return false;
  const targetNorm = normalizePosition(targetPos);
  if (targetNorm === 'ALL') return true;

  const playerNorm = normalizePosition(playerPos);
  return playerNorm === targetNorm;
};

function TeamBuilderTab({ players, setSelectedPlayer, onGoToDB }) {
  const FORMATION_COMBOS = [
    {
      id: 'selecao70',
      name: "セレソン’70",
      policy: 'リアクション',
      formationId: '343c_selecao',
      buffs: [
        { name: '決定力', val: '+100%' },
        { name: 'パスカット', val: '+100%' },
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+60%' }
      ],
      specialNote: 'フィールド上のブラジル人選手1人につき、上記4能力（決定力・パスカット・タックル・マーク）が追加で2%強化！'
    },
    {
      id: 'goldenZonen94',
      name: "ゴールデンゾーネン'94",
      policy: 'リアクション',
      formationId: '343c_golden',
      buffs: [
        { name: 'キック精度', val: '+80%' },
        { name: '突破力', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: 'スタミナ', val: '+80%' }
      ]
    },
    {
      id: 'selecaoDasQuinas16',
      name: "セレソン・ダス・キナス'16",
      policy: 'リアクション',
      formationId: '442a_quinas',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' }
      ]
    },
    {
      id: 'alvinegroPraiano',
      name: "アルヴィネグロ・プライアーノ’11",
      policy: 'リアクション',
      formationId: '442e_alvinegro',
      buffs: [
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+60%' },
        { name: '決定力', val: '+100%' },
        { name: 'キック力', val: '+100%' }
      ]
    },
    {
      id: 'encarnados23',
      name: "エンカルナードス’23",
      policy: 'リアクション',
      formationId: '433b_encarnados',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: '冷静さ', val: '+80%' }
      ]
    },
    {
      id: 'nerazzurro10',
      name: 'ネラッズーロ’10',
      policy: 'ムービング',
      formationId: '433b_nerazzurro',
      buffs: [
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+80%' },
        { name: '決定力', val: '+80%' },
        { name: 'コンタクト', val: '+100%' }
      ]
    },
    {
      id: 'canaria06',
      name: "カナリア軍団’06",
      policy: 'ムービング',
      formationId: '442c_canaria',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: '敏捷性', val: '+80%' }
      ]
    },
    {
      id: 'albiceleste01',
      name: "アルビセレステ’01",
      policy: 'ムービング',
      formationId: '343a_albiceleste',
      buffs: [
        { name: 'ジャンプ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: '敏捷性', val: '+80%' }
      ]
    },
    {
      id: 'soberano94',
      name: "ソベラーノ’94",
      policy: 'ムービング',
      formationId: '442e_soberano',
      buffs: [
        { name: 'キック力', val: '+80%' },
        { name: '突破力', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: 'スタミナ', val: '+80%' }
      ]
    },
    {
      id: 'blauGrana15',
      name: "ブラウ・グラーナ’15",
      policy: 'ポゼッション',
      formationId: '433a_blauGrana',
      buffs: [
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+80%' },
        { name: '決定力', val: '+80%' },
        { name: 'キック精度', val: '+80%' }
      ]
    },
    {
      id: 'losCafeteros94',
      name: "ロス・カフェテロス’94",
      policy: 'ポゼッション',
      formationId: '442d_losCafeteros',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: 'キック力', val: '+80%' }
      ]
    },
    {
      id: 'laRoja24',
      name: "ラ・ロハ’24",
      policy: 'ポゼッション',
      formationId: '433b_laRoja',
      buffs: [
        { name: '冷静さ', val: '+80%' },
        { name: 'キック精度', val: '+80%' },
        { name: 'パスカット', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ]
    },
    {
      id: 'laDea22',
      name: "ラ・デア’22",
      policy: 'ポゼッション',
      formationId: '352b_laDea',
      buffs: [
        { name: '冷静さ', val: '+80%' },
        { name: 'パスカット', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ]
    },
    {
      id: 'blueImpact26',
      name: "ブルー・インパクト’26",
      policy: 'カウンター',
      formationId: '361a_blueImpact',
      buffs: [
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+60%' },
        { name: '決定力', val: '+100%' },
        { name: 'コンタクト', val: '+100%' }
      ]
    },
    {
      id: 'euskaldunak12',
      name: "エウスカルドゥナク’12",
      policy: 'カウンター',
      formationId: '343c_euskaldunak',
      buffs: [
        { name: 'タックル', val: '+60%' },
        { name: 'マーク', val: '+80%' },
        { name: '決定力', val: '+80%' },
        { name: '冷静さ', val: '+100%' }
      ]
    },
    {
      id: 'river18',
      name: "リーベル’18",
      policy: 'カウンター',
      formationId: '433b_river',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'マーク', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'キック力', val: '+80%' }
      ]
    },
    {
      id: 'diavolo99',
      name: "ディアボロ・ディ・ミラノ’99",
      policy: 'カウンター',
      formationId: '343b_diavolo',
      buffs: [
        { name: 'キック力', val: '+80%' },
        { name: '突破力', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ]
    },
    {
      id: 'lesBleus98',
      name: "レ・ブルー’98",
      policy: 'カウンター',
      formationId: '442d_lesBleus',
      buffs: [
        { name: 'キック力', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: '敏捷性', val: '+80%' }
      ]
    },
    {
      id: 'azzurri14',
      name: "アズーリ’14",
      rank: '銀',
      policy: 'リアクション',
      formationId: '352b_azzurri',
      buffs: [
        { name: '冷静さ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    },
    {
      id: 'friulani98',
      name: "イ・フリウラーニ’98",
      rank: '銀',
      policy: 'リアクション',
      formationId: '343b_friulani',
      buffs: [
        { name: 'パスカット', val: '+80%' },
        { name: 'キープ力', val: '+80%' },
        { name: '敏捷性', val: '+80%' }
      ]
    },
    {
      id: 'crociati99',
      name: "クロチャーティ’99",
      rank: '銀',
      policy: 'リアクション',
      formationId: '532b_crociati',
      buffs: [
        { name: '決定力', val: '+80%' },
        { name: 'パスカット', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    },
    {
      id: 'hollywood01',
      name: "FCハリウッド’01",
      rank: '銀',
      policy: 'リアクション',
      formationId: '541a_hollywood',
      buffs: [
        { name: 'キープ力', val: '+60%' },
        { name: 'パスカット', val: '+60%' },
        { name: 'コンタクト', val: '+60%' }
      ]
    },
    {
      id: 'azzurri06',
      name: "アズーリ’06",
      rank: '銀',
      policy: 'リアクション',
      formationId: '451b_azzurri',
      buffs: [
        { name: '突破力', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' },
        { name: '敏捷性', val: '+60%' }
      ]
    },
    {
      id: 'gulag94',
      name: "ブロ・グルト’94",
      rank: '銀',
      policy: 'リアクション',
      formationId: '523a_gulag',
      buffs: [
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: 'キック力', val: '+80%' }
      ]
    },
    {
      id: 'grifoni99',
      name: "グリフォーニ’99",
      rank: '銀',
      policy: 'リアクション',
      formationId: '442c_grifoni',
      buffs: [
        { name: 'キック力', val: '+80%' },
        { name: 'ロングパス', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    },
    {
      id: 'blueGaru22',
      name: "ブルー・ガル’22",
      rank: '銀',
      policy: 'ムービング',
      formationId: '361b_blueGaru',
      buffs: [
        { name: 'ストッパー', val: '+80%' },
        { name: '組立CB', val: '+80%' },
        { name: 'セントラルMF', val: '+80%' }
      ]
    },
    {
      id: 'danishDynamite18',
      name: "ダニッシュ・ダイナマイト’18",
      rank: '銀',
      policy: 'ムービング',
      formationId: '451b_danish',
      buffs: [
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: 'キープ力', val: '+80%' }
      ]
    },
    {
      id: 'monaco04',
      name: "レ・ルージュ・エ・ブラン’04",
      rank: '銀',
      policy: 'ムービング',
      formationId: '433b_monaco',
      buffs: [
        { name: '決定力', val: '+80%' },
        { name: 'キープ力', val: '+80%' },
        { name: 'パスカット', val: '+80%' }
      ]
    },
    {
      id: 'amarela02',
      name: "ヴァルデ・アマレーラ’02",
      rank: '銀',
      policy: 'ムービング',
      formationId: '532a_amarela',
      buffs: [
        { name: 'パスカット', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' },
        { name: 'コンタクト', val: '+60%' }
      ]
    },
    {
      id: 'danishDynamite86',
      name: "ダニッシュ・ダイナマイト’86",
      rank: '銀',
      policy: 'ムービング',
      formationId: '352b_danish86',
      buffs: [
        { name: '突破力', val: '+60%' },
        { name: 'セービング', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' }
      ]
    },
    {
      id: 'amarillo06',
      name: "サブマリーノ・アマリーリョ’06",
      rank: '銀',
      policy: 'ムービング',
      formationId: '442a_amarillo',
      buffs: [
        { name: '走力', val: '+80%' },
        { name: 'パスカット', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    },
    {
      id: 'losMillonarios86',
      name: "ロス・ミリョナリオス’86",
      rank: '銀',
      policy: 'ムービング',
      formationId: '442d_losMillonarios',
      buffs: [
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: '冷静さ', val: '+80%' }
      ]
    },
    {
      id: 'hinomaru93',
      name: "ヒノマルスタイル’93",
      rank: '銀',
      policy: 'カウンター',
      formationId: '433b_hinomaru',
      buffs: [
        { name: 'ロングパス', val: '+80%' },
        { name: '突破力', val: '+80%' },
        { name: '走力', val: '+80%' }
      ]
    },
    {
      id: 'schwarzGelben16',
      name: "シュヴァルツ・ゲルベン’16",
      rank: '銀',
      policy: 'カウンター',
      formationId: '451a_schwarzGelben',
      buffs: [
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: 'キック精度', val: '+80%' }
      ]
    },
    {
      id: 'hinomaru68',
      name: "ヒノマルスタイル’68",
      rank: '銀',
      policy: 'カウンター',
      formationId: '343c_hinomaru68',
      buffs: [
        { name: '決定力', val: '+80%' },
        { name: 'ショートパス', val: '+80%' },
        { name: 'キック精度', val: '+80%' }
      ]
    },
    {
      id: 'blanquiroja82',
      name: "ラ・ブランキロハ’82",
      rank: '銀',
      policy: 'カウンター',
      formationId: '442e_blanquiroja',
      buffs: [
        { name: '突破力', val: '+80%' },
        { name: 'セービング', val: '+80%' },
        { name: 'コンタクト', val: '+80%' }
      ]
    },
    {
      id: 'losPuros01',
      name: "ロス・プロス’01",
      rank: '銀',
      policy: 'カウンター',
      formationId: '442a_losPuros',
      buffs: [
        { name: '突破力', val: '+60%' },
        { name: 'キープ力', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' }
      ]
    },
    {
      id: 'greenFalcons98',
      name: "グリーン・ファルコンズ’98",
      rank: '銀',
      policy: 'カウンター',
      formationId: '451b_greenFalcons',
      buffs: [
        { name: 'ロングパス', val: '+80%' },
        { name: '冷静さ', val: '+80%' },
        { name: '敏捷性', val: '+80%' }
      ]
    },
    {
      id: 'orlovi24',
      name: "オルロヴィ’24",
      rank: '銀',
      policy: 'カウンター',
      formationId: '442b_orlovi',
      buffs: [
        { name: '冷静さ', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    },
    {
      id: 'laRoja02',
      name: "ラ・ロハ’02",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '442b_laRoja02',
      buffs: [
        { name: 'コンタクト', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' },
        { name: 'パスカット', val: '+80%' }
      ]
    },
    {
      id: 'elLeon70',
      name: "エル・レオン’70",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '343c_elLeon70',
      buffs: [
        { name: 'ロングパス', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: 'キープ力', val: '+80%' }
      ]
    },
    {
      id: 'ulcitca03',
      name: "ウルチカ’03",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '451a_ulcitca03',
      buffs: [
        { name: '決定力', val: '+80%' },
        { name: 'ロングパス', val: '+80%' },
        { name: 'キープ力', val: '+80%' }
      ]
    },
    {
      id: 'diablesRouges18',
      name: "ディアブル・ルージュ’18",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '433a_diablesRouges18',
      buffs: [
        { name: 'キープ力', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' },
        { name: 'スタミナ', val: '+60%' }
      ]
    },
    {
      id: 'taegukWarriors02',
      name: "太極戦士’02",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '343b_taegukWarriors02',
      buffs: [
        { name: 'キック精度', val: '+60%' },
        { name: 'キープ力', val: '+60%' },
        { name: 'ジャンプ', val: '+60%' }
      ]
    },
    {
      id: 'dieAdler24',
      name: "ディー・アドラー’24",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '541a_dieAdler24',
      buffs: [
        { name: 'ロングパス', val: '+80%' },
        { name: 'コンタクト', val: '+80%' },
        { name: '走力', val: '+80%' }
      ]
    },
    {
      id: 'viola99',
      name: "ヴィオラ’99",
      rank: '銀',
      policy: 'ポゼッション',
      formationId: '451b_viola99',
      buffs: [
        { name: 'ボールタッチ', val: '+80%' },
        { name: '走力', val: '+80%' },
        { name: 'ジャンプ', val: '+80%' }
      ]
    }
  ];

  const FORMATIONS = [
    {
      id: '343c_selecao',
      name: '3-4-3C (セレソン’70)',
      comboId: 'selecao70',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%', requiredStyle: 'スプリントCB', minLevel: 2 },
        { id: 5, pos: 'DM', label: 'LDM', top: '54%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '54%', left: '62%', requiredStyle: 'ハードマーカー', minLevel: 2 },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 3 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ラインブレーカー', minLevel: 3 },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '343c_golden',
      name: "3-4-3C (ゴールデンゾーネン'94)",
      comboId: 'goldenZonen94',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '54%', left: '38%', requiredStyle: 'ハードマーカー', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'RDM', top: '54%', left: '62%', requiredStyle: 'セントラルDM', minLevel: 3 },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '442a_quinas',
      name: "4-4-2A (セレソン・ダス・キナス'16)",
      comboId: 'selecaoDasQuinas16',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '攻撃的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '20%', requiredStyle: 'サイドアタッカーLM', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '80%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ストライカー', minLevel: 3 },
      ]
    },
    {
      id: '442e_alvinegro',
      name: "4-4-2E (アルヴィネグロ・プライアーノ’11)",
      comboId: 'alvinegroPraiano',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '38%', left: '24%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'パサーAM', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'RAM', top: '38%', left: '76%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ラインブレーカー', minLevel: 3 },
      ]
    },
    {
      id: '433b_encarnados',
      name: "4-3-3B (エンカルナードス’23)",
      comboId: 'encarnados23',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 3 },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '433b_nerazzurro',
      name: "4-3-3B (ネラッズーロ’10)",
      comboId: 'nerazzurro10',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ワイドストライカーRW', minLevel: 3 },
      ]
    },
    {
      id: '442c_canaria',
      name: "4-4-2C (カナリア軍団’06)",
      comboId: 'canaria06',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'ハードマーカー', minLevel: 3 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ストライカー', minLevel: 2 },
      ]
    },
    {
      id: '343a_albiceleste',
      name: "3-4-3A (アルビセレステ’01)",
      comboId: 'albiceleste01',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'DM', top: '54%', left: '50%' },
        { id: 6, pos: 'LM', label: 'LM', top: '38%', left: '20%', requiredStyle: 'サイドアタッカーLM', minLevel: 3 },
        { id: 7, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 8, pos: 'RM', label: 'RM', top: '38%', left: '80%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '442e_soberano',
      name: "4-4-2E (ソベラーノ’94)",
      comboId: 'soberano94',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '38%', left: '24%', requiredStyle: 'パサーAM', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '38%', left: '76%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ストライカー', minLevel: 3 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '433a_blauGrana',
      name: "4-3-3A (ブラウ・グラーナ’15)",
      comboId: 'blauGrana15',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '54%', left: '50%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%', requiredStyle: 'セントラルAM', minLevel: 2 },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ストライカー', minLevel: 3 },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '442d_losCafeteros',
      name: "4-4-2D (ロス・カフェテロス’94)",
      comboId: 'losCafeteros94',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '26%', requiredStyle: 'セントラルDM', minLevel: 3 },
        { id: 7, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '54%', left: '74%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ストライカー', minLevel: 2 },
      ]
    },
    {
      id: '433b_laRoja',
      name: "4-3-3B (ラ・ロハ’24)",
      comboId: 'laRoja24',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%', requiredStyle: 'パサーDM', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ドリブラーRW', minLevel: 3 },
      ]
    },
    {
      id: '352b_laDea',
      name: "3-5-2B (ラ・デア’22)",
      comboId: 'laDea22',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '18%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '82%', requiredStyle: 'ドリブラーRM', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ラインブレーカー', minLevel: 3 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '361a_blueImpact',
      name: "3-6-1A (ブルー・インパクト’26)",
      comboId: 'blueImpact26',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%', requiredStyle: 'パサーDM', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '18%', requiredStyle: 'ドリブラーLM', minLevel: 3 },
        { id: 8, pos: 'AM', label: 'LAM', top: '34%', left: '34%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '34%', left: '66%' },
        { id: 10, pos: 'RM', label: 'RM', top: '40%', left: '82%', requiredStyle: 'ドリブラーRM', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    },
    {
      id: '343c_euskaldunak',
      name: "3-4-3C (エウスカルドゥナク’12)",
      comboId: 'euskaldunak12',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '54%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '54%', left: '62%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%', requiredStyle: 'アタッカー', minLevel: 3 },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '433b_river',
      name: "4-3-3B (リーベル’18)",
      comboId: 'river18',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'ハードマーカー', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'ドリブラーLW', minLevel: 3 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ドリブラーRW', minLevel: 2 },
      ]
    },
    {
      id: '343b_diavolo',
      name: "3-4-3B (ディアボロ・ディ・ミラノ’99)",
      comboId: 'diavolo99',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%', requiredStyle: 'セントラルDM', minLevel: 3 },
        { id: 7, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 8, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'ドリブラーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '442d_lesBleus',
      name: "4-4-2D (レ・ブルー’98)",
      comboId: 'lesBleus98',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '守備的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '26%' },
        { id: 7, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '54%', left: '74%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'セントラルAM', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ストライカー', minLevel: 3 },
      ]
    },
    {
      id: '352b_azzurri',
      name: "3-5-2B (アズーリ’14)",
      comboId: 'azzurri14',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '18%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '82%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '343b_friulani',
      name: "3-4-3B (イ・フリウラーニ’98)",
      comboId: 'friulani98',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '38%', left: '18%', requiredStyle: 'サイドアタッカーLM', minLevel: 2 },
        { id: 8, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '532b_crociati',
      name: "5-3-2B (クロチャーティ’99)",
      comboId: 'crociati99',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '68%', left: '14%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '74%', left: '32%' },
        { id: 4, pos: 'CB', label: 'CB', top: '76%', left: '50%' },
        { id: 5, pos: 'CB', label: 'RCB', top: '74%', left: '68%' },
        { id: 6, pos: 'RFB', label: 'RFB', top: '68%', left: '86%' },
        { id: 7, pos: 'DM', label: 'LDM', top: '52%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 8, pos: 'DM', label: 'RDM', top: '52%', left: '64%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ストライカー', minLevel: 2 },
      ]
    },
    {
      id: '541a_hollywood',
      name: "5-4-1A (FCハリウッド’01)",
      comboId: 'hollywood01',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '68%', left: '14%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '74%', left: '32%' },
        { id: 4, pos: 'CB', label: 'CB', top: '76%', left: '50%' },
        { id: 5, pos: 'CB', label: 'RCB', top: '74%', left: '68%' },
        { id: 6, pos: 'RFB', label: 'RFB', top: '68%', left: '86%', requiredStyle: '攻撃的RFB', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 9, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 10, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ラインブレーカー', minLevel: 2 },
      ]
    },
    {
      id: '451b_azzurri',
      name: "4-5-1B (アズーリ’06)",
      comboId: 'azzurri06',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%', requiredStyle: 'ドリブラーLM', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 10, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    },
    {
      id: '523a_gulag',
      name: "5-2-3A (ブロ・グルト’94)",
      comboId: 'gulag94',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '68%', left: '14%', requiredStyle: '攻撃的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '74%', left: '32%' },
        { id: 4, pos: 'CB', label: 'CB', top: '76%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 5, pos: 'CB', label: 'RCB', top: '74%', left: '68%' },
        { id: 6, pos: 'RFB', label: 'RFB', top: '68%', left: '86%' },
        { id: 7, pos: 'DM', label: 'LDM', top: '50%', left: '38%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '50%', left: '62%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ドリブラーRW', minLevel: 2 },
      ]
    },
    {
      id: '442c_grifoni',
      name: "4-4-2C (グリフォーニ’99)",
      comboId: 'grifoni99',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'LAM', top: '35%', left: '32%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ポストプレーヤー', minLevel: 2 },
      ]
    },
    {
      id: '361b_blueGaru',
      name: "3-6-1B (ブルー・ガル’22)",
      comboId: 'blueGaru22',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '26%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '56%', left: '74%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 10, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    },
    {
      id: '451b_danish',
      name: "4-5-1B (ダニッシュ・ダイナマイト’18)",
      comboId: 'danishDynamite18',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'パサーAM', minLevel: 2 },
        { id: 10, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ストライカー', minLevel: 2 },
      ]
    },
    {
      id: '433b_monaco',
      name: "4-3-3B (レ・ルージュ・エ・ブラン’04)",
      comboId: 'monaco04',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'パサー', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'サイドアタッカーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '532a_amarela',
      name: "5-3-2A (ヴァルデ・アマレーラ’02)",
      comboId: 'amarela02',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '68%', left: '14%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '74%', left: '32%' },
        { id: 4, pos: 'CB', label: 'CB', top: '76%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 5, pos: 'CB', label: 'RCB', top: '74%', left: '68%' },
        { id: 6, pos: 'RFB', label: 'RFB', top: '68%', left: '86%' },
        { id: 7, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 8, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '352b_danish86',
      name: "3-5-2B (ダニッシュ・ダイナマイト’86)",
      comboId: 'danishDynamite86',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%', requiredStyle: 'ハードマーカー', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '18%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '82%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%', requiredStyle: 'ラインブレーカー', minLevel: 2 },
      ]
    },
    {
      id: '442a_amarillo',
      name: "4-4-2A (サブマリーノ・アマリーリョ’06)",
      comboId: 'amarillo06',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '20%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '80%', requiredStyle: 'サイドアタッカーRM', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ポストプレーヤー', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '442d_losMillonarios',
      name: "4-4-2D (ロス・ミリョナリオス’86)",
      comboId: 'losMillonarios86',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '26%' },
        { id: 7, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '54%', left: '74%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '433b_hinomaru',
      name: "4-3-3B (ヒノマルスタイル’93)",
      comboId: 'hinomaru93',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '守備的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ドリブラーRW', minLevel: 2 },
      ]
    },
    {
      id: '451a_schwarzGelben',
      name: "4-5-1A (シュヴァルツ・ゲルベン’16)",
      comboId: 'schwarzGelben16',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '20%' },
        { id: 8, pos: 'AM', label: 'LAM', top: '35%', left: '34%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '35%', left: '66%' },
        { id: 10, pos: 'RM', label: 'RM', top: '40%', left: '80%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    },
    {
      id: '343c_hinomaru68',
      name: "3-4-3C (ヒノマルスタイル’68)",
      comboId: 'hinomaru68',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '54%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '54%', left: '62%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'ドリブラーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '442e_blanquiroja',
      name: "4-4-2E (ラ・ブランキロハ’82)",
      comboId: 'blanquiroja82',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '38%', left: '24%', requiredStyle: 'パサーAM', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'RAM', top: '38%', left: '76%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '442a_losPuros',
      name: "4-4-2A (ロス・プロス’01)",
      comboId: 'losPuros01',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'スイーパーGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '20%' },
        { id: 8, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 9, pos: 'RM', label: 'RM', top: '40%', left: '80%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%' },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '451b_greenFalcons',
      name: "4-5-1B (グリーン・ファルコンズ’98)",
      comboId: 'greenFalcons98',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '守備的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%', requiredStyle: 'ドリブラーLM', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%' },
        { id: 10, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    },
    {
      id: '442b_orlovi',
      name: "4-4-2B (オルロヴィ’24)",
      comboId: 'orlovi24',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '56%', left: '36%', requiredStyle: 'セントラルDM', minLevel: 2 },
        { id: 7, pos: 'DM', label: 'RDM', top: '56%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 9, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ストライカー', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '442b_laRoja02',
      name: "4-4-2B (ラ・ロハ’02)",
      comboId: 'laRoja02',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'LDM', top: '56%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '56%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 9, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 10, pos: 'CF', label: 'LCF', top: '16%', left: '36%', requiredStyle: 'ラインブレーカー', minLevel: 2 },
        { id: 11, pos: 'CF', label: 'RCF', top: '16%', left: '64%' },
      ]
    },
    {
      id: '343c_elLeon70',
      name: "3-4-3C (エル・レオン’70)",
      comboId: 'elLeon70',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '54%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '54%', left: '62%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%', requiredStyle: 'ドリブラーLW', minLevel: 2 },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '451a_ulcitca03',
      name: "4-5-1A (ウルチカ’03)",
      comboId: 'ulcitca03',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%', requiredStyle: '守備的LFB', minLevel: 2 },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '56%', left: '50%' },
        { id: 7, pos: 'LM', label: 'LM', top: '40%', left: '20%' },
        { id: 8, pos: 'AM', label: 'LAM', top: '35%', left: '34%' },
        { id: 9, pos: 'AM', label: 'RAM', top: '35%', left: '66%', requiredStyle: 'アタッカー', minLevel: 2 },
        { id: 10, pos: 'RM', label: 'RM', top: '40%', left: '80%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ポストプレーヤー', minLevel: 2 },
      ]
    },
    {
      id: '433a_diablesRouges18',
      name: "4-3-3A (ディアブル・ルージュ’18)",
      comboId: 'diablesRouges18',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%', requiredStyle: '組立CB', minLevel: 2 },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%' },
        { id: 6, pos: 'DM', label: 'DM', top: '54%', left: '50%' },
        { id: 7, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 8, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%', requiredStyle: 'ドリブラーRW', minLevel: 2 },
      ]
    },
    {
      id: '343b_taegukWarriors02',
      name: "3-4-3B (太極戦士’02)",
      comboId: 'taegukWarriors02',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'CB', label: 'LCB', top: '72%', left: '26%' },
        { id: 3, pos: 'CB', label: 'CB', top: '74%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 4, pos: 'CB', label: 'RCB', top: '72%', left: '74%' },
        { id: 5, pos: 'DM', label: 'LDM', top: '56%', left: '38%' },
        { id: 6, pos: 'DM', label: 'RDM', top: '56%', left: '62%' },
        { id: 7, pos: 'LM', label: 'LM', top: '38%', left: '18%', requiredStyle: 'ドリブラーLM', minLevel: 2 },
        { id: 8, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 9, pos: 'LW', label: 'LW', top: '18%', left: '20%' },
        { id: 10, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
        { id: 11, pos: 'RW', label: 'RW', top: '18%', left: '80%' },
      ]
    },
    {
      id: '541a_dieAdler24',
      name: "5-4-1A (ディー・アドラー’24)",
      comboId: 'dieAdler24',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%' },
        { id: 2, pos: 'LFB', label: 'LFB', top: '68%', left: '14%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '74%', left: '32%' },
        { id: 4, pos: 'CB', label: 'CB', top: '76%', left: '50%', requiredStyle: 'ストッパー', minLevel: 2 },
        { id: 5, pos: 'CB', label: 'RCB', top: '74%', left: '68%' },
        { id: 6, pos: 'RFB', label: 'RFB', top: '68%', left: '86%' },
        { id: 7, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 8, pos: 'DM', label: 'RDM', top: '54%', left: '64%', requiredStyle: 'パサーDM', minLevel: 2 },
        { id: 9, pos: 'AM', label: 'LAM', top: '35%', left: '32%' },
        { id: 10, pos: 'AM', label: 'RAM', top: '35%', left: '68%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%', requiredStyle: 'ラインブレーカー', minLevel: 2 },
      ]
    },
    {
      id: '451b_viola99',
      name: "4-5-1B (ヴィオラ’99)",
      comboId: 'viola99',
      slots: [
        { id: 1, pos: 'GK', label: 'GK', top: '90%', left: '50%', requiredStyle: 'オーソドックスGK', minLevel: 2 },
        { id: 2, pos: 'LFB', label: 'LFB', top: '70%', left: '16%' },
        { id: 3, pos: 'CB', label: 'LCB', top: '73%', left: '38%' },
        { id: 4, pos: 'CB', label: 'RCB', top: '73%', left: '62%' },
        { id: 5, pos: 'RFB', label: 'RFB', top: '70%', left: '84%', requiredStyle: '攻撃的RFB', minLevel: 2 },
        { id: 6, pos: 'DM', label: 'LDM', top: '54%', left: '36%' },
        { id: 7, pos: 'DM', label: 'RDM', top: '54%', left: '64%' },
        { id: 8, pos: 'LM', label: 'LM', top: '38%', left: '18%' },
        { id: 9, pos: 'AM', label: 'AM', top: '34%', left: '50%', requiredStyle: 'パサーAM', minLevel: 2 },
        { id: 10, pos: 'RM', label: 'RM', top: '38%', left: '82%' },
        { id: 11, pos: 'CF', label: 'CF', top: '14%', left: '50%' },
      ]
    }
  ];

  const [selectedFormation, setSelectedFormation] = useState(FORMATIONS[0]);
  const [teamPolicy, setTeamPolicy] = useState('リアクション');
  const [squadMap, setSquadMap] = useState({});
  const [benchMap, setBenchMap] = useState({});
  const [builderMaxEnhanced, setBuilderMaxEnhanced] = useState(false);
  const [activeSlotModal, setActiveSlotModal] = useState(null);
  const [filterPos, setFilterPos] = useState('ALL');
  const [modalSearchText, setModalSearchText] = useState('');

  const [savedSlots, setSavedSlots] = useState(() => {
    try {
      const data = localStorage.getItem('sfcc_saved_teams');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  });
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState('');
  const [toastMsg, setToastMsg] = useState(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    try {
      const active = localStorage.getItem('sfcc_active_team');
      if (active) {
        const parsed = JSON.parse(active);
        if (parsed.formationId) {
          const fmt = FORMATIONS.find(f => f.id === parsed.formationId);
          if (fmt) setSelectedFormation(fmt);
        }
        if (parsed.teamPolicy) setTeamPolicy(parsed.teamPolicy);
        if (typeof parsed.builderMaxEnhanced === 'boolean') setBuilderMaxEnhanced(parsed.builderMaxEnhanced);
        if (parsed.squadMap) setSquadMap(parsed.squadMap);
        if (parsed.benchMap) setBenchMap(parsed.benchMap);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    try {
      const payload = {
        formationId: selectedFormation?.id,
        teamPolicy,
        builderMaxEnhanced,
        squadMap,
        benchMap
      };
      localStorage.setItem('sfcc_active_team', JSON.stringify(payload));
    } catch (e) {
      console.error(e);
    }
  }, [selectedFormation, teamPolicy, builderMaxEnhanced, squadMap, benchMap]);

  const handleSaveTeamSlot = (slotName, existingId = null) => {
    const nameToUse = slotName?.trim() || `チーム ${savedSlots.length + 1}`;
    const newTeam = {
      id: existingId || ('team_' + Date.now()),
      name: nameToUse,
      updatedAt: new Date().toLocaleString('ja-JP', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
      formationId: selectedFormation?.id,
      formationName: selectedFormation?.name,
      teamPolicy,
      builderMaxEnhanced,
      squadMap,
      benchMap,
      playerCount: Object.values(squadMap).filter(Boolean).length
    };

    let updated;
    if (existingId) {
      updated = savedSlots.map(s => s.id === existingId ? newTeam : s);
    } else {
      updated = [...savedSlots, newTeam];
    }
    setSavedSlots(updated);
    try {
      localStorage.setItem('sfcc_saved_teams', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    setNewTeamName('');
    showToast(`「${nameToUse}」を保存しました！`);
  };

  const handleLoadTeamSlot = (team) => {
    if (!team) return;
    if (team.formationId) {
      const fmt = FORMATIONS.find(f => f.id === team.formationId);
      if (fmt) setSelectedFormation(fmt);
    }
    if (team.teamPolicy) setTeamPolicy(team.teamPolicy);
    if (typeof team.builderMaxEnhanced === 'boolean') setBuilderMaxEnhanced(team.builderMaxEnhanced);
    if (team.squadMap) setSquadMap(team.squadMap);
    if (team.benchMap) setBenchMap(team.benchMap);
    setIsSaveModalOpen(false);
    showToast(`「${team.name}」を読み込みました！`);
  };

  const handleDeleteTeamSlot = (teamId) => {
    const updated = savedSlots.filter(s => s.id !== teamId);
    setSavedSlots(updated);
    try {
      localStorage.setItem('sfcc_saved_teams', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
    showToast('スロットを削除しました');
  };

  const handleClearSquad = () => {
    if (window.confirm('配置されている選手をすべてクリアしますか？')) {
      setSquadMap({});
      setBenchMap({});
      showToast('チーム配置をクリアしました');
    }
  };

  // 選手選択ドロワー/モーダル表示時の3回に1回頻度広告判定
  const showSlotModalAd = useMemo(() => {
    if (activeSlotModal) {
      return checkModalAdFrequency();
    }
    return false;
  }, [activeSlotModal]);

  // 最大強化トグル対応の動的表示マップ
  const displaySquadMap = useMemo(() => {
    const map = {};
    Object.keys(squadMap).forEach(key => {
      if (squadMap[key]) {
        map[key] = builderMaxEnhanced ? getAdjustedPlayer(squadMap[key], '☆5', true) : squadMap[key];
      }
    });
    return map;
  }, [squadMap, builderMaxEnhanced]);

  const displayBenchMap = useMemo(() => {
    const map = {};
    Object.keys(benchMap).forEach(key => {
      if (benchMap[key]) {
        map[key] = builderMaxEnhanced ? getAdjustedPlayer(benchMap[key], '☆5', true) : benchMap[key];
      }
    });
    return map;
  }, [benchMap, builderMaxEnhanced]);

  // フォーメーション切替時ポリシー自動マッチング
  const handleSelectFormation = (fmt) => {
    setSelectedFormation(fmt);
    if (fmt.comboId === 'selecao70') {
      setTeamPolicy('リアクション');
    }
  };

  // 自動最強編成ロジック (ベンチ12名対応)
  const handleAutoBuild = () => {
    const sorted = [...players].sort((a, b) => {
      const pA = builderMaxEnhanced ? getAdjustedPlayer(a, '☆5', true) : a;
      const pB = builderMaxEnhanced ? getAdjustedPlayer(b, '☆5', true) : b;
      return (pB.overall || 0) - (pA.overall || 0);
    });
    const newSquad = {};
    const usedIds = new Set();

    const targetCombo = FORMATION_COMBOS.find(c => c.formationId === selectedFormation.id || c.id === selectedFormation.comboId);

    if (targetCombo) {
      setTeamPolicy(targetCombo.policy);

      // 指定位置条件 (RCB, RDM, LW, CF) を満たす選手を最優先セット
      selectedFormation.slots.forEach(slot => {
        if (slot.requiredStyle) {
          const candidate = sorted.find(p => {
            if (usedIds.has(p.id)) return false;
            return checkPlayStyleRequirement(p, slot.requiredStyle, slot.minLevel);
          });

          if (candidate) {
            newSquad[slot.id] = candidate;
            usedIds.add(candidate.id);
          }
        }
      });
    }

    // 残りのスロットに総合力順で割り当て
    selectedFormation.slots.forEach(slot => {
      if (newSquad[slot.id]) return;
      const match = sorted.find(p => !usedIds.has(p.id) && (p.mainPosition === slot.pos || (p.subPositions && p.subPositions.includes(slot.pos))));
      if (match) {
        newSquad[slot.id] = match;
        usedIds.add(match.id);
      } else {
        const fallback = sorted.find(p => !usedIds.has(p.id));
        if (fallback) {
          newSquad[slot.id] = fallback;
          usedIds.add(fallback.id);
        }
      }
    });

    // ベンチ12名
    const newBench = {};
    for (let i = 0; i < 12; i++) {
      const benchPlayer = sorted.find(p => !usedIds.has(p.id));
      if (benchPlayer) {
        newBench[i] = benchPlayer;
        usedIds.add(benchPlayer.id);
      }
    }

    setSquadMap(newSquad);
    setBenchMap(newBench);
  };

  const handleClearSquad = () => {
    setSquadMap({});
    setBenchMap({});
  };

  const starterPlayers = Object.values(displaySquadMap).filter(Boolean);
  const rawBaseOverall = starterPlayers.reduce((acc, p) => acc + (p.overall || 0), 0);

  // ポリシー一致選手への 1.05倍 乗算（各選手ごとに Math.floor(player.overall * 1.05) で端数切捨て ➔ 合算）
  const policyAdjustedOverall = starterPlayers.reduce((acc, p) => {
    const isPolicyMatch = p.policy === teamPolicy;
    const playerBonusVal = isPolicyMatch ? Math.floor((p.overall || 0) * 1.05) : (p.overall || 0);
    return acc + playerBonusVal;
  }, 0);

  const policyBonusGained = policyAdjustedOverall - rawBaseOverall;

  const policyMatchCount = starterPlayers.filter(p => p.policy === teamPolicy).length;
  const policyMatchPct = starterPlayers.length > 0 ? Math.round((policyMatchCount / starterPlayers.length) * 100) : 0;

  // フォーメーションコンボ達成判定 (位置指定厳格判定)
  const activeComboData = FORMATION_COMBOS.find(c => c.formationId === selectedFormation.id || c.id === selectedFormation.comboId);

  const comboValidation = useMemo(() => {
    if (!activeComboData) return null;

    const isPolicyMatch = teamPolicy === activeComboData.policy;

    const reqResults = selectedFormation.slots
      .filter(slot => slot.requiredStyle)
      .map(slot => {
        const playerInSlot = squadMap[slot.id];
        const isFulfilled = checkPlayStyleRequirement(playerInSlot, slot.requiredStyle, slot.minLevel);

        return {
          slotId: slot.id,
          posLabel: slot.label,
          requiredStyle: slot.requiredStyle,
          minLevel: slot.minLevel,
          label: `【${slot.label}位置】${slot.requiredStyle} (LV.${slot.minLevel}以上)`,
          isFulfilled,
          player: playerInSlot ? (builderMaxEnhanced ? getAdjustedPlayer(playerInSlot, '☆5', true) : playerInSlot) : null
        };
      });

    const allReqsFulfilled = isPolicyMatch && reqResults.every(r => r.isFulfilled);

    const isSelecao = activeComboData.id === 'selecao70';
    const brazilPlayerCount = isSelecao ? starterPlayers.filter(p => p.nationality === 'ブラジル').length : 0;
    const brazilBonusPct = brazilPlayerCount * 2;

    // ボーナス率計算 (特定4項目特化コンボ ＋ ブラジル国籍4項目能力ボーナス)
    const baseComboSum = allReqsFulfilled ? 320 : 0; // 320 / 18 = 17.8%
    const brazilBonusSum = (allReqsFulfilled && isSelecao) ? (brazilPlayerCount * 8) : 0;
    const totalComboBoostPct = allReqsFulfilled ? Math.round(((baseComboSum + brazilBonusSum) / 18) * 10) / 10 : 0;
    const comboFactor = 1 + (totalComboBoostPct / 100);

    // 最終チーム総合力 = 各選手ごとに [ポリシー適用後総合力 ✕ コンボ倍率] ➔ 端数切捨て ➔ 整数化合算
    const boostedOverall = starterPlayers.reduce((acc, p) => {
      const isPolicyMatch = p.policy === teamPolicy;
      const policyVal = isPolicyMatch ? Math.floor((p.overall || 0) * 1.05) : (p.overall || 0);
      const finalVal = allReqsFulfilled ? Math.floor(policyVal * comboFactor) : policyVal;
      return acc + finalVal;
    }, 0);

    const totalGainedOverall = boostedOverall - rawBaseOverall;
    const comboGainedOverall = boostedOverall - policyAdjustedOverall;

    return {
      combo: activeComboData,
      isPolicyMatch,
      reqResults,
      allReqsFulfilled,
      isSelecao,
      brazilPlayerCount,
      brazilBonusPct,
      baseComboBonusPct: 17.8,
      totalComboBoostPct,
      boostedOverall,
      totalGainedOverall,
      comboGainedOverall
    };
  }, [activeComboData, teamPolicy, selectedFormation, squadMap, starterPlayers, builderMaxEnhanced, policyAdjustedOverall, rawBaseOverall]);

  const getAssignedLocationInfo = (playerId) => {
    const pIdStr = String(playerId);
    for (const [slotId, player] of Object.entries(squadMap)) {
      if (player && String(player.id) === pIdStr) {
        const slotObj = selectedFormation.slots.find(s => String(s.id) === String(slotId));
        return { type: 'starter', slotId, label: `スタメン (${slotObj ? slotObj.label : '配置中'})` };
      }
    }
    for (const [benchIdx, player] of Object.entries(benchMap)) {
      if (player && String(player.id) === pIdStr) {
        return { type: 'bench', slotId: benchIdx, label: `ベンチ (SUB${Number(benchIdx) + 1})` };
      }
    }
    return null;
  };

  const modalPlayers = useMemo(() => {
    return players.filter(p => {
      // ポジションフィルタ (LAM/RAM ➔ AM, LCF/RCF ➔ CF, LDM/RDM ➔ DM 等 完全正規化)
      if (filterPos !== 'ALL') {
        const isMainMatch = isPositionMatch(p.mainPosition, filterPos);
        const isSubMatch = p.subPositions && p.subPositions.some(sp => isPositionMatch(sp, filterPos));
        if (!isMainMatch && !isSubMatch) return false;
      }

      // テキストリアルタイム検索フィルタ (選手名、プレースタイル、ポリシー、国籍、チーム)
      if (modalSearchText.trim() !== '') {
        const q = modalSearchText.trim().toLowerCase();
        const nameMatch = (p.name && p.name.toLowerCase().includes(q)) || (p.readingName && p.readingName.toLowerCase().includes(q));
        const styleMatch = p.playStyle && p.playStyle.toLowerCase().includes(q);
        const subStyleMatch = p.subPlayStyles && p.subPlayStyles.some(s => s.toLowerCase().includes(q));
        const policyMatch = p.policy && p.policy.toLowerCase().includes(q);
        const natMatch = p.nationality && p.nationality.toLowerCase().includes(q);
        const teamMatch = p.team && p.team.toLowerCase().includes(q);
        const posMatch = (p.mainPosition && p.mainPosition.toLowerCase().includes(q)) || (p.subPositions && p.subPositions.some(sp => sp.toLowerCase().includes(q)));

        if (!nameMatch && !styleMatch && !subStyleMatch && !policyMatch && !natMatch && !teamMatch && !posMatch) {
          return false;
        }
      }

      return true;
    }).map(p => builderMaxEnhanced ? getAdjustedPlayer(p, '☆5', true) : p)
      .sort((a, b) => b.overall - a.overall);
  }, [players, filterPos, modalSearchText, builderMaxEnhanced]);

  const handleAssignPlayer = (player) => {
    if (!activeSlotModal) return;
    const baseP = player.rawPlayer || player;
    const pId = String(baseP.id);

    // 既に他のスロットに配置されているか探す
    let prevType = null; // 'starter' | 'bench'
    let prevSlotId = null;

    Object.keys(squadMap).forEach(key => {
      if (squadMap[key] && String(squadMap[key].id) === pId) {
        prevType = 'starter';
        prevSlotId = key;
      }
    });

    if (!prevType) {
      Object.keys(benchMap).forEach(key => {
        if (benchMap[key] && String(benchMap[key].id) === pId) {
          prevType = 'bench';
          prevSlotId = key;
        }
      });
    }

    const currentType = activeSlotModal.type; // 'starter' | 'bench'
    const currentSlotId = activeSlotModal.id;

    // 現在のスロットに入っている既存選手
    const existingPInCurrent = currentType === 'starter' ? squadMap[currentSlotId] : benchMap[currentSlotId];

    if (prevType && String(prevSlotId) === String(currentSlotId) && prevType === currentType) {
      // 同じスロットの場合は閉じるだけ
      setActiveSlotModal(null);
      return;
    }

    if (prevType && prevSlotId !== null) {
      // 既に他スロットにいる場合は移動/入れ替え (Move / Swap)
      if (currentType === 'starter') {
        setSquadMap(prev => ({ ...prev, [currentSlotId]: baseP }));
      } else {
        setBenchMap(prev => ({ ...prev, [currentSlotId]: baseP }));
      }

      if (prevType === 'starter') {
        setSquadMap(prev => {
          const next = { ...prev };
          if (existingPInCurrent && String(existingPInCurrent.id) !== pId) {
            next[prevSlotId] = existingPInCurrent;
          } else {
            delete next[prevSlotId];
          }
          return next;
        });
      } else {
        setBenchMap(prev => {
          const next = { ...prev };
          if (existingPInCurrent && String(existingPInCurrent.id) !== pId) {
            next[prevSlotId] = existingPInCurrent;
          } else {
            delete next[prevSlotId];
          }
          return next;
        });
      }
    } else {
      // 未配置の新規割り当て
      if (currentType === 'starter') {
        setSquadMap(prev => ({ ...prev, [currentSlotId]: baseP }));
      } else {
        setBenchMap(prev => ({ ...prev, [currentSlotId]: baseP }));
      }
    }

    setActiveSlotModal(null);
  };

  const handleRemoveSlot = (type, id, e) => {
    e.stopPropagation();
    if (type === 'starter') {
      setSquadMap(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } else {
      setBenchMap(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }
  };

  const currentSlotInfo = activeSlotModal?.type === 'starter' ? selectedFormation.slots.find(s => s.id === activeSlotModal.id) : null;

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      <div className="glass-panel p-4 sm:p-6 rounded-2xl md:rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00FF66]/10 border border-[#00FF66]/30 text-[#00FF66] text-xs font-bold mb-2">
              <Icon name="sparkles" className="w-3.5 h-3.5" />
              サカつく2026 チームビルダー ＆ コンボ解析
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white flex items-center gap-2">
              ⚽ チームデッキ編成 ＆ フォーメーションコンボ
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              スタメン11名＋ベンチ12名編成！ポリシー一致 ＆ コンボボーナス適用後の最終総合力を即時解析。
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* 最大強化トグル */}
            <button
              onClick={() => setBuilderMaxEnhanced(!builderMaxEnhanced)}
              className={`px-3.5 py-2 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all cursor-pointer ${builderMaxEnhanced
                ? 'bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black shadow-lg shadow-orange-500/20'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                }`}
            >
              <Icon name="sparkles" className="w-4 h-4" />
              {builderMaxEnhanced ? '⚡ 最大強化 (ON)' : '🌱 初期数値 (OFF)'}
            </button>
            <button
              onClick={handleAutoBuild}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-[#00FF66]/20 hover:brightness-110 flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Icon name="sparkles" className="w-4 h-4" />
              ⚡ 位置コンボ優先 自動最適編成
            </button>
            <button
              onClick={handleClearSquad}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-slate-700 text-xs sm:text-sm font-bold flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Icon name="trash" className="w-4 h-4" />
              全クリア
            </button>
            <button
              onClick={() => setIsSaveModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer relative"
            >
              <Icon name="bookmark" className="w-4 h-4" />
              チーム保存 / 呼出
              {savedSlots.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-white/20 text-white text-[10px] font-black">
                  {savedSlots.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* 総合力比較ダッシュボード */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-4 border-t border-slate-800/80">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              {builderMaxEnhanced ? '基本総合力 (加算前)' : '基本総合力 (加算前)'}
            </div>
            <div className="text-xl sm:text-2xl font-black font-num text-slate-200 mt-0.5">
              {rawBaseOverall.toLocaleString()}
            </div>
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-emerald-500/30 text-center">
            <div className="text-[10px] font-bold text-[#00FF66] uppercase tracking-wider">
              ポリシー一致後
            </div>
            <div className="text-xl sm:text-2xl font-black font-num text-[#00FF66] mt-0.5">
              {policyAdjustedOverall.toLocaleString()}
            </div>
            <div className="text-[9px] font-bold text-[#00FF66]/80 mt-0.5">
              +{policyBonusGained.toLocaleString()} ({policyMatchCount}名一致)
            </div>
          </div>
          <div className={`p-3 rounded-xl border text-center transition-all ${comboValidation?.allReqsFulfilled
            ? 'bg-gradient-to-br from-amber-500/20 to-slate-950 border-amber-400/80 shadow-md shadow-amber-400/10'
            : 'bg-slate-950/80 border-slate-800/80'
            }`}>
            <div className="text-[10px] font-bold text-amber-300 uppercase tracking-wider flex items-center justify-center gap-1">
              <span>最終チーム総合力</span>
              {comboValidation?.allReqsFulfilled && <span className="text-xs">🔥</span>}
            </div>
            <div className="text-xl sm:text-2xl font-black font-num text-amber-400 mt-0.5">
              {comboValidation ? comboValidation.boostedOverall.toLocaleString() : policyAdjustedOverall.toLocaleString()}
            </div>
            {comboValidation?.allReqsFulfilled && (
              <div className="text-[10px] font-black text-amber-300 mt-0.5">
                +{comboValidation.totalGainedOverall.toLocaleString()}
              </div>
            )}
          </div>
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 text-center">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">チームポリシー</div>
            <select
              value={teamPolicy}
              onChange={(e) => setTeamPolicy(e.target.value)}
              className={`mt-1 bg-slate-900 text-xs sm:text-sm font-black px-2 py-0.5 rounded border focus:outline-none cursor-pointer transition-all ${getPolicyTextColor(teamPolicy)} ${getPolicyBadgeClass(teamPolicy)}`}
            >
              <option value="リアクション" className="bg-slate-900 text-cyan-400 font-extrabold">リアクション</option>
              <option value="カウンター" className="bg-slate-900 text-pink-400 font-extrabold">カウンター</option>
              <option value="ポゼッション" className="bg-slate-900 text-orange-400 font-extrabold">ポゼッション</option>
              <option value="ムービング" className="bg-slate-900 text-emerald-400 font-extrabold">ムービング</option>
            </select>
          </div>
        </div>
      </div>

      {/* ポリシー別フォーメーション選択テーブル */}
      <div className="bg-slate-950/90 p-4 rounded-2xl border border-slate-800/90 shadow-xl space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-2.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xl">📋</span>
            <h3 className="font-black text-sm sm:text-base text-white">
              フォーメーション選択 <span className="text-xs font-normal text-slate-400">(ポリシー別一覧)</span>
            </h3>
          </div>
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
            <span>選択中:</span>
            <span className="text-[#00FF66] font-black">{selectedFormation.name}</span>
          </div>
        </div>

        <div className="overflow-x-auto max-h-[380px] scrollbar-thin scrollbar-thumb-slate-700">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-slate-800 text-slate-400 font-bold bg-slate-900">
                <th className="py-2.5 px-3 w-28 whitespace-nowrap">ポリシー</th>
                <th className="py-2.5 px-3 whitespace-nowrap">フォーメーション名</th>
                <th className="py-2.5 px-3 whitespace-nowrap">対象コンボ名</th>
                <th className="py-2.5 px-3 whitespace-nowrap hidden md:table-cell">コンボ能力ボーナス</th>
                <th className="py-2.5 px-3 text-center whitespace-nowrap">選択</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {['リアクション', 'ムービング', 'ポゼッション', 'カウンター', '基本'].map(policyGroup => {
                const matchedFormations = FORMATIONS.filter(fmt => {
                  const combo = FORMATION_COMBOS.find(c => c.id === fmt.comboId);
                  if (policyGroup === '基本') return !combo;
                  return combo?.policy === policyGroup;
                });

                if (matchedFormations.length === 0) return null;

                return matchedFormations.map((fmt) => {
                  const combo = FORMATION_COMBOS.find(c => c.id === fmt.comboId);
                  const isSelected = selectedFormation.id === fmt.id;

                  return (
                    <tr
                      key={fmt.id}
                      onClick={() => handleSelectFormation(fmt)}
                      className={`cursor-pointer transition-colors ${isSelected
                        ? 'bg-emerald-500/15 font-bold border-l-4 border-l-[#00FF66]'
                        : 'hover:bg-slate-900/80'
                        }`}
                    >
                      {/* ポリシー名 */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${getPolicyBadgeClass(policyGroup)}`}>
                          {policyGroup}
                        </span>
                      </td>

                      {/* フォーメーション名 */}
                      <td className="py-2.5 px-3 font-bold text-white whitespace-nowrap">
                        {fmt.name}
                      </td>

                      {/* 発動コンボ */}
                      <td className="py-2.5 px-3 whitespace-nowrap">
                        {combo ? (
                          <span className="text-amber-400 font-extrabold flex items-center gap-1">
                            <span>🏆</span>
                            <span>{combo.name}</span>
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>

                      {/* コンボ効果 */}
                      <td className="py-2.5 px-3 text-slate-300 hidden md:table-cell whitespace-nowrap">
                        {combo ? (
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {combo.buffs.map((b, bIdx) => (
                              <span key={bIdx} className="text-[10px] font-black bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700 text-slate-200">
                                {b.name} <span className="text-amber-400">{b.val}</span>
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-slate-500 text-[11px]">基本フォーメーション (コンボなし)</span>
                        )}
                      </td>

                      {/* 選択ボタン */}
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectFormation(fmt);
                          }}
                          className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer ${isSelected
                            ? 'bg-[#00FF66] text-slate-950 shadow-md shadow-[#00FF66]/20'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                            }`}
                        >
                          {isSelected ? '✓ 選択中' : '選択'}
                        </button>
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* フォーメーションコンボ発動解析ダッシュボード */}
      {comboValidation && (
        <div className={`p-4 rounded-2xl border transition-all ${comboValidation.allReqsFulfilled
          ? 'bg-gradient-to-br from-amber-500/15 via-slate-900 to-slate-950 border-amber-400 shadow-xl shadow-amber-500/10'
          : 'bg-slate-900/90 border-slate-800'
          }`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className={`p-2 rounded-xl text-xl ${comboValidation.allReqsFulfilled ? 'bg-amber-400 text-slate-950 shadow' : 'bg-slate-800 text-slate-400'}`}>
                {comboValidation.allReqsFulfilled ? '🏆' : '⚠️'}
              </span>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-black text-base sm:text-lg text-white">
                    フォーメーションコンボ 【{comboValidation.combo.name}】
                  </h3>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${comboValidation.allReqsFulfilled
                    ? 'bg-amber-400 text-slate-950 border-amber-300 font-extrabold animate-pulse'
                    : 'bg-red-500/20 text-red-400 border-red-500/40'
                    }`}>
                    {comboValidation.allReqsFulfilled ? '✨ コンボ発動完了！' : '条件未達成'}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  必要ポリシー: <strong className={getPolicyTextColor(comboValidation.combo.policy)}>{comboValidation.combo.policy}</strong> | 配置: <strong className="text-white">LW / CF / RW / LAM / RAM / LDM / RDM / LCB / CB / RCB</strong>
                </p>
              </div>
            </div>

            {/* 発動効果バッジ */}
            {comboValidation.allReqsFulfilled && (
              <div className="bg-amber-400/10 border border-amber-400/30 p-2.5 rounded-xl space-y-1">
                <div className="text-[10px] font-black text-amber-300 uppercase tracking-wider">発動中チーム能力ボーナス</div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {comboValidation.combo.buffs.map((b, i) => (
                    <span key={i} className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-num font-black text-xs shadow-sm">
                      {b.name} {b.val}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* コンボボーナス総合力比較 ＆ 内訳解析パネル */}
          {comboValidation.allReqsFulfilled && (
            <div className="mt-3 bg-slate-950 p-4 rounded-xl border border-amber-400/40 space-y-3 shadow-inner">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <Icon name="sparkles" className="w-4 h-4 text-amber-400" />
                  コンボボーナス総合力シミュレーション
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-400 text-slate-950 shadow">
                  ✨ {comboValidation.combo.name} 発動中
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                  <div className="text-[10px] font-bold text-slate-400">基本総合力 (未加算)</div>
                  <div className="text-lg font-black font-num text-slate-200 mt-0.5">
                    {rawBaseOverall.toLocaleString()}
                  </div>
                </div>

                <div className="bg-slate-900/90 p-3 rounded-lg border border-emerald-500/30">
                  <div className="text-[10px] font-bold text-[#00FF66]">ポリシー一致ボーナス</div>
                  <div className="text-lg font-black font-num text-[#00FF66] mt-0.5">
                    +{policyBonusGained.toLocaleString()} <span className="text-xs">(一致{policyMatchCount}名)</span>
                  </div>
                </div>

                <div className="bg-amber-400/10 p-3 rounded-lg border border-amber-400/50">
                  <div className="text-[10px] font-bold text-amber-300">最終チーム総合力 (コンボ発動)</div>
                  <div className="text-xl sm:text-2xl font-black font-num text-amber-400 mt-0.5">
                    {comboValidation.boostedOverall.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* ボーナス詳細内訳 */}
              <div className="text-xs space-y-1.5 pt-2 border-t border-slate-800/80">
                <div className="font-bold text-slate-300">発動中ボーナス内訳:</div>
                <div className={`grid grid-cols-1 ${comboValidation.isSelecao ? 'sm:grid-cols-3' : 'sm:grid-cols-2'} gap-2 text-[11px]`}>
                  <div className="flex flex-col justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-cyan-400 font-bold">🔰 ポリシー一致ボーナス:</span>
                    <span className="text-white font-bold mt-1">一致 {policyMatchCount}名 (+{policyBonusGained.toLocaleString()})</span>
                  </div>
                  <div className="flex flex-col justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <span className="text-amber-400 font-bold">🏆 {comboValidation.combo.name} 発動効果:</span>
                    <span className="text-white font-bold mt-1">
                      {comboValidation.combo.buffs.map(b => `${b.name}${b.val}`).join(', ')}
                    </span>
                  </div>
                  {comboValidation.isSelecao && (
                    <div className="flex flex-col justify-between bg-slate-900 p-2 rounded-lg border border-slate-800">
                      <span className="text-[#00FF66] font-bold">🇧🇷 ブラジル国籍ボーナス:</span>
                      <span className="text-white font-bold mt-1">ブラジル選手 {comboValidation.brazilPlayerCount}名 (+{comboValidation.brazilBonusPct}%)</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 位置指定条件チェックリスト */}
          <div className="mt-3 space-y-2">
            <div className="text-xs font-bold text-slate-300">位置指定・発動条件チェックリスト:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {/* ポリシー条件 */}
              <div className={`p-2 rounded-xl border flex items-center justify-between ${comboValidation.isPolicyMatch ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}>
                <span className="font-bold">チームポリシー: <strong className={getPolicyTextColor(comboValidation.combo.policy)}>{comboValidation.combo.policy}</strong></span>
                <span className="font-black">{comboValidation.isPolicyMatch ? '✓ 一致' : '❌ 要変更'}</span>
              </div>

              {/* プレースタイル位置条件 */}
              {comboValidation.reqResults.map((req, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border flex items-center justify-between ${req.isFulfilled ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'}`}
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="font-black">{req.isFulfilled ? '✓' : '❌'}</span>
                    <span className="font-bold truncate">{req.label}</span>
                  </div>
                  {req.player ? (
                    <span className="text-[10px] font-black bg-slate-900/80 px-1.5 py-0.5 rounded border border-slate-700 truncate max-w-[120px]">
                      {req.player.name} (LV.{req.player.playStyleLevel || 1})
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold opacity-75">未配置</span>
                  )}
                </div>
              ))}
            </div>

            {/* 国籍追加ボーナス（セレソン'70 ブラジル限定） */}
            {comboValidation.isSelecao && (
              <div className="mt-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="text-base">🇧🇷</span>
                  <span className="font-bold text-slate-200">{comboValidation.combo.specialNote}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold">フィールド上ブラジル選手:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-[#00FF66] border border-[#00FF66]/30 font-black font-num">
                    {comboValidation.brazilPlayerCount}名 (上記4能力 +{comboValidation.brazilBonusPct}%)
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* サッカーピッチ ＆ ピッチ上スロット (CB-GK間隔ゆったり調整) */}
      <div className="relative w-full aspect-[4/5] sm:aspect-[16/11] max-w-4xl mx-auto rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-2xl bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950">
        <div className="absolute inset-0 pointer-events-none opacity-25">
          <div className="absolute inset-4 border-2 border-white rounded-xl"></div>
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white -translate-y-1/2"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-4 left-1/2 w-48 h-20 border-2 border-white -translate-x-1/2 border-t-0 rounded-b-xl"></div>
          <div className="absolute bottom-4 left-1/2 w-48 h-20 border-2 border-white -translate-x-1/2 border-b-0 rounded-t-xl"></div>
        </div>

        {selectedFormation.slots.map(slot => {
          const rawP = squadMap[slot.id];
          const player = displaySquadMap[slot.id];
          const isPolicyMatched = player && player.policy === teamPolicy;

          // 位置条件達成チェック
          const isReqSlot = !!slot.requiredStyle;
          const isReqFulfilled = isReqSlot && checkPlayStyleRequirement(rawP, slot.requiredStyle, slot.minLevel);

          return (
            <div
              key={slot.id}
              onClick={() => {
                const normP = normalizePosition(slot.pos);
                setFilterPos(normP);
                setModalSearchText('');
                setActiveSlotModal({ type: 'starter', id: slot.id, targetPos: normP, rawLabel: slot.label });
              }}
              style={{ top: slot.top, left: slot.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            >
              {player ? (
                <div className="flex flex-col items-center relative active:scale-95 transition-transform">
                  <button
                    onClick={(e) => handleRemoveSlot('starter', slot.id, e)}
                    className="absolute -top-1 -right-1 z-30 w-4 h-4 rounded-full bg-slate-900 hover:bg-red-500 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 text-[10px]"
                    title="外す"
                  >
                    ✕
                  </button>

                  {/* 位置指定条件達成インジケーター */}
                  {isReqSlot && (
                    <span className={`absolute -top-3 left-1/2 -translate-x-1/2 px-1 py-0.2 rounded text-[7px] sm:text-[8px] font-black whitespace-nowrap z-30 shadow ${isReqFulfilled
                      ? 'bg-amber-400 text-slate-950 border border-amber-300'
                      : 'bg-red-600 text-white border border-red-400'
                      }`}>
                      {isReqFulfilled ? `✓ ${slot.requiredStyle}` : `要:${slot.requiredStyle}`}
                    </span>
                  )}

                  <div className={`relative w-10 h-14 sm:w-14 sm:h-20 aspect-[3/4] rounded-lg sm:rounded-xl border-2 overflow-hidden shadow-lg bg-slate-950 ${isReqFulfilled
                    ? 'border-amber-400 shadow-amber-400/40 ring-2 ring-amber-400/30'
                    : isPolicyMatched
                      ? 'border-[#00FF66] shadow-[#00FF66]/20'
                      : 'border-slate-700'
                    }`}>
                    <PlayerAvatar player={player} className="w-full h-full object-cover" />
                    <span className={`absolute bottom-0 left-0 right-0 py-0.2 text-center text-[7px] sm:text-[9px] font-black font-num ${getRarityBadgeStyle(player.rarity)}`}>
                      {player.overall}
                    </span>
                  </div>

                  <div className="mt-1 bg-slate-950/90 px-1.5 py-0.5 rounded-md border border-slate-800 text-center max-w-[70px] sm:max-w-[100px] shadow">
                    <div className="text-[7px] sm:text-[9px] font-black text-white truncate">{player.name}</div>
                    <div className="text-[6px] sm:text-[8px] font-bold text-[#00FF66] truncate">{slot.label}</div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
                  <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full border-2 border-dashed flex flex-col items-center justify-center shadow-lg backdrop-blur-sm ${isReqSlot
                    ? 'border-amber-400/80 bg-amber-500/10 text-amber-300 hover:bg-amber-500/20'
                    : 'border-emerald-400/60 bg-slate-950/60 text-emerald-400 hover:bg-emerald-500/20'
                    }`}>
                    <Icon name="plus" className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-[8px] sm:text-[10px] font-black">{slot.label}</span>
                  </div>
                  {isReqSlot && (
                    <span className="mt-0.5 text-[7px] sm:text-[8px] font-bold text-amber-300 bg-amber-400/10 px-1 rounded border border-amber-400/30 whitespace-nowrap">
                      要:{slot.requiredStyle}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ベンチ・サブメンバー (12名) */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 bg-slate-900/90">
        <h3 className="text-sm font-black text-white flex items-center justify-between gap-2 mb-3">
          <span className="flex items-center gap-2">🪑 ベンチ・サブメンバー (12名)</span>
          <span className="text-xs font-bold text-slate-400">SUB1 〜 SUB12</span>
        </h3>
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 gap-2 sm:gap-2.5">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(idx => {
            const benchPlayer = displayBenchMap[idx];

            return (
              <div
                key={idx}
                onClick={() => {
                  setFilterPos('ALL');
                  setModalSearchText('');
                  setActiveSlotModal({ type: 'bench', id: idx, targetPos: 'SUB' });
                }}
                className="flex flex-col items-center relative cursor-pointer group"
              >
                {benchPlayer ? (
                  <div className="relative w-full flex flex-col items-center active:scale-95 transition-transform">
                    <button
                      onClick={(e) => handleRemoveSlot('bench', idx, e)}
                      className="absolute -top-1 -right-1 z-30 w-4 h-4 rounded-full bg-slate-900 hover:bg-red-500 text-slate-400 hover:text-white flex items-center justify-center border border-slate-700 text-[10px]"
                      title="外す"
                    >
                      ✕
                    </button>
                    <div className="w-10 h-14 sm:w-12 sm:h-16 aspect-[3/4] rounded-lg border border-slate-700 bg-slate-950 overflow-hidden relative shadow">
                      <PlayerAvatar player={benchPlayer} className="w-full h-full object-cover" />
                      <span className="absolute bottom-0 inset-x-0 text-center text-[8px] font-black font-num bg-slate-900/90 text-[#00FF66]">
                        {benchPlayer.overall}
                      </span>
                    </div>
                    <div className="text-[8px] font-bold text-white truncate max-w-full mt-0.5">{benchPlayer.name}</div>
                  </div>
                ) : (
                  <div className="w-10 h-14 sm:w-12 sm:h-16 rounded-lg border border-dashed border-slate-700 bg-slate-950/60 flex flex-col items-center justify-center text-slate-500 hover:text-white hover:border-slate-500">
                    <Icon name="plus" className="w-3.5 h-3.5" />
                    <span className="text-[8px] font-bold mt-0.5">SUB{idx + 1}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 選手選択ドロワー/モーダル */}
      {activeSlotModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 md:p-4 overflow-y-auto animate-fadeIn">
          <div className="max-w-[1750px] w-full mx-auto flex justify-between items-center px-2 lg:px-4 my-auto">
            <SideAdBanner position="left" isModal={true} showModalAd={showSlotModalAd} />

            <div className="glass-panel max-w-2xl w-full mx-auto rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6 flex flex-col shadow-2xl max-h-[85vh] flex-shrink-0">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <h3 className="font-black text-lg text-white">
                    選手を割り当て ({activeSlotModal.targetPos} スロット)
                  </h3>
                  {currentSlotInfo?.requiredStyle && (
                    <div className="mt-0.5 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40 text-xs font-black">
                      ⭐ 【{currentSlotInfo.label}位置条件】 {currentSlotInfo.requiredStyle} (LV.{currentSlotInfo.minLevel}以上) を要配置
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setActiveSlotModal(null)}
                  className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              {/* テキストリアルタイム検索バー */}
              <div className="py-2.5 border-b border-slate-800 flex items-center gap-2">
                <div className="relative flex-1">
                  <Icon name="search" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={modalSearchText}
                    onChange={(e) => setModalSearchText(e.target.value)}
                    placeholder="選手名・プレースタイル・国籍・ポリシーでリアルタイム検索 (例: 柴崎, ラインブレーカー, ブラジル)..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-[#00FF66] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-colors"
                  />
                  {modalSearchText && (
                    <button
                      onClick={() => setModalSearchText('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                    >
                      <Icon name="x" className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                {modalSearchText && (
                  <button
                    onClick={() => setModalSearchText('')}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-bold whitespace-nowrap cursor-pointer"
                  >
                    クリア
                  </button>
                )}
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto py-3 border-b border-slate-800 scrollbar-none">
                {['ALL', 'CF', 'LW', 'RW', 'AM', 'LM', 'RM', 'DM', 'LFB', 'RFB', 'CB', 'GK'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => setFilterPos(pos)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer ${filterPos === pos
                      ? 'bg-[#00FF66] text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                  >
                    {pos}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 py-3 pr-1 scrollbar-thin scrollbar-thumb-slate-700">
                {modalPlayers.length > 0 ? (
                  modalPlayers.map(p => {
                    const isSlotReqMatch = currentSlotInfo?.requiredStyle
                      ? checkPlayStyleRequirement(p, currentSlotInfo.requiredStyle, currentSlotInfo.minLevel)
                      : false;

                    const assignedInfo = getAssignedLocationInfo(p.id);

                    return (
                      <div
                        key={p.id}
                        onClick={() => handleAssignPlayer(p)}
                        className={`p-2.5 rounded-xl bg-slate-950 border flex items-center justify-between gap-3 cursor-pointer transition-all hover:bg-slate-800/40 ${isSlotReqMatch
                          ? 'border-amber-400 shadow-md shadow-amber-400/20 bg-amber-500/10'
                          : assignedInfo
                            ? 'border-purple-500/40 bg-purple-500/5'
                            : 'border-slate-800 hover:border-[#00FF66]/50'
                          }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <PlayerAvatar player={p} className="w-10 h-14 aspect-[3/4] rounded-lg object-cover bg-slate-900 border border-slate-700 flex-shrink-0" />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-slate-800 text-[#00FF66]">
                                {p.mainPosition}
                              </span>
                              <span className="text-[10px] font-bold text-amber-400">
                                {p.rarity}
                              </span>
                              {p.policy && (
                                <span className={`text-[9px] font-bold px-1 py-0.2 rounded border ${getPolicyBadgeClass(p.policy)}`}>
                                  {p.policy}
                                </span>
                              )}
                              {assignedInfo && (
                                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-400/40">
                                  📍 {assignedInfo.label}
                                </span>
                              )}
                              {isSlotReqMatch && (
                                <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 animate-pulse">
                                  ⭐ 位置条件完全合致 ({p.playStyle} LV.{p.playStyleLevel})
                                </span>
                              )}
                            </div>
                            <div className="font-black text-sm text-white truncate mt-0.5">{p.name}</div>
                            <div className="text-[10px] text-slate-400 truncate">
                              {p.playStyle || 'スタイル未設定'} <span className="text-[#00FF66] font-bold">LV.{p.playStyleLevel}</span> {p.nationality && `| 🌐 ${p.nationality}`}
                            </div>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-slate-400 font-bold">総合力</div>
                          <div className="text-lg font-black font-num text-[#00FF66]">{p.overall}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-10 text-slate-400 text-xs font-bold">
                    選択可能な選手が見つかりません。
                  </div>
                )}
              </div>
            </div>

            <SideAdBanner position="right" isModal={true} showModalAd={showSlotModalAd} />
          </div>
        </div>
      )}

      {toastMsg && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-xs sm:text-sm shadow-2xl border border-emerald-400/50 flex items-center gap-2 animate-bounce">
          <Icon name="check" className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      {isSaveModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-5 animate-scaleIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                  💾 チーム編成スロット保存 ＆ 呼び出し
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">作成したチームをブラウザに保存・切り替えできます</p>
              </div>
              <button
                onClick={() => setIsSaveModalOpen(false)}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="text-xs font-extrabold text-slate-300 flex items-center gap-1.5">
                <Icon name="plus-circle" className="w-4 h-4 text-[#00FF66]" />
                現在のチームをスロット保存
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={`チーム名 (例: マイチーム ${savedSlots.length + 1})`}
                  value={newTeamName}
                  onChange={e => setNewTeamName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') handleSaveTeamSlot(newTeamName); }}
                  className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00FF66]"
                />
                <button
                  onClick={() => handleSaveTeamSlot(newTeamName)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00FF66] to-[#00E5FF] text-slate-950 font-extrabold text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  新規保存
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-extrabold text-slate-400 flex items-center justify-between">
                <span>保存済みチーム一覧 ({savedSlots.length} スロット)</span>
              </div>
              {savedSlots.length === 0 ? (
                <div className="text-center py-8 text-slate-500 text-xs font-semibold bg-slate-950/40 rounded-2xl border border-dashed border-slate-800">
                  保存されたチームスロットはありません
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[300px] overflow-y-auto pr-1 scrollbar-thin">
                  {savedSlots.map(team => (
                    <div key={team.id} className="bg-slate-950/90 border border-slate-800 hover:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors">
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-extrabold text-sm text-white truncate">{team.name}</span>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${getPolicyBadgeClass(team.teamPolicy)} ${getPolicyTextColor(team.teamPolicy)}`}>
                            {team.teamPolicy}
                          </span>
                          {team.builderMaxEnhanced && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black bg-orange-500/20 text-orange-400 border border-orange-500/30">
                              ⚡最大強化
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3">
                          <span>⚽ {team.formationName}</span>
                          <span>👤 {team.playerCount || 0}名配置</span>
                          <span>🕒 {team.updatedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 justify-end flex-shrink-0">
                        <button
                          onClick={() => handleLoadTeamSlot(team)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/40 text-xs font-bold transition-colors cursor-pointer"
                        >
                          呼出
                        </button>
                        <button
                          onClick={() => handleSaveTeamSlot(team.name, team.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                        >
                          上書き
                        </button>
                        <button
                          onClick={() => handleDeleteTeamSlot(team.id)}
                          className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold transition-colors cursor-pointer"
                          title="削除"
                        >
                          <Icon name="trash" className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
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

  // 詳細モーダル表示時の3回に1回頻度制御判定
  const showModalAd = useMemo(() => {
    return checkModalAdFrequency();
  }, []);

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
        <SideAdBanner position="left" isModal={true} showModalAd={showModalAd} />

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

        <SideAdBanner position="right" isModal={true} showModalAd={showModalAd} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODAL: 選手比較表 MODAL
// ─────────────────────────────────────────────────────────────
function PlayerCompareModal({ compareList, onClose, onRemove, onClearAll }) {
  if (compareList.length === 0) return null;

  // 比較表モーダル表示時の3回に1回頻度制御判定
  const showModalAd = useMemo(() => {
    return checkModalAdFrequency();
  }, []);

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

  useEffect(() => {
    if (compareList.length === 0) {
      onClose();
    }
  }, [compareList, onClose]);

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

  // 1位(赤 ★BEST)、2位(黄 2ND)、3位(水色 3RD) のランク判定・バッジ・背景色ヘルパー（比較人数に応じて表示レベルを自動変更）
  const renderRankBadge = (val, allVals) => {
    if (!val || val === 0 || !allVals || allVals.length < 2) return null;
    const sortedUnique = [...new Set(allVals)].sort((a, b) => b - a);
    const rank = sortedUnique.indexOf(val) + 1;
    const maxRank = Math.min(3, allVals.length - 1);

    if (rank > maxRank) return null;

    if (rank === 1) {
      return <span className="text-[9px] font-black text-red-200 bg-red-600/45 px-1.5 py-0.5 rounded border border-red-400/70 shadow-sm">★BEST</span>;
    } else if (rank === 2) {
      return <span className="text-[9px] font-extrabold text-amber-100 bg-amber-500/45 px-1.5 py-0.5 rounded border border-amber-300/70 shadow-sm">2ND</span>;
    } else if (rank === 3) {
      return <span className="text-[9px] font-bold text-cyan-100 bg-cyan-500/45 px-1.5 py-0.5 rounded border border-cyan-300/70 shadow-sm">3RD</span>;
    }
    return null;
  };

  const getRankCellBg = (val, allVals) => {
    if (!val || val === 0 || !allVals || allVals.length < 2) return '';
    const sortedUnique = [...new Set(allVals)].sort((a, b) => b - a);
    const rank = sortedUnique.indexOf(val) + 1;
    const maxRank = Math.min(3, allVals.length - 1);

    if (rank > maxRank) return '';

    if (rank === 1) return 'bg-red-600/35 border-b border-red-400/50 shadow-[inset_0_0_15px_rgba(239,68,68,0.3)]';
    if (rank === 2) return 'bg-amber-500/35 border-b border-amber-300/50 shadow-[inset_0_0_15px_rgba(245,158,11,0.3)]';
    if (rank === 3) return 'bg-cyan-500/35 border-b border-cyan-300/50 shadow-[inset_0_0_15px_rgba(6,182,212,0.3)]';
    return '';
  };

  const getRankBarStyle = (val, allVals) => {
    const sortedUnique = [...new Set(allVals)].sort((a, b) => b - a);
    const rank = sortedUnique.indexOf(val) + 1;
    if (rank === 1) return 'bg-red-500 shadow-md shadow-red-500/40';
    if (rank === 2) return 'bg-amber-400 shadow-md shadow-amber-400/40';
    if (rank === 3) return 'bg-[#00E5FF] shadow-md shadow-cyan-400/40';
    return 'bg-slate-600';
  };

  const allCatalogOveralls = adjustedCompareList.map(p => p.overall);
  const allTotalStats18 = adjustedCompareList.map(p => getPlayerTotalStats18(p));

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-1 sm:p-4 overflow-y-auto">
      <div className="max-w-[1750px] w-full mx-auto flex justify-between items-center px-1 sm:px-2 my-auto">
        <SideAdBanner position="left" isModal={true} showModalAd={showModalAd} />

        <div className="glass-panel max-w-6xl w-full mx-auto rounded-2xl sm:rounded-3xl border border-[#00FF66]/40 p-2 landscape:p-2 sm:p-6 flex flex-col max-h-[96vh] landscape:max-h-[98vh] overflow-hidden animate-fadeIn shadow-2xl space-y-1.5 sm:space-y-3 flex-shrink-0">
          {/* モーダルヘッダー（すべての操作・タイトル・凡例を横一列に統合して縦幅を極小化） */}
          <div className="flex-shrink-0 border-b border-slate-800 pb-1.5 sm:pb-2">
            <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
              {/* 左側：アイコン ＆ タイトル */}
              <div className="flex items-center gap-1 sm:gap-1.5 flex-shrink-0">
                <div className="p-1 sm:p-1.5 rounded-md sm:rounded-xl bg-[#00FF66]/20 border border-[#00FF66]/40">
                  <Icon name="compare" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00FF66]" />
                </div>
                <h2 className="text-xs sm:text-base font-black font-num text-transparent bg-clip-text bg-gradient-to-r from-[#00FF66] via-[#00E5FF] to-white leading-tight">
                  選手能力値 ＆ プレー意識 比較表
                </h2>
              </div>

              {/* 右側：コントロールボタン ＆ 順位凡例 ＆ 閉じるボタン（横一列整列） */}
              <div className="flex items-center gap-1 sm:gap-2 flex-wrap ml-auto">
                <div className="flex items-center gap-0.5 bg-slate-900/90 p-0.5 rounded-lg border border-orange-500/40">
                  <button
                    onClick={() => setIsGlobalMaxEnhanced(false)}
                    className={`px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-xs font-bold transition-all ${!isGlobalMaxEnhanced
                      ? 'bg-slate-800 text-slate-100 shadow border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    🌱 初期値
                  </button>
                  <button
                    onClick={() => setIsGlobalMaxEnhanced(true)}
                    className={`px-1.5 sm:px-2.5 py-0.5 rounded text-[9px] sm:text-xs font-bold transition-all flex items-center gap-0.5 ${isGlobalMaxEnhanced
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-black shadow-md shadow-orange-500/20'
                      : 'text-slate-400 hover:text-slate-200'
                      }`}
                  >
                    ⚡ 最大強化
                  </button>
                </div>

                <button
                  onClick={onClearAll}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-lg text-[9px] sm:text-xs font-bold bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/40 transition-all flex items-center gap-0.5 cursor-pointer"
                  title="比較対象をすべて解除"
                >
                  🗑️ 全クリア
                </button>

                <div className="flex items-center gap-1.5 text-[9px] sm:text-xs text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-lg border border-slate-800">
                  <span className="text-red-400 font-extrabold flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>1位 ★BEST</span>
                  <span className="text-amber-400 font-extrabold flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>2位 2ND</span>
                  <span className="text-[#00E5FF] font-extrabold hidden md:flex items-center gap-0.5"><span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]"></span>3位 3RD</span>
                </div>

                <button
                  onClick={onClose}
                  className="p-1 sm:p-1.5 rounded-lg sm:rounded-xl bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 border border-slate-700/60 hover:border-red-500/40 transition-all cursor-pointer flex-shrink-0"
                  title="閉じる"
                >
                  <Icon name="x" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* 横スクロール案内（モバイル） */}
          {adjustedCompareList.length >= 3 && (
            <div className="flex-shrink-0 sm:hidden text-[9px] font-bold text-[#00FF66] bg-[#00FF66]/10 px-2 py-0.5 rounded-md border border-[#00FF66]/30 text-center">
              ← 左右スワイプで全選手比較 →
            </div>
          )}

          {/* PC・スマホ共通 統一サイドバイサイド比較テーブル（均等幅＆固定テーブルレイアウト） */}
          <div className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-slate-700 rounded-xl sm:rounded-2xl border border-slate-800 max-h-[calc(94vh-100px)] landscape:max-h-[calc(98vh-65px)]">
            <table className="w-full table-fixed min-w-full sm:min-w-[768px] border-collapse text-left text-xs sm:text-sm">
              <thead className="sticky top-0 z-30 shadow-md">
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="p-1.5 sm:p-3 w-[100px] landscape:w-[110px] sm:w-80 md:w-96 min-w-[100px] sm:min-w-[320px] max-w-[100px] sm:max-w-[384px] bg-slate-900 text-[10px] sm:text-sm font-black text-slate-300 uppercase tracking-wider sticky left-0 top-0 z-40 border-r border-slate-800 shadow-md overflow-hidden">
                    <div className="truncate sm:whitespace-nowrap font-black">比較項目</div>
                  </th>
                  {adjustedCompareList.map(p => {
                    const isEnhanced = isGlobalMaxEnhanced || (playerEnhancedMap[p.id] !== undefined ? playerEnhancedMap[p.id] : (p.isMaxEnhanced || false));
                    const currentRarity = isEnhanced ? '☆5' : (playerRarityMap[p.id] || p.simulatedRarity || p.rarity || '☆3');
                    const mainStyle = p.style || p.playStyle || "スタイル未設定";

                    return (
                      <th key={p.id} className="p-1 sm:p-2.5 bg-slate-900 text-center align-top border-r border-slate-800/80 last:border-r-0 sticky top-0 z-30 shadow-md">
                        <div className="flex flex-col items-center relative group w-full">
                          <button
                            onClick={() => onRemove(p)}
                            className="absolute -top-1 -right-1 z-10 p-0.5 sm:p-1 rounded-full bg-slate-900 hover:bg-red-500 text-slate-400 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                            title="比較から外す"
                          >
                            <Icon name="x" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </button>

                          <div className="relative flex-shrink-0 my-0.5">
                            <PlayerAvatar player={p} className="w-10 h-14 sm:w-14 sm:h-20 aspect-[3/4] flex-shrink-0 object-cover rounded-lg sm:rounded-xl border border-slate-700 shadow-md bg-slate-950" />
                            <span className={`absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0 rounded-full text-[7px] sm:text-[9px] font-black whitespace-nowrap ${getRarityBadgeStyle(currentRarity)}`}>
                              {currentRarity}
                            </span>
                          </div>

                          <div className="pt-1.5 sm:pt-2.5 w-full overflow-hidden text-center px-0.5">
                            <div className="text-[10px] sm:text-sm font-black text-white truncate w-full">{p.name}</div>
                            <div className="text-[8px] sm:text-[10px] text-[#00FF66] font-bold mt-0.2 truncate w-full">{p.mainPosition} | {mainStyle}</div>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {/* 0. レア度 ＆ 強化設定コントロール行 */}
                <tr className="border-b border-slate-800 bg-slate-900/80">
                  <td className="p-1.5 sm:p-3 font-black text-amber-400 text-[10px] sm:text-sm sticky left-0 z-10 bg-slate-900 border-r border-slate-800 shadow-md overflow-hidden">
                    <div className="truncate sm:whitespace-nowrap font-black">⚙️ 育成設定</div>
                  </td>
                  {adjustedCompareList.map(p => {
                    const isEnhanced = isGlobalMaxEnhanced || (playerEnhancedMap[p.id] !== undefined ? playerEnhancedMap[p.id] : (p.isMaxEnhanced || false));
                    const currentRarity = isEnhanced ? '☆5' : (playerRarityMap[p.id] || p.simulatedRarity || p.rarity || '☆3');

                    return (
                      <td key={p.id} className="p-1 sm:p-2 border-r border-slate-800/60 align-top bg-slate-900/40">
                        <div className="w-full space-y-1">
                          <div className="flex flex-wrap items-center justify-center gap-0.5 sm:gap-1">
                            {RARITIES.map(r => (
                              <button
                                key={r}
                                onClick={() => setPlayerRarityMap(prev => ({ ...prev, [p.id]: r }))}
                                disabled={isEnhanced}
                                className={`px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-black transition-all ${currentRarity === r
                                  ? 'bg-[#00FF66] text-slate-950 shadow'
                                  : 'bg-slate-800 text-slate-400 hover:text-white'
                                  } ${isEnhanced ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                              >
                                {r}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => setPlayerEnhancedMap(prev => ({ ...prev, [p.id]: !isEnhanced }))}
                            className={`w-full py-0.5 sm:py-1 rounded text-[8px] sm:text-[9px] font-black transition-all border flex items-center justify-center gap-0.5 cursor-pointer ${isEnhanced
                              ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 border-orange-400 shadow'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                              }`}
                          >
                            {isEnhanced ? '⚡ 最大強化' : '🌱 通常'}
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* スキル行 */}
                <tr className="border-b border-slate-800/60 bg-slate-900/30">
                  <td className="p-1.5 sm:p-3 text-[10px] sm:text-sm font-black text-amber-400 sticky left-0 z-10 bg-slate-950 border-r border-slate-800 shadow-md align-top overflow-hidden">
                    <div className="truncate sm:whitespace-nowrap font-black">所持スキル</div>
                  </td>
                  {adjustedCompareList.map(p => {
                    const sk = getPlayerSkill(p);
                    return (
                      <td key={p.id} className="p-1.5 sm:p-3 border-r border-slate-800/40 align-top text-left">
                        <div className="bg-slate-900/90 p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl border border-slate-800 space-y-0.5 sm:space-y-1">
                          <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                            <span className={`px-1.5 py-0.5 rounded text-[8px] sm:text-[10px] ${getRankBadgeStyle(sk.rank)}`}>
                              {sk.rank}
                            </span>
                            <span className={`text-[10px] sm:text-sm font-black ${getRankTextStyle(sk.rank)}`}>
                              {sk.name}
                            </span>
                          </div>
                          {sk.description && (
                            <p className="text-[9px] sm:text-[11px] text-slate-300 leading-tight sm:leading-relaxed pt-0.5">{sk.description}</p>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* アビリティ行 */}
                <tr className="border-b border-slate-800/60 bg-slate-900/30">
                  <td className="p-1.5 sm:p-3 text-[10px] sm:text-sm font-black text-purple-300 sticky left-0 z-10 bg-slate-950 border-r border-slate-800 shadow-md align-top sm:whitespace-nowrap">
                    所持アビリティ
                  </td>
                  {adjustedCompareList.map(p => {
                    const abs = getPlayerAbilities(p);
                    return (
                      <td key={p.id} className="p-1.5 sm:p-3 border-r border-slate-800/40 align-top text-left">
                        <div className="space-y-1 sm:space-y-2">
                          {abs.map((ab, idx) => (
                            <div key={idx} className="bg-slate-900/90 p-1 sm:p-2 rounded-lg sm:rounded-xl border border-slate-800 space-y-0.5 sm:space-y-1">
                              <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                                <span className={`px-1 py-0.5 rounded text-[8px] sm:text-[9px] ${getRankBadgeStyle(ab.rank)}`}>
                                  {ab.rank}
                                </span>
                                <span className={`text-[10px] sm:text-sm font-black ${getRankTextStyle(ab.rank)}`}>
                                  {ab.name}
                                </span>
                              </div>
                              {ab.description && (
                                <p className="text-[9px] sm:text-[10px] text-slate-300 leading-tight sm:leading-normal">{ab.description}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </td>
                    );
                  })}
                </tr>

                {/* 2. カタログ総合力 ＆ 18項目能力合計 */}
                <tr className="border-b border-slate-800 bg-slate-900/40">
                  <td className="p-1.5 sm:p-3 font-black text-[#00FF66] text-[10px] sm:text-sm sticky left-0 z-10 bg-slate-900 border-r border-slate-800 shadow-md sm:whitespace-nowrap">
                    カタログ総合力
                  </td>
                  {adjustedCompareList.map(p => (
                    <td key={p.id} className={`p-1 sm:p-3 text-center border-r border-slate-800/60 font-num font-black transition-colors ${getRankCellBg(p.overall, allCatalogOveralls)}`}>
                      <div className="relative flex items-center justify-center min-h-[26px] sm:min-h-[32px] w-full px-0.5 sm:px-1">
                        <div className="hidden sm:flex absolute left-1 items-center justify-start w-10">
                          {renderRankBadge(p.overall, allCatalogOveralls)}
                        </div>
                        <span className="text-base sm:text-xl md:text-2xl text-[#00FF66]">{p.overall}</span>
                      </div>
                    </td>
                  ))}
                </tr>
                <tr className="border-b border-slate-800 bg-slate-900/40">
                  <td className="p-1.5 sm:p-3 font-black text-[#00E5FF] text-[10px] sm:text-sm sticky left-0 z-10 bg-slate-900 border-r border-slate-800 shadow-md sm:whitespace-nowrap">
                    18項目能力合計
                  </td>
                  {adjustedCompareList.map((p, idx) => (
                    <td key={p.id} className={`p-1 sm:p-3 text-center border-r border-slate-800/60 font-num font-black transition-colors ${getRankCellBg(allTotalStats18[idx], allTotalStats18)}`}>
                      <div className="relative flex items-center justify-center min-h-[26px] sm:min-h-[32px] w-full px-0.5 sm:px-1">
                        <div className="hidden sm:flex absolute left-1 items-center justify-start w-10">
                          {renderRankBadge(allTotalStats18[idx], allTotalStats18)}
                        </div>
                        <span className="text-base sm:text-xl md:text-2xl text-[#00E5FF]">{allTotalStats18[idx].toLocaleString()}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* 3. 各能力カテゴリ ＆ 18詳細能力 */}
                {statGroups.map(grp => (
                  <React.Fragment key={grp.key}>
                    {/* カテゴリ合計行 */}
                    <tr className="bg-slate-900/90 border-t-2 border-b border-slate-800">
                      <td className="p-1.5 sm:p-3 font-black text-amber-300 text-[10px] sm:text-sm sticky left-0 z-10 bg-slate-900 border-r border-slate-800 shadow-md flex items-center gap-1 sm:whitespace-normal">
                        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#00FF66] flex-shrink-0"></span>
                        <span className="leading-tight">
                          {grp.key === 'defense' ? (
                            <>DEF (ディフェンス /<br />GK能力)</>
                          ) : (
                            grp.label
                          )}
                        </span>
                      </td>
                      {adjustedCompareList.map(p => {
                        const catTot = getCategoryTotal(p, grp.key);
                        const allCatTotals = adjustedCompareList.map(item => getCategoryTotal(item, grp.key));
                        return (
                          <td key={p.id} className={`p-1 sm:p-3 text-center border-r border-slate-800/60 font-num font-black transition-colors ${getRankCellBg(catTot, allCatTotals)}`}>
                            <div className="relative flex items-center justify-center min-h-[24px] sm:min-h-[30px] w-full px-0.5 sm:px-1">
                              <div className="hidden sm:flex absolute left-1 items-center justify-start w-10">
                                {renderRankBadge(catTot, allCatTotals)}
                              </div>
                              <span className="text-base sm:text-xl md:text-2xl text-amber-300">{catTot}</span>
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* 18詳細能力行 */}
                    {grp.details.map(dt => {
                      const isGkRow = (grp.key === 'defense');
                      const detailVals = adjustedCompareList.map(p => {
                        if (p.detailStats && p.detailStats[grp.key]) {
                          return p.detailStats[grp.key][dt.subKey] || 0;
                        }
                        return 0;
                      });

                      return (
                        <tr key={dt.subKey} className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors">
                          <td className="p-1 sm:p-2.5 text-[10px] sm:text-sm font-bold text-slate-200 pl-2 sm:pl-5 sticky left-0 z-10 bg-slate-950 border-r border-slate-800 shadow-md sm:whitespace-nowrap">
                            ▶ {dt.label}
                          </td>
                          {adjustedCompareList.map((p, idx) => {
                            const val = detailVals[idx];

                            return (
                              <td key={p.id} className={`p-1 sm:p-2.5 text-center border-r border-slate-800/40 transition-colors ${getRankCellBg(val, detailVals)}`}>
                                <div className="relative flex items-center justify-center min-h-[22px] sm:min-h-[28px] w-full px-0.5 sm:px-1">
                                  <div className="hidden sm:flex absolute left-1 items-center justify-start w-10">
                                    {renderRankBadge(val, detailVals)}
                                  </div>
                                  <span className="font-num font-black text-white text-base sm:text-xl md:text-2xl">{val}</span>
                                </div>
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </React.Fragment>
                ))}

                {/* 4. プレー意識 14項目 */}
                <tr className="bg-amber-500/10 border-t-2 border-b border-amber-500/30">
                  <td colSpan={adjustedCompareList.length + 1} className="p-1.5 sm:p-2.5 font-extrabold text-amber-400 text-[10px] sm:text-sm tracking-wider uppercase">
                    <div className="sticky left-2 inline-flex items-center gap-1 font-black max-w-full overflow-hidden">
                      <span className="truncate sm:whitespace-nowrap font-black">🧠 プレー意識 14項目 対比 (-2 〜 +2)</span>
                    </div>
                  </td>
                </tr>
                {PLAY_TENDENCY_ITEMS.map(item => {
                  const vals = adjustedCompareList.map(p => getPlayerPlayTendency(p, item.key));
                  return (
                    <tr key={item.key} className="border-b border-slate-800/40 hover:bg-slate-800/30 transition-colors">
                      <td className="p-1.5 sm:p-2.5 text-[10px] sm:text-xs md:text-sm font-bold text-amber-200 pl-2 sm:pl-4 sticky left-0 z-10 bg-slate-950 border-r border-slate-800 shadow-md overflow-hidden">
                        <div className="truncate sm:whitespace-nowrap font-bold w-full overflow-hidden">🧠 {item.label}</div>
                      </td>
                      {adjustedCompareList.map((p, idx) => {
                        const val = vals[idx];
                        return (
                          <td key={p.id} className="p-2 text-center border-r border-slate-800/40">
                            <span className={`px-2.5 py-0.5 rounded-lg text-xs sm:text-sm font-num font-black ${getTendencyBadgeStyle(val)}`}>
                              {formatTendencyVal(val)}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <SideAdBanner position="right" isModal={true} showModalAd={showModalAd} />
    </div>
  );
}
