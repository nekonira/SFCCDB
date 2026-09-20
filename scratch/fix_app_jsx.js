const fs = require('fs');
let code = fs.readFileSync('src/app.jsx', 'utf8');
const target = '            </div>\r\n          </div>\r\n      )}';
const targetLf = '            </div>\n          </div>\n      )}';

if (code.includes(target)) {
  code = code.replace(target, '            </div>\r\n          </div>\r\n        </div>\r\n      )}');
  fs.writeFileSync('src/app.jsx', code, 'utf8');
  console.log('Replaced CRLF successfully!');
} else if (code.includes(targetLf)) {
  code = code.replace(targetLf, '            </div>\n          </div>\n        </div>\n      )}');
  fs.writeFileSync('src/app.jsx', code, 'utf8');
  console.log('Replaced LF successfully!');
} else {
  console.log('Target snippet not found, showing lines around 9705-9710');
  const lines = code.split(/\r?\n/);
  console.log(lines.slice(9700, 9712).join('\n'));
}
