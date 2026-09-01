const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
const appJsPath = path.join(__dirname, 'src', 'app.js');

let jsx = fs.readFileSync(appJsxPath, 'utf-8');
let js = fs.readFileSync(appJsPath, 'utf-8');

const newVideosArray = `const YOUTUBE_VIDEOS = [
  {
    "id": "gq08QLFPiF8",
    "title": "【まさかの結果】ポリシー別フォメコン使用率ランキング【サカつく2026】フォーメーションコンボ使用比率大調査",
    "thumbnail": "https://i.ytimg.com/vi/gq08QLFPiF8/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=gq08QLFPiF8"
  },
  {
    "id": "tinj05LdBj8",
    "title": "【超絶性能】新フォメコン『ラ・ロハ’26』徹底人選解説【サカつく2026】理論値最強メンバー、スキル構成解説、ポジション別適性選手など",
    "thumbnail": "https://i.ytimg.com/vi/tinj05LdBj8/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=tinj05LdBj8"
  },
  {
    "id": "wbuRTGvbpYk",
    "title": "【引く前に見て】限定スペインガチャ徹底解説！ヤマルが超ぶっ壊れ性能【サカつく2026】クバルシ、ガビ、ウナイ・シモン",
    "thumbnail": "https://i.ytimg.com/vi/wbuRTGvbpYk/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=wbuRTGvbpYk"
  },
  {
    "id": "EFmaOGfDggw",
    "title": "【完全網羅】最新アップデート情報を総まとめ Ver.2.2【サカつく2026】アクセサリ機能実装、新フォメコン追加、スカウト&継承緩和、スペインガチャ、限定特練カード、日本代表など",
    "thumbnail": "https://i.ytimg.com/vi/EFmaOGfDggw/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=EFmaOGfDggw"
  },
  {
    "id": "YxToi7zTO4I",
    "title": "【無料】サカつく2026攻略アプリが完成。複数選手比較&チームビルダー機能搭載【サカつく2026】",
    "thumbnail": "https://i.ytimg.com/vi/YxToi7zTO4I/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=YxToi7zTO4I"
  },
  {
    "id": "9OwLKGom0IU",
    "title": "【引く前に見て】新ガチャ徹底解説！アリソンめっちゃ強いですけど、他は正直微妙です【サカつく2026】エンドリッキ、グリーンウッド、アカンジ",
    "thumbnail": "https://i.ytimg.com/vi/9OwLKGom0IU/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=9OwLKGom0IU"
  },
  {
    "id": "3cWmdX7SO9g",
    "title": "【私は引きません】ポリシーガチャ襲来！スルーか引くべきか徹底的に解説します【サカつく2026】",
    "thumbnail": "https://i.ytimg.com/vi/3cWmdX7SO9g/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=3cWmdX7SO9g"
  },
  {
    "id": "TW5ffHOwVho",
    "title": "【みんなは買う?】新特練SSR佐藤寿人、徹底解説！これは本当に必要なカードですか？【サカつく2026】",
    "thumbnail": "https://i.ytimg.com/vi/TW5ffHOwVho/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=TW5ffHOwVho"
  },
  {
    "id": "-ML6aziQT8A",
    "title": "【引く前に見て】新ガチャ徹底解説！得点王が勢揃いしたJリーグガチャ。あなたは引きますか？【サカつく2026】レオ・セアラ、山岸祐也、山田寛人、泉柊椰、山本桜大、田村翔太、土信田悠生",
    "thumbnail": "https://i.ytimg.com/vi/-ML6aziQT8A/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=-ML6aziQT8A"
  },
  {
    "id": "Nk9fShVZ1sI",
    "title": "【引く前に見て】新ガチャ徹底解説！虹アビリティ登場。新特練SSRがすごい【サカつく2026】ペレ、アラウホ、ジョーダン・ヘンダーソン、カンセロ",
    "thumbnail": "https://i.ytimg.com/vi/Nk9fShVZ1sI/hqdefault.jpg",
    "url": "https://www.youtube.com/watch?v=Nk9fShVZ1sI"
  }
];`;

// Replace YOUTUBE_VIDEOS in JSX and JS
jsx = jsx.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\n\];/ , newVideosArray);
js = js.replace(/const YOUTUBE_VIDEOS = \[[\s\S]*?\];/ , newVideosArray);

// New useEffect logic
const newUseEffectJsx = `  const [youtubeVideos, setYoutubeVideos] = useState(YOUTUBE_VIDEOS);
  useEffect(() => {
    // 再生リスト(PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4)のリアルタイム自動最新取得 (RSS json API + CORS proxy fallback)
    const rssFeedUrl = 'https://www.youtube.com/feeds/videos.xml?playlist_id=PLBdUXfR7TQh42i6ZLl4GZQnTIuCgFV6F4';
    const rss2jsonUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssFeedUrl);

    const decodeEntities = (str) => {
      if (!str) return '';
      return str
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'");
    };

    fetch(rss2jsonUrl)
      .then(res => res.json())
      .then(data => {
        if (data && data.status === 'ok' && data.items && data.items.length > 0) {
          const fetched = data.items.map(item => {
            const match = (item.link || '').match(/v=([a-zA-Z0-9_-]{11})/);
            const id = match ? match[1] : '';
            return {
              id: id,
              title: decodeEntities(item.title),
              thumbnail: \`https://i.ytimg.com/vi/\${id}/hqdefault.jpg\`,
              url: \`https://www.youtube.com/watch?v=\${id}\`
            };
          }).filter(v => v.id);
          if (fetched.length > 0) {
            setYoutubeVideos(fetched);
          }
        } else {
          throw new Error('rss2json returned non-ok status');
        }
      })
      .catch(() => {
        const proxyUrl = 'https://api.codetabs.com/v1/proxy?quest=' + encodeURIComponent(rssFeedUrl);
        fetch(proxyUrl)
          .then(res => res.text())
          .then(xmlText => {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'text/xml');
            const entries = xml.querySelectorAll('entry');
            const fetched = [];
            entries.forEach(entry => {
              const id = entry.querySelector('videoId')?.textContent || (entry.getElementsByTagName('yt:videoId')[0] ? entry.getElementsByTagName('yt:videoId')[0].textContent : null);
              const title = entry.querySelector('title')?.textContent;
              if (id && title) {
                fetched.push({
                  id: id,
                  title: decodeEntities(title),
                  thumbnail: \`https://i.ytimg.com/vi/\${id}/hqdefault.jpg\`,
                  url: \`https://www.youtube.com/watch?v=\${id}\`
                });
              }
            });
            if (fetched.length > 0) {
              setYoutubeVideos(fetched);
            }
          })
          .catch(() => {});
      });
  }, []);`;

const oldUseEffectJsxPattern = /const \[youtubeVideos, setYoutubeVideos\] = useState\(YOUTUBE_VIDEOS\);[\s\S]*?\}, \[\]\);/;
if (oldUseEffectJsxPattern.test(jsx)) {
  jsx = jsx.replace(oldUseEffectJsxPattern, newUseEffectJsx);
  console.log('Successfully updated YouTube useEffect in app.jsx');
} else {
  console.warn('Could not match old useEffect pattern in app.jsx');
}

if (oldUseEffectJsxPattern.test(js)) {
  js = js.replace(oldUseEffectJsxPattern, newUseEffectJsx);
  console.log('Successfully updated YouTube useEffect in app.js');
} else {
  console.warn('Could not match old useEffect pattern in app.js');
}

fs.writeFileSync(appJsxPath, jsx, 'utf-8');
fs.writeFileSync(appJsPath, js, 'utf-8');

console.log('=== YOUTUBE AUTO UPDATE COMPLETED ===');
