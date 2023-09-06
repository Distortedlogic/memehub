## Install Doppler for ENV VARS

## Windows

#### Install Scoop Windows with Powershell

```bash
Set-ExecutionPolicy RemoteSigned -scope CurrentUser
iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
```

```bash
scoop bucket add doppler https://github.com/DopplerHQ/scoop-doppler.git
scoop install doppler
```

#### Add Doppler to ENV vars

get path to doppler then add to `Path` on windows, restart your shells

```bash
scoop which doppler
```

## Debian 11+ / Ubuntu 22.04+

```bash
sudo apt-get update && sudo apt-get install -y apt-transport-https ca-certificates curl gnupg
curl -sLf --retry 3 --tlsv1.2 --proto "=https" 'https://packages.doppler.com/public/cli/gpg.DE2A7741A397C129.key' | sudo gpg --dearmor -o /usr/share/keyrings/doppler-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/doppler-archive-keyring.gpg] https://packages.doppler.com/public/cli/deb/debian any-version main" | sudo tee /etc/apt/sources.list.d/doppler-cli.list
sudo apt-get update && sudo apt-get install doppler
```

## Post Install

#### Doppler login

```bash
doppler login
```

---

# Server Setup

## CD to ROOT

#### Doppler Setup

```bash
doppler setup
```

#### Install Node deps

```bash
npm i
```

### Start database, Redis, elastic search, kibana

#### install docker(linux/mac) or docker desktop (windows) and have it running

```bash
docker compose -f docker-compose.services.yml up --build
```

### Start Dev Server

```bash
npm run start:dev
```

### Hosts

- localhost:5000/graphql (endpoint, use altair software for playground)
- localhost:5000/api (Swagger Docs)
- localhost:5601 (Kibana)

### Notes

- typeorm synchronizes the DB tables for Quality of Life in Development. This sometimes leads to conflict when it syncs and there exists data in the database. In this case delete this table with a DB explorer (TablePlus). Finally reseed db if needed.

---

# Commands

### Seed DB

```bash
npm run cli db seed
```

### Seed Elastic Search

```bash
npm run cli es seed
```

### Seed Rss

```bash
npm run cli rss seed
```

### Send Test Emails (For UI purposes)

Note: due to the way `--` works in npm scripts, there is a `--` needed in front of flags. This is due to using `--` in the script prefix `doppler run --` to inject env vars.

```bash
npm run cli email signup -- --email your_email@here.com
npm run cli email reset-passowrd -- --email your_email@here.com
npm run cli email verify-email -- --email your_email@here.com
```

---

# GIT

## Git Pull Instructions

1. Set local git pull config to rebase by following command:-

```bash
git config pull.rebase true
```

2. Then to pull dev branch into your own branch by following command:-

```bash
git pull origin dev
```

This will rebase your branch with dev. Need to do it every time we start working for the day.

3. After rebase to push your changes to your own branch after commit by following command:-

```bash
git push -f
```

Use (-f) means force to push only when you git pull with rebase.
otherwise normal push command should be used.

```bash
git push
```

This will push changes to your own branch.
