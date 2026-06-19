// CSAJ デモサイト パスワード保護（Vercel Edge Middleware / 無料）
// リポジトリ直下にこのファイルを置くだけで全ページにBasic認証がかかります。
// 認証前はHTMLが一切返らないため、簡易JSゲートと違い回避できません。

export const config = {
  // _vercel 内部パス以外すべてに適用
  matcher: '/((?!_vercel/).*)',
};

const USER = 'csaj';
const PASS = 'csaj-fETlDa88Ff';

export default function middleware(request) {
  const header = request.headers.get('authorization') || '';
  const [scheme, encoded] = header.split(' ');

  if (scheme === 'Basic' && encoded) {
    let decoded = '';
    try { decoded = atob(encoded); } catch (e) { decoded = ''; }
    const i = decoded.indexOf(':');
    const user = decoded.slice(0, i);
    const pass = decoded.slice(i + 1);
    if (user === USER && pass === PASS) {
      return; // 認証OK → そのまま表示
    }
  }

  return new Response('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="CSAJ Preview", charset="UTF-8"',
    },
  });
}
