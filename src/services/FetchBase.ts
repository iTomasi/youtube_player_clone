export const FetchGitHub = (pathname: string, init?: RequestInit) => (
  fetch('https://api.github.com' + pathname, init)
)