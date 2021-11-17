import { css as s, LitElement as e, html as t } from "lit";
import { property as r, state as a, customElement as o } from "lit/decorators.js";
var l = Object.defineProperty, i = Object.getOwnPropertyDescriptor, n = (s2, e2, t2, r2) => {
  for (var a2, o2 = r2 > 1 ? void 0 : r2 ? i(e2, t2) : e2, n2 = s2.length - 1; n2 >= 0; n2--)
    (a2 = s2[n2]) && (o2 = (r2 ? a2(e2, t2, o2) : a2(o2)) || o2);
  return r2 && o2 && l(e2, t2, o2), o2;
};
let u = class extends e {
  constructor() {
    super(), this.username = "", this.user = void 0;
  }
  attributeChangedCallback(s2, e2, t2) {
    console.log("updating", s2), s2 === "username" && (this.username = t2, this.setGithubUser());
  }
  async setGithubUser() {
    if (!this || !this.username)
      return;
    const s2 = await fetch(`https://api.github.com/users/${this.username}`), e2 = await s2.json();
    this.user = { avatar_url: e2.avatar_url, user_url: e2.html_url, username: e2.login, public_gists: e2.public_gists, gists_url: `https://gist.github.com/${this.username}`, public_repos: e2.public_repos, repos_url: `https://github.com/${this.username}?tab=repositories`, followers: e2.followers, followers_url: `https://github.com/${this.username}?tab=followers` }, console.log("json", e2), console.log("User data updated", this.user);
  }
  render() {
    return t`<link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"><section class="rounded-xl px-3 py-1.5 border border-gray-200 grid grid-cols-3 justify-center items-center font-sans gap-x-3 gap-y-2">${this.user ? t`<img .src="${this.user.avatar_url}" class="h-10 rounded-full shadow-inner"> <a .href="${this.user.user_url}" target="_blank"><span>@${this.user.username}</span> </a><span></span> <a .href="${this.user.repos_url}" target="_blank"><div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded"><span class="text-gray-600 uppercase text-xs">Repos</span> <span class="text-gray-600 font-bold text-sm">${this.user.public_repos}</span></div></a><a .href="${this.user.gists_url}" target="_blank"><div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded"><span class="text-gray-600 uppercase text-xs">Gists</span> <span class="text-gray-600 font-bold text-sm">${this.user.public_gists}</span></div></a><a .href="${this.user.followers_url}" target="_blank"><div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded"><span class="text-gray-600 uppercase text-xs">Followers</span> <span class="text-gray-600 font-bold text-sm">${this.user.followers}</span></div></a>` : t`User not found`}</section>`;
  }
};
u.styles = s`:host{display:flex}`, n([r()], u.prototype, "username", 2), n([a()], u.prototype, "user", 2), u = n([o("github-user")], u);
export { u as GithubUser };
