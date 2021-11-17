import { LitElement } from 'lit';
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
export declare class GithubUser extends LitElement {
    static styles: import("lit").CSSResult;
    constructor();
    /**
     * Github username
     */
    username: string;
    attributeChangedCallback(name: string, _: string, newValue: string): void;
    user: IGithubUser | undefined;
    setGithubUser(): Promise<void>;
    render(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        "github-user": GithubUser;
    }
}
export {};
//# sourceMappingURL=github-user.d.ts.map