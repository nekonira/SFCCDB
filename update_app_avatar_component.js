const fs = require('fs');
const path = require('path');

const appJsxPath = path.join(__dirname, 'src', 'app.jsx');
let code = fs.readFileSync(appJsxPath, 'utf-8');

console.log('--- Adding PlayerAvatar Component to src/app.jsx ---');

// Define PlayerAvatar component
const playerAvatarDef = `
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
    <div className={\`relative flex flex-col items-center justify-between p-1 overflow-hidden bg-gradient-to-b \${theme.bg} \${theme.border} \${className}\`}>
      <div className="w-full flex items-center justify-between text-[9px] font-extrabold z-10">
        <span className={\`px-1 rounded border \${theme.badge} font-num\`}>{pos}</span>
        <span className="text-amber-400 font-num font-bold text-[8px]">{rarity}</span>
      </div>
      <div className="my-auto flex flex-col items-center justify-center text-center z-10 space-y-0.5 w-full px-0.5">
        <div className={\`w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-950/80 border border-slate-700/80 flex items-center justify-center \${theme.text} shadow-inner\`}>
          <Icon name="user" className="w-3.5 h-3.5 md:w-4 md:h-4 opacity-90" />
        </div>
        <div className="text-[9px] md:text-[10px] font-bold text-white leading-tight truncate w-full">
          {name.split(' ')[0] || name}
        </div>
      </div>
      <div className={\`w-full text-center text-[8px] font-extrabold uppercase tracking-wider \${theme.text} bg-slate-950/80 rounded py-0.5 z-10 border border-white/5\`}>
        {category}
      </div>
    </div>
  );
};
`;

// Add PlayerAvatar after getPlayerAvatarUrl definition
const marker = "const getPlayerAvatarUrl = (player) => {";
const endMarker = "  return player.avatarUrl || '';\n};";
const idx = code.indexOf(endMarker);

if (idx !== -1) {
  code = code.substring(0, idx + endMarker.length) + "\n\n" + playerAvatarDef + "\n" + code.substring(idx + endMarker.length);
  console.log('Inserted PlayerAvatar component into src/app.jsx');
} else {
  console.error('Could not find getPlayerAvatarUrl end marker');
}

fs.writeFileSync(appJsxPath, code, 'utf-8');
