import "server-only";

export interface GithubSecurityClientConfig {
  token: string;
}

export function getGithubSecurityClientConfig(): GithubSecurityClientConfig | null {
  const token = process.env.GITHUB_SECURITY_TOKEN;

  if (!token) {
    return null;
  }

  return { token };
}

export function hasGithubSecurityClientConfig(): boolean {
  return getGithubSecurityClientConfig() !== null;
}
