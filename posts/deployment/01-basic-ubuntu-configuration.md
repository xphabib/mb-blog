---
title: Basic Ubuntu Configuration
date: 2026-05-15
excerpt: A starter checklist for configuring a fresh Ubuntu system.
source: https://sites.google.com/view/rordev/1-basic-ubuntu-configuration?authuser=0
---

This post is a markdown version of the referenced Google Sites page. The live page was not directly accessible from this environment, so this version keeps the topic and source link while giving a practical Ubuntu setup checklist.

## Common first steps

```bash
sudo apt update
sudo apt upgrade -y
```

```bash
lsb_release -a
uname -a
ip a
```

## Set hostname

```bash
sudo hostnamectl set-hostname your-hostname
```

## Set timezone

```bash
sudo timedatectl set-timezone Asia/Dhaka
```

## Create a user

```bash
sudo adduser your-user
sudo usermod -aG sudo your-user
```

## Install basic tools

```bash
sudo apt install -y curl wget git vim net-tools
```

## SSH

```bash
sudo apt install -y openssh-server
sudo systemctl enable --now ssh
sudo systemctl status ssh
```

## Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

## Next steps

- Add network configuration if the machine needs a static IP.
- Install application-specific packages.
- Record any machine-specific changes in this post or a follow-up note.
