# Run Grafana in docker compose

```bash
docker compose up -d
```

# Setting up Github grafana datasource

- go to `provisioning/plugins/grafana-github-datasource.yml` and add your Personal Access Token.

# Use git hooks for security reasons

- copy files from `hooks` folder to your `.git/hooks`

```
git config --local core.hooksPath .githooks/
```
