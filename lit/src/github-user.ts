import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { state } from 'lit/decorators.js';

interface IGithubUser {
  avatar_url: string;
  username: string;
  user_url: string;
  public_gists: number;
  gists_url: string;
  public_repos: number;
  repos_url: string;
  followers: number;
  followers_url: string;
}

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('github-user')
export class GithubUser extends LitElement {
  static override styles = css`
    :host {
      display: flex
    }
  `;

  constructor() {
    // Always call super() first
    super();
    this.user = undefined;
  }

  /**
   * Github username
   */
  @property()
  username = "";

  override attributeChangedCallback(name: string, _: string, newValue: string) {
    console.log("updating", name)
    if (name === 'username') {
      this.username = newValue;
      this.setGithubUser()
    }
  }

  @state()
  user!: IGithubUser | undefined;

  async setGithubUser() {
    if (!this || !this.username) {
      return
    }
    const req = await fetch(`https://api.github.com/users/${this.username}`)
    const json = await req.json()
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
    }
    console.log('json', json);
    console.log('User data updated', this.user);
  }


  override render() {
    return html`
    <!-- It is not very clever to use TailwindCSS like this, just doing it because it is easier -->
    <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet">
    <section class="rounded-xl px-3 py-1.5 border border-gray-200 grid grid-cols-3 justify-center items-center font-sans gap-x-3 gap-y-2 ">
      ${this.user ?
        html`
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
        html`User not found`
      }
      </section>`
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "github-user": GithubUser;
  }
}
