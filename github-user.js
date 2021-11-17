var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { state } from 'lit/decorators.js';
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
let GithubUser = class GithubUser extends LitElement {
    constructor() {
        // Always call super() first
        super();
        /**
         * Github username
         */
        this.username = "";
        this.user = undefined;
    }
    attributeChangedCallback(name, _, newValue) {
        console.log("updating", name);
        if (name === 'username') {
            this.username = newValue;
            this.setGithubUser();
        }
    }
    async setGithubUser() {
        if (!this || !this.username) {
            return;
        }
        const req = await fetch(`https://api.github.com/users/${this.username}`);
        const json = await req.json();
        this.user = {
            avatar_url: json.avatar_url,
            user_url: json.html_url,
            username: json.login,
            public_gists: json.public_gists,
            gists_url: `https://gist.github.com/${this.username}`,
            public_repos: json.public_repos,
            repos_url: `https://github.com/${this.username}?tab=repositories`,
            followers: json.followers,
            followers_url: `https://github.com/${this.username}?tab=followers`,
        };
        console.log('json', json);
        console.log('User data updated', this.user);
    }
    render() {
        return html `
    <!-- It is not very clever to use TailwindCSS like this, just doing it because it is easier -->
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <section class="rounded-xl px-3 py-1.5 border border-gray-200 grid grid-cols-3 justify-center items-center font-sans gap-x-3 gap-y-2 ">
      ${this.user ?
            html `
          <img .src= ${this.user.avatar_url} class="h-10 rounded-full shadow-inner"/>
          <a .href="${this.user.user_url}" target="_blank">
            <span>@${this.user.username}</span>
          </a>
          <span></span>
          <a .href="${this.user.repos_url}" target="_blank">
            <div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded">
              <span class="text-gray-600 uppercase text-xs">Repos</span>
              <span class="text-gray-600 font-bold text-sm">${this.user.public_repos}</span>
            </div>
          </a>
          <a .href="${this.user.gists_url}" target="_blank">
            <div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded">
              <span class="text-gray-600 uppercase text-xs">Gists</span>
              <span class="text-gray-600 font-bold text-sm">${this.user.public_gists}</span>
            </div>
          </a>
          <a .href="${this.user.followers_url}" target="_blank">
            <div class="flex flex-col items-center font-mono hover:bg-gray-100 p-1 rounded">
              <span class="text-gray-600 uppercase text-xs">Followers</span>
              <span class="text-gray-600 font-bold text-sm">${this.user.followers}</span>
            </div>
          </a>
        `
            :
                html `User not found`}
      </section>`;
    }
};
GithubUser.styles = css `
    :host {
      display: flex
    }
  `;
__decorate([
    property()
], GithubUser.prototype, "username", void 0);
__decorate([
    state()
], GithubUser.prototype, "user", void 0);
GithubUser = __decorate([
    customElement('github-user')
], GithubUser);
export { GithubUser };
//# sourceMappingURL=github-user.js.map